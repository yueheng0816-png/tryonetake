import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db, ensureUser } from "@/lib/db";
import { startBatchGeneration } from "@/lib/replicate";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  const order = await db.order.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      status: true,
      plan: true,
      amount: true,
      stylePreference: true,
      inputPhotos: true,
      stripeSessionId: true,
      predictionIds: true,
      gender: true,
      profession: true,
    },
  });

  if (!order) {
    return new NextResponse("Not found", { status: 404 });
  }

  const user = await ensureUser(userId);
  if (order.userId !== user.id) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Already past pending — nothing to do
  if (order.status !== "pending") {
    return NextResponse.json({
      status: order.status,
      triggered: false,
      alreadyTriggered: true,
    });
  }

  // Already has prediction IDs (duplicate trigger) — skip
  if (order.predictionIds?.some(Boolean)) {
    return NextResponse.json({
      status: order.status,
      triggered: false,
      alreadyTriggered: true,
    });
  }

  // Creem redirects to success_url only after payment — assume paid
  if (!order.stripeSessionId) {
    return NextResponse.json({
      status: "pending",
      triggered: false,
      reason: "No checkout session found",
    });
  }

  try {
    // Mark as paid (Creem webhook may have done this already, idempotent)
    await db.order.update({
      where: { id },
      data: { status: "paid" },
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    // Fire & forget — don't await, let it run in background
    startBatchGeneration({
      photoUrls: order.inputPhotos,
      plan: order.plan as "starter" | "pro",
      style: (order.stylePreference as "natural" | "balanced" | "polished") ?? "balanced",
      webhookBaseUrl: baseUrl,
      orderId: order.id,
      gender: (order.gender as "male" | "female") ?? "male",
      profession: order.profession ?? "general",
    })
      .then(async (batch) => {
        const validIds = batch.predictionIds.filter(Boolean);
        const failedCount = batch.predictionIds.length - validIds.length;

        // ── All predictions failed — fail fast ─────────────────
        if (validIds.length === 0) {
          await db.order.update({
            where: { id },
            data: {
              status: "failed",
              predictionIds: batch.predictionIds,
              promptIds: batch.promptIds,
              failedPredictions: failedCount,
              errorMessages: batch.errors,
            },
          });

          const { handleOrderCompletion: hoc } = await import("@/lib/refund");
          const user = await db.user.findUnique({ where: { id: order.userId } });
          await hoc({
            orderId: id,
            checkoutId: order.stripeSessionId ?? null,
            userEmail: user?.email ?? "",
            plan: order.plan,
            orderAmount: order.amount,
            totalPredictions: batch.predictionIds.length,
            failedPredictions: failedCount,
            errorMessages: batch.errors,
          });
          console.log(
            `[OneTake] All ${failedCount} predictions failed for ${id} — refund triggered`
          );
          return;
        }

        // ── Partial failure: save failedPredictions + errors ──
        // so the webhook handler (or check polling) can trigger
        // a proportional refund when allDone.
        await db.order.update({
          where: { id },
          data: {
            status: "generating",
            predictionIds: batch.predictionIds,
            promptIds: batch.promptIds,
            ...(failedCount > 0
              ? {
                  failedPredictions: failedCount,
                  errorMessages: batch.errors,
                }
              : {}),
          },
        });

        console.log(
          `[OneTake] Background generation complete for ${id}: ${validIds.length} created` +
            (failedCount > 0 ? `, ${failedCount} failed` : "")
        );

        // ── Race-condition defense ─────────────────────────────
        // Webhooks may have already completed all predictions
        // BEFORE this .then() callback wrote failedPredictions.
        // In that case the webhook handler would have seen
        // failedPredictions=0 and skipped the refund.
        //
        // Re-read the order now; if it's already "completed",
        // manually invoke the refund handler.
        if (failedCount > 0) {
          const current = await db.order.findUnique({
            where: { id },
            select: { status: true, completedPredictions: true, userId: true },
          });
          if (current?.status === "completed") {
            const { handleOrderCompletion: hoc } = await import("@/lib/refund");
            const user = await db.user.findUnique({ where: { id: current.userId } });
            await hoc({
              orderId: id,
              checkoutId: order.stripeSessionId ?? null,
              userEmail: user?.email ?? "",
              plan: order.plan,
              orderAmount: order.amount,
              totalPredictions: batch.predictionIds.length,
              failedPredictions: failedCount,
              errorMessages: batch.errors,
            });
            console.log(
              `[OneTake] Catch-up refund for ${id}: ${failedCount} failed, order already completed`
            );
          }
        }
      })
      .catch(async (error) => {
        console.error(`[OneTake] Background generation crashed for ${id}:`, error);
        await db.order.update({
          where: { id },
          data: { status: "failed" },
        });
      });

    return NextResponse.json({
      status: "paid",
      triggered: true,
      message: "Generation started in background",
    });
  } catch (error) {
    console.error("[OneTake] Trigger generation failed:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { status: order.status, triggered: false, reason: message },
      { status: 500 }
    );
  }
}
