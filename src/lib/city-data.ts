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
];

export function getCity(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}
