// ============================================================
// OneTake — Template Feedback Scoring
//
// Closed loop: prompt → generate → download (or skip)
//
//   downloaded → positiveCount +1
//   skipped    → skipCount +1
//
// Scoring formula (per template):
//   netScore     = positiveCount - skipCount
//   downloadRate = positiveCount / totalCount   (0–100%)
//
//   totalCount = positiveCount + skipCount
//
// Interpretation:
//   - high downloadRate + high totalCount → proven template, keep
//   - low downloadRate + enough data → candidate for replacement
//   - low totalCount → need more data before deciding
//
// Monthly review: run getTemplateScoreboard() →
//   deprecate templates below threshold
//   activate new experimental templates
// ============================================================

import { db } from "./db";
import { getAllTemplates, getTemplateStats } from "./prompts";

export interface TemplateScore {
  promptId: string;
  prompt: string;
  status: string;
  /** Times users downloaded an image from this template */
  positiveCount: number;
  /** Times users saw but did NOT download */
  skipCount: number;
  /** Total images generated with this template */
  totalCount: number;
  /** Download rate: positiveCount / totalCount, 0–1 */
  downloadRate: number;
  /** Net score: positiveCount - skipCount (positive = good) */
  netScore: number;
}

/**
 * Aggregate template scores across ALL completed orders.
 *
 * For each completed order:
 *   - promptIds[i] tells us which template was used for slot i
 *   - downloadedIndices tells us which slots the user downloaded
 *   - skip slots = all generated slots - downloaded slots
 *
 * Only counts templates whose image was actually generated
 * (outputPhotos[i] is non-empty).
 */
export async function getTemplateScoreboard(): Promise<TemplateScore[]> {
  const orders = await db.order.findMany({
    where: { status: "completed" },
    select: {
      promptIds: true,
      outputPhotos: true,
      downloadedIndices: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Aggregate: promptId → { downloaded, skipped }
  const counts = new Map<
    string,
    { downloaded: number; skipped: number }
  >();

  for (const order of orders) {
    const downloadedSet = new Set(order.downloadedIndices);

    for (let i = 0; i < order.promptIds.length; i++) {
      const promptId = order.promptIds[i];
      if (!promptId) continue;

      // Only count if an image was actually generated
      const outputUrl = order.outputPhotos[i];
      if (!outputUrl) continue;

      if (!counts.has(promptId)) {
        counts.set(promptId, { downloaded: 0, skipped: 0 });
      }

      const entry = counts.get(promptId)!;
      if (downloadedSet.has(i)) {
        entry.downloaded++;
      } else {
        entry.skipped++;
      }
    }
  }

  // Build scoreboard, merging with template metadata
  const allTemplates = getAllTemplates();
  const templateMap = new Map(allTemplates.map((t) => [t.id, t]));

  const scores: TemplateScore[] = [];

  for (const [promptId, count] of counts) {
    const template = templateMap.get(promptId);
    const total = count.downloaded + count.skipped;

    scores.push({
      promptId,
      prompt: template?.prompt ?? "(deleted template)",
      status: template?.status ?? "unknown",
      positiveCount: count.downloaded,
      skipCount: count.skipped,
      totalCount: total,
      downloadRate: total > 0 ? count.downloaded / total : 0,
      netScore: count.downloaded - count.skipped,
    });
  }

  // Sort by download rate descending (best first)
  scores.sort((a, b) => b.downloadRate - a.downloadRate);

  return scores;
}

/**
 * Print a human-readable scoreboard to the server console.
 * Called by GET /api/admin/template-stats for monthly review.
 */
export async function printScoreboard(): Promise<void> {
  const scores = await getTemplateScoreboard();
  const threshold = 0.15; // Below 15% download rate → candidate for removal

  console.log("\n============================================");
  console.log("OneTake — Template Performance Scoreboard");
  console.log("============================================\n");

  // Top performers
  console.log("🏆 TOP PERFORMERS (download rate >= 50%):");
  const top = scores.filter((s) => s.downloadRate >= 0.5);
  if (top.length === 0) {
    console.log("  (none yet — need more data)\n");
  } else {
    for (const s of top.slice(0, 10)) {
      console.log(
        `  ${s.promptId.padEnd(30)} ${(s.downloadRate * 100).toFixed(0)}% ` +
          `(downloaded:${s.positiveCount}  skipped:${s.skipCount}  total:${s.totalCount})`
      );
    }
    console.log("");
  }

  // At-risk templates
  console.log(
    `⚠️  AT RISK (download rate < ${(threshold * 100).toFixed(0)}%, min 5 samples):`
  );
  const atRisk = scores.filter(
    (s) => s.downloadRate < threshold && s.totalCount >= 5
  );
  if (atRisk.length === 0) {
    console.log("  (none)\n");
  } else {
    for (const s of atRisk) {
      console.log(
        `  ${s.promptId.padEnd(30)} ${(s.downloadRate * 100).toFixed(0)}% ` +
          `(downloaded:${s.positiveCount}  skipped:${s.skipCount}  total:${s.totalCount}) ← remove candidate`
      );
    }
    console.log("");
  }

  // Untested
  console.log("🆕 UNTESTED (0 orders completed for this template):");
  const poolStats = getTemplateStats();
  if (poolStats.byPerformance.untested > 0) {
    console.log(
      `  ${poolStats.byPerformance.untested} templates pending first data\n`
    );
  } else {
    console.log("  (none — all templates have data)\n");
  }

  // Pool health
  console.log("📊 POOL HEALTH:");
  console.log(
    `  Active: ${poolStats.active} | Experimental: ${poolStats.experimental} | Deprecated: ${poolStats.deprecated}`
  );
  console.log(
    `  Good: ${poolStats.byPerformance.good} | Mixed: ${poolStats.byPerformance.mixed} | Poor: ${poolStats.byPerformance.poor} | Untested: ${poolStats.byPerformance.untested}`
  );
  console.log("\n============================================\n");
}

/**
 * Get the score for a specific template (by promptId).
 */
export async function getTemplateScore(
  promptId: string
): Promise<TemplateScore | null> {
  const scores = await getTemplateScoreboard();
  return scores.find((s) => s.promptId === promptId) ?? null;
}
