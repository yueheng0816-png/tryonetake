import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

/**
 * POST /api/orders/[id]/download
 *
 * Body: { indices: number[] } — which output indices the user downloaded.
 *
 * Records downloaded indices for feedback tracking.
 * Duplicate indices are deduplicated against what was already recorded.
 * Returns { recorded: number } — how many new indices were recorded.
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  let indices: number[];
  try {
    const body = await req.json();
    indices = body.indices ?? [];
    if (!Array.isArray(indices)) {
      return new NextResponse("Invalid indices", { status: 400 });
    }
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  // Fetch order and verify ownership
  const order = await db.order.findUnique({
    where: { id },
    select: { userId: true, downloadedIndices: true },
  });

  if (!order) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Verify ownership via Clerk userId → internal User.id
  const { ensureUser } = await import("@/lib/db");
  const user = await ensureUser(userId);
  if (order.userId !== user.id) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Deduplicate: merge new indices with existing, keep unique
  const existing = new Set(order.downloadedIndices);
  let newCount = 0;
  for (const idx of indices) {
    if (!existing.has(idx)) {
      existing.add(idx);
      newCount++;
    }
  }

  if (newCount > 0) {
    await db.order.update({
      where: { id },
      data: {
        downloadedIndices: Array.from(existing),
      },
    });
  }

  return NextResponse.json({ recorded: newCount });
}
