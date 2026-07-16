import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createCheckout, getPlanAmount } from "@/lib/creem";
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
      photoUrls,
      gender,
      profession,
      specificRole,
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

    // Get user email from Clerk for Creem checkout
    const clerkUser = await currentUser();
    const userEmail =
      clerkUser?.emailAddresses?.[0]?.emailAddress ?? `${userId}@onetake.local`;

    // Ensure user exists in DB
    const user = await ensureUser(userId);

    // Create pending order in database
    const order = await db.order.create({
      data: {
        userId: user.id,
        plan,
        stylePreference: stylePreference ?? "balanced",
        gender,
        profession,
        specificRole: specificRole && typeof specificRole === "string" && specificRole.trim()
          ? specificRole.trim()
          : null,
        amount: getPlanAmount(plan),
        status: "pending",
        inputPhotos: photoUrls ?? [],
      },
    });

    // Create Creem checkout session
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const checkout = await createCheckout({
      plan,
      orderId: order.id,
      userEmail,
      successUrl: `${baseUrl}/results/${order.id}`,
    });

    // Save Creem checkout ID to the order
    await db.order.update({
      where: { id: order.id },
      data: { stripeSessionId: checkout.id },
    });

    return NextResponse.json({ url: checkout.checkout_url });
  } catch (error) {
    console.error("[OneTake] Checkout error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
