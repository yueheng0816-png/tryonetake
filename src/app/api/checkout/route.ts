import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { stripe, getPlanAmount } from "@/lib/stripe";
import { db, ensureUser } from "@/lib/db";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const {
      plan,
      stylePreference,
      photoCount,
      photoUrls,
      gender,
      profession,
    } = await req.json();

    if (!plan || !["starter", "pro"].includes(plan)) {
      return new NextResponse("Invalid plan", { status: 400 });
    }

    if (!gender || !["male", "female"].includes(gender)) {
      return new NextResponse("Invalid gender", { status: 400 });
    }

    if (!profession) {
      return new NextResponse("Missing profession", { status: 400 });
    }

    // Ensure user exists in DB (maps Clerk userId → internal User.id)
    const user = await ensureUser(userId);

    // Create pending order in database
    const order = await db.order.create({
      data: {
        userId: user.id, // Use internal User.id, not Clerk userId
        plan,
        stylePreference: stylePreference ?? "balanced",
        gender,
        profession,
        amount: getPlanAmount(plan),
        status: "pending",
        inputPhotos: photoUrls ?? [],
      },
    });

    // Create Stripe Checkout session
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "link"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: plan === "starter" ? "OneTake Starter" : "OneTake Pro",
              description:
                plan === "starter"
                  ? "30 professional headshots · FLUX.2 pro"
                  : "30 professional headshots · FLUX.2 max",
            },
            unit_amount: getPlanAmount(plan),
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId: order.id,
        userId,
        plan,
        stylePreference: stylePreference ?? "balanced",
        gender: gender ?? "male",
        profession: profession ?? "general",
      },
      success_url: `${baseUrl}/results/${order.id}`,
      cancel_url: `${baseUrl}/generate`,
    });

    // Save Stripe session ID to the order (needed for trigger verification)
    await db.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[OneTake] Checkout error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
