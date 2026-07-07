// ============================================================
// OneTake — Prompt Template Library v3
//
// v3 changes from v2:
//  – Profession-aware distribution via category weight matrix
//  – Gender-aware outfit descriptions ({outfit} placeholder)
//  – Tiered architecture: Studio Core > Prof Environment > Lifestyle
//  – Risky templates (big laugh, big movement) demoted to experimental
//  – 22 new studio-heavy, profession-specific templates
//
// Design principles:
//  1. Every template is a COMPLETE scene — expression + background
//     + outfit + pose + lighting all in one prompt.
//  2. Templates are categorized for profession-based allocation.
//  3. {outfit} placeholder enables gender-specific clothing without
//     duplicating templates.
//  4. Performance metadata enables continuous improvement.
// ============================================================

export type TemplateStatus = "active" | "experimental" | "deprecated";
export type TemplatePerformance = "untested" | "good" | "mixed" | "poor";

/** Which tier/category a template belongs to — drives profession allocation */
export type PromptCategory =
  | "studio_core"
  | "office"
  | "medical_env"
  | "legal_env"
  | "academic_env"
  | "lifestyle";

/** Gender for outfit description resolution */
export type Gender = "male" | "female";

/** 10 US-market profession categories */
export type Profession =
  | "executive"
  | "finance"
  | "legal"
  | "tech"
  | "medical"
  | "consulting"
  | "real-estate"
  | "creative"
  | "academia"
  | "general";

export interface PromptTemplate {
  /** Unique identifier — used for tracking across orders */
  id: string;
  /** The complete img2img prompt. Use {outfit} for gender-aware substitution. */
  prompt: string;
  /** Whether this template is in active rotation */
  status: TemplateStatus;
  /** How well this template performs in practice */
  performance: TemplatePerformance;
  /** Free-form tags for filtering */
  tags: string[];
  /** Category for profession-based allocation */
  category: PromptCategory;
  /**
   * Optional gendered outfit descriptions.
   * If set and prompt contains {outfit}, it will be replaced
   * with the gender-appropriate variant at distribution time.
   */
  outfitVariants?: { male: string; female: string };
}

// ============================================================
// Profession → Category Weight Matrix
// ============================================================
// Each value is a percentage of the 30 slots allocated to that
// category for the given profession. Percentages are approximate —
// the distributor rounds and adjusts to hit exactly 30.
//
// Design rationale:
//  – Finance/Legal: heavy on formal studio (conservative industries)
//  – Tech/Creative: more lifestyle + office, less formal
//  – Medical: studio + dedicated medical_env templates
//  – Real Estate: heavy on lifestyle (outdoor, approachable)
//  – Executive: balanced studio + office with authority
//  – General: middle-of-road, safe for any profession

export const PROFESSION_WEIGHTS: Record<Profession, Record<PromptCategory, number>> = {
  executive:    { studio_core: 50, office: 35, medical_env: 0, legal_env: 0, academic_env: 5, lifestyle: 10 },
  finance:      { studio_core: 60, office: 25, medical_env: 0, legal_env: 5, academic_env: 0, lifestyle: 10 },
  legal:        { studio_core: 40, office: 15, medical_env: 0, legal_env: 35, academic_env: 0, lifestyle: 10 },
  tech:         { studio_core: 40, office: 40, medical_env: 0, legal_env: 0, academic_env: 0, lifestyle: 20 },
  medical:      { studio_core: 45, office: 10, medical_env: 35, legal_env: 0, academic_env: 5, lifestyle: 5 },
  consulting:   { studio_core: 50, office: 30, medical_env: 0, legal_env: 0, academic_env: 5, lifestyle: 15 },
  "real-estate":{ studio_core: 30, office: 15, medical_env: 0, legal_env: 0, academic_env: 0, lifestyle: 55 },
  creative:     { studio_core: 30, office: 10, medical_env: 0, legal_env: 0, academic_env: 0, lifestyle: 60 },
  academia:     { studio_core: 40, office: 10, medical_env: 0, legal_env: 5, academic_env: 30, lifestyle: 15 },
  general:      { studio_core: 50, office: 25, medical_env: 0, legal_env: 0, academic_env: 5, lifestyle: 20 },
};

// ============================================================
// Profession display labels (for UI)
// ============================================================

export const PROFESSION_LABELS: Record<Profession, string> = {
  executive:    "Executive / Business Owner",
  finance:      "Finance & Accounting",
  legal:        "Legal / Law",
  tech:         "Technology & Startup",
  medical:      "Medical & Healthcare",
  consulting:   "Consulting & Advisory",
  "real-estate":"Real Estate & Sales",
  creative:     "Creative & Media",
  academia:     "Academia & Education",
  general:      "General Professional",
};

export const PROFESSION_OPTIONS = Object.entries(PROFESSION_LABELS).map(
  ([value, label]) => ({ value: value as Profession, label })
);

export const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

// ============================================================
// Master Template Pool
// ============================================================
// Grouped by tier for readability. Each is a self-contained
// scene description. {outfit} is resolved at distribution time.

