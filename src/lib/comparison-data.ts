/**
 * Competitor comparison page content.
 * Each entry powers a /vs/[slug] page.
 *
 * SEO strategy: target "[competitor] alternative" keywords.
 * These are high-intent — someone actively looking to switch.
 */

export interface ComparisonData {
  slug: string;
  /** Competitor name (used as "OneTake vs {competitor}") */
  competitor: string;
  /** Page title */
  title: string;
  /** Meta description */
  description: string;
  keywords: string[];
  /** Why OneTake wins — shown as feature checkmarks vs competitor */
  advantages: { feature: string; oneTake: string; competitor: string }[];
  /** Summary paragraph — why OneTake is the better choice */
  summaryHeading: string;
  summary: string;
}

export const comparisons: ComparisonData[] = [
  {
    slug: "headshotpro",
    competitor: "HeadshotPro",
    title: "OneTake vs HeadshotPro — A Better AI Headshot Generator",
    description:
      "OneTake vs HeadshotPro comparison: better identity preservation, faster generation, and lower price. Get 30 headshots for $19 instead of $24. See the difference side by side.",
    keywords: [
      "HeadshotPro alternative",
      "OneTake vs HeadshotPro",
      "HeadshotPro competitor",
      "best headshotpro alternative",
      "AI headshot generator comparison",
    ],
    advantages: [
      {
        feature: "Price per 30 headshots",
        oneTake: "$19",
        competitor: "$24+",
      },
      {
        feature: "Base model",
        oneTake: "FLUX.2 pro / max",
        competitor: "FLUX.1",
      },
      {
        feature: "Generation speed",
        oneTake: "Under 5 minutes",
        competitor: "10–30 minutes",
      },
      {
        feature: "Photo requirement",
        oneTake: "1 photo minimum",
        competitor: "6–12 photos required",
      },
      {
        feature: "Identity preservation",
        oneTake: "Optimized — actually looks like you",
        competitor: "Good, but can smooth features",
      },
      {
        feature: "Refund policy",
        oneTake: "Auto refund if generation fails",
        competitor: "Case-by-case",
      },
    ],
    summaryHeading: "OneTake delivers better results for less",
    summary:
      "HeadshotPro is a solid product, but OneTake gives you a more advanced AI model (FLUX.2 vs FLUX.1), faster generation, and works with just 1 photo instead of 6+. At $19 vs $24+, the value is clear. Plus our identity preservation tech means your headshots actually look like you — not a smoothed-over version.",
  },
  {
    slug: "aragon-ai",
    competitor: "Aragon AI",
    title: "OneTake vs Aragon AI — More Realistic, Less Expensive Headshots",
    description:
      "Compare OneTake vs Aragon AI for AI headshots. OneTake uses FLUX.2 for more realistic results, starts at $19 (vs $29), and delivers in under 5 minutes. See the comparison.",
    keywords: [
      "Aragon AI alternative",
      "OneTake vs Aragon AI",
      "Aragon AI competitor",
      "Aragon AI vs OneTake headshots",
      "Aragon AI alternative reddit",
    ],
    advantages: [
      {
        feature: "Starting price",
        oneTake: "$19 (30 headshots)",
        competitor: "$29+ (40 headshots)",
      },
      {
        feature: "AI model",
        oneTake: "FLUX.2 pro / max",
        competitor: "Undisclosed / proprietary",
      },
      {
        feature: "Generation speed",
        oneTake: "Under 5 minutes",
        competitor: "60–90 minutes",
      },
      {
        feature: "Photo requirement",
        oneTake: "1 photo minimum",
        competitor: "8–12 photos required",
      },
      {
        feature: "Style variety",
        oneTake: "10–25 styles, outfit changes",
        competitor: "Limited outfit variety",
      },
      {
        feature: "Refund policy",
        oneTake: "Auto refund if generation fails",
        competitor: "Refunds on request",
      },
    ],
    summaryHeading: "Faster, cheaper, more realistic — OneTake wins",
    summary:
      "Aragon AI charges more ($29+) for slower results (60–90 min wait) that require 8+ photos. OneTake delivers 30 headshots for $19 using the latest FLUX.2 model — and you only need 1 photo. Plus our explicit identity preservation focus means your results won't have that generic AI look.",
  },
  {
    slug: "traditional-photography",
    competitor: "Traditional Photography",
    title: "AI Headshots vs Traditional Photography — 2026 Comparison",
    description:
      "AI headshots vs traditional photography: cost comparison ($19 vs $200-$500+), speed (5 min vs 1-2 weeks), and quality. See why professionals are switching to AI for headshots.",
    keywords: [
      "AI headshots vs photographer",
      "AI vs traditional headshots",
      "are AI headshots worth it",
      "professional headshot cost comparison",
      "AI headshot vs professional photographer 2026",
    ],
    advantages: [
      {
        feature: "Cost",
        oneTake: "$19 one-time",
        competitor: "$200–$500+ per session",
      },
      {
        feature: "Turnaround",
        oneTake: "Under 5 minutes",
        competitor: "1–2 weeks (shoot + editing)",
      },
      {
        feature: "Variety",
        oneTake: "30 variations, multiple outfits",
        competitor: "1–3 final images, 1 outfit",
      },
      {
        feature: "Schedule",
        oneTake: "Anytime, 24/7 from your phone",
        competitor: "Book weeks ahead, commute, shoot",
      },
      {
        feature: "Retakes",
        oneTake: "Instant — just upload a new photo",
        competitor: "Re-book, re-pay, re-shoot",
      },
      {
        feature: "Consistency (teams)",
        oneTake: "Identical quality across all staff",
        competitor: "Varies by session, lighting, location",
      },
    ],
    summaryHeading: "The math is clear — AI wins for headshots in 2026",
    summary:
      "Traditional headshot photography still has its place — but for 95% of professional needs (LinkedIn, company websites, business cards, email signatures), AI headshots from OneTake deliver equal or better quality at 1/20th the cost and 1/1000th the time. The FLUX.2 model produces results that even professional photographers can't distinguish from studio shots.",
  },
];

export function getComparison(slug: string): ComparisonData | undefined {
  return comparisons.find((c) => c.slug === slug);
}
