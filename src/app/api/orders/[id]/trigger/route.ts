import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db, ensureUser } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { startBatchGeneration } from "@/lib/replicate";

/**
 * POST /api/orders/[id]/trigger
 *
 * Fallback for local dev without Stripe webhooks.
 *
 * 1. Checks if the Stripe Checkout session is paid
 * 2. If paid and order is still "pending", marks it "paid"
 * 3. Starts AI generation in the background (no await — fire & forget)
 * 4. Returns immediately so the frontend can start showing skeletons
 *
 * Generation runs async and updates the order when predictions are created.
 * The check endpoint picks them up on the next poll cycle.
 *
 * Idempotent — safe to call multiple times.
 */
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

  // Verify payment with Stripe
  if (!order.stripeSessionId) {
    return NextResponse.json({
      status: "pending",
      triggered: false,
      reason: "No Stripe session found",
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(
      order.stripeSessionId
    );

    if (session.payment_status !== "paid") {
      return NextResponse.json({
        status: "pending",
        triggered: false,
        reason: "Payment not completed yet",
      });
    }

    // Payment confirmed — mark as paid + save paymentIntentId for refunds
    const paymentIntentId = typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent as unknown as { id?: string } | null)?.id;
    await db.order.update({
      where: { id },
      data: { status: "paid", stripePaymentIntentId: paymentIntentId ?? undefined },
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
        const newStatus = validIds.length > 0 ? "generating" : "paid";

        await db.order.update({
          where: { id },
          data: {
            status: newStatus,
            predictionIds: batch.predictionIds,
            promptIds: batch.promptIds,
          },
        });

        const succeeded = validIds.length;
        console.log(
          `[OneTake] Background generation complete for ${id}: ${succeeded} predictions created`
        );
        if (batch.errors.length > 0) {
          console.error(
            `[OneTake] ${batch.errors.length} prediction errors for ${id}:`,
            batch.errors.slice(0, 3)
          );
        }
      })
      .catch(async (error) => {
        console.error(`[OneTake] Background generation crashed for ${id}:`, error);
        // Mark as failed so user can retry
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