const MASTER_TEMPLATES: PromptTemplate[] = [
  // ──────────────────────────────────────────────────────────
  // TIER 1 — STUDIO CORE (white, gray, color seamless)
  // The most important category. 90% of LinkedIn headshots are
  // white or light gray background.
  // ──────────────────────────────────────────────────────────

  // ── Existing Studio Classic (12) ──────────────────────────
  {
    id: "studio-warm-smile",
    prompt:
      "Warm confident smile with direct eye contact, clean white studio background, soft diffused professional lighting, navy blazer over white shirt, shoulders-up portrait, approachable corporate professional",
    status: "active",
    performance: "untested",
    tags: ["studio", "corporate", "smile", "classic"],
    category: "studio_core",
  },
  {
    id: "studio-serious-exec",
    prompt:
      "Serious composed executive expression, slight chin lift, charcoal grey suit with light blue shirt, dark grey studio backdrop, dramatic rim lighting, waist-up portrait, boardroom authority",
    status: "active",
    performance: "untested",
    tags: ["studio", "executive", "serious", "power"],
    category: "studio_core",
  },
  {
    id: "studio-gentle-closed",
    prompt:
      "Gentle closed-lip smile, soft friendly eyes, cream textured studio backdrop, beige blazer with neutral top, soft wrap-around lighting, shoulders-up, warm trustworthy professional",
    status: "active",
    performance: "untested",
    tags: ["studio", "friendly", "warm", "approachable"],
    category: "studio_core",
  },
  {
    id: "studio-confident-arms",
    prompt:
      "Confident expression with slight smirk, arms crossed, navy suit with white open-collar shirt, white studio background, even three-point lighting, waist-up corporate portrait, modern professional",
    status: "active",
    performance: "untested",
    tags: ["studio", "confident", "crossed-arms", "corporate"],
    category: "studio_core",
  },
  {
    id: "studio-minimal-black",
    prompt:
      "Calm centered expression, black fine-knit turtleneck, minimalist white studio background, soft single-source key light with subtle fill, shoulders-up, modern creative director, clean aesthetic",
    status: "active",
    performance: "untested",
    tags: ["studio", "minimalist", "creative", "turtleneck"],
    category: "studio_core",
  },
  {
    id: "studio-bright-laugh",
    prompt:
      "Mid-laugh genuine candid expression, bright white studio with subtle vignette, light grey blazer over pastel shirt, beauty dish lighting, shoulders-up, joyful approachable leader",
    status: "experimental", // v3: demoted — big laugh risky unless source photo matches
    performance: "untested",
    tags: ["studio", "candid", "joy", "approachable", "risk:laugh"],
    category: "studio_core",
  },
  {
    id: "studio-thoughtful-gaze",
    prompt:
      "Thoughtful gaze directed slightly off-camera, intellectual reflective mood, dark navy background with subtle gradient, burgundy blazer, single key light from 45 degrees, shoulders-up, academic consultant",
    status: "active",
    performance: "untested",
    tags: ["studio", "thoughtful", "academic", "intellectual"],
    category: "studio_core",
  },
  {
    id: "studio-relaxed-seated",
    prompt:
      "Relaxed seated pose in modern office chair, angled slightly away then looking back at camera, approachable smile, light grey suit, white studio background, soft even lighting, waist-up, friendly executive",
    status: "active",
    performance: "untested",
    tags: ["studio", "seated", "relaxed", "executive"],
    category: "studio_core",
  },
  {
    id: "studio-power-stance",
    prompt:
      "Standing confident pose, one hand in pocket, slight three-quarter turn toward camera, charcoal suit with crisp white shirt, dark studio backdrop with subtle hair light separation, full-length if possible, commanding presence",
    status: "active",
    performance: "untested",
    tags: ["studio", "standing", "power", "full-body"],
    category: "studio_core",
  },
  {
    id: "studio-soft-feminine",
    prompt:
      "Warm inviting smile, soft glamour lighting with butterfly pattern, cream blazer over silk blouse, pale pink studio backdrop, shoulders-up, approachable yet polished, modern professional feminine aesthetic",
    status: "active",
    performance: "untested",
    tags: ["studio", "soft", "polished", "warm", "feminine"],
    category: "studio_core",
  },
  {
    id: "studio-headshot-classic",
    prompt:
      "Classic professional headshot, straight-on symmetrical framing, confident neutral expression, dark suit jacket with white collar showing, medium grey seamless background, traditional two-light setup, shoulders-up, LinkedIn perfect",
    status: "active",
    performance: "untested",
    tags: ["studio", "classic", "linkedin", "neutral"],
    category: "studio_core",
  },
  {
    id: "studio-creative-color",
    prompt:
      "Slight playful smile, forest green blazer over black top, vibrant teal studio backdrop, clamshell lighting setup, shoulders-up, creative industry professional, distinctive personal brand",
    status: "active",
    performance: "untested",
    tags: ["studio", "creative", "colorful", "distinctive"],
    category: "studio_core",
  },

  // ── NEW Studio White (+6) ─────────────────────────────────
  {
    id: "studio-white-formal-smile",
    prompt:
      "{outfit}, clean pure white seamless studio background, warm confident closed-lip smile, butterfly lighting with soft fill, shoulders-up tight crop, LinkedIn gold standard corporate headshot, eyes sharp and engaged",
    status: "active",
    performance: "untested",
    tags: ["studio", "white-bg", "formal", "smile", "linkedin"],
    category: "studio_core",
    outfitVariants: {
      male: "navy suit with crisp white dress shirt and burgundy silk tie",
      female: "tailored navy blazer over cream silk blouse with subtle gold necklace",
    },
  },
  {
    id: "studio-white-formal-neutral",
    prompt:
      "{outfit}, pure white seamless studio background, composed neutral professional expression with slight jaw tension for authority, classic two-light setup with even illumination, shoulders-up traditional crop, conservative corporate portrait",
    status: "active",
    performance: "untested",
    tags: ["studio", "white-bg", "formal", "neutral", "corporate"],
    category: "studio_core",
    outfitVariants: {
      male: "charcoal suit with light blue dress shirt and subtle patterned tie",
      female: "black tailored blazer with white silk shell and pearl stud earrings",
    },
  },
  {
    id: "studio-white-biz-casual",
    prompt:
      "{outfit}, bright white studio background with subtle vignette, relaxed approachable smile, soft diffused wrap-around lighting, shoulders-up, modern business casual corporate portrait, tech-friendly vibe",
    status: "active",
    performance: "untested",
    tags: ["studio", "white-bg", "biz-casual", "relaxed", "modern"],
    category: "studio_core",
    outfitVariants: {
      male: "navy blazer over crisp white shirt, open collar no tie, relaxed professional",
      female: "cream tailored blazer over soft neutral-toned blouse, approachable elegance",
    },
  },
  {
    id: "studio-white-exec-power",
    prompt:
      "{outfit}, pure white studio background, confident powerful expression with slight smirk, dramatic clamshell lighting with subtle hair light separation, shoulders-up, executive presence, boardroom-ready authority portrait",
    status: "active",
    performance: "untested",
    tags: ["studio", "white-bg", "executive", "power", "authority"],
    category: "studio_core",
    outfitVariants: {
      male: "bespoke charcoal suit with crisp white shirt and dark power tie, cufflinks visible",
      female: "structured black blazer with statement necklace, silk camisole underneath, power presence",
    },
  },
  {
    id: "studio-white-warm-approachable",
    prompt:
      "{outfit}, clean white studio backdrop, warm genuine smile showing approachability, ultra-soft butterfly lighting with heavy diffusion, shoulders-up, friendly yet professional, connects with viewer, ideal for client-facing roles",
    status: "active",
    performance: "untested",
    tags: ["studio", "white-bg", "warm", "approachable", "friendly"],
    category: "studio_core",
    outfitVariants: {
      male: "light grey suit jacket over soft blue button-down shirt, warm approachable professional",
      female: "soft blush-toned blazer over ivory blouse, warm and inviting professional presence",
    },
  },
  {
    id: "studio-white-modern-minimal",
    prompt:
      "{outfit}, pure white seamless background, modern minimalist aesthetic, slight three-quarter turn with eyes directly at camera, single large softbox key light with subtle fill, shoulders-up, contemporary professional, clean and fresh",
    status: "active",
    performance: "untested",
    tags: ["studio", "white-bg", "modern", "minimal", "contemporary"],
    category: "studio_core",
    outfitVariants: {
      male: "dark slim-fit suit with white shirt, no tie, modern tailored silhouette",
      female: "sleek neutral-toned sheath dress with structured blazer, modern professional elegance",
    },
  },

  // ── NEW Studio Dark/Gray (+4) ─────────────────────────────
  {
    id: "studio-dark-power",
    prompt:
      "{outfit}, deep charcoal seamless studio background, intense confident expression, dramatic single key light from 45 degrees with strong contrast, subtle rim light for hair separation, shoulders-up, modern power portrait, cinematic feel",
    status: "active",
    performance: "untested",
    tags: ["studio", "dark-bg", "power", "dramatic", "cinematic"],
    category: "studio_core",
    outfitVariants: {
      male: "black suit with black dress shirt, no tie, sleek powerful silhouette",
      female: "dark charcoal blazer with elegant neckline, understated diamond stud, commanding presence",
    },
  },
  {
    id: "studio-gray-modern",
    prompt:
      "{outfit}, medium grey seamless studio background, relaxed confident expression, balanced three-point lighting with soft diffusion, shoulders-up, modern versatile corporate portrait, works for any industry",
    status: "active",
    performance: "untested",
    tags: ["studio", "gray-bg", "modern", "versatile", "corporate"],
    category: "studio_core",
    outfitVariants: {
      male: "navy suit jacket with light blue shirt, professional and versatile",
      female: "grey marl blazer over white blouse, professional versatile look",
    },
  },
  {
    id: "studio-navy-exec",
    prompt:
      "{outfit}, rich navy blue seamless studio background, executive calm confidence, soft key light with gentle fill, slight shadow on one side for depth, shoulders-up, distinguished leadership portrait, C-suite quality",
    status: "active",
    performance: "untested",
    tags: ["studio", "navy-bg", "executive", "leadership", "c-suite"],
    category: "studio_core",
    outfitVariants: {
      male: "grey suit with white shirt and navy patterned tie, executive polish",
      female: "cream blazer with elegant gold accessories, executive warmth and authority",
    },
  },
  {
    id: "studio-charcoal-soft",
    prompt:
      "{outfit}, charcoal grey textured studio backdrop, warm approachable half-smile, large softbox key light with heavy diffusion for flattering soft shadows, shoulders-up, executive with human touch, trustworthy authority",
    status: "active",
    performance: "untested",
    tags: ["studio", "charcoal-bg", "soft", "trustworthy", "executive"],
    category: "studio_core",
    outfitVariants: {
      male: "charcoal suit with soft white shirt, no tie for approachable executive look",
      female: "deep burgundy blazer over neutral silk top, warm and authoritative",
    },
  },

  // ── NEW Studio Desk/Chair (+4) ────────────────────────────
  {
    id: "studio-desk-seated",
    prompt:
      "{outfit}, seated at a sleek modern minimalist desk, slight forward lean with hands resting naturally, warm engaging expression as if in conversation, soft window-light simulation from side, waist-up, modern executive at work",
    status: "active",
    performance: "untested",
    tags: ["studio", "desk", "seated", "executive", "engaged"],
    category: "studio_core",
    outfitVariants: {
      male: "tailored navy suit with white shirt, professional at work",
      female: "structured blazer with elegant blouse, professional desk presence",
    },
  },
  {
    id: "studio-window-light",
    prompt:
      "{outfit}, posed near a large simulated window light in studio, soft directional light creating natural depth on face, relaxed genuine expression, neutral studio wall background softly falling into shadow, waist-up, modern professional with natural elegance",
    status: "active",
    performance: "untested",
    tags: ["studio", "window-light", "natural", "elegant", "relaxed"],
    category: "studio_core",
    outfitVariants: {
      male: "light grey suit with open collar white shirt, natural relaxed polish",
      female: "soft-toned blazer with delicate jewelry, natural light elegance",
    },
  },
  {
    id: "studio-modern-chair",
    prompt:
      "{outfit}, seated in a contemporary designer armchair, relaxed but professional posture with one arm resting on chair side, knowing slight smile, studio backdrop with subtle gradient, soft even lighting, waist-up, creative executive portrait",
    status: "active",
    performance: "untested",
    tags: ["studio", "chair", "seated", "creative", "relaxed"],
    category: "studio_core",
    outfitVariants: {
      male: "dark blazer over fine-gauge knit sweater, smart casual executive",
      female: "elegant cardigan-jacket over silk shell, relaxed executive warmth",
    },
  },
  {
    id: "studio-standing-lean",
    prompt:
      "{outfit}, standing and leaning slightly against a modern high table or standing desk, confident engaged expression, arms relaxed at sides or one hand resting, clean studio background, three-point lighting, three-quarter length, dynamic professional presence",
    status: "active",
    performance: "untested",
    tags: ["studio", "standing", "leaning", "dynamic", "confident"],
    category: "studio_core",
    outfitVariants: {
      male: "sharp navy suit, standing confidently, professional dynamism",
      female: "tailored jumpsuit or sleek separates, standing with quiet confidence",
    },
  },

  // ── Existing Studio from other categories ──────────────────
  {
    id: "exec-modern-monochrome",
    prompt:
      "High-contrast black and white style portrait, intense thoughtful expression, black turtleneck, dark seamless background with dramatic single light source creating strong shadows, artistic executive portrait, timeless",
    status: "active",
    performance: "untested",
    tags: ["studio", "dramatic", "monochrome", "artistic"],
    category: "studio_core",
  },
  {
    id: "tech-podcast-guest",
    prompt:
      "Expression mid-conversation as if answering an interesting question, professional podcast setup with microphone and acoustic panels blurred behind, dark polo or casual blazer, warm video light, authentic media professional",
    status: "active",
    performance: "untested",
    tags: ["studio", "media", "conversational", "modern"],
    category: "studio_core",
  },
  {
    id: "creative-moody-shadow",
    prompt:
      "Dramatic chiaroscuro lighting, half face in shadow half illuminated, intense artistic expression, dark creative attire, black seamless background, fine-art portrait, bold creative director",
    status: "active",
    performance: "untested",
    tags: ["studio", "dramatic", "fine-art", "bold"],
    category: "studio_core",
  },
  {
    id: "creative-color-pop",
    prompt:
      "Bold colorful portrait, vibrant solid-color backdrop matching outfit accent, joyful genuine expression, creative industry professional, clamshell lighting with color gel rim light, shoulders-up, energetic personal brand",
    status: "active",
    performance: "untested",
    tags: ["studio", "colorful", "energetic", "bold"],
    category: "studio_core",
  },
  {
    id: "creative-studio-action",
    prompt:
      "In a creative studio or workshop, surrounded by tools of the trade blurred (camera gear, design materials, art supplies), mid-action engaged expression, authentic work attire, practical lighting, waist-up, maker creative professional",
    status: "active",
    performance: "untested",
    tags: ["studio", "workshop", "action", "maker"],
    category: "studio_core",
  },

  // ──────────────────────────────────────────────────────────
  // TIER 2 — PROFESSIONAL ENVIRONMENT (office, medical, legal, academic)
  // ──────────────────────────────────────────────────────────

  // ── Existing Office/Modern Tech (10 active + 1 experimental) ──
  {
    id: "tech-open-office",
    prompt:
      "Confident subtle smirk, blurred modern open-plan office with glass walls and natural window light behind, smart casual white button-down with rolled sleeves, waist-up, startup founder, authentic tech vibe",
    status: "active",
    performance: "untested",
    tags: ["office", "tech", "casual", "startup"],
    category: "office",
  },
  {
    id: "tech-standing-desk",
    prompt:
      "Standing at a height-adjustable desk, leaning slightly forward with hands resting on the desk edge, engaged listener expression, dark fitted polo shirt, bright modern office background with plants, relaxed tech professional",
    status: "active",
    performance: "untested",
    tags: ["office", "tech", "standing", "engaged"],
    category: "office",
  },
  {
    id: "tech-lounge-seated",
    prompt:
      "Seated on a modern minimalist lounge chair in a tech office lounge area, relaxed crossed-leg pose, thoughtful expression, grey merino wool sweater, natural light from large windows, lifestyle corporate portrait",
    status: "active",
    performance: "untested",
    tags: ["office", "lounge", "seated", "lifestyle"],
    category: "office",
  },
  {
    id: "tech-conference-room",
    prompt:
      "Standing in front of a whiteboard with faint strategy diagrams blurred, explaining gesture with hands, confident knowledgeable expression, business casual blazer no tie, modern conference room, thought-leader portrait",
    status: "active",
    performance: "untested",
    tags: ["office", "conference", "standing", "leader"],
    category: "office",
  },
  {
    id: "tech-monitor-glow",
    prompt:
      "Working late aesthetic, face softly lit by monitor glow with practical desk lamp fill, focused expression transitioning to a slight smile, dark modern office, dark crew neck sweater, intimate authentic tech portrait",
    status: "active",
    performance: "untested",
    tags: ["office", "moody", "authentic", "tech"],
    category: "office",
  },
  {
    id: "tech-coworking",
    prompt:
      "Warm collaborative expression, blurred vibrant coworking space with colorful furniture and people, light denim shirt open over white tee, shoulders-up, community-oriented professional, modern work culture",
    status: "active",
    performance: "untested",
    tags: ["office", "coworking", "casual", "community"],
    category: "office",
  },
  {
    id: "exec-corner-office",
    prompt:
      "Standing in a premium corner office with floor-to-ceiling windows showing city skyline, arms relaxed at sides, authoritative calm expression, charcoal bespoke suit with subtle pinstripe, natural window backlight with subtle fill, full-length, C-suite presence",
    status: "active",
    performance: "untested",
    tags: ["office", "executive", "standing", "c-suite"],
    category: "office",
  },
  {
    id: "exec-boardroom-head",
    prompt:
      "Seated at the head of a polished boardroom table, leaning slightly forward with hands clasped on the table, intense focused gaze directly at camera, dark navy suit with power tie, dramatic overhead lighting, commanding leadership",
    status: "active",
    performance: "untested",
    tags: ["office", "boardroom", "seated", "intense"],
    category: "office",
  },
  {
    id: "exec-over-the-shoulder",
    prompt:
      "Over-the-shoulder glance looking back at camera, dramatic confident expression, high-rise office window with twilight cityscape behind, perfectly tailored black suit, cinematic lighting with strong rim light, editorial executive portrait",
    status: "active",
    performance: "untested",
    tags: ["office", "editorial", "dramatic", "executive"],
    category: "office",
  },
  {
    id: "exec-leaning-standing",
    prompt:
      "Leaning against a sleek executive desk, arms loosely crossed, slight knowing smile, bespoke grey suit with subtle pattern, warm ambient office lighting with desk lamp glow, modern penthouse office, confident authority",
    status: "active",
    performance: "untested",
    tags: ["office", "leaning", "confident", "luxury"],
    category: "office",
  },
  {
    id: "exec-window-silhouette",
    prompt:
      "Standing facing a floor-to-ceiling window with city view, silhouette with soft front fill revealing facial features, contemplative leadership expression, sharp suit silhouette, dramatic natural backlight, full-length, visionary CEO portrait",
    status: "active",
    performance: "untested",
    tags: ["office", "silhouette", "dramatic", "visionary"],
    category: "office",
  },
  {
    id: "exec-handshake",
    prompt:
      "Mid-handshake pose as if greeting someone off-camera, warm professional smile, classic navy suit, modern corporate lobby with marble and glass blurred behind, dynamic engaged moment, partnership-oriented leader",
    status: "active",
    performance: "untested",
    tags: ["office", "dynamic", "engaged", "handshake"],
    category: "office",
  },
  {
    id: "exec-thoughtful-window",
    prompt:
      "Standing by a window looking out thoughtfully, then turning toward camera with a warm knowing smile, dark suit, soft natural daylight, waist-up, reflective leader, approachable yet authoritative",
    status: "active",
    performance: "untested",
    tags: ["office", "thoughtful", "natural-light", "reflective"],
    category: "office",
  },
  {
    id: "exec-walking-hallway",
    prompt:
      "Walking purposefully down a sleek modern corporate hallway, caught mid-stride looking confidently at camera, sharp tailored suit, motion blur in background, dynamic powerful presence, full-body, leader in motion",
    status: "experimental", // v3: demoted — dynamic walking risky
    performance: "untested",
    tags: ["office", "walking", "dynamic", "power", "risk:movement"],
    category: "office",
  },

  // ── NEW Medical (+3) ──────────────────────────────────────
  {
    id: "medical-whitecoat-portrait",
    prompt:
      "{outfit}, clean modern clinic interior with soft blurred medical equipment in background, warm trustworthy smile, bright even medical-grade lighting, shoulders-up, compassionate healthcare professional portrait",
    status: "active",
    performance: "untested",
    tags: ["medical", "white-coat", "clinic", "trustworthy", "healthcare"],
    category: "medical_env",
    outfitVariants: {
      male: "crisp white doctor's coat over navy dress shirt with subtle patterned tie, stethoscope visible",
      female: "crisp white doctor's coat over soft蓝 or blush blouse, professional healthcare presence",
    },
  },
  {
    id: "medical-whitecoat-female",
    prompt:
      "Female medical professional, white doctor's coat over elegant professional blouse, warm compassionate smile, bright clean clinic or hospital corridor softly blurred behind, soft even lighting, shoulders-up, trustworthy female physician portrait",
    status: "active",
    performance: "untested",
    tags: ["medical", "white-coat", "female", "physician", "compassionate"],
    category: "medical_env",
    // No outfitVariants — prompt is self-contained for female
  },
  {
    id: "medical-scrubs-modern",
    prompt:
      "{outfit}, modern bright medical office or consultation room with warm natural light, calm professional expression, clean modern healthcare environment, waist-up, approachable medical professional, contemporary clinic aesthetic",
    status: "active",
    performance: "untested",
    tags: ["medical", "scrubs", "modern", "approachable", "healthcare"],
    category: "medical_env",
    outfitVariants: {
      male: "modern fitted navy scrubs, clean professional medical appearance",
      female: "modern fitted teal or navy scrubs, professional medical appearance",
    },
  },

  // ── NEW Medical (+6) — expanded from 3 to 9 ──────────────
  {
    id: "medical-consultation-desk",
    prompt:
      "{outfit}, seated at a clean modern consultation desk, slight forward lean with hands gently clasped, warm engaged expression as if listening to a patient, bright clinic room with soft medical equipment blurred behind, even medical-grade lighting, waist-up, compassionate physician in conversation",
    status: "active",
    performance: "untested",
    tags: ["medical", "desk", "consultation", "compassionate", "engaged"],
    category: "medical_env",
    outfitVariants: {
      male: "crisp white doctor's coat over light blue button-down shirt, stethoscope, attentive physician",
      female: "crisp white doctor's coat over soft jewel-tone blouse, stethoscope, attentive physician presence",
    },
  },
  {
    id: "medical-hospital-corridor",
    prompt:
      "{outfit}, standing confidently in a bright modern hospital corridor with soft natural light from large windows, calm reassuring expression, clean hospital environment subtly blurred, waist-up, medical professional on rounds, capable and trustworthy",
    status: "active",
    performance: "untested",
    tags: ["medical", "hospital", "corridor", "confident", "trustworthy"],
    category: "medical_env",
    outfitVariants: {
      male: "white doctor's coat over navy dress shirt and tie, professional medical authority",
      female: "white doctor's coat over elegant professional blouse, capable and warm medical presence",
    },
  },
  {
    id: "medical-clinic-standing",
    prompt:
      "{outfit}, standing in a pristine modern medical clinic with sleek design elements softly blurred, arms relaxed at sides, warm professional smile, bright even lighting from large overhead panels, full-length, approachable healthcare leader, contemporary medicine aesthetic",
    status: "active",
    performance: "untested",
    tags: ["medical", "clinic", "standing", "modern", "approachable"],
    category: "medical_env",
    outfitVariants: {
      male: "tailored white coat over professional attire, standing with quiet confidence",
      female: "tailored white coat over professional dress or slacks, standing with warm authority",
    },
  },
  {
    id: "medical-confident-arms",
    prompt:
      "{outfit}, arms crossed with a confident reassuring expression, standing in front of a softly blurred medical credentials wall or clinic interior, slight knowing smile, professional medical lighting, waist-up, experienced physician, trusted authority",
    status: "active",
    performance: "untested",
    tags: ["medical", "crossed-arms", "confident", "experienced", "authority"],
    category: "medical_env",
    outfitVariants: {
      male: "white doctor's coat with name badge, dress shirt and tie visible, established physician",
      female: "white doctor's coat with subtle professional lapel pin, blouse visible, established physician",
    },
  },
  {
    id: "medical-window-light",
    prompt:
      "{outfit}, standing near a large window in a modern medical office, soft natural daylight creating gentle shadows, warm approachable smile, clean contemporary interior with a small plant on the windowsill, waist-up, modern healthcare professional, human connection",
    status: "active",
    performance: "untested",
    tags: ["medical", "window-light", "natural", "human", "connection"],
    category: "medical_env",
    outfitVariants: {
      male: "white coat open over business casual shirt, relaxed professional warmth",
      female: "white coat over soft-toned professional attire, relaxed and genuine medical warmth",
    },
  },
  {
    id: "medical-team-leader",
    prompt:
      "{outfit}, confident leadership stance with one hand resting on a modern medical workstation, direct engaged gaze, blurred team or clinical environment behind suggesting collaborative care, medical professional as department leader, waist-up, healthcare executive presence",
    status: "active",
    performance: "untested",
    tags: ["medical", "leader", "team", "executive", "healthcare"],
    category: "medical_env",
    outfitVariants: {
      male: "white coat over dress shirt with subtle pattern tie, medical leadership authority",
      female: "white coat over structured professional blouse, medical director presence and warmth",
    },
  },

  // ── NEW Legal (+2) ────────────────────────────────────────
  {
    id: "legal-library-portrait",
    prompt:
      "{outfit}, standing in a distinguished wood-paneled law library, floor-to-ceiling leather-bound books blurred behind, authoritative composed expression, warm tungsten lighting from brass desk lamp, waist-up, traditional legal professional portrait",
    status: "active",
    performance: "untested",
    tags: ["legal", "library", "wood-paneled", "authoritative", "traditional"],
    category: "legal_env",
    outfitVariants: {
      male: "charcoal grey suit with white spread-collar shirt and conservative tie, legal authority",
      female: "dark navy suit jacket with white silk blouse, pearl earrings, legal gravitas",
    },
  },
  {
    id: "legal-office-classic",
    prompt:
      "{outfit}, seated in a classic leather wingback chair in a traditional law office, confident steady gaze, brass and mahogany details blurred behind, warm ambient lighting with desk lamp glow, waist-up, established attorney portrait",
    status: "active",
    performance: "untested",
    tags: ["legal", "office", "classic", "attorney", "established"],
    category: "legal_env",
    outfitVariants: {
      male: "dark navy pinstripe suit with white shirt and burgundy tie, established counsel presence",
      female: "tailored charcoal blazer with structured white blouse, established legal professional",
    },
  },

  // ── NEW Legal (+6) — expanded from 2 to 8 ────────────────
  {
    id: "legal-modern-office",
    prompt:
      "{outfit}, standing in a sleek contemporary law office with glass walls and steel accents, confident forward-looking expression, modern legal practice environment blurred behind, natural light mixed with warm interior lighting, waist-up, forward-thinking attorney, modern legal professional",
    status: "active",
    performance: "untested",
    tags: ["legal", "modern", "office", "contemporary", "forward-thinking"],
    category: "legal_env",
    outfitVariants: {
      male: "charcoal modern-cut suit with light blue shirt and subtle pattern tie, contemporary legal professional",
      female: "tailored navy sheath dress with structured blazer, modern legal authority",
    },
  },
  {
    id: "legal-courtroom-subtle",
    prompt:
      "{outfit}, standing confidently with courtroom wood paneling and the bar subtly blurred in deep background, composed serious-but-approachable expression, traditional courtroom lighting with warm tones, waist-up, trial attorney presence, gravitas with humanity",
    status: "active",
    performance: "untested",
    tags: ["legal", "courtroom", "traditional", "gravitas", "attorney"],
    category: "legal_env",
    outfitVariants: {
      male: "dark navy suit with white spread-collar shirt and conservative tie, courtroom authority",
      female: "dark tailored suit with cream silk shell, courtroom presence and credibility",
    },
  },
  {
    id: "legal-standing-portrait",
    prompt:
      "{outfit}, standing in an elegant law firm lobby with marble floors and classic architectural details softly blurred, one hand relaxed at side, confident composed expression, natural light from tall windows, full-length, distinguished law firm partner, established presence",
    status: "active",
    performance: "untested",
    tags: ["legal", "lobby", "standing", "partner", "distinguished"],
    category: "legal_env",
    outfitVariants: {
      male: "bespoke grey suit with white shirt and patterned silk tie, law firm partner gravitas",
      female: "structured black blazer with tailored trousers and subtle jewelry, law firm partner authority",
    },
  },
  {
    id: "legal-desk-document",
    prompt:
      "{outfit}, seated at a distinguished mahogany desk with legal documents softly out of focus, looking up with a thoughtful knowledgeable expression, brass desk lamp providing warm directional light, waist-up, scholarly attorney, depth of expertise",
    status: "active",
    performance: "untested",
    tags: ["legal", "desk", "documents", "scholarly", "expertise"],
    category: "legal_env",
    outfitVariants: {
      male: "dark suit with reading glasses optionally in hand, scholarly legal mind",
      female: "tailored blazer with refined blouse, glasses optional, sharp legal intellect",
    },
  },
  {
    id: "legal-window-natural",
    prompt:
      "{outfit}, standing by a tall window in a tasteful law office, soft natural daylight creating a warm approachable atmosphere, genuine slight smile, classic interior with law books visible, waist-up, trusted legal advisor, the lawyer you can talk to",
    status: "active",
    performance: "untested",
    tags: ["legal", "window", "natural-light", "approachable", "trusted"],
    category: "legal_env",
    outfitVariants: {
      male: "navy blazer with open-collar white shirt, approachable legal counsel",
      female: "soft-structured blazer in warm neutral tone, approachable legal counselor",
    },
  },
  {
    id: "legal-crossed-arms",
    prompt:
      "{outfit}, arms crossed with quiet confidence, standing in front of floor-to-ceiling law bookshelves softly blurred, direct steady gaze, warm ambient lighting from classic brass fixtures, waist-up, commanding legal presence, won't back down",
    status: "active",
    performance: "untested",
    tags: ["legal", "crossed-arms", "commanding", "bookshelves", "presence"],
    category: "legal_env",
    outfitVariants: {
      male: "charcoal three-piece suit with crisp white shirt, formidable legal presence",
      female: "dark burgundy blazer over black shell, arms crossed, formidable yet composed",
    },
  },

  // ── Existing Legal/Academic crossover ──────────────────────
  {
    id: "exec-library",
    prompt:
      "Standing in a wood-paneled library or study, one hand resting on a leather chair, dignified composed expression, navy blazer with elbow patches or classic suit, warm tungsten lighting from desk lamp and fireplace glow, distinguished academic leader",
    status: "active",
    performance: "untested",
    tags: ["library", "academic", "standing", "distinguished"],
    category: "academic_env",
  },

  // ── NEW Academic (+2) ─────────────────────────────────────
  {
    id: "academic-campus-outdoor",
    prompt:
      "{outfit}, standing on a historic university campus with ivy-covered brick buildings softly blurred behind, warm intellectual smile, soft morning or golden hour light, waist-up, professor or academic leader, collegial warmth",
    status: "active",
    performance: "untested",
    tags: ["academic", "campus", "outdoor", "intellectual", "collegial"],
    category: "academic_env",
    outfitVariants: {
      male: "tweed blazer or navy sport coat over button-down shirt, academic professional",
      female: "structured cardigan or soft blazer over elegant blouse, academic warmth",
    },
  },
  {
    id: "academic-library-scholarly",
    prompt:
      "{outfit}, standing between tall bookshelves in a grand university library, warm scholarly smile, soft natural light from tall windows mixed with warm interior lighting, waist-up, academic professional, intellectual gravitas",
    status: "active",
    performance: "untested",
    tags: ["academic", "library", "scholarly", "intellectual", "university"],
    category: "academic_env",
    outfitVariants: {
      male: "tweed sport coat with subtle tie or open collar, scholarly professional",
      female: "elegant sweater or blazer with scarf, intellectual and approachable",
    },
  },

  // ── NEW Academic (+4) — expanded from 4 to 8 ──────────────
  {
    id: "academic-lecture-hall",
    prompt:
      "{outfit}, standing at a modern lecture podium with tiered seating softly blurred behind, engaging mid-lecture expression as if explaining an important point, one hand gesturing naturally, bright even academic lighting, waist-up, dynamic professor, inspiring educator presence",
    status: "active",
    performance: "untested",
    tags: ["academic", "lecture", "teaching", "dynamic", "professor"],
    category: "academic_env",
    outfitVariants: {
      male: "sport coat or blazer over button-down shirt, engaging academic presence",
      female: "structured cardigan or soft blazer over elegant top, inspiring educator",
    },
  },
  {
    id: "academic-office-books",
    prompt:
      "{outfit}, seated in a cozy professor's office surrounded by overflowing bookshelves and academic papers, warm knowing smile, desk lamp and window light creating intimate scholarly atmosphere, waist-up, tenured professor in their element, intellectual home",
    status: "active",
    performance: "untested",
    tags: ["academic", "office", "books", "scholarly", "tenured"],
    category: "academic_env",
    outfitVariants: {
      male: "tweed jacket with subtle elbow patches, relaxed scholarly warmth",
      female: "cashmere wrap or soft blazer, surrounded by books, intellectual coziness",
    },
  },
  {
    id: "academic-quad-seated",
    prompt:
      "{outfit}, seated on a classic wooden bench in a leafy university quad, historic campus buildings softly blurred behind, relaxed intellectual smile, golden afternoon light filtering through mature trees, waist-up, collegial professor, timeless academic setting",
    status: "active",
    performance: "untested",
    tags: ["academic", "outdoor", "quad", "collegial", "timeless"],
    category: "academic_env",
    outfitVariants: {
      male: "navy blazer over light sweater or oxford shirt, outdoor academic warmth",
      female: "elegant knit or light blazer, outdoor scholarly grace",
    },
  },
  {
    id: "academic-modern-classroom",
    prompt:
      "{outfit}, standing in a bright modern classroom with digital whiteboard and collaborative furniture softly blurred, approachable encouraging expression, natural daylight from large windows, waist-up, contemporary educator, student-centered teaching presence",
    status: "active",
    performance: "untested",
    tags: ["academic", "classroom", "modern", "approachable", "educator"],
    category: "academic_env",
    outfitVariants: {
      male: "smart casual blazer over open-collar shirt, modern approachable professor",
      female: "contemporary professional blouse with structured cardigan, modern educator warmth",
    },
  },

  // ──────────────────────────────────────────────────────────
  // TIER 3 — LIFESTYLE (cafe, outdoor, urban, creative, event)
  // Only matched heavily for Real Estate, Creative, and Tech.
  // Other professions get small "surprise" allocations (5-20%).
  // ──────────────────────────────────────────────────────────

  // ── Existing Outdoor (11 active + 2 experimental + 1 demoted) ──
  {
    id: "outdoor-park-bench",
    prompt:
      "Seated on a modern park bench, surrounded by soft green foliage bokeh, warm genuine smile, smart casual blazer with chinos, late afternoon golden sunlight filtering through trees, waist-up, approachable authentic professional",
    status: "active",
    performance: "untested",
    tags: ["outdoor", "park", "seated", "approachable"],
    category: "lifestyle",
  },
  {
    id: "outdoor-city-steps",
    prompt:
      "Seated on modern urban architecture steps in a downtown plaza, confident relaxed posture, business casual attire, bright overcast sky providing perfect diffused light, waist-up, urban professional, city hall or corporate district vibe",
    status: "active",
    performance: "untested",
    tags: ["outdoor", "urban", "seated", "corporate"],
    category: "lifestyle",
  },
  {
    id: "outdoor-campus-walk",
    prompt:
      "Walking along a tree-lined university campus path, looking at camera with intellectual smile, tweed blazer or academic casual attire, soft morning light, full-body walking shot, professor or academic administrator",
    status: "active",
    performance: "untested",
    tags: ["outdoor", "campus", "walking", "academic"],
    category: "academic_env",
  },
  {
    id: "outdoor-beach-casual",
    prompt:
      "Beach setting at golden hour, relaxed genuine laughter, smart casual linen shirt, ocean horizon bokeh behind with warm sunset tones, shoulders-up, lifestyle entrepreneur, coastal professional, authentic joy",
    status: "experimental", // v3: demoted — laugh + extreme casual, per user request to keep
    performance: "untested",
    tags: ["outdoor", "beach", "golden-hour", "lifestyle", "risk:laugh", "risk:casual"],
    category: "lifestyle",
  },
  {
    id: "outdoor-market-stroll",
    prompt:
      "Walking through an upscale outdoor market or shopping district, caught mid-stride looking at camera with natural smile, stylish casual attire, afternoon natural light, lifestyle authentic, cosmopolitan professional",
    status: "experimental", // v3: demoted — dynamic walking
    performance: "untested",
    tags: ["outdoor", "market", "walking", "cosmopolitan", "risk:movement"],
    category: "lifestyle",
  },
  {
    id: "outdoor-mountain-view",
    prompt:
      "Standing on a viewpoint overlooking mountains or hills, fresh air wind slightly moving hair, confident serene expression, outdoor smart jacket, dramatic natural landscape bokeh behind, crisp clear daylight, adventurous leader",
    status: "active",
    performance: "untested",
    tags: ["outdoor", "mountain", "standing", "adventurous"],
    category: "lifestyle",
  },
  {
    id: "outdoor-riverside",
    prompt:
      "Leaning on a riverside railing with water and city reflection behind, relaxed reflective expression, smart casual dark jacket, soft afternoon light, waist-up, thoughtful urban professional, serene moment",
    status: "active",
    performance: "untested",
    tags: ["outdoor", "water", "reflective", "serene"],
    category: "lifestyle",
  },
  {
    id: "outdoor-garden-party",
    prompt:
      "At an upscale garden party or networking event, holding a glass, mid-conversation engaged expression, elegant smart casual or cocktail attire, greenery and string lights bokeh, waist-up, social professional, warm evening light",
    status: "active",
    performance: "untested",
    tags: ["outdoor", "event", "social", "elegant"],
    category: "lifestyle",
  },
  {
    id: "outdoor-autumn-leaves",
    prompt:
      "Standing among autumn foliage with warm orange and gold leaves blurred, cozy sophisticated sweater or light coat, genuine warm smile, crisp autumn afternoon light, waist-up, seasonal warmth, authentic professional",
    status: "active",
    performance: "untested",
    tags: ["outdoor", "autumn", "seasonal", "warm"],
    category: "lifestyle",
  },
  {
    id: "outdoor-bridge-crossing",
    prompt:
      "Walking across a modern pedestrian bridge with city skyline behind, purposeful stride, confident expression, business attire with long coat, dynamic movement, full-body, metropolitan professional, forward momentum",
    status: "experimental", // v3: demoted — dynamic walking full-body
    performance: "untested",
    tags: ["outdoor", "bridge", "walking", "metropolitan", "risk:movement"],
    category: "lifestyle",
  },
  {
    id: "outdoor-courtyard",
    prompt:
      "Standing in a serene internal courtyard or atrium with modern architecture and plants, calm centered expression, sophisticated casual attire, soft overhead natural light filtered through structure, full-length, oasis professional",
    status: "active",
    performance: "untested",
    tags: ["outdoor", "courtyard", "calm", "architectural"],
    category: "lifestyle",
  },
  {
    id: "outdoor-harbor",
    prompt:
      "Harbor or marina background with boats softly blurred, confident relaxed posture leaning on a wooden railing, nautical-inspired smart casual with navy blazer, bright sea-light, waist-up, maritime city professional",
    status: "active",
    performance: "untested",
    tags: ["outdoor", "harbor", "nautical", "relaxed"],
    category: "lifestyle",
  },
  {
    id: "outdoor-snow-crisp",
    prompt:
      "Crisp winter day with soft snow-covered background, warm sophisticated coat and scarf, breath visible in cold air, joyful resilient expression, bright overcast winter light creating soft even illumination, shoulders-up, northern professional",
    status: "experimental",
    performance: "untested",
    tags: ["outdoor", "winter", "seasonal", "resilient"],
    category: "lifestyle",
  },

  // ── Existing Tech Lifestyle (4 active + 1 experimental) ────
  {
    id: "tech-cafe-remote",
    prompt:
      "Warm genuine smile, blurred cozy coffee shop interior with warm pendant lights, casual oatmeal sweater, soft window light from side, shoulders-up, digital nomad remote worker, authentic lifestyle",
    status: "active",
    performance: "untested",
    tags: ["cafe", "remote", "casual", "lifestyle"],
    category: "lifestyle",
  },
  {
    id: "tech-brick-wall",
    prompt:
      "Creative confident expression, exposed brick wall with warm Edison bulb bokeh behind, black denim jacket over charcoal tee, three-quarter turn, creative tech district professional, urban authentic",
    status: "active",
    performance: "untested",
    tags: ["urban", "creative", "casual", "edgy"],
    category: "lifestyle",
  },
  {
    id: "tech-rooftop",
    prompt:
      "Relaxed happy expression, rooftop terrace with city skyline bokeh at golden hour, smart casual navy blazer over white tee, warm natural backlight with reflector fill, shoulders-up, modern entrepreneur",
    status: "active",
    performance: "untested",
    tags: ["outdoor", "urban", "golden-hour", "entrepreneur"],
    category: "lifestyle",
  },
  {
    id: "tech-balcony-overlook",
    prompt:
      "Leaning on a modern glass balcony railing overlooking a city, confident relaxed expression, smart casual navy blazer with pocket square, bright overcast natural light, waist-up, visionary professional",
    status: "active",
    performance: "untested",
    tags: ["outdoor", "city", "confident", "visionary"],
    category: "lifestyle",
  },
  {
    id: "tech-garden-walk",
    prompt:
      "Walking shot captured mid-stride on a modern corporate campus garden path, looking at camera with natural smile, smart casual outfit with light blazer, golden hour dappled light through trees, full-body, dynamic lifestyle",
    status: "experimental", // v3: demoted — dynamic walking full-body
    performance: "untested",
    tags: ["outdoor", "walking", "dynamic", "lifestyle", "risk:movement"],
    category: "lifestyle",
  },

  // ── Existing Creative Lifestyle (10 active + 2 experimental) ──
  {
    id: "creative-gallery",
    prompt:
      "Standing in a contemporary art gallery with abstract paintings blurred on the wall behind, thoughtful appreciative expression, stylish creative professional attire with interesting texture or pattern, gallery track lighting, waist-up, cultural thought leader",
    status: "active",
    performance: "untested",
    tags: ["gallery", "artistic", "standing", "cultural"],
    category: "lifestyle",
  },
  {
    id: "creative-golden-portrait",
    prompt:
      "Editorial golden hour portrait, warm backlight creating hair glow, slight turned pose looking back at camera with magnetic expression, neutral earth-tone outfit, outdoor with warm grass or urban texture bokeh, magazine cover quality",
    status: "active",
    performance: "untested",
    tags: ["outdoor", "golden-hour", "editorial", "magazine"],
    category: "lifestyle",
  },
  {
    id: "creative-urban-night",
    prompt:
      "Nighttime urban portrait, standing under a modern street lamp, city lights and traffic trails bokeh behind, confident mysterious expression, dark stylish coat or leather jacket, cinematic neon-tinged lighting, waist-up, creative nocturnal professional",
    status: "active",
    performance: "untested",
    tags: ["urban", "night", "cinematic", "edgy"],
    category: "lifestyle",
  },
  {
    id: "creative-architectural",
    prompt:
      "Standing in a striking modern architectural space with geometric lines and natural light shafts, confident composed expression, architectural minimalist attire in neutral tones, waist-up or full-body, design professional, spatial awareness",
    status: "active",
    performance: "untested",
    tags: ["architecture", "minimalist", "design", "spatial"],
    category: "lifestyle",
  },
  {
    id: "creative-morning-light",
    prompt:
      "Soft morning light streaming through a large window, seated on a windowsill with coffee cup, relaxed genuine morning-person smile, casual elegant loungewear or smart casual, lifestyle authentic, warm and inviting",
    status: "active",
    performance: "untested",
    tags: ["indoor", "morning", "lifestyle", "authentic"],
    category: "lifestyle",
  },
  {
    id: "creative-dappled-shade",
    prompt:
      "Outdoor under a tree canopy with dappled sunlight creating natural patterns on face, relaxed dreamy expression, light natural-fabric outfit, bokeh green background, waist-up, bohemian creative professional, nature-connected",
    status: "active",
    performance: "untested",
    tags: ["outdoor", "nature", "dreamy", "bohemian"],
    category: "lifestyle",
  },
  {
    id: "creative-rain-window",
    prompt:
      "Behind a rain-streaked window, contemplative moody expression, warm interior lighting contrasting with cool exterior, cozy knitwear visible, cinematic atmospheric portrait, introspective creative, emotional depth",
    status: "active",
    performance: "untested",
    tags: ["indoor", "rain", "moody", "introspective"],
    category: "lifestyle",
  },
  {
    id: "creative-bookstore",
    prompt:
      "Browsing in a charming independent bookstore, looking up from a book with a warm surprised smile, cozy intellectual attire, warm ambient bookstore lighting with shelves blurred, cultured creative professional",
    status: "active",
    performance: "untested",
    tags: ["indoor", "bookstore", "warm", "cultured"],
    category: "lifestyle",
  },
  {
    id: "creative-mirror-reflection",
    prompt:
      "Reflection shot in a modern mirror or glass surface, creative composition, confident self-aware expression, stylish contemporary outfit, interesting interior space reflected, editorial artistic portrait, unique perspective",
    status: "experimental",
    performance: "untested",
    tags: ["indoor", "reflection", "editorial", "experimental"],
    category: "lifestyle",
  },
  {
    id: "creative-aerial-drone",
    prompt:
      "Looking up toward camera from a lower angle or drone perspective, confident smile, interesting urban rooftop or open plaza background with geometric patterns, dynamic perspective, modern creative professional, visually striking",
    status: "experimental",
    performance: "untested",
    tags: ["outdoor", "drone", "dynamic", "experimental"],
    category: "lifestyle",
  },
  {
    id: "creative-vinyl-lounge",
    prompt:
      "In a stylish mid-century modern lounge with vinyl records or design books nearby, relaxed cultured expression, retro-modern smart casual attire, warm analog lighting, music creative or design professional, tasteful aesthetic",
    status: "active",
    performance: "untested",
    tags: ["indoor", "retro", "cultured", "stylish"],
    category: "lifestyle",
  },

  // ── Existing Event/Stage (2) ───────────────────────────────
  {
    id: "exec-gala-portrait",
    prompt:
      "Black-tie formal event portrait, confident polished smile, tuxedo or formal evening attire, elegant event venue with subtle chandelier bokeh and warm ambient light, shoulders-up, award-ceremony professional, prestige",
    status: "active",
    performance: "untested",
    tags: ["event", "formal", "prestige", "elegant"],
    category: "lifestyle",
  },
  {
    id: "exec-speaker-stage",
    prompt:
      "On a TED-style conference stage, standing at a minimal podium or hands-free with a wireless mic, passionate knowledgeable expression mid-speech, business formal attire, dramatic stage lighting with audience bokeh, waist-up, thought leader",
    status: "active",
    performance: "untested",
    tags: ["stage", "speaker", "dynamic", "thought-leader"],
    category: "lifestyle",
  },

  // ── Existing Luxury (1 experimental) ──────────────────────
  {
    id: "exec-private-jet",
    prompt:
      "Seated in a luxurious private aviation cabin, relaxed confident smile, smart casual elegant attire, warm interior lighting, window showing clouds, aspirational executive lifestyle portrait",
    status: "experimental", // v3: already experimental, stays — too aspirational for "professional headshot" positioning
    performance: "untested",
    tags: ["luxury", "travel", "aspirational", "seated"],
    category: "lifestyle",
  },

  // ── NEW Lifestyle (+1) ────────────────────────────────────
  {
    id: "lifestyle-cafe-modern",
    prompt:
      "{outfit}, seated at a window table in a bright modern minimalist cafe, warm natural window light from side, relaxed genuine half-smile, artisanal coffee cup on table softly out of focus, lifestyle professional portrait, authentic remote-work era vibe",
    status: "active",
    performance: "untested",
    tags: ["cafe", "modern", "lifestyle", "authentic", "remote"],
    category: "lifestyle",
    outfitVariants: {
      male: "smart casual: fine-gauge navy sweater over white collared shirt, relaxed professional",
      female: "smart casual: soft cashmere wrap or elegant knit, relaxed professional with warmth",
    },
  },
];

