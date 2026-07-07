import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { startBatchGeneration } from "@/lib/replicate";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new NextResponse("Webhook signature verification failed", {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { orderId } = session.metadata ?? {};

    if (orderId) {
      // 1. Mark order as paid + save paymentIntentId for potential refunds
      const paymentIntentId = typeof session.payment_intent === "string"
        ? session.payment_intent
        : (session.payment_intent as unknown as { id?: string } | null)?.id;
      const order = await db.order.update({
        where: { id: orderId },
        data: {
          status: "paid",
          stripeSessionId: session.id,
          stripePaymentIntentId: paymentIntentId ?? undefined,
        },
      });

      // 2. Trigger AI generation (fire-and-forget)
      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

      if (order.inputPhotos.length > 0) {
        startBatchGeneration({
          photoUrls: order.inputPhotos,
          plan: order.plan as "starter" | "pro",
          style: order.stylePreference as
            | "natural"
            | "balanced"
            | "polished",
          webhookBaseUrl: baseUrl,
          orderId: order.id,
          gender: (order.gender as "male" | "female") ?? "male",
          profession: order.profession ?? "general",
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
              console.error(
                `[OneTake] Order ${orderId}: No predictions created`
              );
            }
          })
          .catch(async (err) => {
            console.error(
              `[OneTake] Order ${orderId} generation failed:`,
              err
            );
            await db.order.update({
              where: { id: orderId },
              data: { status: "failed" },
            });
          });
      } else {
        console.warn(
          `[OneTake] Order ${orderId}: No input photos to generate from`
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
