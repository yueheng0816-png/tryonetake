import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getTemplateScoreboard, printScoreboard } from "@/lib/template-stats";

/**
 * GET /api/admin/template-stats
 *
 * Returns the template scoreboard — download rate, positive/negative
 * counts, and net score for every prompt template across all orders.
 *
 * Used for monthly template review and rotation decisions.
 *
 * In production, protect this with an admin role check.
 */
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // TODO: Add admin role check here for production
  // const { has } = await auth.protect();
  // if (!has({ role: "org:admin" })) { ... }

  const scores = await getTemplateScoreboard();

  // Also print to server console for log-based review
  await printScoreboard();

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    templateCount: scores.length,
    scores,
  });
}
