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

/**
 * POST /api/internal/debug-order
 *
 * Admin actions for debugging/fixing orders.
 *
 * Actions:
 *   { orderId, action: "fixBlobUrls" }
 *     — Reconstructs Vercel Blob URLs for slots that still have
 *       Replicate CDN URLs in the DB. Uses an existing Blob URL
 *       from the same order to extract the store ID, then generates
 *       deterministic URLs for each slot.
 *
 *     Use this when: transferToBlob succeeded (files exist in Blob)
 *     but the webhook's DB update failed (optimistic-lock exhaustion),
 *     leaving stale expiring CDN URLs in the outputPhotos column.
 */
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? "";
  if (!ALLOWED_EMAILS.has(email)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  let body: { orderId?: string; action?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { orderId, action } = body;
  if (!orderId || !action) {
    return NextResponse.json({ error: "Missing orderId or action" }, { status: 400 });
  }

  if (action === "fixBlobUrls") {
    const order = await db.order.findUnique({
      where: { id: orderId },
      select: { id: true, outputPhotos: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Extract store ID from any existing Blob URL in this order.
    // Format: https://<storeId>.public.blob.vercel-storage.com/outputs/<orderId>/<index>.jpg
    const existingBlob = order.outputPhotos.find(
      (url: string) => url && url.includes("public.blob.vercel-storage.com")
    );
    if (!existingBlob) {
      return NextResponse.json(
        { error: "No Blob URL found in this order — cannot reconstruct pattern" },
        { status: 400 }
      );
    }

    // Extract base: everything up to and including the order ID folder
    const baseMatch = existingBlob.match(/^(.+\/outputs\/[^/]+\/)/);
    if (!baseMatch) {
      return NextResponse.json(
        { error: "Failed to parse Blob URL pattern" },
        { status: 500 }
      );
    }
    const base = baseMatch[1];

    const fixed = [...order.outputPhotos];
    let fixCount = 0;
    const fixes: { index: number; before: string; after: string }[] = [];

    for (let i = 0; i < fixed.length; i++) {
      const url = fixed[i];
      if (url && !url.includes("public.blob.vercel-storage.com")) {
        const blobUrl = `${base}${i}.jpg`;
        fixes.push({ index: i, before: url.slice(0, 60) + "...", after: blobUrl });
        fixed[i] = blobUrl;
        fixCount++;
      }
    }

    if (fixCount === 0) {
      return NextResponse.json({ message: "All URLs are already Blob URLs", fixed: 0 });
    }

    await db.order.update({
      where: { id: orderId },
      data: { outputPhotos: fixed },
    });

    console.log(
      `[OneTake] fixBlobUrls: order ${orderId} — ${fixCount} URLs repaired`
    );

    return NextResponse.json({
      message: `Fixed ${fixCount}/${order.outputPhotos.length} URLs`,
      fixed: fixCount,
      total: order.outputPhotos.length,
      fixes,
    });
  }

  return NextResponse.json(
    { error: `Unknown action: ${action}` },
    { status: 400 }
  );
}