// ============================================================
// Helpers
// ============================================================

/** All active templates eligible for use in production orders */
export function getActiveTemplates(): PromptTemplate[] {
  return MASTER_TEMPLATES.filter((t) => t.status === "active");
}

/** All templates including experimental (for testing) */
export function getAllTemplates(): PromptTemplate[] {
  return MASTER_TEMPLATES;
}

/** Get templates by category */
export function getTemplatesByCategory(category: PromptCategory): PromptTemplate[] {
  return MASTER_TEMPLATES.filter((t) => t.category === category);
}

/** Get active templates by category */
export function getActiveByCategory(category: PromptCategory): PromptTemplate[] {
  return MASTER_TEMPLATES.filter((t) => t.status === "active" && t.category === category);
}

/**
 * Get templates by tag filter. Useful for testing a specific
 * category of prompts.
 */
export function getTemplatesByTag(tag: string): PromptTemplate[] {
  return MASTER_TEMPLATES.filter((t) => t.tags.includes(tag));
}

// ============================================================
// v3 Profession-Aware Distribution
// ============================================================

/**
 * Select 30 unique templates for an order based on the user's
 * profession and gender.
 *
 * Strategy:
 *  1. Read the profession → category weight matrix.
 *  2. Allocate 30 slots across categories per the weights.
 *  3. For each category: collect active templates, shuffle, take slots.
 *  4. Resolve {outfit} placeholders with gender-appropriate text.
 *  5. Shuffle the final selection (mix categories naturally).
 *  6. Assign round-robin to the user's photos.
 *
 * Fallback: if a category runs short of templates, redistribute
 * unused slots to studio_core (always the largest pool).
 */
