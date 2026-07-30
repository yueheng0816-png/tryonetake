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
      "Get AI-generated LinkedIn headshots that actually look like you. Upload 1 photo, get 30 professional profile pictures perfect for LinkedIn, resumes, and networking. Try free.",
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
      "Recruiters form an impression in 0.05 seconds. TryOneTake gives you a studio-quality LinkedIn headshot that conveys competence and approachability — without spending $200+ on a photographer.",
    benefitsHeading: "Why professionals choose TryOneTake for LinkedIn",
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
      "Professional corporate AI headshots for teams and individuals. Upload 1 photo, get 30 boardroom-ready business headshots. Consistent quality across your entire organization. Try free.",
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
    benefitsHeading: "Why companies choose TryOneTake for corporate headshots",
    benefits: [
      {
        title: "Consistent look across your entire team",
        body: "Traditional photography produces inconsistent results depending on lighting, photographer, and location. TryOneTake gives every team member the same studio-quality look — regardless of where they are.",
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
      "AI-generated actor headshots that showcase your range. Upload 1 photo, get 30 casting-ready looks with different characters, moods, and styles. Try free. Perfect for auditions and portfolios.",
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
      "A great headshot gets you in the room. TryOneTake generates actor headshots across different characters, moods, and looks — so you can submit the right one for every role.",
    benefitsHeading: "Why actors choose TryOneTake for headshots",
    benefits: [
      {
        title: "Multiple character looks from one photo",
        body: "Submit for a corporate commercial, a gritty drama, and a period piece — each with a different headshot that matches the role. Our Pro plan gives you 25 distinct styles.",
      },
      {
        title: "Always current, always fresh",
        body: "Industry standard says update headshots every 2 years. With TryOneTake, you can refresh your portfolio anytime — try free first — no $500+ photographer sessions.",
      },
      {
        title: "Natural range, not AI distortion",
        body: "We don't change your face — we change the context around it. Different lighting, wardrobe, and mood while keeping your features 100% recognizable to casting directors.",
      },
    ],
    faqs: [
      {
        q: "Do casting directors accept AI headshots?",
        a: "Yes — as long as they actually look like you. The industry standard is that headshots must accurately represent your current appearance. TryOneTake prioritizes identity preservation so your headshots are genuine enough for any casting call.",
      },
      {
        q: "How many different looks can I get?",
        a: "Our Pro plan delivers 25 style variations spanning different outfits, backgrounds, lighting setups, and moods — from warm commercial smiles to dramatic theatrical intensity.",
      },
      {
        q: "Can I use TryOneTake headshots on Actors Access / Backstage?",
        a: "Yes. TryOneTake headshots meet the technical requirements for all major casting platforms. You get high-resolution JPEGs suitable for upload to Actors Access, Backstage, Casting Networks, and Spotlight.",
      },
    ],
    exampleImages: [4, 6, 12],
  },
  {
    slug: "realtor-headshots",
    title: "AI Realtor Headshots — Trust-Building Photos for Real Estate Agents",
    description:
      "Real estate agent AI headshots that build client trust. Upload 1 photo, get 30 professional realtor photos perfect for yard signs, business cards, Zillow, and MLS listings. Try free.",
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
      "In real estate, you are the product. A professional, approachable headshot builds trust before the first showing. TryOneTake delivers realtor headshots that say 'I know this market' — without a $300 photoshoot.",
    benefitsHeading: "Why agents choose TryOneTake for real estate headshots",
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
      "Professional AI headshots for lawyers, attorneys, and legal professionals. Upload 1 photo, get 30 courtroom-ready portraits. Trustworthy, authoritative, and natural. Try free.",
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
      "In law, credibility is everything. Your headshot should project confidence, competence, and approachability — whether for your firm's website, LinkedIn, bar association directory, or courtroom bio. TryOneTake delivers attorney headshots that command respect.",
    benefitsHeading: "Why legal professionals choose TryOneTake",
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
      "Professional AI headshots for doctors, nurses, and healthcare professionals. Upload 1 photo, get 30 portraits perfect for hospital directories, Doximity, LinkedIn, and telehealth profiles. Try free.",
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
    benefitsHeading: "Why healthcare professionals choose TryOneTake",
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
        a: "For most hospital directories and professional profiles (Doximity, Healthgrades, LinkedIn) — yes. AI headshots from TryOneTake are high-resolution and indistinguishable from studio photos. They should not be used for official medical licensing or identification documents.",
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
      "Professional AI headshots for remote workers, freelancers, and digital nomads. Upload 1 photo from home, get 30 studio-quality portraits. Perfect for Zoom, Slack, LinkedIn, and freelance platforms. Try free.",
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
      "You work from anywhere. Why should your headshot require a trip to a photo studio? TryOneTake gives remote workers, freelancers, and distributed teams professional headshots that match the quality of any in-office employee — without ever leaving your home office.",
    benefitsHeading: "Why remote professionals choose TryOneTake",
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
        a: "Yes — that's exactly what TryOneTake is built for. Upload a well-lit selfie (natural window light works great) and our AI generates 30 studio-quality headshots with professional backgrounds, lighting, and attire.",
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
      "Professional AI headshots for management consultants, strategy advisors, and independent consultants. Upload 1 photo, get 30 boardroom-ready portraits. Perfect for firm websites, LinkedIn, and client proposals. Try free.",
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
      "As a consultant, you sell expertise and trust. Your headshot needs to convey intelligence, confidence, and executive presence — whether you're at MBB, Big 4, or an independent advisory firm. TryOneTake delivers consultant-grade portraits that match the caliber of your work.",
    benefitsHeading: "Why consultants choose TryOneTake",
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
        body: "Your consulting engagements change every few months. Keep your headshot fresh and current without booking a new photographer each time. try free, 5 minutes, done.",
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
        a: "Try free vs $300-500 for a traditional photographer, it's not just worth it — it's a no-brainer. As an independent consultant, your personal brand is everything. A professional headshot on your website, LinkedIn, and proposals signals you operate at a high level.",
      },
    ],
    exampleImages: [2, 7, 12],
  },
  {
    slug: "education-headshots",
    title: "AI Teacher Headshots — Professional Photos for Educators & School Faculty",
    description:
      "Professional AI headshots for teachers, school administrators, and education professionals. Upload 1 photo, get 30 classroom-ready portraits. Warm, approachable, and trustworthy. Try free.",
    keywords: [
      "teacher headshots AI",
      "educator professional photo",
      "school faculty portraits AI",
      "teacher LinkedIn photo",
      "K-12 educator headshot",
      "classroom teacher profile picture",
    ],
    badge: "For Educators & Teachers",
    headline: "A headshot as warm and dedicated as your teaching.",
    subtitle:
      "Great teachers shape lives. Your headshot should reflect the warmth, dedication, and professionalism you bring to the classroom every day. TryOneTake delivers educator portraits that students, parents, and colleagues trust at a glance.",
    benefitsHeading: "Why educators choose TryOneTake",
    benefits: [
      {
        title: "Warm & approachable presence",
        body: "Parents trust teachers who look both competent and caring. Our AI generates headshots that balance professional credibility with the warmth that makes students feel safe and welcomed.",
      },
      {
        title: "School-appropriate backgrounds",
        body: "From bright modern classrooms and colorful libraries to sunny school entrances — your headshot backgrounds match the education environment, not corporate boardrooms.",
      },
      {
        title: "Consistent faculty page photos",
        body: "Every teacher on your school's website gets the same professional quality. No more mismatched selfies and cropped family photos on the faculty directory page.",
      },
    ],
    faqs: [
      {
        q: "Are AI headshots appropriate for teacher profile photos?",
        a: "Yes. Modern AI headshots from FLUX.2 are indistinguishable from real photos. Many teachers use them on school websites, LinkedIn, and education conference profiles. The key is a warm, approachable result — which our education-specific templates prioritize.",
      },
      {
        q: "What background works best for teacher headshots?",
        a: "A bright classroom, school library, or outdoor campus setting works best — conveying the education environment without being distracting. TryOneTake's education templates generate exactly these settings, giving you a professional yet context-appropriate look.",
      },
      {
        q: "Can our entire school faculty get matching headshots?",
        a: "Yes. Contact us for school pricing with volume discounts. We'll set up a consistent style profile so every teacher and staff member gets professional headshots with matching quality — perfect for school websites and yearbooks.",
      },
    ],
    exampleImages: [1, 5, 10],
  },
  {
    slug: "engineering-headshots",
    title: "AI Engineer Headshots — Professional Photos for Engineers & Technical Professionals",
    description:
      "Professional AI headshots for engineers, technicians, and STEM professionals. Upload 1 photo, get 30 portraits perfect for LinkedIn, company websites, and conference presentations. Try free.",
    keywords: [
      "engineer headshots AI",
      "engineering professional photo",
      "technical professional portrait AI",
      "STEM professional headshot",
      "engineer LinkedIn photo",
      "manufacturing engineer profile picture",
    ],
    badge: "For Engineers & Technical Pros",
    headline: "A headshot as precise and capable as your work.",
    subtitle:
      "Engineers solve the world's hardest problems. Your headshot should reflect the competence, precision, and innovation you bring to every project — whether you're in software, civil, mechanical, electrical, or any engineering discipline.",
    benefitsHeading: "Why engineers choose TryOneTake",
    benefits: [
      {
        title: "Competent & capable presence",
        body: "Your headshot should say 'I know what I'm doing' without looking like a stock photo. Our AI generates portraits that convey technical expertise and reliability — perfect for LinkedIn, conference bios, and project proposals.",
      },
      {
        title: "Technical environment backgrounds",
        body: "From modern labs and design studios to industrial facilities and field sites — your headshot backgrounds match the engineering world. No generic corporate backdrops that feel disconnected from your daily work.",
      },
      {
        title: "Clean, no-fuss professional look",
        body: "Engineers value function over fashion. Our AI delivers polished, professional headshots without the overly styled, beauty-filtered look that feels inauthentic to technical professionals.",
      },
    ],
    faqs: [
      {
        q: "What should an engineer wear for a professional headshot?",
        a: "For most engineering roles, smart casual or business casual works best — a clean button-down or polo, optionally with a blazer. Full suits can feel too formal for many engineering environments. TryOneTake gives you multiple outfit variations to choose from.",
      },
      {
        q: "Do AI headshots work for technical conferences and speaking engagements?",
        a: "Yes. AI headshots from TryOneTake are high-resolution and professional enough for conference speaker pages, IEEE profiles, LinkedIn, and company leadership pages. They're indistinguishable from studio photography in professional contexts.",
      },
      {
        q: "Can I get headshots with an engineering lab or workspace background?",
        a: "Yes. Our engineering-specific templates include lab environments, design studios, and industrial settings — backgrounds that feel authentic to your profession rather than generic office backdrops.",
      },
    ],
    exampleImages: [3, 4, 9],
  },
  {
    slug: "government-headshots",
    title: "AI Government & Public Service Headshots — Professional Official Photos",
    description:
      "Professional AI headshots for government employees, public servants, and civil service professionals. Upload 1 photo, get 30 official portraits. Trustworthy, professional, and appropriate for public sector roles. Try free.",
    keywords: [
      "government employee headshot AI",
      "public service professional photo",
      "civil servant portrait AI",
      "government official headshot",
      "public sector LinkedIn photo",
      "municipal employee profile picture",
    ],
    badge: "For Public Service Professionals",
    headline: "A headshot that conveys trust, service, and professionalism.",
    subtitle:
      "Public servants work for the common good. Your headshot should project trustworthiness, dedication, and professional competence — whether you serve at the federal, state, or local level. TryOneTake delivers official portraits appropriate for government contexts.",
    benefitsHeading: "Why public service professionals choose TryOneTake",
    benefits: [
      {
        title: "Trustworthy & official presence",
        body: "Government roles require projecting integrity and reliability. Our AI generates headshots that convey official professionalism without looking cold or unapproachable — the right tone for public-facing roles.",
      },
      {
        title: "Appropriate for all government contexts",
        body: "From agency websites and official directories to LinkedIn and conference materials — your headshot maintains a consistent, professional standard across every platform where constituents encounter you.",
      },
      {
        title: "Cost-effective for public budgets",
        body: "Free to try vs $200+ for traditional photography, AI headshots respect public sector budget constraints while delivering professional-quality results for entire departments and agencies.",
      },
    ],
    faqs: [
      {
        q: "Are AI headshots appropriate for government official use?",
        a: "For agency websites, professional directories, LinkedIn, and conference materials — yes. Modern AI headshots from FLUX.2 are indistinguishable from studio photos. They should not be used for official identification documents (passport, driver's license, security badge).",
      },
      {
        q: "What's the appropriate dress code for government headshots?",
        a: "Business formal or business professional is standard for most government roles — dark suit, conservative tie, professional blouse or blazer. TryOneTake generates multiple outfit options so you can choose what fits your agency's culture.",
      },
      {
        q: "Can our entire department get matching official headshots?",
        a: "Yes. Contact us for government agency pricing with volume discounts. We'll create a consistent style profile so every team member — from front desk to director — gets professional headshots with matching quality and appropriate official tone.",
      },
    ],
    exampleImages: [1, 6, 8],
  },
  {
    slug: "nurse-headshots",
    title: "AI Nurse Headshots — Professional Photos for Nursing Professionals",
    description:
      "Professional AI headshots for nurses, nursing students, and healthcare staff. Upload 1 photo, get 30 portraits perfect for hospital badges, LinkedIn, and nursing portfolios. Try free.",
    keywords: [
      "nurse headshots AI",
      "nursing professional photo",
      "RN headshot generator",
      "nurse LinkedIn photo",
      "healthcare staff portrait AI",
      "nursing student headshot",
    ],
    badge: "For Nursing Professionals",
    headline: "A headshot as compassionate and capable as the care you provide.",
    subtitle:
      "Nurses are the backbone of healthcare — and your professional headshot should reflect the dedication, empathy, and competence you bring to every shift. TryOneTake delivers nurse portraits that patients and employers trust at a glance.",
    benefitsHeading: "Why nurses choose TryOneTake",
    benefits: [
      {
        title: "Warm, compassionate presence",
        body: "Nursing is built on trust and human connection. Our AI generates headshots that convey genuine warmth and clinical competence — perfect for hospital directories, LinkedIn, and nursing portfolios.",
      },
      {
        title: "Scrubs or professional attire — your choice",
        body: "Get variations in both clinical scrubs and business professional attire. Use the right look for your hospital badge, LinkedIn profile, conference presentation, or graduate school application.",
      },
      {
        title: "Fast & affordable for busy schedules",
        body: "Between 12-hour shifts, the last thing you need is a photographer appointment. Upload a selfie between shifts, get 30 professional headshots in 5 minutes. Try free — no credit card required.",
      },
    ],
    faqs: [
      {
        q: "Should I wear scrubs or business attire for my nursing headshot?",
        a: "It depends on the context. For hospital directories and badges, scrubs (solid color, no busy patterns) convey clinical authenticity. For LinkedIn and professional portfolios, business casual or a blazer projects career-advancement readiness. TryOneTake's Pro plan gives you both options.",
      },
      {
        q: "Are AI headshots acceptable for nursing school applications?",
        a: "Yes. A professional headshot strengthens your nursing school or graduate program application. AI headshots from TryOneTake are high-resolution and indistinguishable from studio photography — perfect for applications, portfolios, and clinical placement profiles.",
      },
      {
        q: "Can I update my headshot across all hospital platforms at once?",
        a: "Yes. Download your TryOneTake headshots and upload to your hospital directory, LinkedIn, Doximity, nursing association profile, and conference badges. You get 30 variations — pick the perfect one for each platform.",
      },
    ],
    exampleImages: [3, 7, 11],
  },
  {
    slug: "financial-advisor-headshots",
    title: "AI Financial Advisor Headshots — Trust-Building Portraits for Finance Professionals",
    description:
      "Professional AI headshots for financial advisors, wealth managers, and finance professionals. Upload 1 photo, get 30 portraits that convey trust, competence, and executive presence. Try free.",
    keywords: [
      "financial advisor headshots AI",
      "wealth manager professional photo",
      "finance professional portrait AI",
      "CFP headshot generator",
      "financial planner LinkedIn photo",
      "investment advisor profile picture",
    ],
    badge: "For Financial Professionals",
    headline: "The headshot that says 'your wealth is in good hands.'",
    subtitle:
      "In finance, trust is your most valuable asset. Clients decide whether to trust you with their life savings in seconds — and your headshot plays a pivotal role. TryOneTake delivers advisor portraits that convey integrity, competence, and executive presence.",
    benefitsHeading: "Why financial professionals choose TryOneTake",
    benefits: [
      {
        title: "Trust & credibility at a glance",
        body: "Research shows professional headshots significantly increase perceived trustworthiness. Our AI generates portraits that project the conservative confidence clients expect from someone managing their financial future.",
      },
      {
        title: "Boardroom-ready polish",
        body: "From client seminars and webinar bios to LinkedIn, company websites, and SEC-mandated disclosures — your headshot maintains consistent, executive-grade quality across every client touchpoint.",
      },
      {
        title: "Always current for compliance & marketing",
        body: "RIAs and advisors update Form ADV annually. Keep your headshot fresh for compliance materials, pitch books, and client newsletters without booking a photographer every year. Try free, 5 minutes, done.",
      },
    ],
    faqs: [
      {
        q: "What should a financial advisor wear for a professional headshot?",
        a: "Business formal is standard: dark suit, conservative tie or professional blouse, minimal jewelry. Navy and charcoal project authority and trust. TryOneTake generates multiple outfit variations so you can choose the right level of formality for your client base.",
      },
      {
        q: "Are AI headshots appropriate for SEC-registered advisors?",
        a: "Yes — for marketing materials, websites, LinkedIn, webinar bios, and client communications. They should accurately represent your current appearance. For official regulatory filings that specify photo requirements, verify with your compliance team. TryOneTake headshots are indistinguishable from studio photography.",
      },
      {
        q: "Can my entire advisory team get matching professional headshots?",
        a: "Yes. Contact us for team pricing with volume discounts. We'll create a consistent style profile so every advisor — from managing partners to associate planners — gets matching professional headshots with the same background and aesthetic.",
      },
    ],
    exampleImages: [2, 5, 8],
  },
  {
    slug: "recruiter-headshots",
    title: "AI Recruiter Headshots — Professional Photos for HR & Talent Acquisition",
    description:
      "Professional AI headshots for recruiters, HR professionals, and talent acquisition specialists. Upload 1 photo, get 30 portraits perfect for LinkedIn, company career pages, and recruiting events. Try free.",
    keywords: [
      "recruiter headshots AI",
      "HR professional photo",
      "talent acquisition portrait AI",
      "recruiter LinkedIn photo",
      "headhunter profile picture",
      "HR headshot generator",
    ],
    badge: "For Recruiters & HR Pros",
    headline: "You connect talent with opportunity. Your headshot should open doors too.",
    subtitle:
      "Recruiters and HR professionals are the face of their company to every candidate. A warm, professional headshot builds immediate rapport — whether you're reaching out on LinkedIn, speaking at a career fair, or featured on your company's careers page.",
    benefitsHeading: "Why recruiters choose TryOneTake",
    benefits: [
      {
        title: "Approachable & trustworthy",
        body: "Candidates need to feel comfortable with you from the first message. Our AI generates headshots that balance professional credibility with genuine warmth — the exact combination that gets more candidates to respond to your outreach.",
      },
      {
        title: "Consistent brand across platforms",
        body: "Same professional look on LinkedIn, your company careers page, Indeed company profile, Glassdoor, recruiting events, and conference speaker bios. 30 variations ensure the right image for every channel.",
      },
      {
        title: "Always ready for the next opportunity",
        body: "Recruiting is fast-paced. A new role opens, a career fair pops up, a speaking slot becomes available — your headshot is always ready. Try free vs $300+ for a traditional photographer session.",
      },
    ],
    faqs: [
      {
        q: "What makes a good headshot for a recruiter on LinkedIn?",
        a: "A recruiter's headshot should be warm and approachable — you want candidates to feel comfortable reaching out. Smart casual or business professional attire works well. Avoid overly formal or stiff looks; a genuine smile significantly increases response rates to InMail outreach.",
      },
      {
        q: "Can I use different headshots for different recruiting contexts?",
        a: "Yes. TryOneTake's Pro plan delivers 25 variations — use a more formal shot for executive recruiting, a warmer look for campus and early-career hiring, and a polished business shot for your LinkedIn profile and company page.",
      },
      {
        q: "I'm an independent recruiter — is this worth it for my solo practice?",
        a: "Absolutely. As an independent recruiter, your personal brand drives your entire business. A professional headshot across LinkedIn, your website, and email signature signals credibility to both candidates and client companies. Try free — it's a fraction of the cost of a single placement.",
      },
    ],
    exampleImages: [1, 6, 10],
  },
  {
    slug: "founder-headshots",
    title: "AI Founder Headshots — Executive Portraits for Entrepreneurs & Startup Leaders",
    description:
      "Professional AI headshots for founders, entrepreneurs, and startup leaders. Upload 1 photo, get 30 executive portraits perfect for pitch decks, LinkedIn, press features, and investor updates. Try free.",
    keywords: [
      "founder headshots AI",
      "entrepreneur professional photo",
      "startup founder portrait AI",
      "CEO headshot generator",
      "executive LinkedIn photo",
      "founder profile picture",
    ],
    badge: "For Founders & Entrepreneurs",
    headline: "Build trust with investors, customers, and talent — starting with your photo.",
    subtitle:
      "As a founder, you're always pitching: to investors, customers, partners, and potential hires. Your headshot appears on your pitch deck, LinkedIn, company about page, press features, and conference materials. Make it count — TryOneTake delivers founder portraits that match your ambition.",
    benefitsHeading: "Why founders choose TryOneTake",
    benefits: [
      {
        title: "Executive presence that matches your vision",
        body: "Whether you're raising a seed round or scaling to Series B, your headshot needs to project leadership and credibility. Our AI generates portraits with the polished executive presence that investors and stakeholders expect.",
      },
      {
        title: "One headshot, every channel",
        body: "Pitch decks, LinkedIn, TechCrunch features, conference speaker pages, your company's About page, investor updates, podcast guest bios — one batch of headshots covers every channel with consistent, professional quality.",
      },
      {
        title: "Move fast — like everything else you do",
        body: "You don't have time for a 2-hour photoshoot and a week of editing. Upload a selfie from your phone and get 30 executive headshots in 5 minutes. Try free — it's the fastest professional upgrade you'll make this quarter.",
      },
    ],
    faqs: [
      {
        q: "What kind of headshot should a startup founder use?",
        a: "It depends on your stage and industry. Early-stage B2B SaaS founders often opt for smart casual (button-down, no tie) to convey approachability. Fintech and enterprise founders lean business formal. TryOneTake gives you multiple options so you can match the right look to each context — from investor meetings to team all-hands.",
      },
      {
        q: "Can I use an AI headshot in my pitch deck?",
        a: "Absolutely. Investors care about your business, not whether you sat in a photo studio. A professional, high-quality headshot in your deck builds credibility. Many founders at top accelerators use AI headshots — the key is that it actually looks like you, which TryOneTake's identity preservation ensures.",
      },
      {
        q: "I'm launching on Product Hunt / TechCrunch — will this work for press?",
        a: "Yes. Press and media outlets need high-resolution headshots for feature articles. TryOneTake delivers professional-grade images suitable for digital publication. For print magazines, our Pro plan's FLUX.2 max generates the highest-resolution, most realistic output available.",
      },
    ],
    exampleImages: [2, 8, 12],
  },
  {
    slug: "sales-headshots",
    title: "AI Sales Professional Headshots — Trust-Building Photos That Close Deals",
    description:
      "Professional AI headshots for sales professionals, account executives, and business development reps. Upload 1 photo, get 30 portraits that build rapport before the first call. Try free.",
    keywords: [
      "sales professional headshots AI",
      "account executive photo",
      "business development portrait AI",
      "sales rep LinkedIn photo",
      "sales headshot generator",
      "B2B sales profile picture",
    ],
    badge: "For Sales Professionals",
    headline: "You have 0.05 seconds to make a first impression. Make it count.",
    subtitle:
      "In sales, you know the numbers: response rates, conversion rates, close rates. Here's one more: a professional headshot increases LinkedIn connection acceptance and email response rates. TryOneTake gives sales pros headshots that build trust before the first conversation.",
    benefitsHeading: "Why sales professionals choose TryOneTake",
    benefits: [
      {
        title: "Higher response rates, proven",
        body: "A professional, approachable headshot on LinkedIn and in your email signature increases connection acceptance and reply rates. Prospects decide whether to engage in a split second — your photo is the first thing they see.",
      },
      {
        title: "Tailored to your market",
        body: "Selling to enterprise? Get formal boardroom shots. Selling to SMBs? Smart casual works better. Selling to creatives? A more relaxed, authentic look. 30 variations mean you always have the right headshot for your prospect.",
      },
      {
        title: "Always ready for the next role or territory",
        body: "Sales territories change, companies change, LinkedIn stays. Keep your headshot current without booking a new photographer for every update. Try free, 5 minutes — spend the time you saved on prospecting.",
      },
    ],
    faqs: [
      {
        q: "Does a professional headshot actually improve sales response rates?",
        a: "Yes. Multiple studies confirm that LinkedIn profiles with professional photos receive significantly more connection requests and InMail responses. Your headshot is often the first thing a prospect sees — before your name, title, or message. It's one of the highest-ROI investments you can make in your sales career.",
      },
      {
        q: "What's the right headshot style for B2B sales?",
        a: "For enterprise and B2B sales, business professional with a confident, approachable expression works best. Avoid overly casual looks. For SMB and transactional sales, smart casual can build better rapport. TryOneTake's Pro plan gives you both styles so you can test what resonates.",
      },
      {
        q: "Can our entire sales team get consistent, branded headshots?",
        a: "Yes. Contact us for team pricing with volume discounts. We'll create a consistent style profile for your entire sales organization — from SDRs to VP of Sales — with matching backgrounds and quality. Perfect for your company's 'Meet the Team' page and email signature standardization.",
      },
    ],
    exampleImages: [4, 7, 9],
  },
  {
    slug: "team-headshots",
    title: "AI Team Headshots — Consistent Professional Photos for Your Entire Organization",
    description:
      "Professional AI team headshots with consistent quality across your entire organization. Upload 1 photo per person, get matching studio-quality portraits. Perfect for company websites, About pages, and investor decks. Try free.",
    keywords: [
      "team headshots AI",
      "company team photos AI",
      "corporate team headshots",
      "employee headshot generator",
      "matching team portraits AI",
      "organization headshots",
    ],
    badge: "For Teams & Organizations",
    headline: "One team. One look. Zero photoshoot logistics.",
    subtitle:
      "Your team is your greatest asset — but getting everyone a consistent, professional headshot is a logistical nightmare. Different schedules, locations, and photographers create a patchwork look. TryOneTake solves this: every team member uploads 1 photo, and everyone gets matching studio-quality headshots — whether you're 5 people or 5,000.",
    benefitsHeading: "Why organizations choose TryOneTake for team headshots",
    benefits: [
      {
        title: "Consistent quality — every person, every role",
        body: "Traditional team photos are a mixed bag: some shot in a studio, some cropped from weddings, some iPhone selfies. TryOneTake gives everyone the exact same professional look — matching backgrounds, lighting, and composition. Perfect for 'Our Team' pages and investor decks.",
      },
      {
        title: "Zero logistics, 100% coverage",
        body: "Remote team across 5 time zones? New hires joining monthly? No problem. Each person uploads from their phone, anywhere in the world. No scheduling, no travel, no studio booking, no follow-up emails chasing the 3 people who missed photo day.",
      },
      {
        title: "Enterprise-grade consistency at startup speed",
        body: "Set a style profile once — matching background, lighting, and aesthetic. Every current and future team member gets headshots that look like they were shot in the same studio by the same photographer. Volume discounts available; contact us for teams of 10+.",
      },
    ],
    faqs: [
      {
        q: "How do you ensure every team member's headshot looks consistent?",
        a: "Contact us for team onboarding and we'll set up a custom style profile: matching backgrounds, lighting setup, and overall aesthetic. Every team member uploads a selfie and our AI applies the same professional look to everyone. The result: headshots that look like they were all shot on the same day by the same photographer — even if your team spans 5 continents.",
      },
      {
        q: "How many people can be on a team plan?",
        a: "Any size — from a 5-person startup to a 5,000-person enterprise. Pricing includes volume discounts that scale with your team. We handle onboarding, style consistency, and delivery for organizations of any size. Contact us for a custom quote.",
      },
      {
        q: "How do you handle new hires after the initial team batch?",
        a: "We save your team's style profile. When new hires join, they simply upload a photo and get headshots that match the rest of the team — same background, same lighting, same quality. No need to re-shoot the entire team or wait for the next 'photo day.' Your About page stays current effortlessly.",
      },
    ],
    exampleImages: [2, 5, 10],
  },
  {
    slug: "therapist-headshots",
    title: "AI Therapist Headshots — Warm, Trust-Building Photos for Mental Health Professionals",
    description:
      "Professional AI headshots for therapists, counselors, psychologists, and mental health professionals. Upload 1 photo, get 30 portraits that convey warmth, empathy, and professionalism. Try free.",
    keywords: [
      "therapist headshots AI",
      "counselor professional photo",
      "psychologist portrait AI",
      "mental health professional headshot",
      "therapist LinkedIn photo",
      "LCSW LPC LMFT headshot",
    ],
    badge: "For Therapists & Counselors",
    headline: "A headshot as warm and trustworthy as your practice.",
    subtitle:
      "In therapy, the relationship is the treatment — and your headshot is often a potential client's first glimpse of who you are. It needs to convey warmth, empathy, and professional competence all at once. TryOneTake delivers therapist portraits that make people feel safe before the first session.",
    benefitsHeading: "Why therapists choose TryOneTake",
    benefits: [
      {
        title: "Warmth without losing professionalism",
        body: "Therapists need headshots that feel human and approachable — not cold or clinical. Our AI generates portraits with genuine warmth that invite trust, while maintaining the professional credibility clients look for when choosing a provider.",
      },
      {
        title: "Consistent across Psychology Today, directories & LinkedIn",
        body: "Your headshot appears on Psychology Today, TherapyDen, GoodTherapy, your practice website, and LinkedIn. Get 30 variations so every platform shows the best version of you — consistent, professional, and approachable.",
      },
      {
        title: "Private & convenient",
        body: "No studio visit, no photographer in your space, no scheduling around client hours. Upload a selfie from home between sessions, get results in 5 minutes. Try free — no credit card required.",
      },
    ],
    faqs: [
      {
        q: "What kind of headshot works best for a therapist or counselor?",
        a: "A warm, natural-looking portrait with soft lighting and a relaxed expression. Avoid overly formal or stiff poses — clients want to see someone they can open up to. Outdoor natural-light backgrounds or warm indoor settings work well. TryOneTake's therapist-specific templates generate exactly this look.",
      },
      {
        q: "Can I use AI headshots on Psychology Today and therapy directories?",
        a: "Yes. AI headshots from TryOneTake are high-resolution, professional, and indistinguishable from studio photography. They meet the image requirements for Psychology Today, TherapyDen, GoodTherapy, Zencare, and all major therapist directories. What matters is that the photo accurately represents you — which our identity preservation ensures.",
      },
      {
        q: "Should I smile in my therapist headshot?",
        a: "A gentle, natural smile works best — warm enough to feel approachable, professional enough to convey competence. Avoid forced or overly broad grins. TryOneTake generates multiple expression variations so you can choose the one that feels most authentic to you and your therapeutic approach.",
      },
    ],
    exampleImages: [1, 5, 10],
  },
  {
    slug: "student-headshots",
    title: "AI Student Headshots — Professional Photos for Students, MBAs & New Grads",
    description:
      "Professional AI headshots for students, MBA candidates, and new graduates. Upload 1 photo, get 30 polished portraits perfect for LinkedIn, Handshake, career fairs, and job applications. Try free.",
    keywords: [
      "student headshots AI",
      "MBA professional photo",
      "new grad headshot",
      "college student LinkedIn photo",
      "internship profile picture AI",
      "graduate headshot generator",
    ],
    badge: "For Students & New Grads",
    headline: "Your first professional headshot — before your first job interview.",
    subtitle:
      "As a student or recent grad, you're building your professional identity from scratch. A polished headshot on LinkedIn and Handshake signals to recruiters that you're serious and career-ready — even before you have years of experience to list. TryOneTake makes it affordable enough to fit a student budget.",
    benefitsHeading: "Why students choose TryOneTake",
    benefits: [
      {
        title: "Student-budget friendly",
        body: "Traditional headshot photographers charge $200–500 — a lot on a student budget. TryOneTake delivers 30 professional headshots starting at free (1 photo) or $19 for a full set. That's less than most textbooks.",
      },
      {
        title: "Career-fair ready, fast",
        body: "Got a career fair tomorrow? Upload a selfie tonight and have a polished headshot ready for your LinkedIn profile, Handshake, and printed resumes by morning. Under 5 minutes for most orders.",
      },
      {
        title: "Grows with your career",
        body: "Your first job, your MBA program, your post-grad network — your headshot needs evolve. With 30 variations (multiple outfits, backgrounds, styles), you'll have the right photo for every stage of your early career.",
      },
    ],
    faqs: [
      {
        q: "Do I really need a professional headshot as a student?",
        a: "Yes — and earlier than you think. Recruiters start screening candidates on LinkedIn as early as sophomore year. A professional headshot (vs a cropped party photo or no photo) significantly increases profile views and connection acceptance. It signals you're career-oriented — which matters when you don't have much work experience yet.",
      },
      {
        q: "What should a student or new grad wear for a headshot?",
        a: "Business casual is perfect — a button-down shirt, blouse, or blazer. No need for a full suit unless you're targeting investment banking or law. Solid, neutral colors photograph best. TryOneTake generates multiple outfit variations so you can see what works for your target industry.",
      },
      {
        q: "Can I use the same headshot for LinkedIn, Handshake, and career fairs?",
        a: "Yes — but having variations helps. Use a more formal shot for LinkedIn and career fair name tags, and a slightly more relaxed version for Handshake and personal portfolios. With 30 variations from TryOneTake, you'll have options for every platform and occasion.",
      },
    ],
    exampleImages: [3, 6, 9],
  },
  {
    slug: "fitness-trainer-headshots",
    title: "AI Fitness Trainer Headshots — Professional Photos for Coaches & Personal Trainers",
    description:
      "Professional AI headshots for fitness trainers, personal coaches, and wellness professionals. Upload 1 photo, get 30 portraits that convey energy, approachability, and expertise. Try free.",
    keywords: [
      "fitness trainer headshots AI",
      "personal trainer professional photo",
      "fitness coach portrait AI",
      "wellness professional headshot",
      "gym instructor LinkedIn photo",
      "health coach profile picture",
    ],
    badge: "For Fitness & Wellness Pros",
    headline: "A headshot that shows the energy you bring to every session.",
    subtitle:
      "As a fitness professional, you don't just sell workouts — you sell transformation, motivation, and trust. Your headshot needs to convey energy, health, and the approachable confidence that makes clients want to train with you. TryOneTake delivers trainer portraits that match your passion.",
    benefitsHeading: "Why fitness professionals choose TryOneTake",
    benefits: [
      {
        title: "Energy & approachability",
        body: "Clients choose a trainer they'd enjoy spending an hour with. Our AI generates portraits with the right balance of motivational energy and genuine warmth — the exact combination that attracts and retains clients.",
      },
      {
        title: "Multiple looks for multiple platforms",
        body: "Your Instagram needs a different vibe than your gym website bio or LinkedIn. Get 30 variations — from high-energy outdoor shots to polished studio portraits — so you always have the right image for the right channel.",
      },
      {
        title: "Always current with your fitness journey",
        body: "Your physique changes as you train. Keep your headshot current without booking a new photographer every few months. Try free vs $200+ for traditional sessions — spend that money on gym equipment instead.",
      },
    ],
    faqs: [
      {
        q: "What should a personal trainer wear for a headshot?",
        a: "Smart athletic wear works well — a fitted training shirt or athletic polo that shows you're in the fitness industry without looking like you just finished a workout. Some trainers prefer a more polished casual look (well-fitted tee or button-down) for their website and LinkedIn. TryOneTake gives you multiple outfit options so you can choose.",
      },
      {
        q: "Can I use AI headshots for my fitness Instagram and social media?",
        a: "Yes. A professional headshot strengthens your brand across Instagram, TikTok, YouTube thumbnails, your training website, and client onboarding materials. AI headshots from TryOneTake are high-resolution and suitable for all digital platforms.",
      },
      {
        q: "What background works best for a fitness trainer headshot?",
        a: "Natural outdoor settings (park, urban backdrop) or modern gym environments convey the active, energetic brand fitness professionals need. Avoid overly formal office backgrounds. TryOneTake's templates include outdoor, studio, and lifestyle-appropriate settings.",
      },
    ],
    exampleImages: [4, 7, 11],
  },
  {
    slug: "photographer-headshots",
    title: "AI Photographer Headshots — Professional Portraits for Photography Pros",
    description:
      "Professional AI headshots for photographers, videographers, and creative professionals. Upload 1 photo, get 30 studio-quality portraits. Perfect for your portfolio site, Instagram, LinkedIn, and client proposals. Try free.",
    keywords: [
      "photographer headshots AI",
      "photography professional photo",
      "videographer portrait AI",
      "creative professional headshot",
      "photographer LinkedIn photo",
      "photographer portfolio picture",
    ],
    badge: "For Photographers & Creatives",
    headline: "Even photographers need a great headshot — without the irony of hiring one.",
    subtitle:
      "You make everyone else look amazing behind your lens. But who takes the photographer's photo? TryOneTake solves the 'cobbler's children have no shoes' problem — giving photographers, videographers, and visual creatives a professional headshot without the awkwardness of hiring another photographer.",
    benefitsHeading: "Why photographers choose TryOneTake",
    benefits: [
      {
        title: "No awkward role reversal",
        body: "Being in front of the camera instead of behind it feels different. TryOneTake lets you stay behind the lens — upload a selfie on your terms, get 30 professional headshots without ever stepping into someone else's studio.",
      },
      {
        title: "Creative-control you'll appreciate",
        body: "You understand lighting, composition, and retouching better than anyone. Our AI generates 30 variations across different lighting setups, backgrounds, and styles — you pick what matches your creative brand. No explaining your vision to another photographer.",
      },
      {
        title: "Portfolio-consistent quality",
        body: "Your headshot sits alongside your best work on your portfolio site. It needs to match the quality you deliver to clients. TryOneTake's FLUX.2 max model produces images that hold up next to professional photography — because they are professional photography.",
      },
    ],
    faqs: [
      {
        q: "As a photographer, isn't it ironic to use AI headshots?",
        a: "Not at all. Photographers use tools that get the job done — AI is just another tool in the kit. Many professional photographers already use AI in their workflow (editing, culling, retouching). Using AI for your own headshot is practical, not ironic — it's the most efficient way to get a professional photo of yourself when you're always the one taking them.",
      },
      {
        q: "Will AI headshots match the quality of my photography portfolio?",
        a: "Yes. TryOneTake uses FLUX.2 — a state-of-the-art generative model that produces images indistinguishable from high-end studio photography. Your AI headshot will hold up visually alongside the professional work in your portfolio.",
      },
      {
        q: "Can I use these headshots on my photography business website?",
        a: "Absolutely. Your About page, contact page, Instagram profile, LinkedIn, and client proposals all benefit from a professional headshot. TryOneTake gives you 30 variations — choose the one that best represents your creative brand and visual style.",
      },
    ],
    exampleImages: [2, 5, 8],
  },
  {
    slug: "speaker-headshots",
    title: "AI Speaker Headshots — Professional Photos for Keynote Speakers & Presenters",
    description:
      "Professional AI headshots for keynote speakers, presenters, and public-speaking professionals. Upload 1 photo, get 30 stage-ready portraits. Perfect for speaker bureaus, conference programs, LinkedIn, and book covers. Try free.",
    keywords: [
      "speaker headshots AI",
      "keynote speaker professional photo",
      "presenter portrait AI",
      "public speaker headshot",
      "conference speaker photo",
      "TEDx speaker profile picture",
    ],
    badge: "For Speakers & Presenters",
    headline: "Before you take the stage, your headshot takes the audience.",
    subtitle:
      "As a speaker, your headshot appears everywhere: conference programs, speaker bureaus, event websites, book jackets, and LinkedIn. It needs to command attention and convey authority, charisma, and approachability — all in one frame. TryOneTake delivers speaker portraits that fill seats before you say a word.",
    benefitsHeading: "Why speakers choose TryOneTake",
    benefits: [
      {
        title: "Stage-ready presence",
        body: "Your headshot needs to project the same energy you bring to the stage — confident, engaging, and memorable. Our AI generates portraits with the executive presence and charisma that event organizers and speaker bureaus look for.",
      },
      {
        title: "One headshot, every channel",
        body: "Conference program → speaker bureau profile → LinkedIn → book jacket → podcast guest bio → media kit. One batch of 30 headshots covers every channel with consistent, professional quality. No more cropping the same photo 5 different ways.",
      },
      {
        title: "Always current for every gig",
        body: "Speaking engagements change — your headshot should too. Keep a fresh photo ready for every conference season and speaker reel update. Try free vs $300+ for a photographer — invest the savings in your next keynote prep.",
      },
    ],
    faqs: [
      {
        q: "What makes a good headshot for a keynote speaker?",
        a: "A keynote speaker's headshot should convey authority, energy, and approachability simultaneously. Direct eye contact, confident posture, and professional attire — with lighting that creates depth and presence. Avoid flat, passport-style photos. TryOneTake generates headshots that feel like they belong on a conference landing page.",
      },
      {
        q: "Can I use AI headshots on speaker bureau profiles and event websites?",
        a: "Yes. AI headshots from TryOneTake are high-resolution and indistinguishable from studio photography. They're fully suitable for speaker bureaus (NSB, GDA, AAE), conference websites, TEDx applications, and event marketing materials. Event organizers care about your expertise, not how your photo was taken.",
      },
      {
        q: "Should my speaker headshot be formal or casual?",
        a: "It depends on your niche. Corporate keynote speakers typically use business formal (suit/blazer). Motivational speakers and authors often go business casual — approachable and relatable. Tech speakers lean smart casual. TryOneTake gives you 25-30 variations so you can choose the right tone for your speaking brand.",
      },
    ],
    exampleImages: [1, 6, 12],
  },
  {
    slug: "author-headshots",
    title: "AI Author Headshots — Professional Photos for Writers, Authors & Journalists",
    description:
      "Professional AI headshots for authors, writers, journalists, and content creators. Upload 1 photo, get 30 portraits perfect for book jackets, author pages, LinkedIn, media kits, and press features. Try free.",
    keywords: [
      "author headshots AI",
      "writer professional photo",
      "journalist portrait AI",
      "author photo generator",
      "book jacket headshot",
      "content creator profile picture",
    ],
    badge: "For Authors & Writers",
    headline: "The photo that lives on your book jacket — and your legacy.",
    subtitle:
      "An author photo isn't just another headshot. It sits on your book jacket forever, appears in Amazon author profiles, media kits, and literary festival programs. It needs to convey intelligence, credibility, and the unique voice readers connect with. TryOneTake delivers author portraits worthy of your words.",
    benefitsHeading: "Why authors choose TryOneTake",
    benefits: [
      {
        title: "Book-jacket quality, without the shoot",
        body: "Traditional author photos cost $400–$1,000+ and require hours of shooting. TryOneTake delivers literary-quality portraits in under 5 minutes — with the depth, lighting, and composition that belong on a dust jacket.",
      },
      {
        title: "Match the tone of your writing",
        body: "A thriller author's photo should feel different from a memoirist's or a business writer's. Our AI generates 25-30 variations across different moods, settings, and styles — so your headshot matches the tone of your work.",
      },
      {
        title: "Amazon, media kit, festival program — all covered",
        body: "Your author photo needs to work at thumbnail size on Amazon, full-width on your website, and in print on festival programs. 30 variations ensure you have the right crop, background, and style for every publishing context.",
      },
    ],
    faqs: [
      {
        q: "What makes a good author headshot?",
        a: "A great author photo conveys intelligence, approachability, and a hint of the writer's personality. It should feel authentic to your genre — literary fiction authors often go for thoughtful and contemplative; business authors lean confident and direct. TryOneTake generates variations across these tones so you can choose what fits your writing brand.",
      },
      {
        q: "Can I use an AI headshot on my book jacket?",
        a: "Yes. Modern AI headshots from FLUX.2 are high-resolution enough for print publication. Many self-published and even traditionally published authors now use AI-generated author photos. The key is that it looks like you and matches the quality expectations of your genre — which TryOneTake delivers.",
      },
      {
        q: "What should I wear for an author photo?",
        a: "It depends on your genre and personal brand. Literary and fiction authors often wear smart casual — a well-fitted jacket, thoughtful colors. Business and non-fiction authors lean business professional. Journalists and columnists keep it approachable and authentic. TryOneTake gives you multiple outfit options so your photo matches your readership.",
      },
    ],
    exampleImages: [3, 8, 10],
  },
  {
    slug: "accountant-headshots",
    title: "AI Accountant Headshots — Professional Photos for CPAs & Accounting Professionals",
    description:
      "Professional AI headshots for accountants, CPAs, tax professionals, and bookkeepers. Upload 1 photo, get 30 portraits that convey trust, precision, and professionalism. Perfect for firm websites, LinkedIn, and client communications. Try free.",
    keywords: [
      "accountant headshots AI",
      "CPA professional photo",
      "tax professional portrait AI",
      "accounting firm headshot",
      "bookkeeper LinkedIn photo",
      "finance professional profile picture",
    ],
    badge: "For Accounting Professionals",
    headline: "The headshot that says 'your numbers are in good hands.'",
    subtitle:
      "Accounting is built on trust — clients hand over their most sensitive financial information to you. Your headshot needs to convey precision, integrity, and the calm competence that makes clients feel secure. TryOneTake delivers accountant portraits that inspire confidence before the first consultation.",
    benefitsHeading: "Why accounting professionals choose TryOneTake",
    benefits: [
      {
        title: "Trust & precision at a glance",
        body: "Clients choose an accountant they trust with their financial future. Our AI generates portraits that project the conservative professionalism and attention to detail that clients expect from someone handling their taxes, books, and financial strategy.",
      },
      {
        title: "Firm-wide consistency",
        body: "Every CPA, EA, and staff accountant at your firm gets the same professional quality — matching backgrounds, lighting, and aesthetic. Perfect for your firm's 'Our Team' page, LinkedIn presence, and client newsletters.",
      },
      {
        title: "Always current for busy season & beyond",
        body: "Between tax season and year-end closes, you don't have time for a photographer. Upload a selfie between client calls, get professional headshots in 5 minutes. Try free vs $200+ for traditional photography.",
      },
    ],
    faqs: [
      {
        q: "What should a CPA or accountant wear for a professional headshot?",
        a: "Business formal or business professional is standard — dark suit or blazer, conservative tie or professional blouse. Navy, charcoal, and neutral tones project the stability and trustworthiness clients look for in financial professionals. TryOneTake generates multiple outfit variations so you can choose the right level of formality.",
      },
      {
        q: "Are AI headshots professional enough for an accounting firm website?",
        a: "Absolutely. TryOneTake's FLUX.2 model generates headshots indistinguishable from studio photography. They're fully suitable for firm websites, LinkedIn, client proposals, email signatures, and professional directories. What matters is that the photo accurately represents you — which our identity preservation ensures.",
      },
      {
        q: "Can our entire accounting firm get matching headshots?",
        a: "Yes. Contact us for firm pricing with volume discounts. We'll create a consistent style profile so every team member — from managing partner to staff accountant — gets professional headshots with matching backgrounds and aesthetic. Perfect for your website's team page and consistent branding across all client touchpoints.",
      },
    ],
    exampleImages: [2, 5, 9],
  },
  {
    slug: "dentist-headshots",
    title: "AI Dentist Headshots — Professional Photos for Dentists & Veterinary Professionals",
    description:
      "Professional AI headshots for dentists, veterinarians, orthodontists, and clinical professionals. Upload 1 photo, get 30 portraits that convey warmth, clinical expertise, and trust. Perfect for practice websites, LinkedIn, and patient communications. Try free.",
    keywords: [
      "dentist headshots AI",
      "veterinarian professional photo",
      "dental professional portrait AI",
      "orthodontist headshot",
      "vet practice profile picture",
      "clinical professional photo AI",
    ],
    badge: "For Dentists & Veterinarians",
    headline: "A headshot that makes patients feel at ease — before they sit in your chair.",
    subtitle:
      "Dental anxiety is real — and for veterinarians, pet parents need to trust you with a family member. Your headshot is often the first thing patients or clients see on your practice website. It needs to convey clinical expertise wrapped in genuine warmth. TryOneTake delivers portraits that calm nerves and build confidence.",
    benefitsHeading: "Why dental & veterinary professionals choose TryOneTake",
    benefits: [
      {
        title: "Warmth that eases anxiety",
        body: "Many patients experience dental anxiety; pet owners feel nervous leaving their animal in someone else's care. Our AI generates headshots with the reassuring warmth and clinical confidence that puts people (and pet parents) at ease before they even walk through your door.",
      },
      {
        title: "Practice-consistent branding",
        body: "Every dentist, hygienist, and vet tech at your practice gets matching professional headshots — consistent backgrounds, lighting, and quality. Perfect for your practice website, Google Business Profile, social media, and patient referral materials.",
      },
      {
        title: "Hygienic & convenient — no studio visit",
        body: "Between patient appointments and surgeries, your schedule is packed. Upload a selfie between cases, get professional headshots in 5 minutes. No commute, no studio, no photographer in your space. Try free — no credit card required.",
      },
    ],
    faqs: [
      {
        q: "Should I wear a white coat or scrubs in my dental/vet headshot?",
        a: "A white coat conveys clinical authority and is ideal for practice websites and professional directories. Scrubs feel more approachable and work well for social media and community outreach materials. TryOneTake's Pro plan gives you both options — white coat for your bio page, scrubs or business casual for LinkedIn and community events.",
      },
      {
        q: "Are AI headshots acceptable for dental and veterinary practice websites?",
        a: "Yes. Modern AI headshots are indistinguishable from studio photography and fully suitable for practice websites, Google Business Profiles, Healthgrades, LinkedIn, and patient communication materials. As long as the photo accurately represents you — which TryOneTake's identity preservation ensures — patients and clients won't know or care how it was taken.",
      },
      {
        q: "Can our entire practice team get matching headshots?",
        a: "Yes. Contact us for practice pricing with volume discounts. We'll create a consistent style profile so every provider — dentists, hygienists, vet techs, front desk — gets matching professional headshots. Perfect for your website's 'Meet the Team' page and consistent branding across all patient touchpoints.",
      },
    ],
    exampleImages: [1, 4, 7],
  },
  {
    slug: "job-seeker-headshots",
    title: "AI Headshots for Job Seekers — Professional Photos for Resumes & Applications",
    description:
      "Get AI-generated professional headshots for job seekers. Upload 1 photo, get 30 resume-ready portraits perfect for LinkedIn, job applications, and networking. Try free.",
    keywords: [
      "AI headshot generator for job seekers",
      "AI headshot generator for resume",
      "job application headshot AI",
      "professional photo for job search",
      "AI resume photo generator",
      "career change headshot AI",
    ],
    badge: "For Job Seekers & Career Changers",
    headline: "Land the interview — starting with your photo.",
    subtitle:
      "Recruiters look at your photo before they read your resume. A professional headshot on LinkedIn and job applications signals you're serious, prepared, and career-ready — whether you're a recent grad, career changer, or re-entering the workforce.",
    benefitsHeading: "Why job seekers choose TryOneTake for their headshot",
    benefits: [
      {
        title: "First impression that gets you to the interview",
        body: "Studies show profiles with professional photos get up to 21x more views and significantly more messages from recruiters. Your headshot is often the first thing a recruiter notices — make it count before they even open your resume.",
      },
      {
        title: "Resume-ready in minutes, not weeks",
        body: "Got an interview tomorrow? Upload a selfie tonight and have a polished headshot ready in under 5 minutes. No photographer scheduling, no waiting for edits, no studio commute. When a recruiter asks for your photo, you have it instantly.",
      },
      {
        title: "Multiple looks for different industries",
        body: "Different industries expect different looks. Corporate formal for finance and law. Smart casual for tech and marketing. Approachable professional for customer-facing roles. TryOneTake's Pro plan gives you 25 variations — use the right one for each application.",
      },
    ],
    faqs: [
      {
        q: "Should I put a photo on my resume?",
        a: "It depends on the country. In the US, UK, and Canada, photos on resumes are generally discouraged (and can introduce bias). In Germany, Japan, and many European and Asian countries, a professional photo on your CV is expected. Regardless of your resume, your LinkedIn profile photo is essential — and that's where recruiters will look first.",
      },
      {
        q: "Can AI headshots help me get a job?",
        a: "A professional headshot alone won't get you hired — but it significantly increases your LinkedIn profile views and recruiter InMail response rates. Your photo is the first thing a recruiter notices, often before they read a single word of your experience. A polished headshot signals you're career-oriented and detail-conscious — qualities every employer values.",
      },
      {
        q: "What kind of headshot is best for job applications?",
        a: "Match your target industry. Corporate/formal for finance, law, and consulting. Smart casual for tech, marketing, and creative roles. Approachable professional for customer-facing and healthcare roles. TryOneTake's Pro plan gives you 25 style variations so you can pick the right look for each application context.",
      },
    ],
    exampleImages: [1, 3, 6],
  },
];

export function getUseCase(slug: string): UseCaseData | undefined {
  return useCases.find((uc) => uc.slug === slug);
}
