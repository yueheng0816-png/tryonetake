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
  {
    slug: "lawyer-headshots",
    title: "AI Lawyer Headshots — Professional Portraits for Attorneys & Legal Professionals",
    description:
      "Professional AI headshots for lawyers, attorneys, and legal professionals. Upload 1 photo, get 30 courtroom-ready portraits. Trustworthy, authoritative, and natural. $19.",
    keywords: [
      "lawyer headshots AI",
      "attorney AI headshot",
      "legal professional portrait AI",
      "law firm headshot generator",
      "AI legal headshots",
    ],
    badge: "For Legal Professionals",
    headline: "A headshot that conveys trust and authority.",
    subtitle:
      "In law, credibility is everything. Your headshot should project confidence, competence, and approachability — whether for your firm's website, LinkedIn, bar association directory, or courtroom bio. OneTake delivers attorney headshots that command respect.",
    benefitsHeading: "Why legal professionals choose OneTake",
    benefits: [
      {
        title: "Trustworthy & authoritative look",
        body: "Our AI generates headshots with the right balance of warmth and gravitas — approachable enough for client relationships, authoritative enough for the courtroom and boardroom.",
      },
      {
        title: "Firm-consistent branding",
        body: "Every attorney at your firm gets the same professional quality — matching backgrounds, lighting, and aesthetic. No more inconsistent headshots from different photographers across offices.",
      },
      {
        title: "Professional yet approachable",
        body: "Clients choose a lawyer they trust. Our headshots avoid the overly stern 'mugshot' look — instead projecting competence with warmth, perfect for modern legal marketing.",
      },
    ],
    faqs: [
      {
        q: "Are AI headshots professional enough for law firm websites?",
        a: "Absolutely. Our FLUX.2 model generates headshots indistinguishable from professional studio photography. Many attorneys use AI headshots on firm websites, LinkedIn, and bar association profiles without anyone knowing the difference.",
      },
      {
        q: "What background works best for legal headshots?",
        a: "For corporate law, a modern office or library background conveys sophistication. For solo practitioners and family law, a warmer, approachable background works well. Our Pro plan gives you 25 variations so you can choose the right look for your practice area.",
      },
      {
        q: "Can I get matching headshots for my entire law firm?",
        a: "Yes. Contact us for team pricing and we'll set up a custom style profile ensuring every attorney gets consistent, professional headshots — whether your firm has 5 lawyers or 500.",
      },
    ],
    exampleImages: [1, 4, 8],
  },
  {
    slug: "healthcare-headshots",
    title: "AI Healthcare Professional Headshots — Doctors, Nurses & Medical Staff Photos",
    description:
      "Professional AI headshots for doctors, nurses, and healthcare professionals. Upload 1 photo, get 30 portraits perfect for hospital directories, Doximity, LinkedIn, and telehealth profiles. $19.",
    keywords: [
      "doctor headshots AI",
      "nurse professional photo AI",
      "healthcare headshot generator",
      "medical professional portrait AI",
      "Doximity profile photo AI",
      "telehealth headshot",
    ],
    badge: "For Healthcare Professionals",
    headline: "A headshot your patients can trust — before they walk through the door.",
    subtitle:
      "In healthcare, the patient relationship starts before the first appointment. Your headshot on the hospital website, Doximity, or telehealth platform is often the first impression patients have of you. Make it a good one — professional, warm, and reassuring.",
    benefitsHeading: "Why healthcare professionals choose OneTake",
    benefits: [
      {
        title: "Warm & reassuring presence",
        body: "Patients want a provider who's both competent and caring. Our AI generates headshots that balance clinical professionalism with genuine warmth — exactly what patients look for when choosing a doctor.",
      },
      {
        title: "Consistency across all platforms",
        body: "Same professional look on your hospital directory, Doximity, LinkedIn, Healthgrades, and telehealth profiles. Upload once, get 30 variations optimized for every platform.",
      },
      {
        title: "Multiple looks: coat on & off",
        body: "Get variations with a white coat for clinical settings and smart professional attire for conferences, LinkedIn, and speaking engagements — all from one upload.",
      },
    ],
    faqs: [
      {
        q: "Should I wear a white coat in my medical headshot?",
        a: "It depends on your specialty and context. Surgeons and hospitalists often prefer the white coat for clinical credibility. Primary care and pediatricians may choose smart professional attire for approachability. Our Pro plan gives you both options in one batch.",
      },
      {
        q: "Are AI headshots acceptable for hospital credentialing?",
        a: "For most hospital directories and professional profiles (Doximity, Healthgrades, LinkedIn) — yes. AI headshots from OneTake are high-resolution and indistinguishable from studio photos. They should not be used for official medical licensing or identification documents.",
      },
      {
        q: "How quickly can I update my Doximity profile photo?",
        a: "Most orders complete in under 5 minutes. Download your favorite, upload to Doximity, LinkedIn, and your hospital directory — done. Perfect for new residents, fellows, and attending physicians updating their professional presence.",
      },
    ],
    exampleImages: [2, 5, 10],
  },
  {
    slug: "remote-work-headshots",
    title: "AI Remote Work Headshots — Professional Photos for Distributed Teams & Freelancers",
    description:
      "Professional AI headshots for remote workers, freelancers, and digital nomads. Upload 1 photo from home, get 30 studio-quality portraits. Perfect for Zoom, Slack, LinkedIn, and freelance platforms. $19.",
    keywords: [
      "remote worker headshot AI",
      "freelancer professional photo",
      "digital nomad headshot",
      "work from home headshot",
      "Zoom profile photo AI",
      "Upwork profile picture AI",
    ],
    badge: "For Remote Professionals",
    headline: "Studio-quality headshots — no commute to a photographer required.",
    subtitle:
      "You work from anywhere. Why should your headshot require a trip to a photo studio? OneTake gives remote workers, freelancers, and distributed teams professional headshots that match the quality of any in-office employee — without ever leaving your home office.",
    benefitsHeading: "Why remote professionals choose OneTake",
    benefits: [
      {
        title: "Anywhere, anytime — like your work",
        body: "You don't commute to an office. Don't commute to a photographer. Upload a selfie from your home, co-working space, or anywhere with good light. Get professional results in 5 minutes.",
      },
      {
        title: "Stand out on freelance platforms",
        body: "A professional headshot on Upwork, Fiverr, or Toptal can increase your hire rate significantly. Clients judge credibility in seconds — a studio-quality photo signals you're a serious professional.",
      },
      {
        title: "Consistent team look, no matter where people are",
        body: "Your team is spread across 5 time zones? Each person uploads from their phone. Everyone gets professional headshots with matching quality — unified brand presence without the logistics nightmare.",
      },
    ],
    faqs: [
      {
        q: "Can I get a professional headshot from a selfie taken at home?",
        a: "Yes — that's exactly what OneTake is built for. Upload a well-lit selfie (natural window light works great) and our AI generates 30 studio-quality headshots with professional backgrounds, lighting, and attire.",
      },
      {
        q: "How important is a headshot for freelance platforms like Upwork?",
        a: "Very. Studies show freelancers with professional photos get hired more often and can command higher rates. Your profile photo is often the first thing clients see — a professional headshot signals reliability and quality before they even read your proposal.",
      },
      {
        q: "Can our entire distributed team get matching headshots?",
        a: "Yes. Contact us for team pricing. We'll create a consistent style profile so every team member — from the CEO to the newest hire — gets matching professional headshots, regardless of where they're located.",
      },
    ],
    exampleImages: [3, 6, 11],
  },
  {
    slug: "consultant-headshots",
    title: "AI Consultant Headshots — Professional Photos for Management & Strategy Consultants",
    description:
      "Professional AI headshots for management consultants, strategy advisors, and independent consultants. Upload 1 photo, get 30 boardroom-ready portraits. Perfect for firm websites, LinkedIn, and client proposals. $19.",
    keywords: [
      "consultant headshots AI",
      "management consultant photo",
      "strategy consultant portrait AI",
      "business consultant headshot",
      "McKinsey BCG Bain headshot style",
      "professional consulting photo",
    ],
    badge: "For Consultants & Advisors",
    headline: "The headshot that says 'I can solve your toughest problems.'",
    subtitle:
      "As a consultant, you sell expertise and trust. Your headshot needs to convey intelligence, confidence, and executive presence — whether you're at MBB, Big 4, or an independent advisory firm. OneTake delivers consultant-grade portraits that match the caliber of your work.",
    benefitsHeading: "Why consultants choose OneTake",
    benefits: [
      {
        title: "Executive presence & polish",
        body: "Consultants are judged on perceived competence in seconds. Our AI generates headshots with the executive polish that clients expect from high-end advisory firms — confident, capable, and boardroom-ready.",
      },
      {
        title: "Firm-appropriate variety",
        body: "Get variations suitable for different contexts: formal for client proposals and firm website, approachable for LinkedIn thought leadership, and everything in between.",
      },
      {
        title: "Always current for client meetings",
        body: "Your consulting engagements change every few months. Keep your headshot fresh and current without booking a new photographer each time. $19, 5 minutes, done.",
      },
    ],
    faqs: [
      {
        q: "What style of headshot works best for management consulting?",
        a: "Clean, confident, and polished — dark suit or blazer, neutral or modern office background. Avoid anything too casual or too stiff. Our AI gets this balance right, producing headshots that would fit right in on any MBB or Big 4 firm page.",
      },
      {
        q: "Can I get different outfits for different client contexts?",
        a: "Yes. Our Pro plan (25 variations) gives you multiple outfit options — from formal business attire for client proposals to smart casual for internal team pages and LinkedIn content.",
      },
      {
        q: "I'm an independent consultant — is this worth the investment?",
        a: "At $19 vs $300-500 for a traditional photographer, it's not just worth it — it's a no-brainer. As an independent consultant, your personal brand is everything. A professional headshot on your website, LinkedIn, and proposals signals you operate at a high level.",
      },
    ],
    exampleImages: [2, 7, 12],
  },
];

export function getUseCase(slug: string): UseCaseData | undefined {
  return useCases.find((uc) => uc.slug === slug);
}