export function distributePromptsV3(
  photoCount: number,
  _plan: "starter" | "pro",
  gender: Gender,
  profession: Profession
): { photoIndex: number; promptId: string; prompt: string }[] {
  const TOTAL = 30;
  const weights = PROFESSION_WEIGHTS[profession];

  // 1. Calculate raw slot allocation from percentages
  const allocation: Partial<Record<PromptCategory, number>> = {};
  let allocatedTotal = 0;

  for (const [cat, pct] of Object.entries(weights) as [PromptCategory, number][]) {
    if (pct <= 0) continue;
    const slots = Math.round((pct / 100) * TOTAL);
    allocation[cat] = slots;
    allocatedTotal += slots;
  }

  // 2. Adjust rounding to hit exactly 30
  // Add/remove from studio_core (always has largest pool)
  const diff = TOTAL - allocatedTotal;
  if (diff !== 0) {
    allocation["studio_core"] = (allocation["studio_core"] ?? 0) + diff;
  }

  // 3. Collect templates per category
  const selected: PromptTemplate[] = [];
  const surplusSlots: { category: PromptCategory; needed: number; available: number }[] = [];

  for (const [cat, slots] of Object.entries(allocation) as [PromptCategory, number][]) {
    if (slots <= 0) continue;

    const pool = getActiveByCategory(cat);

    if (pool.length === 0) {
      // No templates in this category — redistribute to studio_core
      console.warn(
        `[OneTake] No active templates in "${cat}" for profession "${profession}". ` +
          `Redistributing ${slots} slots to studio_core.`
      );
      allocation["studio_core"] = (allocation["studio_core"] ?? 0) + slots;
      continue;
    }

    if (pool.length < slots) {
      // Not enough unique templates — note surplus for redistribution
      surplusSlots.push({ category: cat, needed: slots, available: pool.length });
    }

    // Fisher-Yates shuffle
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Take what we need (cycle if pool is smaller than slots)
    for (let i = 0; i < slots; i++) {
      selected.push(shuffled[i % shuffled.length]);
    }
  }

  // 4. Handle surplus: if a category had fewer templates than needed,
  //    we already cycled within the pool. Log a warning.
  for (const surplus of surplusSlots) {
    console.warn(
      `[OneTake] Category "${surplus.category}" has only ${surplus.available} active templates ` +
        `but needs ${surplus.needed}. Cycling within pool. Consider adding more templates.`
    );
  }

  // 5. If we somehow have fewer than 30 (shouldn't happen), pad from studio_core
  if (selected.length < TOTAL) {
    const shortfall = TOTAL - selected.length;
    const studioPool = getActiveByCategory("studio_core");
    const shuffled = [...studioPool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    for (let i = 0; i < shortfall; i++) {
      selected.push(shuffled[i % shuffled.length]);
    }
    console.warn(
      `[OneTake] Padded ${shortfall} slots from studio_core to reach 30 total.`
    );
  }

  // 6. Shuffle the final selection to naturally intermix categories
  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }

  // 7. Resolve {outfit} placeholders → gender-appropriate text
  const resolved = selected.map((t) => {
    let prompt = t.prompt;
    if (t.outfitVariants && prompt.includes("{outfit}")) {
      const outfit = t.outfitVariants[gender];
      prompt = prompt.replace("{outfit}", outfit);
    }
    return { ...t, prompt };
  });

  // 8. Round-robin photo assignment
  const assignments: {
    photoIndex: number;
    promptId: string;
    prompt: string;
  }[] = [];

  for (let i = 0; i < resolved.length; i++) {
    assignments.push({
      photoIndex: i % photoCount,
      promptId: resolved[i].id,
      prompt: resolved[i].prompt,
    });
  }

  return assignments;
}

