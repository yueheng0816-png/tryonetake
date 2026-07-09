import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db, ensureUser } from "@/lib/db";
import { getPrediction, PHOTOS_PER_ORDER } from "@/lib/replicate";
import { handleOrderCompletion } from "@/lib/refund";

/**
 * GET /api/orders/[id]/check
 *
 * Polls Replicate for pending predictions and updates the order.
 * Required for local dev because Replicate webhooks can't reach localhost.
 *
 * Uses optimistic locking (version field) to prevent race conditions
 * with concurrent webhook deliveries.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  // ── Optimistic-lock retry loop ──────────────────────────
  const MAX_RETRIES = 3;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const order = await db.order.findUnique({
      where: { id },
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
        refundStatus: true,
        version: true,
      },
    });

    if (!order) {
      return new NextResponse("Not found", { status: 404 });
    }

    const user = await ensureUser(userId);
    if (order.userId !== user.id) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Accept both "paid" and "generating"
    if (order.status !== "generating" && order.status !== "paid") {
      return NextResponse.json({ status: order.status, updated: false });
    }

    // Initialize a fixed-size array with empty strings.
    const totalSlots = order.predictionIds.length;
    const outputPhotos: string[] = new Array(totalSlots).fill("");
    let completed = 0;

    // Restore any previously saved outputs
    for (let i = 0; i < Math.min(order.outputPhotos.length, totalSlots); i++) {
      const existing = order.outputPhotos[i];
      if (existing && existing !== "__failed__") {
        outputPhotos[i] = existing;
        completed++;
      } else if (existing === "__failed__") {
        outputPhotos[i] = ""; // failed slot — keep as empty, count as done
        completed++;
      }
    }

    let newlyCompleted = 0;

    for (let i = 0; i < totalSlots; i++) {
      const predictionId = order.predictionIds[i];
      if (!predictionId) continue;

      // Already have output for this slot
      if (outputPhotos[i]) continue;

      try {
        const prediction = await getPrediction(predictionId);
        if (!prediction) continue;

        if (prediction.status === "succeeded") {
          const output = Array.isArray(prediction.output)
            ? prediction.output[0]
            : prediction.output;
          if (typeof output === "string" && output.length > 0) {
            outputPhotos[i] = output;
            newlyCompleted++;
            completed++;
          }
        } else if (prediction.status === "failed") {
          // Keep as "" — already initialized, just count as done
          completed++;
        }
        // else: still "starting" or "processing" — skip
      } catch {
        // Network error polling this prediction — skip, try next poll
      }
    }

    // Update order if we got new results
    if (newlyCompleted > 0) {
      const allDone =
        completed >= PHOTOS_PER_ORDER ||
        completed >= order.predictionIds.filter(Boolean).length;

      try {
        await db.order.update({
          where: {
            id,
            version: order.version, // ← optimistic lock
          },
          data: {
            outputPhotos,
            completedPredictions: completed,
            version: { increment: 1 },
            status: allDone ? "completed" : "generating",
          },
        });

        // ── Trigger refund if all done with failures ─────────
        // This is the safety net for:
        //  (a) local dev (no webhooks reach localhost)
        //  (b) race condition where webhooks completed the order
        //      before the trigger route wrote failedPredictions
        if (allDone && order.failedPredictions > 0 && !order.refundStatus) {
          const user = await db.user.findUnique({ where: { id: order.userId } });
          handleOrderCompletion({
            orderId: id,
            checkoutId: order.stripeSessionId ?? null,
            userEmail: user?.email ?? "",
            plan: order.plan,
            orderAmount: order.amount,
            totalPredictions:
              order.predictionIds.length > 0
                ? order.predictionIds.filter(Boolean).length + order.failedPredictions
                : PHOTOS_PER_ORDER,
            failedPredictions: order.failedPredictions,
            errorMessages: order.errorMessages,
          }).catch((e: unknown) =>
            console.error("[OneTake] check-route refund handler failed:", e)
          );
          console.log(
            `[OneTake] Check route triggered refund for ${id}: ` +
              `${order.failedPredictions} failed`
          );
        }

        return NextResponse.json({
          status: allDone ? "completed" : order.status,
          updated: true,
          newlyCompleted,
          totalCompleted: completed,
        });
      } catch (error: unknown) {
        const code = (error as { code?: string })?.code;
        if (code === "P2025" && attempt < MAX_RETRIES - 1) {
          // Version conflict — another writer updated concurrently, retry
          await new Promise((r) => setTimeout(r, 30 + Math.random() * 80));
          continue;
        }
        throw error;
      }
    }

    // No new results
    return NextResponse.json({
      status: order.status,
      updated: false,
      newlyCompleted: 0,
      totalCompleted: completed,
    });
  }

  // Exhausted retries
  return NextResponse.json(
    { status: "error", updated: false, reason: "Retry exhausted" },
    { status: 409 }
  );
}
