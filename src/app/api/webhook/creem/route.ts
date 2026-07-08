import { Webhook } from "@creem_io/nextjs";
import { db } from "@/lib/db";
import { startBatchGeneration } from "@/lib/replicate";

export const POST = Webhook({
  webhookSecret: process.env.CREEM_WEBHOOK_SECRET!,

  onCheckoutCompleted: async ({ product, customer, order, metadata }) => {
    const orderId = (metadata as Record<string, unknown> | null)
      ?.orderId as string | undefined;

    if (!orderId) {
      console.warn("[OneTake] Creem webhook: no orderId in metadata");
      return;
    }

    const checkoutId = order?.id as string | undefined;

    // 1. Mark order as paid
    const dbOrder = await db.order.update({
      where: { id: orderId },
      data: {
        status: "paid",
        stripeSessionId: checkoutId ?? undefined,
      },
    });

    console.log(
      `[OneTake] Creem webhook: order ${orderId} paid (checkout ${checkoutId})`
    );

    // 2. Trigger AI generation
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    if (dbOrder.inputPhotos.length > 0) {
      startBatchGeneration({
        photoUrls: dbOrder.inputPhotos,
        plan: dbOrder.plan as "starter" | "pro",
        style: dbOrder.stylePreference as "natural" | "balanced" | "polished",
        webhookBaseUrl: baseUrl,
        orderId: dbOrder.id,
        gender: (dbOrder.gender as "male" | "female") ?? "male",
        profession: dbOrder.profession ?? "general",
      })
        .then(async (batch) => {
          const validIds = batch.predictionIds.filter(Boolean);
          if (validIds.length > 0) {
            await db.order.update({
              where: { id: orderId },
              data: {
                status: "generating",
                predictionIds: batch.predictionIds,
                promptIds: batch.promptIds,
              },
            });
            console.log(
              `[OneTake] Order ${orderId}: ${validIds.length} predictions started`
            );
          } else {
            await db.order.update({
              where: { id: orderId },
              data: { status: "failed" },
            });
            console.error(`[OneTake] Order ${orderId}: No predictions created`);
          }
        })
        .catch(async (err) => {
          console.error(`[OneTake] Order ${orderId} generation failed:`, err);
          await db.order.update({
            where: { id: orderId },
            data: { status: "failed" },
          });
        });
    } else {
      console.warn(`[OneTake] Order ${orderId}: No input photos`);
    }
  },
});
