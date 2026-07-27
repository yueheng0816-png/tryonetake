import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { getPrediction } from "@/lib/replicate";

const ALLOWED_EMAILS = new Set(["yueheng0816@gmail.com"]);

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? "";
  if (!ALLOWED_EMAILS.has(email)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");
  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  // Fetch raw order from DB
  const order = await db.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      status: true,
      plan: true,
      gender: true,
      profession: true,
      predictionIds: true,
      promptIds: true,
      outputPhotos: true,
      completedPredictions: true,
      failedPredictions: true,
      errorMessages: true,
      createdAt: true,
      updatedAt: true,
      user: { select: { email: true } },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // Slot-by-slot analysis
  const slots = order.predictionIds.map((pid, i) => {
    const output = order.outputPhotos[i] ?? null;
    return {
      index: i,
      predictionId: pid || "(empty)",
      promptId: order.promptIds[i] || "(empty)",
      outputUrl: output
        ? output.length > 100
          ? output.slice(0, 80) + "..."
          : output
        : null,
      hasPrediction: !!pid,
      hasOutput: !!output,
      isBlob: output?.includes("public.blob.vercel-storage.com") ?? false,
    };
  });

  const emptySlots = slots.filter((s) => !s.hasOutput);
  const emptyPredictions = slots.filter((s) => s.hasPrediction && !s.hasOutput);

  // Poll Replicate for the first 3 empty prediction slots (to verify they're still alive)
  const liveChecks: { index: number; predictionId: string; status: string; error?: string }[] = [];
  for (const s of emptyPredictions.slice(0, 3)) {
    try {
      const p = await getPrediction(s.predictionId);
      liveChecks.push({
        index: s.index,
        predictionId: s.predictionId,
        status: p?.status ?? "not-found",
        error: p?.error ?? undefined,
      });
    } catch (e) {
      liveChecks.push({
        index: s.index,
        predictionId: s.predictionId,
        status: "error",
        error: String(e),
      });
    }
  }

  return NextResponse.json({
    summary: {
      totalSlots: order.predictionIds.length,
      validPredictionIds: order.predictionIds.filter(Boolean).length,
      emptyPredictionIds: order.predictionIds.filter((p) => !p).length,
      outputPhotos: order.outputPhotos.filter(Boolean).length,
      emptyOutputSlots: emptySlots.length,
      completedPredictions: order.completedPredictions,
      failedPredictions: order.failedPredictions,
      status: order.status,
      errorMessages: order.errorMessages,
      plan: order.plan,
      email: order.user?.email ?? "—",
    },
    emptySlots: emptySlots.map((s) => ({
      index: s.index,
      predictionId: s.predictionId,
      promptId: s.promptId,
    })),
    liveChecks,
    slots,
  });
}
