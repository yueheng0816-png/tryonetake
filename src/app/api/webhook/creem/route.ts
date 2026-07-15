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

    // ── Atomic claim: only one path (webhook or trigger) can win ──
    // Prevents duplicate generation if Creem retries the webhook
    // or if both webhook and trigger race to start the batch.
    const claim = await db.order.updateMany({
      where: { id: orderId, status: "pending" },
      data: {
        status: "paid",
        stripeSessionId: checkoutId ?? undefined,
      },
    });

    if (claim.count === 0) {
      console.log(
        `[OneTake] Creem webhook: order ${orderId} already claimed (status not pending), skipping`
      );
      return;
    }

    // Re-read after claiming to check for duplicate webhook delivery
    const dbOrder = await db.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        plan: true,
        stylePreference: true,
        inputPhotos: true,
        gender: true,
        profession: true,
        predictionIds: true,
      },
    });

    if (!dbOrder) {
      console.error(`[OneTake] Creem webhook: order ${orderId} not found after claim`);
      return;
    }

    // Belt-and-suspenders: don't start if predictions already exist
    if (dbOrder.predictionIds?.some(Boolean)) {
      console.log(
        `[OneTake] Creem webhook: order ${orderId} already has predictions, skipping`
      );
      return;
    }

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
