import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db, ensureUser } from "@/lib/db";

export async function GET(
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
      amount: true,
      outputPhotos: true,
      inputPhotos: true,
      completedPredictions: true,
      failedPredictions: true,
      predictionIds: true,
      refundedAmount: true,
      refundStatus: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!order) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Verify ownership: order.userId references User.id (cuid), not clerkId
  const user = await ensureUser(userId);
  if (order.userId !== user.id) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Don't expose internal userId to client
  const { userId: _, ...safeOrder } = order;

  // Diagnostic: log outputPhotos health
  const totalSlots = order.predictionIds.length;
  const validOutputs = order.outputPhotos.filter(Boolean).length;
  const validPredictions = order.predictionIds.filter(Boolean).length;
  console.log(
    `[OneTake] GET order ${id}: status=${order.status} ` +
      `completed=${order.completedPredictions} ` +
      `predictionIds=${totalSlots}(${validPredictions} valid) ` +
      `outputPhotos=${order.outputPhotos.length}(${validOutputs} valid) ` +
      `failed=${order.failedPredictions}`
  );

  return NextResponse.json(safeOrder);
}
