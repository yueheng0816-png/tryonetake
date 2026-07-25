/**
 * City programmatic page data.
 * Each entry powers a /professional-headshots/[slug] page.
 *
 * SEO strategy: target "professional headshots in [city]" keywords.
 * HeadshotPro validated this path — local photographer sites have weak SEO,
 * so AI tool pages can rank for city-specific headshot queries.
 */

export interface CityData {
  slug: string;
  city: string;
  state: string;
  photographerCost: string;
  description: string;
  keywords: string[];
  /** Why this city's professionals benefit from AI headshots */
  businessContext: string;
}

export const cities: CityData[] = [
  {
    slug: "new-york-ny",
    city: "New York",
    state: "NY",
    photographerCost: "$350–$800",
    description:
      "Professional headshots in New York City — get studio-quality AI headshots without the $350–800 photographer cost. Upload 1 photo, get 30 NYC-ready headshots in under 5 minutes. Try free.",
    keywords: [
      "professional headshots NYC",
      "New York headshot photographer",
      "NYC corporate headshots",
      "Manhattan business headshots",
      "AI headshots New York",
    ],
    businessContext:
      "New York is the most competitive professional market in the world. Whether you're on Wall Street, in a Midtown law firm, at a SoHo tech startup, or working from a Brooklyn co-working space — your headshot competes with thousands of other professionals. A studio-quality headshot that conveys competence and polish isn't optional in NYC; it's table stakes.",
  },
  {
    slug: "los-angeles-ca",
    city: "Los Angeles",
    state: "CA",
    photographerCost: "$300–$700",
    description:
      "Professional headshots in Los Angeles — studio-quality AI headshots for LA professionals. No $300–700 photographer needed. 1 photo, 30 headshots, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Los Angeles",
      "LA headshot photographer",
      "Los Angeles business headshots",
      "Hollywood professional headshots",
      "AI headshots LA",
    ],
    businessContext:
      "Los Angeles is home to entertainment, tech, and a booming startup scene — from Santa Monica to Downtown LA. In a city where image matters and networking happens everywhere (from coffee shops to industry events), a professional headshot signals you take your career seriously, whether you're in film, tech, finance, or creative industries.",
  },
  {
    slug: "chicago-il",
    city: "Chicago",
    state: "IL",
    photographerCost: "$250–$600",
    description:
      "Professional headshots in Chicago — get AI-generated headshots without the $250–600 Loop photographer cost. 1 photo, 30 professional portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Chicago",
      "Chicago headshot photographer",
      "Chicago business headshots",
      "Loop professional portraits",
      "AI headshots Chicago",
    ],
    businessContext:
      "Chicago's professional scene spans finance on LaSalle Street, tech in the West Loop, consulting in the Loop, and a growing remote workforce across the metro area. A polished headshot helps you stand out in this diverse but competitive market — from boardrooms to startup pitches to LinkedIn networking.",
  },
  {
    slug: "houston-tx",
    city: "Houston",
    state: "TX",
    photographerCost: "$200–$500",
    description:
      "Professional headshots in Houston — AI-generated headshots for energy, medical, and tech professionals. No $200–500 photographer. 1 photo, 30 headshots, instant delivery. Try free.",
    keywords: [
      "professional headshots Houston",
      "Houston headshot photographer",
      "Houston business headshots",
      "energy corridor professional portraits",
      "AI headshots Houston",
    ],
    businessContext:
      "Houston is the energy capital of the world, with a massive medical center and a growing tech sector. Whether you're an engineer in the Energy Corridor, a physician at the Texas Medical Center, or a startup founder in EaDo, a professional headshot signals credibility in a city built on expertise and trust.",
  },
  {
    slug: "phoenix-az",
    city: "Phoenix",
    state: "AZ",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Phoenix — AI headshots for Arizona's fastest-growing professional market. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Phoenix",
      "Phoenix headshot photographer",
      "Phoenix business headshots",
      "Scottsdale professional portraits",
      "AI headshots Phoenix",
    ],
    businessContext:
      "Phoenix is one of America's fastest-growing metro areas, attracting finance, tech, and healthcare talent from across the country. With so many transplants building new professional networks, a strong headshot helps you establish credibility quickly — whether you're in downtown Phoenix, Scottsdale, or Tempe.",
  },
  {
    slug: "philadelphia-pa",
    city: "Philadelphia",
    state: "PA",
    photographerCost: "$225–$500",
    description:
      "Professional headshots in Philadelphia — AI headshots for Philly's healthcare, education, and business professionals. No $225–500 photographer. 1 photo, 30 headshots, instant delivery. Try free.",
    keywords: [
      "professional headshots Philadelphia",
      "Philly headshot photographer",
      "Philadelphia business headshots",
      "Center City professional portraits",
      "AI headshots Philadelphia",
    ],
    businessContext:
      "Philadelphia's economy is anchored by world-class healthcare (CHOP, Penn Medicine), higher education (UPenn, Drexel, Temple), and a revitalized business district in Center City. Professionals across these sectors need headshots that convey both expertise and approachability — whether for hospital directories, university profiles, or corporate websites.",
  },
  {
    slug: "san-antonio-tx",
    city: "San Antonio",
    state: "TX",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in San Antonio — AI headshots for military, healthcare, and business pros. No $175–400 photographer cost. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots San Antonio",
      "San Antonio headshot photographer",
      "San Antonio business headshots",
      "Alamo City professional portraits",
      "AI headshots San Antonio",
    ],
    businessContext:
      "San Antonio's professional landscape is shaped by a strong military presence, a growing healthcare sector, cybersecurity (Port San Antonio), and a revitalized downtown business district. A professional headshot here says you're serious — whether you're transitioning from military to civilian career, building a medical practice, or growing a business in South Texas.",
  },
  {
    slug: "san-diego-ca",
    city: "San Diego",
    state: "CA",
    photographerCost: "$250–$550",
    description:
      "Professional headshots in San Diego — AI headshots for biotech, military, and tech professionals. No $250–550 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots San Diego",
      "San Diego headshot photographer",
      "San Diego business headshots",
      "biotech professional portraits San Diego",
      "AI headshots San Diego",
    ],
    businessContext:
      "San Diego combines a booming biotech corridor (Sorrento Valley, La Jolla), a major naval presence, and a growing tech scene. In a city known for work-life balance, your headshot still needs to project professionalism — whether you're presenting at a biotech conference, leading a military-civilian team, or building your tech startup.",
  },
  {
    slug: "dallas-tx",
    city: "Dallas",
    state: "TX",
    photographerCost: "$225–$500",
    description:
      "Professional headshots in Dallas — AI headshots for finance, real estate, and corporate professionals. No $225–500 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Dallas",
      "Dallas headshot photographer",
      "Dallas business headshots",
      "DFW professional portraits",
      "AI headshots Dallas",
    ],
    businessContext:
      "Dallas-Fort Worth is a corporate powerhouse — banking, insurance, real estate, and a booming tech sector in the Telecom Corridor and Plano. In a market where business moves fast and relationships drive deals, your headshot is your first handshake. A professional portrait signals you belong at the table.",
  },
  {
    slug: "austin-tx",
    city: "Austin",
    state: "TX",
    photographerCost: "$225–$500",
    description:
      "Professional headshots in Austin — AI headshots for tech, startup, and creative professionals. No $225–500 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Austin",
      "Austin headshot photographer",
      "Austin business headshots",
      "Silicon Hills professional portraits",
      "AI headshots Austin",
    ],
    businessContext:
      "Austin ('Silicon Hills') has exploded as a tech hub — home to Tesla, Apple, Google offices, Oracle HQ, and thousands of startups. The professional culture balances ambition with authenticity. Your headshot should do the same: polished enough for investors and clients, genuine enough to feel like Austin.",
  },
  {
    slug: "san-francisco-ca",
    city: "San Francisco",
    state: "CA",
    photographerCost: "$350–$800",
    description:
      "Professional headshots in San Francisco — AI headshots for Bay Area tech, finance, and startup professionals. No $350–800 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots San Francisco",
      "SF headshot photographer",
      "Bay Area business headshots",
      "Silicon Valley professional portraits",
      "AI headshots San Francisco",
    ],
    businessContext:
      "San Francisco and the Bay Area remain the global center of tech and venture capital. Whether you're fundraising on Sand Hill Road, building in SoMa, or scaling a startup in the Mission — your headshot appears on pitch decks, LinkedIn outreach, and company About pages. In the world's most competitive talent market, a professional headshot is part of your edge.",
  },
  {
    slug: "seattle-wa",
    city: "Seattle",
    state: "WA",
    photographerCost: "$275–$600",
    description:
      "Professional headshots in Seattle — AI headshots for tech, aerospace, and business professionals. No $275–600 photographer cost. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Seattle",
      "Seattle headshot photographer",
      "Seattle business headshots",
      "Pacific Northwest professional portraits",
      "AI headshots Seattle",
    ],
    businessContext:
      "Seattle is home to Amazon, Microsoft, Boeing, and a dense ecosystem of tech and aerospace professionals. In a city where talent is deep and competition is real, a professional headshot helps you stand out — whether you're an engineer at a Big Tech firm, a startup founder in Fremont, or a consultant serving the Pacific Northwest.",
  },
  {
    slug: "denver-co",
    city: "Denver",
    state: "CO",
    photographerCost: "$225–$500",
    description:
      "Professional headshots in Denver — AI headshots for tech, aerospace, and outdoor industry professionals. No $225–500 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Denver",
      "Denver headshot photographer",
      "Denver business headshots",
      "Mile High City professional portraits",
      "AI headshots Denver",
    ],
    businessContext:
      "Denver's economy blends aerospace, tech (the 'Silicon Mountain' corridor from Boulder to DTC), healthcare, and a thriving outdoor recreation industry. The professional culture values authenticity — your headshot should look polished but not overly corporate. AI headshots let you strike that balance perfectly.",
  },
  {
    slug: "boston-ma",
    city: "Boston",
    state: "MA",
    photographerCost: "$300–$650",
    description:
      "Professional headshots in Boston — AI headshots for biotech, finance, education, and healthcare pros. No $300–650 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Boston",
      "Boston headshot photographer",
      "Boston business headshots",
      "Cambridge professional portraits",
      "AI headshots Boston",
    ],
    businessContext:
      "Boston's professional ecosystem is unparalleled in density: world-class universities (Harvard, MIT, BU, BC), biotech and pharma (Kendall Square, Longwood), finance (downtown), and consulting. In a city where credentials matter, your headshot is part of your professional presentation — projecting intelligence, credibility, and polish.",
  },
  {
    slug: "nashville-tn",
    city: "Nashville",
    state: "TN",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Nashville — AI headshots for music business, healthcare, and growing tech professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Nashville",
      "Nashville headshot photographer",
      "Nashville business headshots",
      "Music City professional portraits",
      "AI headshots Nashville",
    ],
    businessContext:
      "Nashville is more than Music City — it's a booming hub for healthcare (HCA Healthcare HQ), automotive (Nissan North America), and a rapidly growing tech scene (Amazon Operations Center of Excellence). Whether you're in the music business, healthcare administration, or tech, a professional headshot signals you're playing at a higher level.",
  },
  {
    slug: "portland-or",
    city: "Portland",
    state: "OR",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Portland — AI headshots for tech, creative, and outdoor industry professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Portland",
      "Portland headshot photographer",
      "Portland business headshots",
      "Silicon Forest professional portraits",
      "AI headshots Portland",
    ],
    businessContext:
      "Portland's 'Silicon Forest' is home to Intel's largest site, Nike's world headquarters (Beaverton), and a vibrant creative and tech scene. Portland professionals value authenticity over corporate stiffness. AI headshots let you project competence without looking like you tried too hard — exactly right for this market.",
  },
  {
    slug: "miami-fl",
    city: "Miami",
    state: "FL",
    photographerCost: "$250–$550",
    description:
      "Professional headshots in Miami — AI headshots for finance, real estate, and tech professionals. No $250–550 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Miami",
      "Miami headshot photographer",
      "Miami business headshots",
      "South Florida professional portraits",
      "AI headshots Miami",
    ],
    businessContext:
      "Miami has transformed into 'Wall Street South' — attracting hedge funds, fintech, crypto, and tech startups alongside its established real estate and hospitality sectors. In a city where image matters and networking happens at Art Basel as much as in boardrooms, a professional headshot is an essential tool for building your personal brand.",
  },
  {
    slug: "atlanta-ga",
    city: "Atlanta",
    state: "GA",
    photographerCost: "$225–$500",
    description:
      "Professional headshots in Atlanta — AI headshots for corporate, film, and tech professionals. No $225–500 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Atlanta",
      "Atlanta headshot photographer",
      "Atlanta business headshots",
      "ATL professional portraits",
      "AI headshots Atlanta",
    ],
    businessContext:
      "Atlanta is the economic hub of the Southeast — home to Fortune 500 HQs (Delta, Coca-Cola, Home Depot), a booming film industry ('Hollywood of the South'), and a growing tech scene. In a city where business and culture intersect, a professional headshot opens doors — from Buckhead boardrooms to Midtown startups to film industry networking.",
  },
  {
    slug: "washington-dc",
    city: "Washington",
    state: "DC",
    photographerCost: "$300–$650",
    description:
      "Professional headshots in Washington DC — AI headshots for government, legal, nonprofit, and consulting professionals. No $300–650 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Washington DC",
      "DC headshot photographer",
      "Washington DC business headshots",
      "Capitol Hill professional portraits",
      "AI headshots DC",
    ],
    businessContext:
      "Washington, DC is a company town where your reputation is your currency. Government, law, lobbying, consulting, and nonprofits all run on relationships and credibility. In a city where first impressions happen at hearings, fundraisers, and policy briefings, a professional headshot is part of how you establish authority and trust.",
  },
  {
    slug: "minneapolis-mn",
    city: "Minneapolis",
    state: "MN",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Minneapolis — AI headshots for Fortune 500, healthcare, and creative professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Minneapolis",
      "Minneapolis headshot photographer",
      "Twin Cities business headshots",
      "Minnesota professional portraits",
      "AI headshots Minneapolis",
    ],
    businessContext:
      "Minneapolis-Saint Paul punches above its weight: home to more Fortune 500 companies per capita than almost anywhere (Target, UnitedHealth, 3M, U.S. Bancorp, General Mills), plus a world-class healthcare sector (Mayo Clinic proximity). In a market where competence is valued over flash, a clean, professional headshot fits the culture perfectly.",
  },
  {
    slug: "tampa-fl",
    city: "Tampa",
    state: "FL",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Tampa — AI headshots for finance, healthcare, and tech professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Tampa",
      "Tampa headshot photographer",
      "Tampa Bay business headshots",
      "Florida Gulf Coast professional portraits",
      "AI headshots Tampa",
    ],
    businessContext:
      "Tampa Bay's economy is diversifying fast — finance (Raymond James HQ), healthcare, cybersecurity, and a growing tech startup scene. With remote workers relocating to Florida in droves, the professional talent pool is deeper than ever. A polished headshot helps you stand out in this increasingly competitive market.",
  },
  {
    slug: "orlando-fl",
    city: "Orlando",
    state: "FL",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Orlando — AI headshots for hospitality, tech, and healthcare professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Orlando",
      "Orlando headshot photographer",
      "Orlando business headshots",
      "Central Florida professional portraits",
      "AI headshots Orlando",
    ],
    businessContext:
      "Orlando is far more than theme parks — it's home to a booming tech corridor (Lake Nona, Creative Village), a massive healthcare sector (AdventHealth, Orlando Health), and a growing aerospace and defense industry. In a city reinventing itself as a tech hub, professionals need headshots that reflect that ambition.",
  },
  {
    slug: "charlotte-nc",
    city: "Charlotte",
    state: "NC",
    photographerCost: "$225–$500",
    description:
      "Professional headshots in Charlotte — AI headshots for banking, fintech, and energy professionals. No $225–500 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Charlotte",
      "Charlotte headshot photographer",
      "Charlotte business headshots",
      "Queen City professional portraits",
      "AI headshots Charlotte",
    ],
    businessContext:
      "Charlotte is the second-largest banking center in the US (Bank of America HQ, Truist HQ, Wells Fargo East Coast hub) with a fast-growing fintech scene. In a city built on financial services, credibility is currency — your headshot is part of the first impression that builds trust with clients and colleagues.",
  },
  {
    slug: "st-louis-mo",
    city: "St. Louis",
    state: "MO",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in St. Louis — AI headshots for healthcare, agtech, and corporate professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots St. Louis",
      "St. Louis headshot photographer",
      "St. Louis business headshots",
      "Gateway City professional portraits",
      "AI headshots St. Louis",
    ],
    businessContext:
      "St. Louis anchors the heartland with strengths in healthcare (BJC HealthCare, Mercy), agtech (Bayer Crop Science, Benson Hill), aerospace (Boeing Defense), and financial services (Edward Jones, Wells Fargo Advisors). A professional headshot here says stability and expertise — the values that define Midwest business culture.",
  },
  {
    slug: "pittsburgh-pa",
    city: "Pittsburgh",
    state: "PA",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Pittsburgh — AI headshots for robotics, healthcare, and tech professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Pittsburgh",
      "Pittsburgh headshot photographer",
      "Pittsburgh business headshots",
      "Steel City professional portraits",
      "AI headshots Pittsburgh",
    ],
    businessContext:
      "Pittsburgh has transformed from steel town to tech hub — home to Carnegie Mellon's robotics and AI research, Google's Pittsburgh engineering office, Uber ATG, and a massive healthcare sector (UPMC). In a city that values substance over style, a clean, professional headshot conveys exactly the right message.",
  },
  {
    slug: "sacramento-ca",
    city: "Sacramento",
    state: "CA",
    photographerCost: "$225–$500",
    description:
      "Professional headshots in Sacramento — AI headshots for government, healthcare, and growing tech professionals. No $225–500 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Sacramento",
      "Sacramento headshot photographer",
      "Sacramento business headshots",
      "Capital City professional portraits",
      "AI headshots Sacramento",
    ],
    businessContext:
      "Sacramento is California's seat of government and a growing hub for healthcare (UC Davis Health, Sutter Health) and tech (Intel Folsom). With Bay Area transplants flowing in for affordability, the professional market is getting more competitive. A polished headshot signals you're serious — whether you're in policy, medicine, or tech.",
  },
  {
    slug: "las-vegas-nv",
    city: "Las Vegas",
    state: "NV",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Las Vegas — AI headshots for hospitality, real estate, and growing tech professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Las Vegas",
      "Las Vegas headshot photographer",
      "Las Vegas business headshots",
      "Vegas professional portraits",
      "AI headshots Las Vegas",
    ],
    businessContext:
      "Las Vegas is more than the Strip — it's a growing hub for tech (Switch, Zappos), sports (Raiders, Golden Knights, soon the A's), and a booming real estate market driven by California migration. In a city that's rapidly diversifying its economy, professionals across hospitality, tech, healthcare, and real estate need headshots that reflect a serious, career-focused identity.",
  },
  {
    slug: "cincinnati-oh",
    city: "Cincinnati",
    state: "OH",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Cincinnati — AI headshots for corporate, healthcare, and manufacturing professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Cincinnati",
      "Cincinnati headshot photographer",
      "Cincinnati business headshots",
      "Queen City professional portraits",
      "AI headshots Cincinnati",
    ],
    businessContext:
      "Cincinnati punches above its weight with Fortune 500 HQs (Procter & Gamble, Kroger, Fifth Third Bank) and a strong healthcare sector (Cincinnati Children's, TriHealth). In a market that values loyalty and long-term relationships, a professional headshot helps you make the right impression the first time.",
  },
  {
    slug: "kansas-city-mo",
    city: "Kansas City",
    state: "MO",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Kansas City — AI headshots for tech, healthcare, and animal health professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Kansas City",
      "Kansas City headshot photographer",
      "KC business headshots",
      "Heartland professional portraits",
      "AI headshots Kansas City",
    ],
    businessContext:
      "Kansas City is the heart of the animal health corridor, a growing tech scene (Cerner/Oracle Health, Garmin), and a major engineering hub (Burns & McDonnell, Black & Veatch). In a city where professional relationships matter and people do business with people they trust, your headshot is your first handshake.",
  },
  {
    slug: "columbus-oh",
    city: "Columbus",
    state: "OH",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Columbus — AI headshots for insurance, retail, and tech professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Columbus",
      "Columbus headshot photographer",
      "Columbus business headshots",
      "Central Ohio professional portraits",
      "AI headshots Columbus",
    ],
    businessContext:
      "Columbus is Ohio's fastest-growing city — home to Nationwide Insurance, Cardinal Health, L Brands, and a booming startup scene fueled by Ohio State. In a city attracting young talent and corporate HQs alike, a professional headshot distinguishes you in a market that's rapidly moving up the value chain.",
  },
  {
    slug: "cleveland-oh",
    city: "Cleveland",
    state: "OH",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Cleveland — AI headshots for healthcare, manufacturing, and financial professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Cleveland",
      "Cleveland headshot photographer",
      "Cleveland business headshots",
      "Northeast Ohio professional portraits",
      "AI headshots Cleveland",
    ],
    businessContext:
      "Cleveland's economy is anchored by world-class healthcare (Cleveland Clinic, University Hospitals), advanced manufacturing, and a revitalized downtown. In a city that's earned the nickname 'The Comeback City', professionals here understand reinvention — and a fresh, professional headshot is part of telling your own story.",
  },
  {
    slug: "indianapolis-in",
    city: "Indianapolis",
    state: "IN",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Indianapolis — AI headshots for pharma, sports, and tech professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Indianapolis",
      "Indianapolis headshot photographer",
      "Indy business headshots",
      "Circle City professional portraits",
      "AI headshots Indianapolis",
    ],
    businessContext:
      "Indianapolis is a quiet powerhouse — anchored by pharma (Eli Lilly HQ, Roche Diagnostics), sports (NCAA HQ), and a growing tech sector anchored by Salesforce's largest office outside SF. In Indy, competence speaks louder than flash — a clean, professional headshot aligns with the no-nonsense Midwest business ethos.",
  },
  {
    slug: "san-jose-ca",
    city: "San Jose",
    state: "CA",
    photographerCost: "$350–$750",
    description:
      "Professional headshots in San Jose — AI headshots for Silicon Valley tech, engineering, and executive professionals. No $350–750 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots San Jose",
      "San Jose headshot photographer",
      "Silicon Valley professional portraits",
      "South Bay business headshots",
      "AI headshots San Jose",
    ],
    businessContext:
      "San Jose is the capital of Silicon Valley — home to Cisco, Adobe, eBay, PayPal, Zoom, and thousands of startups. In the world's most concentrated talent market, your headshot appears on investor decks, LinkedIn profiles, and company About pages scrutinized by the sharpest eyes in tech. It needs to be impeccable.",
  },
  {
    slug: "raleigh-nc",
    city: "Raleigh",
    state: "NC",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Raleigh — AI headshots for tech, research, and pharma professionals in the Research Triangle. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Raleigh",
      "Raleigh headshot photographer",
      "Research Triangle business headshots",
      "Triangle professional portraits",
      "AI headshots Raleigh",
    ],
    businessContext:
      "Raleigh anchors the Research Triangle — one of the nation's premier hubs for tech (Red Hat HQ, Epic Games), pharma (GSK, Biogen), and research (NC State, RTI International). In a market where PhDs and engineers are common currency, a professional headshot that says 'competent and credible' is essential.",
  },
  {
    slug: "virginia-beach-va",
    city: "Virginia Beach",
    state: "VA",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Virginia Beach — AI headshots for military, defense, and coastal business professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Virginia Beach",
      "Virginia Beach headshot photographer",
      "Hampton Roads business headshots",
      "coastal Virginia professional portraits",
      "AI headshots Virginia Beach",
    ],
    businessContext:
      "Virginia Beach is part of the Hampton Roads metro — anchored by the world's largest naval base, a major defense contractor ecosystem, and a growing coastal tech and healthcare sector. Whether you're transitioning from military service, working in defense contracting, or building a coastal business, a professional headshot establishes credibility from day one.",
  },
  {
    slug: "milwaukee-wi",
    city: "Milwaukee",
    state: "WI",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Milwaukee — AI headshots for manufacturing, finance, and healthcare professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Milwaukee",
      "Milwaukee headshot photographer",
      "Milwaukee business headshots",
      "Cream City professional portraits",
      "AI headshots Milwaukee",
    ],
    businessContext:
      "Milwaukee's economy is built on advanced manufacturing (Rockwell Automation, Harley-Davidson), financial services (Northwestern Mutual HQ), and healthcare. In a city where hard work and expertise are valued over pretense, a clean, professional headshot fits the culture while signaling career ambition.",
  },
  {
    slug: "jacksonville-fl",
    city: "Jacksonville",
    state: "FL",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Jacksonville — AI headshots for logistics, finance, and military professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Jacksonville",
      "Jacksonville headshot photographer",
      "Jacksonville business headshots",
      "First Coast professional portraits",
      "AI headshots Jacksonville",
    ],
    businessContext:
      "Jacksonville is Florida's largest city by land area and a major logistics hub (CSX HQ, JAXPORT), with strong financial services (Fidelity, Deutsche Bank, Bank of America operations) and two major naval air stations. In a sprawling market where professionals are spread across a vast metro, a strong LinkedIn photo bridges the distance.",
  },
  {
    slug: "oklahoma-city-ok",
    city: "Oklahoma City",
    state: "OK",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Oklahoma City — AI headshots for energy, aerospace, and healthcare professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Oklahoma City",
      "OKC headshot photographer",
      "Oklahoma City business headshots",
      "OKC professional portraits",
      "AI headshots Oklahoma City",
    ],
    businessContext:
      "Oklahoma City has quietly built a diversified economy — energy (Devon Energy, Continental Resources), aerospace (Tinker AFB, Boeing), biotech, and a growing healthcare sector. In a city where relationships still close deals over coffee, a professional headshot opens the first door.",
  },
  {
    slug: "memphis-tn",
    city: "Memphis",
    state: "TN",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Memphis — AI headshots for logistics, healthcare, and music industry professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Memphis",
      "Memphis headshot photographer",
      "Memphis business headshots",
      "Bluff City professional portraits",
      "AI headshots Memphis",
    ],
    businessContext:
      "Memphis is 'America's Distribution Center' — home to FedEx World Hub, a major medical device industry (Medtronic, St. Jude), and a legendary music heritage. In a city where logistics and healthcare drive the economy, professionals who look polished and credible stand out in a tight-knit business community.",
  },
  {
    slug: "richmond-va",
    city: "Richmond",
    state: "VA",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Richmond — AI headshots for finance, government, and creative professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Richmond",
      "Richmond headshot photographer",
      "Richmond business headshots",
      "RVA professional portraits",
      "AI headshots Richmond",
    ],
    businessContext:
      "Richmond punches above its weight with a strong financial sector (Capital One HQ, Federal Reserve Bank of Richmond), state government, and a thriving creative and marketing agency scene. In a city that blends Southern charm with East Coast ambition, your headshot should reflect both polish and approachability.",
  },
  {
    slug: "louisville-ky",
    city: "Louisville",
    state: "KY",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Louisville — AI headshots for logistics, healthcare, and bourbon industry professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Louisville",
      "Louisville headshot photographer",
      "Louisville business headshots",
      "Derby City professional portraits",
      "AI headshots Louisville",
    ],
    businessContext:
      "Louisville is home to UPS Worldport (global air hub), Humana HQ, and the heart of Kentucky's signature industries (bourbon, equine, advanced manufacturing). In a city where hospitality meets corporate scale, a professional headshot conveys the competence that builds trust across industries.",
  },
  {
    slug: "new-orleans-la",
    city: "New Orleans",
    state: "LA",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in New Orleans — AI headshots for energy, tourism, and growing tech professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots New Orleans",
      "New Orleans headshot photographer",
      "NOLA business headshots",
      "Crescent City professional portraits",
      "AI headshots New Orleans",
    ],
    businessContext:
      "New Orleans is famous for culture, but its professional backbone includes energy (Shell, Entergy), port logistics, a growing tech scene (DXC Technology, GE Digital), and world-class medical research. In a city where personality matters as much as credentials, your headshot should balance professionalism with the warmth New Orleans is known for.",
  },
  {
    slug: "salt-lake-city-ut",
    city: "Salt Lake City",
    state: "UT",
    photographerCost: "$225–$500",
    description:
      "Professional headshots in Salt Lake City — AI headshots for tech, finance, and outdoor industry professionals. No $225–500 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Salt Lake City",
      "Salt Lake City headshot photographer",
      "SLC business headshots",
      "Wasatch Front professional portraits",
      "AI headshots Salt Lake City",
    ],
    businessContext:
      "Salt Lake City has become 'Silicon Slopes' — one of America's fastest-growing tech hubs, attracting major offices from Adobe, eBay, and thousands of startups, alongside established finance and outdoor recreation industries. In a market that's exploded with talent, a professional headshot helps you rise above the crowd.",
  },
  {
    slug: "hartford-ct",
    city: "Hartford",
    state: "CT",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Hartford — AI headshots for insurance, aerospace, and healthcare professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Hartford",
      "Hartford headshot photographer",
      "Hartford business headshots",
      "Connecticut professional portraits",
      "AI headshots Hartford",
    ],
    businessContext:
      "Hartford is 'The Insurance Capital of the World' — home to Aetna, The Hartford, Travelers, and Cigna. Add in aerospace (Pratt & Whitney, Collins Aerospace) and proximity to both NYC and Boston, and Hartford punches above its weight. In a market where trust is the product, your headshot is where that trust begins.",
  },
  {
    slug: "buffalo-ny",
    city: "Buffalo",
    state: "NY",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Buffalo — AI headshots for healthcare, education, and manufacturing professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Buffalo",
      "Buffalo headshot photographer",
      "Buffalo business headshots",
      "Western New York professional portraits",
      "AI headshots Buffalo",
    ],
    businessContext:
      "Buffalo's economy has diversified beyond its industrial roots into healthcare (Roswell Park, Kaleida Health), higher education (SUNY Buffalo), and advanced manufacturing. In a city known for resilience and blue-collar grit, a professional headshot signals forward momentum — for your career and for the region.",
  },
  {
    slug: "birmingham-al",
    city: "Birmingham",
    state: "AL",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Birmingham — AI headshots for banking, healthcare, and manufacturing professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Birmingham",
      "Birmingham headshot photographer",
      "Birmingham business headshots",
      "Magic City professional portraits",
      "AI headshots Birmingham",
    ],
    businessContext:
      "Birmingham has transformed from an industrial steel town into a hub for healthcare and biomedical research (UAB — Alabama's largest employer), regional banking (Regions Financial HQ), and advanced manufacturing. In a city on the rise, professionals need headshots that reflect the new Birmingham — forward-looking and polished.",
  },
  {
    slug: "rochester-ny",
    city: "Rochester",
    state: "NY",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Rochester — AI headshots for optics, imaging, and healthcare professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Rochester",
      "Rochester headshot photographer",
      "Rochester business headshots",
      "Flower City professional portraits",
      "AI headshots Rochester",
    ],
    businessContext:
      "Rochester is the world capital of optics and imaging — home to Bausch & Lomb, Xerox legacy, L3Harris, and the University of Rochester's renowned optics program. For professionals in this precision-focused market, a professional headshot signals the same attention to detail you bring to your work.",
  },
  {
    slug: "grand-rapids-mi",
    city: "Grand Rapids",
    state: "MI",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Grand Rapids — AI headshots for manufacturing, design, and healthcare professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Grand Rapids",
      "Grand Rapids headshot photographer",
      "West Michigan business headshots",
      "GR professional portraits",
      "AI headshots Grand Rapids",
    ],
    businessContext:
      "Grand Rapids is West Michigan's economic engine — anchored by office furniture design (Steelcase, Herman Miller, Haworth), advanced manufacturing, and a growing healthcare sector (Spectrum Health, now Corewell). In a city known for design excellence, a clean, well-composed headshot aligns with the creative yet practical culture.",
  },
  {
    slug: "tucson-az",
    city: "Tucson",
    state: "AZ",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Tucson — AI headshots for optics, defense, and healthcare professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Tucson",
      "Tucson headshot photographer",
      "Tucson business headshots",
      "Old Pueblo professional portraits",
      "AI headshots Tucson",
    ],
    businessContext:
      "Tucson is a center for optics and photonics (University of Arizona's world-renowned program), defense (Raytheon Missiles & Defense HQ), and healthcare (Banner Health). In a city where scientific and technical expertise is the common language, a professional headshot should convey quiet competence and credibility.",
  },
  {
    slug: "honolulu-hi",
    city: "Honolulu",
    state: "HI",
    photographerCost: "$300–$600",
    description:
      "Professional headshots in Honolulu — AI headshots for military, tourism, and Pacific business professionals. No $300–600 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Honolulu",
      "Honolulu headshot photographer",
      "Hawaii business headshots",
      "Pacific professional portraits",
      "AI headshots Honolulu",
    ],
    businessContext:
      "Honolulu is the Pacific's business crossroads — a major military command center (US Indo-Pacific Command), tourism engine, and growing hub for Pacific Rim trade and tech. On an island where everything has to be imported (including photographers), AI headshots offer an especially compelling cost and convenience advantage.",
  },
  {
    slug: "tulsa-ok",
    city: "Tulsa",
    state: "OK",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Tulsa — AI headshots for energy, aerospace, and remote worker professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Tulsa",
      "Tulsa headshot photographer",
      "Tulsa business headshots",
      "Green Country professional portraits",
      "AI headshots Tulsa",
    ],
    businessContext:
      "Tulsa's economy spans energy, aerospace (American Airlines maintenance base), and a unique remote worker attraction program (Tulsa Remote) that has brought thousands of professionals to the city. In a market shaped by both legacy industries and new talent, a professional headshot helps you bridge both worlds.",
  },
  {
    slug: "fresno-ca",
    city: "Fresno",
    state: "CA",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Fresno — AI headshots for agribusiness, healthcare, and Central Valley professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Fresno",
      "Fresno headshot photographer",
      "Fresno business headshots",
      "Central Valley professional portraits",
      "AI headshots Fresno",
    ],
    businessContext:
      "Fresno sits at the heart of California's Central Valley — the most productive agricultural region in the world — and is home to a growing healthcare sector and California State University, Fresno. In a region where hard work defines the culture, a professional headshot signals you're ready for bigger opportunities.",
  },
  {
    slug: "omaha-ne",
    city: "Omaha",
    state: "NE",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Omaha — AI headshots for insurance, finance, and data center professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Omaha",
      "Omaha headshot photographer",
      "Omaha business headshots",
      "Silicon Prairie professional portraits",
      "AI headshots Omaha",
    ],
    businessContext:
      "Omaha punches far above its weight: Warren Buffett's Berkshire Hathaway, Mutual of Omaha, and a cluster of major insurance and financial services HQs. Throw in a growing data center corridor and 'Silicon Prairie' startups, and you have a market where professional credibility matters. Your headshot is part of that.",
  },
  {
    slug: "albuquerque-nm",
    city: "Albuquerque",
    state: "NM",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Albuquerque — AI headshots for tech, defense, and research professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Albuquerque",
      "Albuquerque headshot photographer",
      "ABQ business headshots",
      "New Mexico professional portraits",
      "AI headshots Albuquerque",
    ],
    businessContext:
      "Albuquerque is a center for national laboratories (Sandia), tech (Intel Rio Rancho), defense (Kirtland AFB), and film production (Netflix, NBCUniversal studios). In a city where the professional community spans classified defense work to Hollywood productions, your headshot should match the level of your ambition.",
  },
  {
    slug: "bakersfield-ca",
    city: "Bakersfield",
    state: "CA",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Bakersfield — AI headshots for energy, agriculture, and healthcare professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Bakersfield",
      "Bakersfield headshot photographer",
      "Kern County business headshots",
      "Bakersfield professional portraits",
      "AI headshots Bakersfield",
    ],
    businessContext:
      "Bakersfield anchors California's southern Central Valley — an energy (Kern County is California's top oil-producing county) and agricultural powerhouse, with a growing healthcare and logistics sector. In a market where professionals often commute long distances, an AI headshot saves time and travel you'd rather spend elsewhere.",
  },
  {
    slug: "greenville-sc",
    city: "Greenville",
    state: "SC",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Greenville — AI headshots for manufacturing, engineering, and automotive professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Greenville",
      "Greenville headshot photographer",
      "Upstate SC business headshots",
      "Greenville professional portraits",
      "AI headshots Greenville",
    ],
    businessContext:
      "Greenville has transformed into a Southeastern manufacturing and engineering hub — BMW's largest US plant, Michelin North America HQ, and a revitalized downtown that consistently ranks among America's best. In a city on an upward trajectory, your headshot should reflect that momentum.",
  },
  {
    slug: "knoxville-tn",
    city: "Knoxville",
    state: "TN",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Knoxville — AI headshots for energy, research, and outdoor recreation professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Knoxville",
      "Knoxville headshot photographer",
      "Knoxville business headshots",
      "East Tennessee professional portraits",
      "AI headshots Knoxville",
    ],
    businessContext:
      "Knoxville is home to Oak Ridge National Laboratory (the DOE's largest science and energy lab), the Tennessee Valley Authority, and a growing outdoor recreation and tech sector. For scientists, engineers, and entrepreneurs in this innovation-driven market, a professional headshot signals credibility and ambition.",
  },
  {
    slug: "el-paso-tx",
    city: "El Paso",
    state: "TX",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in El Paso — AI headshots for defense, logistics, and binational trade professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots El Paso",
      "El Paso headshot photographer",
      "El Paso business headshots",
      "Borderplex professional portraits",
      "AI headshots El Paso",
    ],
    businessContext:
      "El Paso anchors the largest binational metro area in the Western Hemisphere (with Ciudad Juárez, Mexico) — a hub for defense (Fort Bliss), international trade, and advanced manufacturing. Professionals here operate across two countries and cultures; a polished headshot is your universal business card.",
  },
  {
    slug: "columbia-sc",
    city: "Columbia",
    state: "SC",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Columbia — AI headshots for government, education, and healthcare professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Columbia",
      "Columbia headshot photographer",
      "South Carolina business headshots",
      "Soda City professional portraits",
      "AI headshots Columbia",
    ],
    businessContext:
      "Columbia is South Carolina's capital and education hub — home to the University of South Carolina, Fort Jackson (Army's largest training base), and a growing healthcare and insurance sector. In a city where government, military, and academia intersect, a professional headshot bridges all three worlds.",
  },
  {
    slug: "charleston-sc",
    city: "Charleston",
    state: "SC",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Charleston — AI headshots for tech, aerospace, and creative professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Charleston",
      "Charleston headshot photographer",
      "Charleston business headshots",
      "Lowcountry professional portraits",
      "AI headshots Charleston",
    ],
    businessContext:
      "Charleston combines historic charm with a booming modern economy — Boeing's 787 Dreamliner assembly plant, a growing tech corridor ('Silicon Harbor' with Blackbaud, Benefitfocus), and a thriving creative sector. In a city where old South meets new economy, a contemporary professional headshot signals you're part of the future.",
  },
  {
    slug: "dayton-oh",
    city: "Dayton",
    state: "OH",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Dayton — AI headshots for defense, aerospace, and healthcare professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Dayton",
      "Dayton headshot photographer",
      "Dayton business headshots",
      "Gem City professional portraits",
      "AI headshots Dayton",
    ],
    businessContext:
      "Dayton is a defense and aerospace powerhouse — centered on Wright-Patterson Air Force Base (the largest single-site employer in Ohio) and a cluster of advanced manufacturing and healthcare. For professionals in this research and defense ecosystem, a clean, professional headshot signals readiness for the next mission.",
  },
  {
    slug: "boise-id",
    city: "Boise",
    state: "ID",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Boise — AI headshots for tech, agribusiness, and outdoor industry professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Boise",
      "Boise headshot photographer",
      "Boise business headshots",
      "Treasure Valley professional portraits",
      "AI headshots Boise",
    ],
    businessContext:
      "Boise is one of America's fastest-growing metros — attracting tech talent and startups (Micron Technology HQ, growing software sector) alongside established industries in agribusiness (Simplot) and outdoor recreation. In a market transformed by rapid growth, a professional headshot helps newcomers and longtime residents alike stand out.",
  },
  {
    slug: "colorado-springs-co",
    city: "Colorado Springs",
    state: "CO",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Colorado Springs — AI headshots for defense, aerospace, and cybersecurity professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Colorado Springs",
      "Colorado Springs headshot photographer",
      "Colorado Springs business headshots",
      "Pikes Peak professional portraits",
      "AI headshots Colorado Springs",
    ],
    businessContext:
      "Colorado Springs has the highest concentration of military installations outside the Pentagon — US Space Command, Air Force Academy, NORAD, and a booming cybersecurity sector fed by defense contracting. In a city where defense and tech are inseparable, a professional headshot carries weight — whether you're in uniform or in the private sector.",
  },
  {
    slug: "des-moines-ia",
    city: "Des Moines",
    state: "IA",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Des Moines — AI headshots for insurance, finance, and agtech professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Des Moines",
      "Des Moines headshot photographer",
      "Iowa business headshots",
      "Hartford of the West professional portraits",
      "AI headshots Des Moines",
    ],
    businessContext:
      "Des Moines is 'The Hartford of the West' — a major insurance center (Nationwide, Principal, Athene, EMC Insurance) with a growing fintech and agtech scene. In a market where actuarial and financial precision is the culture, a clean, professional headshot aligns with the serious, trustworthy brand the industry is built on.",
  },
  {
    slug: "madison-wi",
    city: "Madison",
    state: "WI",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Madison — AI headshots for biotech, healthcare IT, and education professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Madison",
      "Madison headshot photographer",
      "Madison business headshots",
      "Capital City professional portraits",
      "AI headshots Madison",
    ],
    businessContext:
      "Madison punches above its weight: state capital, home to the University of Wisconsin's research engine, and a thriving biotech and healthcare IT sector (Epic Systems, Exact Sciences, Promega). In a market where academic and industry credentials carry weight, a professional headshot rounds out your professional presence.",
  },
  {
    slug: "durham-nc",
    city: "Durham",
    state: "NC",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Durham — AI headshots for biotech, research, and tech professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Durham",
      "Durham headshot photographer",
      "Durham business headshots",
      "Research Triangle professional portraits",
      "AI headshots Durham",
    ],
    businessContext:
      "Durham is the research engine of the Triangle — Duke University, the Research Triangle Park, and a dense cluster of biotech (Biogen, IQVIA) and health-tech companies. In a city where innovation is the dominant industry, a professional headshot should reflect the forward-thinking, problem-solving ethos you bring to your work.",
  },
  {
    slug: "syracuse-ny",
    city: "Syracuse",
    state: "NY",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Syracuse — AI headshots for education, healthcare, and advanced manufacturing professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Syracuse",
      "Syracuse headshot photographer",
      "Syracuse business headshots",
      "Central New York professional portraits",
      "AI headshots Syracuse",
    ],
    businessContext:
      "Syracuse is home to Syracuse University and SUNY ESF, a growing healthcare sector (Upstate University Hospital), and Micron's planned mega-fab — the largest semiconductor investment in US history. In a city poised for a manufacturing renaissance, professionals need headshots that match the scale of what's coming.",
  },
  {
    slug: "spokane-wa",
    city: "Spokane",
    state: "WA",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Spokane — AI headshots for healthcare, education, and growing tech professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Spokane",
      "Spokane headshot photographer",
      "Spokane business headshots",
      "Inland Northwest professional portraits",
      "AI headshots Spokane",
    ],
    businessContext:
      "Spokane is the economic hub of the Inland Northwest — anchored by healthcare (Providence Sacred Heart), higher education (Gonzaga, Whitworth), and a growing tech and remote-work community drawn by lower costs than Seattle. For professionals building careers in a city on the rise, a professional headshot is a quiet signal of ambition.",
  },
  {
    slug: "wichita-ks",
    city: "Wichita",
    state: "KS",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Wichita — AI headshots for aerospace, manufacturing, and healthcare professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Wichita",
      "Wichita headshot photographer",
      "Wichita business headshots",
      "Air Capital professional portraits",
      "AI headshots Wichita",
    ],
    businessContext:
      "Wichita is the 'Air Capital of the World' — home to Spirit AeroSystems, Textron Aviation (Cessna, Beechcraft), and Bombardier Learjet, alongside a growing healthcare and advanced manufacturing sector. In a city that builds the world's aircraft, precision and professionalism are core values — your headshot should reflect both.",
  },
  {
    slug: "little-rock-ar",
    city: "Little Rock",
    state: "AR",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Little Rock — AI headshots for government, healthcare, and finance professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Little Rock",
      "Little Rock headshot photographer",
      "Arkansas business headshots",
      "Little Rock professional portraits",
      "AI headshots Little Rock",
    ],
    businessContext:
      "Little Rock is Arkansas's capital and economic center — anchored by state government, healthcare (UAMS, Baptist Health), and financial services (Stephens Inc.). In a market where relationships drive business and reputation is built over time, a professional headshot is the first building block of trust.",
  },
  {
    slug: "reno-nv",
    city: "Reno",
    state: "NV",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Reno — AI headshots for tech, logistics, and outdoor recreation professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Reno",
      "Reno headshot photographer",
      "Reno business headshots",
      "Biggest Little City professional portraits",
      "AI headshots Reno",
    ],
    businessContext:
      "Reno has become 'the next Austin' — attracting Tesla's Gigafactory, Google, Apple, and a wave of Bay Area tech companies and talent seeking lower costs. In a city experiencing explosive professional growth, a polished headshot helps you establish credibility fast in a market where everyone is new.",
  },
  {
    slug: "fort-myers-fl",
    city: "Fort Myers",
    state: "FL",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Fort Myers — AI headshots for healthcare, real estate, and coastal business professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Fort Myers",
      "Fort Myers headshot photographer",
      "Southwest Florida business headshots",
      "SWFL professional portraits",
      "AI headshots Fort Myers",
    ],
    businessContext:
      "Fort Myers is part of one of the fastest-growing metro areas in Florida — driven by healthcare (Lee Health), real estate, and an influx of remote workers and retirees. In a market where professional talent is arriving daily, a polished headshot helps you look established even when you're new to town.",
  },
  {
    slug: "sarasota-fl",
    city: "Sarasota",
    state: "FL",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Sarasota — AI headshots for finance, healthcare, and creative professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Sarasota",
      "Sarasota headshot photographer",
      "Sarasota business headshots",
      "Florida Gulf Coast professional portraits",
      "AI headshots Sarasota",
    ],
    businessContext:
      "Sarasota combines a wealthy retirement demographic with a growing professional class — financial services, healthcare, insurance, and a vibrant arts and design scene. In a city where wealth management and wellness are central industries, your headshot should project both competence and the polished aesthetic Sarasota expects.",
  },
  {
    slug: "jackson-ms",
    city: "Jackson",
    state: "MS",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Jackson — AI headshots for healthcare, government, and education professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Jackson",
      "Jackson headshot photographer",
      "Mississippi business headshots",
      "Jackson professional portraits",
      "AI headshots Jackson",
    ],
    businessContext:
      "Jackson is Mississippi's capital and economic hub — anchored by state government, healthcare (University of Mississippi Medical Center), and education (Jackson State University). In a market where professional advancement often depends on who knows you, a strong headshot makes introductions count before you walk in the door.",
  },
  {
    slug: "chattanooga-tn",
    city: "Chattanooga",
    state: "TN",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Chattanooga — AI headshots for tech, logistics, and outdoor industry professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Chattanooga",
      "Chattanooga headshot photographer",
      "Chattanooga business headshots",
      "Scenic City professional portraits",
      "AI headshots Chattanooga",
    ],
    businessContext:
      "Chattanooga has become a poster child for mid-sized city reinvention — 'Gig City' (municipal 10-gig fiber), a growing tech and startup scene, logistics, and outdoor recreation (the 'Boulder of the East'). In a city that's synonymous with innovation, your headshot should look as forward-thinking as your city.",
  },
  {
    slug: "provo-ut",
    city: "Provo",
    state: "UT",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Provo — AI headshots for SaaS, edtech, and startup professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Provo",
      "Provo headshot photographer",
      "Provo business headshots",
      "Silicon Slopes professional portraits",
      "AI headshots Provo",
    ],
    businessContext:
      "Provo anchors the southern end of 'Silicon Slopes' — home to Qualtrics (SAP), Vivint, Domo, and a dense concentration of SaaS and edtech startups fueled by BYU talent. In a market that's birthed billion-dollar exits, your headshot appears on pitch decks, investor meetings, and LinkedIn outreach. Make it count.",
  },
  {
    slug: "augusta-ga",
    city: "Augusta",
    state: "GA",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Augusta — AI headshots for cybersecurity, healthcare, and government professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Augusta",
      "Augusta headshot photographer",
      "Augusta business headshots",
      "CSRA professional portraits",
      "AI headshots Augusta",
    ],
    businessContext:
      "Augusta is home to the US Army Cyber Command (Fort Gordon) — making it a growing hub for cybersecurity and defense contracting, alongside a strong healthcare sector (Augusta University Health). In a market driven by defense and digital warfare, professionals operate at the intersection of national security and technology.",
  },
  {
    slug: "lexington-ky",
    city: "Lexington",
    state: "KY",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Lexington — AI headshots for equine, healthcare, and manufacturing professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Lexington",
      "Lexington headshot photographer",
      "Lexington business headshots",
      "Bluegrass professional portraits",
      "AI headshots Lexington",
    ],
    businessContext:
      "Lexington is the horse capital of the world — a global hub for the equine industry, anchored by the University of Kentucky and its healthcare system (UK HealthCare). In a city where international business meets Southern hospitality, a professional headshot that conveys both polish and personality opens doors on both sides of that equation.",
  },
  {
    slug: "huntsville-al",
    city: "Huntsville",
    state: "AL",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Huntsville — AI headshots for aerospace, defense, and engineering professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Huntsville",
      "Huntsville headshot photographer",
      "Rocket City business headshots",
      "Alabama aerospace professional portraits",
      "AI headshots Huntsville",
    ],
    businessContext:
      "Huntsville is 'Rocket City' — home to NASA's Marshall Space Flight Center, Redstone Arsenal, and a dense cluster of aerospace and defense contractors. The city has one of the highest concentrations of engineers per capita in the US. In a market where technical credentials are table stakes, a professional headshot rounds out your personal brand.",
  },
  {
    slug: "fayetteville-ar",
    city: "Fayetteville",
    state: "AR",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Northwest Arkansas — AI headshots for retail, supply chain, and tech professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Northwest Arkansas",
      "Fayetteville headshot photographer",
      "NWA business headshots",
      "Arkansas professional portraits",
      "AI headshots Fayetteville",
    ],
    businessContext:
      "Northwest Arkansas is the unlikely home to three Fortune 500 HQs — Walmart, Tyson Foods, and J.B. Hunt — powering an ecosystem of suppliers, technology vendors, and startups that serve these giants. In a market where big-business opportunities meet small-city quality of life, a professional headshot signals you belong in the room.",
  },
  {
    slug: "asheville-nc",
    city: "Asheville",
    state: "NC",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Asheville — AI headshots for creative, healthcare, and remote work professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Asheville",
      "Asheville headshot photographer",
      "Asheville business headshots",
      "Blue Ridge professional portraits",
      "AI headshots Asheville",
    ],
    businessContext:
      "Asheville has become a magnet for creatives, remote workers, and entrepreneurs drawn by the Blue Ridge Mountains and a vibrant arts and food scene. Healthcare (Mission Health/HCA) anchors the economy alongside tourism. In a city where authenticity is currency, a headshot should feel genuine and polished in equal measure.",
  },
  {
    slug: "santa-fe-nm",
    city: "Santa Fe",
    state: "NM",
    photographerCost: "$225–$500",
    description:
      "Professional headshots in Santa Fe — AI headshots for art, government, and creative industry professionals. No $225–500 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Santa Fe",
      "Santa Fe headshot photographer",
      "Santa Fe business headshots",
      "New Mexico creative professional portraits",
      "AI headshots Santa Fe",
    ],
    businessContext:
      "Santa Fe is a cultural and creative capital — state government, a world-renowned art market, and a growing remote work and film production scene. In a city where creative credibility and professional standing go hand in hand, your headshot should convey both artistic sensibility and professional reliability.",
  },
  {
    slug: "bend-or",
    city: "Bend",
    state: "OR",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Bend — AI headshots for tech, outdoor industry, and remote work professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Bend",
      "Bend headshot photographer",
      "Bend business headshots",
      "Central Oregon professional portraits",
      "AI headshots Bend",
    ],
    businessContext:
      "Bend is one of America's fastest-growing small cities — attracting Bay Area tech talent, outdoor industry HQs, and a booming remote worker population drawn by the Cascade lifestyle. In a market where everyone seems to have moved here from somewhere bigger, a professional headshot helps you look like you belong — whether you've been here 20 years or 20 days.",
  },
  {
    slug: "savannah-ga",
    city: "Savannah",
    state: "GA",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Savannah — AI headshots for logistics, manufacturing, and creative professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Savannah",
      "Savannah headshot photographer",
      "Savannah business headshots",
      "Hostess City professional portraits",
      "AI headshots Savannah",
    ],
    businessContext:
      "Savannah combines historic charm with a booming modern economy — the Port of Savannah (4th busiest US container port), aerospace (Gulfstream HQ), logistics, and a growing film and creative sector. In a city where global trade meets Southern character, your headshot should work for both a warehouse tour and a boardroom.",
  },
  {
    slug: "myrtle-beach-sc",
    city: "Myrtle Beach",
    state: "SC",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Myrtle Beach — AI headshots for tourism, real estate, and coastal business professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Myrtle Beach",
      "Myrtle Beach headshot photographer",
      "Grand Strand business headshots",
      "Myrtle Beach professional portraits",
      "AI headshots Myrtle Beach",
    ],
    businessContext:
      "Myrtle Beach is a tourism powerhouse that's diversifying into healthcare, real estate, and a growing year-round professional community. In a market where seasonal tourism can overshadow the permanent business scene, a professional headshot signals you're part of the serious, year-round professional community.",
  },
  {
    slug: "pensacola-fl",
    city: "Pensacola",
    state: "FL",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Pensacola — AI headshots for military, aviation, and healthcare professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Pensacola",
      "Pensacola headshot photographer",
      "Pensacola business headshots",
      "Emerald Coast professional portraits",
      "AI headshots Pensacola",
    ],
    businessContext:
      "Pensacola is anchored by naval aviation (NAS Pensacola — 'The Cradle of Naval Aviation'), aerospace, and healthcare (Baptist Health Care, Ascension Sacred Heart). In a city where military precision meets Gulf Coast lifestyle, a crisp, professional headshot reflects the discipline and excellence the market is built on.",
  },
  {
    slug: "ann-arbor-mi",
    city: "Ann Arbor",
    state: "MI",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Ann Arbor — AI headshots for tech, university, and research professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Ann Arbor",
      "Ann Arbor headshot photographer",
      "Ann Arbor business headshots",
      "Washtenaw County professional portraits",
      "AI headshots Ann Arbor",
    ],
    businessContext:
      "Ann Arbor is powered by the University of Michigan's research engine — fueling a dense ecosystem of tech startups, autonomous vehicle R&D (Mcity, Toyota Research Institute), and health-tech innovation. In one of America's most educated cities, a professional headshot should signal the intellectual rigor and ambition you bring to your field.",
  },
  {
    slug: "eugene-or",
    city: "Eugene",
    state: "OR",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Eugene — AI headshots for education, outdoor industry, and creative professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Eugene",
      "Eugene headshot photographer",
      "Eugene business headshots",
      "Willamette Valley professional portraits",
      "AI headshots Eugene",
    ],
    businessContext:
      "Eugene is anchored by the University of Oregon and a growing outdoor recreation and creative sector. In a city that values sustainability, creativity, and work-life balance, a professional headshot should feel authentic and approachable — polished enough for the university or tech scene, natural enough to feel like the Pacific Northwest.",
  },
  {
    slug: "tallahassee-fl",
    city: "Tallahassee",
    state: "FL",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Tallahassee — AI headshots for government, education, and legal professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Tallahassee",
      "Tallahassee headshot photographer",
      "Florida capital business headshots",
      "Leon County professional portraits",
      "AI headshots Tallahassee",
    ],
    businessContext:
      "Tallahassee is Florida's capital — dominated by state government, lobbying, legal services, and higher education (Florida State University, Florida A&M). In a city where policy decisions and professional reputations are shaped at evening receptions as much as in offices, a professional headshot is a career essential.",
  },
  {
    slug: "lansing-mi",
    city: "Lansing",
    state: "MI",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Lansing — AI headshots for government, manufacturing, and education professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Lansing",
      "Lansing headshot photographer",
      "Michigan capital business headshots",
      "Mid-Michigan professional portraits",
      "AI headshots Lansing",
    ],
    businessContext:
      "Lansing is Michigan's capital — anchored by state government, Michigan State University (in East Lansing), and automotive manufacturing (GM assembly plants). In a market where public sector, academia, and manufacturing intersect, a professional headshot should work across all three audiences — official enough for government, modern enough for industry.",
  },
  {
    slug: "fort-collins-co",
    city: "Fort Collins",
    state: "CO",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Fort Collins — AI headshots for tech, clean energy, and outdoor industry professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Fort Collins",
      "Fort Collins headshot photographer",
      "NoCo business headshots",
      "Front Range professional portraits",
      "AI headshots Fort Collins",
    ],
    businessContext:
      "Fort Collins anchors Northern Colorado's innovation corridor — home to Colorado State University, a booming clean energy and tech sector (Woodward, Broadcom), and top-ranked outdoor access. In a market that consistently ranks among the best places to live, a professional headshot signals you're thriving, not just residing.",
  },
  {
    slug: "worcester-ma",
    city: "Worcester",
    state: "MA",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Worcester — AI headshots for biotech, healthcare, and education professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Worcester",
      "Worcester headshot photographer",
      "Central Massachusetts business headshots",
      "Worcester professional portraits",
      "AI headshots Worcester",
    ],
    businessContext:
      "Worcester is New England's second-largest city and a growing biotech and healthcare hub — UMass Memorial Health, UMass Chan Medical School, and a cluster of life sciences companies drawn by lower costs than Boston-Cambridge. In a city building its identity as an innovation destination, a forward-looking headshot fits the narrative.",
  },
  {
    slug: "anchorage-ak",
    city: "Anchorage",
    state: "AK",
    photographerCost: "$250–$500",
    description:
      "Professional headshots in Anchorage — AI headshots for energy, logistics, and Alaska's unique professional market. No $250–500 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Anchorage",
      "Anchorage headshot photographer",
      "Alaska business headshots",
      "Anchorage professional portraits",
      "AI headshots Anchorage",
    ],
    businessContext:
      "Anchorage is Alaska's economic hub — a center for oil and gas (ConocoPhillips, BP Alaska), logistics (Ted Stevens Anchorage International — one of the world's busiest cargo airports), and military operations (Joint Base Elmendorf-Richardson). In a market where extreme geography makes in-person photographer sessions impractical for much of the year, AI headshots offer a genuine logistical advantage.",
  },
  {
    slug: "providence-ri",
    city: "Providence",
    state: "RI",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Providence — AI headshots for education, healthcare, and design professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Providence",
      "Providence headshot photographer",
      "Rhode Island business headshots",
      "Providence professional portraits",
      "AI headshots Providence",
    ],
    businessContext:
      "Providence is Rhode Island's capital and creative hub — home to Brown University, Rhode Island School of Design (RISD), and a growing healthcare and life sciences sector. In a city where academic prestige meets design-forward thinking, a professional headshot should convey both intellectual depth and creative sensibility.",
  },
  {
    slug: "portland-me",
    city: "Portland",
    state: "ME",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Portland, Maine — AI headshots for healthcare, insurance, and creative professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Portland Maine",
      "Portland ME headshot photographer",
      "Maine business headshots",
      "Portland professional portraits",
      "AI headshots Portland Maine",
    ],
    businessContext:
      "Portland, Maine is New England's northern economic anchor — driven by healthcare (MaineHealth), insurance (Unum, WEX), and a nationally recognized food and creative scene. In a small but sophisticated market where professional networks are tight-knit, a polished headshot makes a strong impression across industries.",
  },
  {
    slug: "lincoln-ne",
    city: "Lincoln",
    state: "NE",
    photographerCost: "$175–$350",
    description:
      "Professional headshots in Lincoln — AI headshots for government, education, and insurance professionals. No $175–350 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Lincoln",
      "Lincoln headshot photographer",
      "Nebraska business headshots",
      "Capital City professional portraits",
      "AI headshots Lincoln",
    ],
    businessContext:
      "Lincoln is Nebraska's capital and a growing tech hub — anchored by state government, the University of Nebraska-Lincoln, and a cluster of fast-growing insurance and fintech companies. In a city that's quietly built one of the strongest job markets in the Midwest, a clean, professional headshot reflects the steady competence the market rewards.",
  },
  {
    slug: "burlington-vt",
    city: "Burlington",
    state: "VT",
    photographerCost: "$200–$450",
    description:
      "Professional headshots in Burlington — AI headshots for tech, healthcare, and sustainability professionals. No $200–450 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Burlington",
      "Burlington headshot photographer",
      "Vermont business headshots",
      "Burlington professional portraits",
      "AI headshots Burlington",
    ],
    businessContext:
      "Burlington is Vermont's largest city and a growing hub for tech (Dealer.com, Beta Technologies), healthcare (University of Vermont Medical Center), and sustainability-focused startups. In a market where values and professionalism are equally important, a headshot that conveys both competence and authenticity is a genuine asset.",
  },
  {
    slug: "bozeman-mt",
    city: "Bozeman",
    state: "MT",
    photographerCost: "$225–$500",
    description:
      "Professional headshots in Bozeman — AI headshots for tech, photonics, and outdoor industry professionals. No $225–500 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Bozeman",
      "Bozeman headshot photographer",
      "Montana business headshots",
      "Bozeman professional portraits",
      "AI headshots Bozeman",
    ],
    businessContext:
      "Bozeman is Montana's fastest-growing city — a hub for photonics and optics (Bridger Photonics, FLIR), a booming tech and remote-worker scene, and Montana State University. In a market that's attracted talent from across the country, a professional headshot helps you look established even when half the town just moved here.",
  },
  {
    slug: "salem-or",
    city: "Salem",
    state: "OR",
    photographerCost: "$175–$400",
    description:
      "Professional headshots in Salem — AI headshots for government, healthcare, and agriculture professionals. No $175–400 photographer. 1 photo, 30 portraits, under 5 minutes. Try free.",
    keywords: [
      "professional headshots Salem",
      "Salem headshot photographer",
      "Oregon capital business headshots",
      "Willamette Valley professional portraits",
      "AI headshots Salem",
    ],
    businessContext:
      "Salem is Oregon's capital and the heart of the Willamette Valley — anchored by state government, healthcare (Salem Health), and the agriculture and food processing industries that define the region. In a city where public service and private enterprise coexist closely, a professional headshot should bridge both worlds.",
  },
];

export function getCity(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}
