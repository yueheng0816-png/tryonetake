import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db, ensureUser } from "@/lib/db";
import { createPrediction } from "@/lib/replicate";
import {
  distributePromptsV3,
  type Gender,
  type Profession,
} from "@/lib/prompts";

/** Only these emails can use the showcase generator */
const ALLOWED_EMAILS = new Set([
  "yueheng0816@gmail.com",
]);

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // ── Access control ──
  const { currentUser } = await import("@clerk/nextjs/server");
  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? "";
  if (!ALLOWED_EMAILS.has(email)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // ── Parse body ──
  const { photoUrl, profession, gender, count } = await req.json();

  if (!photoUrl || typeof photoUrl !== "string") {
    return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
  }
  if (!gender || !["male", "female"].includes(gender)) {
    return NextResponse.json({ error: "Invalid gender" }, { status: 400 });
  }
  if (!count || typeof count !== "number" || count < 1 || count > 30) {
    return NextResponse.json(
      { error: "count must be 1-30" },
      { status: 400 }
    );
  }

  const validProfessions: Profession[] = [
    "executive", "finance", "legal", "tech", "medical",
    "consulting", "real-estate", "creative", "academia",
    "education", "engineering", "public-service", "general",
  ];
  const prof: Profession = validProfessions.includes(profession as Profession)
    ? (profession as Profession)
    : "general";

  // ── Get or create user ──
  const user = await ensureUser(userId, email);

  // ── Create Order record (so it appears in orders dashboard) ──
  const order = await db.order.create({
    data: {
      userId: user.id,
      plan: "starter",
      profession: prof,
      gender: gender as "male" | "female",
      inputPhotos: [photoUrl],
      status: "generating",
      amount: 0, // internal showcase — no payment
    },
  });

  console.log(
    `[Showcase] Order ${order.id}: generating ${count} headshots — ` +
      `profession=${prof} gender=${gender}`
  );

  // ── Generate prompts ──
  const assignments = distributePromptsV3(
    1,
    "starter",
    gender as Gender,
    prof,
    undefined, // no expression data
    undefined  // no custom prompts
  ).slice(0, count);

  // ── Build webhook URL for auto-sync ──
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const webhookUrl = `${baseUrl}/api/webhook/replicate?orderId=${order.id}`;

  // ── Create predictions ──
  const predictionIds: string[] = [];
  const promptIds: string[] = [];
  const errors: string[] = [];

  for (let i = 0; i < assignments.length; i++) {
    const a = assignments[i];
    const result = await createPrediction({
      photoUrl,
      prompt: a.prompt,
      plan: "starter",
      webhookUrl: `${webhookUrl}&index=${i}`,
    });

    if ("prediction" in result) {
      predictionIds.push(result.prediction.id);
      promptIds.push(a.promptId);
      console.log(
        `[Showcase] Slot ${i + 1}/${assignments.length}: ${result.prediction.id} ← ${a.promptId}`
      );
    } else {
      predictionIds.push(""); // failed slot
      promptIds.push(a.promptId);
      errors.push(`Slot ${i}: ${result.error}`);
      console.error(
        `[Showcase] Slot ${i + 1}/${assignments.length} FAILED: ${result.error}`
      );
    }
  }

  // ── Store prediction IDs in order ──
  await db.order.update({
    where: { id: order.id },
    data: { predictionIds, promptIds },
  });

  const succeeded = predictionIds.filter(Boolean).length;
  console.log(
    `[Showcase] Order ${order.id}: ${succeeded}/${assignments.length} predictions created`
  );

  return NextResponse.json({
    orderId: order.id,
    count: assignments.length,
    succeeded,
    errors: errors.length > 0 ? errors : undefined,
  });
}