/**
 * Legacy v2 distribution — kept for backward compatibility.
 * Simply shuffles all active templates and takes 30.
 * Does NOT use profession weights or gender outfits.
 */
export function distributePrompts(
  photoCount: number,
  _plan: "starter" | "pro"
): { photoIndex: number; promptId: string; prompt: string }[] {
  const pool = getActiveTemplates();

  if (pool.length < 30) {
    console.warn(
      `[OneTake] Only ${pool.length} active templates available (need 30). ` +
        `Move some experimental templates to active, or add more.`
    );
  }

  // Fisher-Yates shuffle
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Take 30 (or as many as available, cycle if needed)
  const selected: PromptTemplate[] = [];
  for (let i = 0; i < 30; i++) {
    selected.push(shuffled[i % shuffled.length]);
  }

  // Round-robin photo assignment
  const assignments: {
    photoIndex: number;
    promptId: string;
    prompt: string;
  }[] = [];

  for (let i = 0; i < selected.length; i++) {
    assignments.push({
      photoIndex: i % photoCount,
      promptId: selected[i].id,
      prompt: selected[i].prompt,
    });
  }

  return assignments;
}

// ============================================================
// Style injection (beauty level)
// ============================================================

export function getStyleInjection(
  style: "natural" | "balanced" | "polished"
): string {
  const injections: Record<string, string> = {
    natural:
      "natural skin texture, visible pores, minimal retouching, photorealistic, no beauty filter, keep original facial features",
    balanced:
      "subtle skin refinement, flattering studio lighting, natural-looking enhancement, professional retouch",
    polished:
      "beauty lighting, smooth skin subtle, polished professional look, soft glamour, magazine quality",
  };
  return injections[style];
}

