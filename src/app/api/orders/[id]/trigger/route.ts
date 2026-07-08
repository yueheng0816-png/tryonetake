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
