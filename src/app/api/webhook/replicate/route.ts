import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PHOTOS_PER_ORDER } from "@/lib/constants";
import { handleOrderCompletion } from "@/lib/refund";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");
  const indexStr = searchParams.get("index");

  if (!orderId) return new NextResponse("Missing orderId", { status: 400 });

  let body: { id: string; status: string; output: unknown; error: unknown };
  try { body = await req.json(); } catch { return new NextResponse("Invalid JSON", { status: 400 }); }

  const slotIndex = indexStr ? parseInt(indexStr, 10) : -1;
  console.log(`[OneTake] Replicate webhook: order=${orderId} slot=${slotIndex} prediction=${body.id} status=${body.status}`);

  try {
    const order = await db.order.findUnique({ where: { id: orderId } });
    if (!order) return new NextResponse("Order not found", { status: 404 });
    if (order.status === "completed") return NextResponse.json({ received: true });

    if (body.status === "succeeded") {
      let outputUrl: string | null = null;
      if (typeof body.output === "string") outputUrl = body.output;
      else if (Array.isArray(body.output) && body.output.length > 0 && typeof body.output[0] === "string") outputUrl = body.output[0];

      const outputPhotos = [...order.outputPhotos];
      if (slotIndex >= 0 && slotIndex < PHOTOS_PER_ORDER) {
        while (outputPhotos.length <= slotIndex) outputPhotos.push("");
        outputPhotos[slotIndex] = outputUrl ?? "";
      } else if (outputUrl) { outputPhotos.push(outputUrl); }

      const completedCount = order.completedPredictions + 1;
      const allDone = completedCount >= order.predictionIds.filter(Boolean).length;

      await db.order.update({ where: { id: orderId }, data: { outputPhotos, completedPredictions: completedCount, status: allDone ? "completed" : "generating" } });
      console.log(`[OneTake] Order ${orderId}: ${completedCount}/${PHOTOS_PER_ORDER} completed (slot ${slotIndex})${allDone ? " - ALL DONE!" : ""}`);

      if (allDone && order.failedPredictions > 0) {
        const user = await db.user.findUnique({ where: { id: order.userId } });
        handleOrderCompletion({ orderId: order.id, paymentIntentId: order.stripePaymentIntentId ?? null, userEmail: user?.email ?? "", plan: order.plan, orderAmount: order.amount, totalPredictions: order.predictionIds.filter(Boolean).length, failedPredictions: order.failedPredictions, errorMessages: order.errorMessages }).catch(e => console.error("[OneTake] handleOrderCompletion failed:", e));
      }
    } else if (body.status === "failed") {
      const completedCount = order.completedPredictions + 1;
      const allDone = completedCount >= order.predictionIds.filter(Boolean).length;

      const outputPhotos = [...order.outputPhotos];
      if (slotIndex >= 0 && slotIndex < PHOTOS_PER_ORDER) {
        while (outputPhotos.length <= slotIndex) outputPhotos.push("");
        if (!outputPhotos[slotIndex]) outputPhotos[slotIndex] = "";
      }

      const errorMsg = typeof body.error === "string" ? body.error : JSON.stringify(body.error ?? "Unknown error");
      await db.order.update({ where: { id: orderId }, data: { outputPhotos, completedPredictions: completedCount, failedPredictions: { increment: 1 }, errorMessages: { push: errorMsg }, status: allDone ? "completed" : "generating" } });
      console.warn(`[OneTake] Order ${orderId}: prediction ${body.id} FAILED at slot ${slotIndex} - ${completedCount}/${PHOTOS_PER_ORDER}`);

      if (allDone) {
        const updatedOrder = await db.order.findUnique({ where: { id: orderId } });
        if (updatedOrder && updatedOrder.failedPredictions > 0) {
          const user = await db.user.findUnique({ where: { id: updatedOrder.userId } });
          handleOrderCompletion({ orderId: updatedOrder.id, paymentIntentId: updatedOrder.stripePaymentIntentId ?? null, userEmail: user?.email ?? "", plan: updatedOrder.plan, orderAmount: updatedOrder.amount, totalPredictions: updatedOrder.predictionIds.filter(Boolean).length, failedPredictions: updatedOrder.failedPredictions, errorMessages: updatedOrder.errorMessages }).catch(e => console.error("[OneTake] handleOrderCompletion failed:", e));
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[OneTake] Replicate webhook error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