/**
 * Combine a template prompt with the style (beauty) injection
 * and universal quality/identity-preservation tags.
 */
export function buildFinalPrompt(
  basePrompt: string,
  style: "natural" | "balanced" | "polished"
): string {
  const styleInjection = getStyleInjection(style);
  return [
    basePrompt,
    styleInjection,
    // Photorealism & identity preservation
    "photorealistic, hyperrealistic, professional headshot photography",
    "exact facial identity preservation, same person as reference image",
    "natural skin texture, no plastic skin, no AI look, authentic human appearance",
    "masterpiece, 8K detail, professional studio lighting, tack-sharp focus",
  ].join(", ");
}

// ============================================================
// Template management — call these when reviewing outputs
// ============================================================

/**
 * Mark a template's performance after reviewing real outputs.
 * Use "poor" → then deprecateTemplate() to remove from rotation.
 */
export function rateTemplate(
  id: string,
  performance: TemplatePerformance
): void {
  const t = MASTER_TEMPLATES.find((t) => t.id === id);
  if (t) {
    t.performance = performance;
    console.log(`[OneTake] Template "${id}" rated: ${performance}`);
  }
}

/** Remove a template from active rotation (kept for reference). */
export function deprecateTemplate(id: string): void {
  const t = MASTER_TEMPLATES.find((t) => t.id === id);
  if (t) {
    t.status = "deprecated";
    console.log(`[OneTake] Template "${id}" deprecated`);
  }
}

