/**
 * Use-case landing page content.
 * Each entry powers a /use-cases/[slug] page.
 *
 * SEO strategy: target long-tail profession-specific keywords
 * like "AI headshots for LinkedIn", "corporate headshot AI", etc.
 */

export interface UseCaseData {
  slug: string;
  /** Page title — also used as <h1> */
  title: string;
  /** Meta description — keep under 160 chars */
  description: string;
  /** Primary keywords for this page */
  keywords: string[];
  /** Hero badge text (e.g. "For LinkedIn Professionals") */
  badge: string;
  /** Hero headline (the bold part above subtitle) */
  headline: string;
  /** Hero subtitle */
  subtitle: string;
  /** Benefits section heading */
  benefitsHeading: string;
  /** 3 benefits */
  benefits: { title: string; body: string }[];
  /** FAQ entries (3 per use case) */
  faqs: { q: string; a: string }[];
  /** Image indices from /images/landing/example-{n}.jpg to feature (1-based) */
  exampleImages: number[];
}

export const useCases: UseCaseData[] = [
  {
    slug: "linkedin-headshots",
    title: "AI LinkedIn Headshots — Professional Profile Photos in Minutes",
    description:
      "Get AI-generated LinkedIn headshots that actually look like you. Upload 1 photo, get 30 professional profile pictures perfect for LinkedIn, resumes, and networking. $19.",
    keywords: [
      "AI LinkedIn headshots",
      "LinkedIn profile photo AI",
      "professional LinkedIn picture generator",
      "AI headshots for LinkedIn",
      "LinkedIn photo generator",
    ],
    badge: "For LinkedIn Professionals",
    headline: "A LinkedIn photo that gets you noticed.",
    subtitle:
      "Recruiters form an impression in 0.05 seconds. OneTake gives you a studio-quality LinkedIn headshot that conveys competence and approachability — without spending $200+ on a photographer.",
    benefitsHeading: "Why professionals choose OneTake for LinkedIn",
    benefits: [
      {
        title: "Optimized for the 400×400 crop",
        body: "LinkedIn displays your photo as a circle at small sizes. Our AI generates headshots with a clear face-centered composition that reads perfectly even at thumbnail size.",
      },
      {
        title: "Industry-appropriate backgrounds",
        body: "From modern glass offices to warm wood-paneled libraries — your LinkedIn headshot background matches your industry and seniority level.",
      },
      {
        title: "Multiple outfits, one session",
        body: "Get variations in different professional looks: business formal, smart casual, and creative professional. Use the right one for each context.",
      },
    ],
    faqs: [
      {
        q: "Are AI headshots good enough for LinkedIn?",
        a: "Yes. Modern AI headshots from FLUX.2 are indistinguishable from real photos in most cases. Many professionals use AI headshots on LinkedIn and nobody can tell the difference — the key is a quality model like ours that prioritizes identity preservation.",
      },
      {
        q: "What should I wear for a LinkedIn headshot?",
        a: "It depends on your industry. Finance and law typically call for business formal (dark suit, tie). Tech and creative roles are fine with smart casual. Our Pro plan gives you 25 style variations so you get multiple outfit options in one batch.",
      },
      {
        q: "How quickly can I update my LinkedIn photo?",
        a: "Most orders complete in under 5 minutes. You'll get a download link — pick your favorite, upload to LinkedIn, and you're done. It's faster than booking a photographer, commuting, doing the shoot, and waiting for retouching.",
      },
    ],
    exampleImages: [1, 3, 5],
  },
  {
    slug: "corporate-headshots",
    title: "Corporate AI Headshots — Consistent Team Photos Without the Photoshoot",
    description:
      "Professional corporate AI headshots for teams and individuals. Upload 1 photo, get 30 boardroom-ready business headshots. Consistent quality across your entire organization. From $19/person.",
    keywords: [
      "corporate headshots AI",
      "business headshot generator",
      "AI corporate photography",
      "team headshots AI",
      "executive portrait AI",
    ],
    badge: "For Business Professionals",
    headline: "Boardroom-ready headshots for your entire team.",
    subtitle:
      "Consistent, professional corporate headshots at a fraction of the cost of traditional photography. Perfect for company websites, annual reports, conference materials, and press releases.",
    benefitsHeading: "Why companies choose OneTake for corporate headshots",
    benefits: [
      {
        title: "Consistent look across your entire team",
        body: "Traditional photography produces inconsistent results depending on lighting, photographer, and location. OneTake gives every team member the same studio-quality look — regardless of where they are.",
      },
      {
        title: "No scheduling, no travel, no hassle",
        body: "Your team is distributed? No problem. Each person uploads a photo from their phone. Everyone gets 30 professional headshots. No coordinating schedules, no booking studio time.",
      },
      {
        title: "Enterprise-ready pricing",
        body: "Contact us for team pricing with volume discounts. We'll ensure consistent style, background, and quality across your entire organization — from 5 to 5,000 employees.",
      },
    ],
    faqs: [
      {
        q: "Can I get consistent headshots for my entire team?",
        a: "Yes. Contact us for team pricing and we'll set up a custom style profile that ensures every team member gets headshots with matching backgrounds, lighting, and aesthetic. Perfect for 'Our Team' pages.",
      },
      {
        q: "Are AI corporate headshots acceptable for board-level use?",
        a: "Absolutely. Our FLUX.2 max model produces headshots that are indistinguishable from professional studio photography. Many Fortune 500 employees use AI headshots for internal directories, LinkedIn, and even annual reports.",
      },
      {
        q: "How do you handle different face shapes, skin tones, and features?",
        a: "Our AI is trained on diverse datasets and we've optimized our prompts to produce natural, flattering results for all skin tones and facial features. We don't apply one-size-fits-all beauty filters.",
      },
    ],
    exampleImages: [2, 8, 10],
  },
  {
    slug: "actor-headshots",
    title: "AI Actor Headshots — Casting-Ready Photos in Minutes",
    description:
      "AI-generated actor headshots that showcase your range. Upload 1 photo, get 30 casting-ready looks with different characters, moods, and styles. $19. Perfect for auditions and portfolios.",
    keywords: [
      "AI actor headshots",
      "headshot generator for actors",
      "casting headshots AI",
      "AI acting portfolio photos",
      "character headshot generator",
    ],
    badge: "For Actors & Performers",
    headline: "Show casting directors your range — instantly.",
    subtitle:
      "A great headshot gets you in the room. OneTake generates actor headshots across different characters, moods, and looks — so you can submit the right one for every role.",
    benefitsHeading: "Why actors choose OneTake for headshots",
    benefits: [
      {
        title: "Multiple character looks from one photo",
        body: "Submit for a corporate commercial, a gritty drama, and a period piece — each with a different headshot that matches the role. Our Pro plan gives you 25 distinct styles.",
      },
      {
        title: "Always current, always fresh",
        body: "Industry standard says update headshots every 2 years. With OneTake, you can refresh your portfolio anytime for $19 — no $500+ photographer sessions.",
      },
      {
        title: "Natural range, not AI distortion",
        body: "We don't change your face — we change the context around it. Different lighting, wardrobe, and mood while keeping your features 100% recognizable to casting directors.",
      },
    ],
    faqs: [
      {
        q: "Do casting directors accept AI headshots?",
        a: "Yes — as long as they actually look like you. The industry standard is that headshots must accurately represent your current appearance. OneTake prioritizes identity preservation so your headshots are genuine enough for any casting call.",
      },
      {
        q: "How many different looks can I get?",
        a: "Our Pro plan delivers 25 style variations spanning different outfits, backgrounds, lighting setups, and moods — from warm commercial smiles to dramatic theatrical intensity.",
      },
      {
        q: "Can I use OneTake headshots on Actors Access / Backstage?",
        a: "Yes. OneTake headshots meet the technical requirements for all major casting platforms. You get high-resolution JPEGs suitable for upload to Actors Access, Backstage, Casting Networks, and Spotlight.",
      },
    ],
    exampleImages: [4, 6, 12],
  },
  {
    slug: "realtor-headshots",
    title: "AI Realtor Headshots — Trust-Building Photos for Real Estate Agents",
    description:
      "Real estate agent AI headshots that build client trust. Upload 1 photo, get 30 professional realtor photos perfect for yard signs, business cards, Zillow, and MLS listings. $19.",
    keywords: [
      "realtor headshots AI",
      "real estate agent photo AI",
      "AI realtor photos",
      "real estate professional headshots",
      "agent photo generator",
    ],
    badge: "For Real Estate Professionals",
    headline: "The headshot that sells you before you say a word.",
    subtitle:
      "In real estate, you are the product. A professional, approachable headshot builds trust before the first showing. OneTake delivers realtor headshots that say 'I know this market' — without a $300 photoshoot.",
    benefitsHeading: "Why agents choose OneTake for real estate headshots",
    benefits: [
      {
        title: "Approachable yet authoritative",
        body: "Your headshot needs to say both 'I'm someone you can trust' and 'I know what I'm doing.' Our AI balances warmth with professionalism — perfect for client-facing real estate work.",
      },
      {
        title: "Consistent branding across platforms",
        body: "Same professional look on your Zillow profile, yard signs, business cards, email signature, and social media. Upload once, get 30 variations you can use everywhere.",
      },
      {
        title: "Seasonal and location-appropriate",
        body: "Get headshots with outdoor daytime lighting for summer listings, warm indoor shots for winter, and location-appropriate backgrounds — all from one upload.",
      },
    ],
    faqs: [
      {
        q: "What background works best for real estate headshots?",
        a: "Natural outdoor lighting with a slightly blurred background (trees, modern architecture) is the gold standard for real estate. Our AI generates exactly this — outdoor professional shots that feel authentic and approachable.",
      },
      {
        q: "Can I use the same headshot for Zillow, Realtor.com, and print?",
        a: "Yes. You get high-resolution images suitable for digital (Zillow, Realtor.com, LinkedIn) and print (business cards, yard signs, flyers, billboards). Multiple variations let you use different shots for different contexts.",
      },
      {
        q: "What should I wear for my real estate headshot?",
        a: "Smart casual typically works best — a blazer or well-fitted button-down projects professionalism without feeling stiff. Our Pro plan generates 25 variations so you'll see multiple outfit and style options.",
      },
    ],
    exampleImages: [7, 9, 11],
  },
];

export function getUseCase(slug: string): UseCaseData | undefined {
  return useCases.find((uc) => uc.slug === slug);
}
