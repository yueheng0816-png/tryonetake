// ============================================================
// OneTake — AI Custom Prompt Generator
//
// When a user provides a free-text "specific role" (e.g.
// "3rd grade teacher", "airline pilot"), DeepSeek generates
// 5 custom headshot scene prompts tailored to that role.
//
// These custom prompts replace ~5 of the 30 standard slots,
// creating a personalized blend: 25 from profession weight
// matrix + 5 role-specific custom prompts.
// ============================================================

import type { PromptTemplate, PromptCategory } from "./prompts";

// ── Types ───────────────────────────────────────────────────

interface CustomPromptInput {
  /** Free-text role description from user, e.g. "3rd grade teacher" */
  specificRole: string;
  /** Profession category selected from dropdown */
  profession: string;
  /** Gender for outfit descriptions */
  gender: "male" | "female";
  /** How many custom prompts to generate (typically 5) */
  count?: number;
}

interface GeneratedPrompt {
  /** The complete img2img scene prompt */
  prompt: string;
  /** Which category this prompt best fits */
  category: PromptCategory;
  /** Expression: always "neutral" for safety */
  expression: "neutral";
}

// ── DeepSeek Client (lazy, OpenAI-compatible) ───────────────

let _deepseekClient: ReturnType<typeof import("openai").default.prototype> | null = null;

async function getDeepSeekClient() {
  if (!_deepseekClient) {
    const { default: OpenAI } = await import("openai");
    _deepseekClient = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: "https://api.deepseek.com",
    });
  }
  return _deepseekClient;
}

// ── System Prompt ──────────────────────────────────────────

const SYSTEM_PROMPT = `You are an expert AI headshot prompt engineer for the FLUX.2 image generation model.

Your job: generate professional headshot scene descriptions tailored to a specific job role.

## CRITICAL RULES — DO NOT VIOLATE:

1. **NO facial muscle movement**: Never describe smiles, laughs, grins, smirks, or any facial expression. Use "neutral expression", "composed demeanor", "professional presence", "warm presence" (NOT "smiling warmly", NOT "friendly smile"). Words to NEVER use: smile, smiling, laugh, laughing, grin, grinning, smirk, smirking, chuckle, beaming, teeth showing.

2. **Bright lighting only**: Every scene must use bright, even lighting. Use "bright even studio lighting", "natural daylight flooding through windows", "bright overcast daylight", "well-lit interior". NEVER use: dim, dark, moody, shadowy, low-light, dramatic shadows, candlelit, evening, nighttime.

3. **Gender-specific clothing**: You will receive a gender field. Describe appropriate professional clothing for that gender. Male: suit, blazer, dress shirt, tie, etc. Female: blouse, blazer, sheath dress, professional attire, etc. NEVER mix genders.

4. **NO age descriptors**: FLUX.2 tends to make people look older. Avoid ALL age-related words: mature, senior, young, youthful, middle-aged, veteran, experienced-looking, wise, weathered, seasoned, fresh-faced, in their 30s, etc. Focus on the ROLE, not the person's age.

## Output Format

Return a valid JSON array of exactly the requested number of prompt objects:

\`\`\`json
[
  {
    "prompt": "Complete scene description following all rules above",
    "category": "one of: studio_core, office, medical_env, legal_env, academic_env, education_env, lifestyle"
  }
]
\`\`\`

Each prompt must be a COMPLETE, self-contained scene: background + lighting + outfit + framing + camera angle + quality descriptors. One sentence, comma-separated. 80-150 words.

**Category selection guide:**
- studio_core: studio backdrops, portrait settings, neutral backgrounds
- office: corporate offices, meeting rooms, modern workspaces
- medical_env: hospitals, clinics, medical settings
- legal_env: law offices, courthouses, legal settings
- academic_env: university lecture halls, research labs, higher-ed settings
- education_env: K-12 classrooms, school hallways, educational settings
- lifestyle: outdoor, urban, café, or non-office environments

**Diversity across the set**: Each of the prompts should depict a DIFFERENT scene/environment. Don't generate 5 slight variations of the same setup.`;

// ── Main Export ────────────────────────────────────────────

/**
 * Generate custom headshot prompts tailored to a specific role.
 *
 * Uses DeepSeek (deepseek-chat) — ~¥1/1M input tokens.
 * Falls back to an empty array on any error — the caller should
 * gracefully degrade to 100% profession-based distribution.
 */
