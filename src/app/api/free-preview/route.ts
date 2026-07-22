import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db, ensureUser } from "@/lib/db";
import { startFreePreview } from "@/lib/replicate";
import { FREE_PREVIEW_MAX_PER_USER } from "@/lib/constants";

/** Emails with unlimited free previews (testing / internal) */
const FREE_WHITELIST = new Set([
  "yueheng0816@gmail.com",
]);

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { photoUrls, gender, profession } = await req.json();

    if (!photoUrls || !Array.isArray(photoUrls) || photoUrls.length === 0) {
      return new NextResponse("At least 1 photo required", { status: 400 });
    }

    if (!gender || !["male", "female"].includes(gender)) {
      return new NextResponse("Invalid gender", { status: 400 });
    }

    if (!profession) {
      return new NextResponse("Missing profession", { status: 400 });
    }

    // ── Whitelist check ──
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? "";
    const isWhitelisted = FREE_WHITELIST.has(email);

    // ── Rate limit: 1 free preview per user (skipped for whitelist) ──
    const user = await ensureUser(userId);

    if (!isWhitelisted) {
      const existingFree = await db.order.count({
        where: {
          userId: user.id,
          plan: "free",
        },
      });

      if (existingFree >= FREE_PREVIEW_MAX_PER_USER) {
        return NextResponse.json(
          {
            error: "free_limit_reached",
            message:
              "You've already used your free preview. Upgrade to Starter or Pro for 30 full headshots.",
          },
          { status: 429 }
        );
      }
    }

    // ── Create order ──
    const order = await db.order.create({
      data: {
        userId: user.id,
        plan: "free",
        stylePreference: "natural",
        gender,
        profession,
        specificRole: null,
        amount: 0,
        status: "generating",
        inputPhotos: photoUrls,
        stripeSessionId: `free_${Date.now()}`, // placeholder — no payment provider
      },
    });

    // ── Start the single prediction ──
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const result = await startFreePreview({
      photoUrl: photoUrls[0],
      webhookBaseUrl: baseUrl,
      orderId: order.id,
      gender: gender as "male" | "female",
    });

    const predictionIds = result.predictionId ? [result.predictionId] : [""];
    const promptIds = result.predictionId ? [result.promptId] : [];

    await db.order.update({
      where: { id: order.id },
      data: {
        predictionIds,
        promptIds,
        ...(result.error
          ? {
              status: "failed",
              errorMessages: [result.error],
              failedPredictions: 1,
            }
          : {}),
      },
    });

    if (result.error) {
      return NextResponse.json(
        { error: result.error, orderId: order.id },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orderId: order.id,
      predictionId: result.predictionId,
    });
  } catch (error) {
    console.error("[OneTake] Free preview error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