/** Promote an experimental template to active. */
export function activateTemplate(id: string): void {
  const t = MASTER_TEMPLATES.find((t) => t.id === id);
  if (t) {
    t.status = "active";
    console.log(`[OneTake] Template "${id}" activated`);
  }
}

/** Get stats about the template pool. */
export function getTemplateStats(): {
  total: number;
  active: number;
  experimental: number;
  deprecated: number;
  byPerformance: Record<TemplatePerformance, number>;
  byCategory: Record<PromptCategory, { total: number; active: number }>;
} {
  const byPerformance: Record<TemplatePerformance, number> = {
    untested: 0,
    good: 0,
    mixed: 0,
    poor: 0,
  };
  const byCategory: Record<PromptCategory, { total: number; active: number }> = {
    studio_core: { total: 0, active: 0 },
    office: { total: 0, active: 0 },
    medical_env: { total: 0, active: 0 },
    legal_env: { total: 0, active: 0 },
    academic_env: { total: 0, active: 0 },
    lifestyle: { total: 0, active: 0 },
  };
  for (const t of MASTER_TEMPLATES) {
    byPerformance[t.performance]++;
    byCategory[t.category].total++;
    if (t.status === "active") byCategory[t.category].active++;
  }
  return {
    total: MASTER_TEMPLATES.length,
    active: MASTER_TEMPLATES.filter((t) => t.status === "active").length,
    experimental: MASTER_TEMPLATES.filter(
      (t) => t.status === "experimental"
    ).length,
    deprecated: MASTER_TEMPLATES.filter(
      (t) => t.status === "deprecated"
    ).length,
    byPerformance,
    byCategory,
  };
}
