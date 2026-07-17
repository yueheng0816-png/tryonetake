import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PHOTOS_PER_ORDER } from "@/lib/constants";
import { handleOrderCompletion } from "@/lib/refund";
import { transferToBlob } from "@/lib/blob";

/**
 * Optimistic-lock retry helper.
 *
 * Uses the `version` column as an optimistic concurrency control:
 *  1. Read current order state (includes version N)
 *  2. Build new outputPhotos / counters
 *  3. UPDATE WHERE version = N AND SET version = N+1
 *  4. If Prisma throws P2025 (version already bumped by another webhook),
 *     re-read and retry — up to MAX_RETRIES times.
 *
 * This eliminates the read-modify-write race condition where two
 * concurrent webhooks could silently overwrite each other's outputPhotos
 * updates (the root cause of the "29 out of 30" display bug).
 */
const MAX_RETRIES = 5;

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");
  const indexStr = searchParams.get("index");

  if (!orderId) return new NextResponse("Missing orderId", { status: 400 });

  let body: { id: string; status: string; output: unknown; error: unknown };
  try { body = await req.json(); } catch { return new NextResponse("Invalid JSON", { status: 400 }); }

  const slotIndex = indexStr ? parseInt(indexStr, 10) : -1;
  const isSucceeded = body.status === "succeeded";
  // "canceled" is a terminal Replicate status — treat the same as failed
  const isFailed = body.status === "failed" || body.status === "canceled";

  console.log(`[OneTake] Replicate webhook: order=${orderId} slot=${slotIndex} prediction=${body.id} status=${body.status}`);

  // Extract output URL for successful predictions
  let outputUrl: string | null = null;
  if (isSucceeded) {
    if (typeof body.output === "string") outputUrl = body.output;
    else if (Array.isArray(body.output) && body.output.length > 0 && typeof body.output[0] === "string") outputUrl = body.output[0];
    else if (typeof body.output === "object" && body.output !== null) {
      // Some Replicate models return { image: "url" }
      const obj = body.output as Record<string, unknown>;
      if (typeof obj.image === "string") outputUrl = obj.image;
    }
  }

  // Defense: succeeded but no usable output → treat as failure
  const actualFailed = isFailed || (isSucceeded && !outputUrl);
  const errorMsg = actualFailed
    ? (typeof body.error === "string"
        ? body.error
        : isSucceeded && !outputUrl
          ? `No usable output URL from status "${body.status}" (output type: ${typeof body.output})`
          : JSON.stringify(body.error ?? "Unknown error"))
    : "";

  // ── Optimistic-lock retry loop ──────────────────────────
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const order = await db.order.findUnique({
        where: { id: orderId },
        select: {
          id: true,
          userId: true,
          status: true,
          plan: true,
          amount: true,
          stripeSessionId: true,
          predictionIds: true,
          outputPhotos: true,
          completedPredictions: true,
          failedPredictions: true,
          errorMessages: true,
          version: true,
        },
      });

      if (!order) return new NextResponse("Order not found", { status: 404 });
      if (order.status === "completed") return NextResponse.json({ received: true });

      // ── Build new state ──────────────────────────────────
      const outputPhotos = [...order.outputPhotos];
      if (slotIndex >= 0 && slotIndex < PHOTOS_PER_ORDER) {
        // Pad array to include this slot
        while (outputPhotos.length <= slotIndex) outputPhotos.push("");

        if (isSucceeded && outputUrl) {
          // Don't overwrite an already-populated slot (defense against duplicate webhooks)
          if (!outputPhotos[slotIndex]) {
            // Transfer to Vercel Blob for permanent storage
            // (Replicate CDN URLs expire after ~24h)
            outputPhotos[slotIndex] = await transferToBlob(outputUrl, orderId, slotIndex);
          }
        }
        // For failed predictions, leave slot empty (already "")
      } else if (isSucceeded && outputUrl) {
        // Legacy: no slot index — append
        outputPhotos.push(outputUrl);
      }

      // totalExpected: prefer exact count from predictionIds;
      // fall back to PHOTOS_PER_ORDER for the race window before
      // startBatchGeneration writes predictionIds to DB
      const totalExpected = order.predictionIds.length > 0
        ? order.predictionIds.filter(Boolean).length
        : PHOTOS_PER_ORDER;
      const completedCount = order.completedPredictions + 1;
      const allDone = completedCount >= totalExpected;

      // ── Atomic update with optimistic lock ───────────────
      await db.order.update({
        where: {
          id: orderId,
          version: order.version, // ← optimistic lock: only succeeds if version unchanged
        },
        data: {
          outputPhotos,
          completedPredictions: completedCount,
          version: { increment: 1 },
          status: allDone ? "completed" : "generating",
          ...(actualFailed
            ? {
                failedPredictions: { increment: 1 },
                errorMessages: { push: errorMsg },
                // Keep empty slot for failed prediction
              }
            : {}),
        },
      });

      console.log(
        `[OneTake] Order ${orderId}: ${completedCount}/${totalExpected} completed (slot ${slotIndex})${allDone ? " - ALL DONE!" : ""}`
      );

      // ── Handle completion ────────────────────────────────
      if (allDone) {
        // Re-read to get accurate final counts
        const finalOrder = await db.order.findUnique({
          where: { id: orderId },
          select: {
            id: true,
            userId: true,
            plan: true,
            amount: true,
            stripeSessionId: true,
            failedPredictions: true,
            errorMessages: true,
            predictionIds: true,
            refundStatus: true,
            completedPredictions: true,
          },
        });

        // Guard: only refund once — check refundStatus before proceeding
        if (finalOrder && finalOrder.failedPredictions > 0 && !finalOrder.refundStatus) {
          const { default: userModule } = await import("@clerk/nextjs/server");
          // We don't have the user context here, so we use the userId from the order
          const user = await db.user.findUnique({ where: { id: finalOrder.userId } });
          handleOrderCompletion({
            orderId: finalOrder.id,
            checkoutId: finalOrder.stripeSessionId ?? null,
            userEmail: user?.email ?? "",
            plan: finalOrder.plan,
            orderAmount: finalOrder.amount,
            totalPredictions: finalOrder.predictionIds.filter(Boolean).length || PHOTOS_PER_ORDER,
            failedPredictions: finalOrder.failedPredictions,
            errorMessages: finalOrder.errorMessages,
          }).catch((e: unknown) => console.error("[OneTake] handleOrderCompletion failed:", e));
        }

        // ── Completion email (fully successful orders only) ──
        // Partial-failure orders get the refund email instead
        // (sent by handleOrderCompletion above) — avoid double-emailing.
        if (finalOrder && finalOrder.failedPredictions === 0) {
          const user = await db.user.findUnique({ where: { id: finalOrder.userId } });
          if (user?.email && !user.email.endsWith("@onetake.local")) {
            const { sendCompletionEmail } = await import("@/lib/email");
            sendCompletionEmail({
              to: user.email,
              orderId: finalOrder.id,
              photoCount: finalOrder.completedPredictions,
            }).catch((e: unknown) =>
              console.error("[OneTake] sendCompletionEmail failed:", e)
            );
          }
        }
      }

      return NextResponse.json({ received: true });
    } catch (error: unknown) {
      // P2025 = Prisma "Record to update not found" — our version lock was stale
      const code = (error as { code?: string })?.code;
      if (code === "P2025") {
        console.warn(
          `[OneTake] Optimistic lock retry for order ${orderId} slot ${slotIndex} ` +
            `(attempt ${attempt + 1}/${MAX_RETRIES})`
        );
        // Random jitter: 30–150ms to desynchronize concurrent writers
        await new Promise((r) => setTimeout(r, 30 + Math.random() * 120));
        continue;
      }

      console.error("[OneTake] Replicate webhook error:", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }

  // Exhausted all retries — this should be extremely rare
  console.error(
    `[OneTake] CRITICAL: Failed to update order ${orderId} slot ${slotIndex} ` +
      `after ${MAX_RETRIES} optimistic-lock retries`
  );
  return new NextResponse("Conflict — retry later", { status: 409 });
}