export async function generateCustomPrompts(
  input: CustomPromptInput
): Promise<PromptTemplate[]> {
  const { specificRole, profession, gender, count = 5 } = input;

  if (!process.env.DEEPSEEK_API_KEY) {
    console.warn(
      "[OneTake] DEEPSEEK_API_KEY not configured — skipping custom prompts"
    );
    return [];
  }

  const professionLabel = PROFESSION_LABELS_FOR_AI[profession] ?? profession;

  const userMessage = `Generate ${count} diverse professional headshot scene prompts for:

Role: ${specificRole}
Profession category: ${professionLabel}
Gender (for clothing): ${gender}

Make each prompt depict a different environment/scene appropriate for this role.`;

  try {
    const client = await getDeepSeekClient();

    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.8,
      max_tokens: 2000,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      console.warn("[OneTake] DeepSeek returned empty response");
      return [];
    }

    // Parse the JSON response
    let parsed: { prompts?: GeneratedPrompt[] } | GeneratedPrompt[];
    try {
      parsed = JSON.parse(content);
    } catch {
      console.warn("[OneTake] Failed to parse DeepSeek response:", content.slice(0, 200));
      return [];
    }

    // Handle both wrapped and unwrapped formats
    const promptArray: GeneratedPrompt[] = Array.isArray(parsed)
      ? parsed
      : parsed.prompts ?? [];

    if (promptArray.length === 0) {
      console.warn("[OneTake] DeepSeek returned empty prompts array");
      return [];
    }

    // Convert to PromptTemplate format
    const templates: PromptTemplate[] = promptArray
      .slice(0, count)
      .map((p, i) => ({
        id: `custom-${i + 1}`,
        prompt: sanitizePrompt(p.prompt),
        status: "active" as const,
        performance: "untested" as const,
        tags: ["custom", "ai-generated", profession, specificRole.replace(/\s+/g, "-").toLowerCase()],
        category: validateCategory(p.category),
        expression: "neutral" as const,
        // No outfitVariants — prompts are already gender-resolved by AI
      }));

    console.log(
      `[OneTake] DeepSeek generated ${templates.length} custom prompts for "${specificRole}"`
    );
    return templates;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[OneTake] DeepSeek custom prompt generation failed: ${message}`);
    return []; // Graceful fallback — caller uses 100% profession distribution
  }
}

// ── Helpers ────────────────────────────────────────────────

/** Profession enum → human-readable label for AI context */
const PROFESSION_LABELS_FOR_AI: Record<string, string> = {
  executive: "Executive & C-Suite",
  finance: "Finance & Accounting",
  legal: "Legal & Law",
  tech: "Technology & IT",
  medical: "Healthcare & Medical",
  consulting: "Consulting & Advisory",
  "real-estate": "Real Estate",
  creative: "Creative & Design",
  academia: "Higher Education & Research",
  education: "K-12 Education & Teaching",
  engineering: "Engineering & Technical",
  "public-service": "Government & Public Service",
  general: "General Professional",
};

/** Validate that a category string is a valid PromptCategory */
function validateCategory(cat: string): PromptCategory {
  const valid: PromptCategory[] = [
    "studio_core",
    "office",
    "medical_env",
    "legal_env",
    "academic_env",
    "education_env",
    "lifestyle",
  ];
  if (valid.includes(cat as PromptCategory)) return cat as PromptCategory;
  return "studio_core"; // Default fallback
}

/**
 * Sanitize a GPT-generated prompt to ensure it doesn't violate
 * the 4 rules. Strips known-problematic words and phrases.
 */
function sanitizePrompt(prompt: string): string {
  let cleaned = prompt;

  // Rule 1: Remove facial muscle movement descriptors
  const bannedExpressionWords = [
    /\bsmiling\b/gi,
    /\bsmile\b/gi,
    /\blaughing\b/gi,
    /\blaugh\b/gi,
    /\bgrinning\b/gi,
    /\bgrin\b/gi,
    /\bsmirking\b/gi,
    /\bsmirk\b/gi,
    /\bchuckling\b/gi,
    /\bbeaming\b/gi,
    /\bteeth showing\b/gi,
    /\bwide grin\b/gi,
    /\bbig smile\b/gi,
    /\bbright smile\b/gi,
    /\bwarm smile\b/gi,
    /\bfriendly smile\b/gi,
  ];
  for (const pattern of bannedExpressionWords) {
    cleaned = cleaned.replace(pattern, "");
  }

  // Rule 4: Remove age-related descriptors
  const bannedAgeWords = [
    /\bmature\b/gi,
    /\bsenior\b/gi,
    /\byoung\b/gi,
    /\byouthful\b/gi,
    /\bmiddle-aged\b/gi,
    /\bveteran\b/gi,
    /\bexperienced-looking\b/gi,
    /\bwise\b/gi,
    /\bweathered\b/gi,
    /\bseasoned\b/gi,
    /\bin their \d+s\b/gi,
    /\bin his \d+s\b/gi,
    /\bin her \d+s\b/gi,
  ];
  for (const pattern of bannedAgeWords) {
    cleaned = cleaned.replace(pattern, "");
  }

  // Clean up double commas, double spaces, trailing commas
  cleaned = cleaned.replace(/, ,/g, ",").replace(/\s{2,}/g, " ").replace(/,\s*$/g, "").trim();

  return cleaned;
}
