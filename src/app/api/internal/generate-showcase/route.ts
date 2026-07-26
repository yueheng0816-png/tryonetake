import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  distributePromptsV3,
  type Gender,
  type Profession,
} from "@/lib/prompts";
import { createPrediction } from "@/lib/replicate";

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

  // ── Generate prompts ──
  const assignments = distributePromptsV3(
    1,               // single photo
    "starter",       // FLUX.2 pro (good enough for showcase)
    gender as Gender,
    prof,
    undefined,       // no expression data
    undefined        // no custom prompts
  );

  // Take only `count` prompts
  const selected = assignments.slice(0, count);

  console.log(
    `[Showcase] Generating ${count} headshots: profession=${prof} gender=${gender}`
  );

  // ── Create predictions in parallel ──
  const results = await Promise.allSettled(
    selected.map((a) =>
      createPrediction({
        photoUrl,
        prompt: a.prompt,
        plan: "starter",
      })
    )
  );

  const predictionIds: string[] = [];
  const errors: string[] = [];

  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      if ("prediction" in r.value) {
        predictionIds.push(r.value.prediction.id);
      } else {
        errors.push(`Prompt ${i}: ${r.value.error}`);
      }
    } else {
      errors.push(`Prompt ${i}: ${String(r.reason)}`);
    }
  });

  return NextResponse.json({
    predictionIds,
    prompts: selected.map((a) => a.prompt),
    errors: errors.length > 0 ? errors : undefined,
    profession: prof,
    count: selected.length,
  });
}
