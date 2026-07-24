"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ArrowRight, Check, ChevronDown, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCases } from "@/lib/use-case-data";
import { comparisons } from "@/lib/comparison-data";
import { cities } from "@/lib/city-data";

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Professional Headshots" },
          ]}
          className="mb-6"
        />
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-base text-muted-foreground">
          Complete Guide · 2026
        </div>
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          Professional Headshots in 2026: The Complete Guide
        </h1>
        <p className="mt-6 text-balance text-lg text-muted-foreground md:text-xl max-w-2xl">
          Everything you need to know about professional headshots — what they
          are, why they matter, how much they cost, and how AI has changed the
          game. Whether you choose a photographer or AI, make an informed
          decision.
        </p>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link href="/generate">
            <Button size="lg" className="h-12 px-8 text-base">
              Try free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-base text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            No credit card required · Instant preview
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  What Are Professional Headshots                                           */
/* -------------------------------------------------------------------------- */
function WhatAre() {
  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight">
          What are professional headshots?
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
            <p>
              A professional headshot is a high-quality portrait photograph
              used to represent you in business and career contexts. Unlike a
              casual selfie or social media photo, a professional headshot is
              intentionally composed — proper lighting, appropriate attire, a
              clean background, and an expression that conveys competence and
              approachability.
            </p>
            <p>
              Headshots appear on LinkedIn profiles, company "About Us" pages,
              business cards, email signatures, conference badges, press
              features, and professional directories. They're often the first
              visual impression someone has of you in a professional context.
            </p>
          </div>
          <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
            <p>
              In 2026, "professional headshot" means two things: the
              traditional route (hiring a photographer, booking a studio,
              $200–500+) and the AI route (uploading a selfie to an AI
              headshot generator, getting studio-quality results in under 5
              minutes for a fraction of the cost).
            </p>
            <p>
              Both produce professional-looking portraits. The right choice
              depends on your budget, timeline, and specific needs. This guide
              covers both options in detail — so you can choose with
              confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Why Professional Headshots Matter                                          */
/* -------------------------------------------------------------------------- */
const STATS = [
  {
    value: "14×",
    label: "More profile views on LinkedIn with a professional photo vs no photo",
  },
  {
    value: "0.05s",
    label: "Time it takes for someone to form a first impression from your photo",
  },
  {
    value: "36%",
    label: "Higher InMail response rate for LinkedIn profiles with professional headshots",
  },
  {
    value: "93%",
    label: "Of recruiters check your LinkedIn profile before deciding to contact you",
  },
];

function WhyMatters() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight">
          Why professional headshots matter
        </h2>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Your headshot isn't just a photo — it's a personal branding asset
          that works 24/7 across every professional touchpoint.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="text-3xl font-bold text-primary">{s.value}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-base text-muted-foreground leading-relaxed">
          In short: if you skip the headshot, you skip the first impression.
          And in a competitive job market — where every edge counts — a
          professional headshot is one of the highest-ROI investments you can
          make in your career.{" "}
          <Link
            href="/blog/linkedin-profile-photo-ai-vs-photographer"
            className="text-primary underline underline-offset-2 font-medium"
          >
            See our full LinkedIn photo guide →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Professional Headshots by Profession (internal link hub)                   */
/* -------------------------------------------------------------------------- */
function ByProfession() {
  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Professional headshots for every career
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          Different professions have different expectations for headshots. A
          lawyer's portrait differs from a realtor's, which differs from a
          founder's. Explore what works for your field.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc) => (
            <Link
              key={uc.slug}
              href={`/use-cases/${uc.slug}`}
              className="group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <span className="text-sm text-muted-foreground">{uc.badge}</span>
              <span className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                {uc.title}
              </span>
              <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Traditional vs AI Headshots                                               */
/* -------------------------------------------------------------------------- */
const COMPARISON_ROWS = [
  {
    label: "Cost",
    traditional: "$200–$500+ per session",
    ai: "Free to try / $19–$35 one-time",
    traditionalNote: "Plus retouching fees",
    aiNote: "Transparent, no hidden fees",
  },
  {
    label: "Turnaround",
    traditional: "1–2 weeks",
    ai: "Under 5 minutes",
    traditionalNote: "Shoot + editing + delivery",
    aiNote: "Instant download",
  },
  {
    label: "Photo needed",
    traditional: "Show up in person",
    ai: "1 selfie from your phone",
    traditionalNote: "Schedule, commute, shoot",
    aiNote: "Anytime, anywhere",
  },
  {
    label: "Variety",
    traditional: "1–3 final images, 1 outfit",
    ai: "30 variations, multiple outfits & backgrounds",
    traditionalNote: "Additional looks cost extra",
    aiNote: "All included in one batch",
  },
  {
    label: "Retakes",
    traditional: "Re-book, re-pay, re-shoot",
    ai: "Instant — upload a new photo",
    traditionalNote: "Weeks of coordination",
    aiNote: "5 minutes, no hassle",
  },
  {
    label: "Consistency (teams)",
    traditional: "Varies by session, photographer, location",
    ai: "Identical quality across every person",
    traditionalNote: "Hard to match across offices",
    aiNote: "One style profile, everyone matches",
  },
];

function TraditionalVsAI() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Traditional photography vs AI headshots
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          Both produce professional results. Here's how they compare across
          the dimensions that matter most.
        </p>
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[600px] text-base">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left font-medium w-1/4">
                  Factor
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  <span className="rounded-md bg-primary/10 px-3 py-1 text-primary">
                    AI Headshots (TryOneTake)
                  </span>
                </th>
                <th className="px-6 py-4 text-left text-muted-foreground">
                  Traditional Photography
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-6 py-4 font-medium">{row.label}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground">
                      {row.ai}
                    </div>
                    <div className="text-sm text-muted-foreground mt-0.5">
                      {row.aiNote}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-muted-foreground">
                      {row.traditional}
                    </div>
                    <div className="text-sm text-muted-foreground/70 mt-0.5">
                      {row.traditionalNote}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-center text-base text-muted-foreground">
          Traditional photography still has its place for certain
          high-stakes scenarios (executive board portraits, magazine
          features). But for 95% of professional needs — LinkedIn, company
          websites, email signatures, conference materials — AI headshots
          deliver equal or better quality at a fraction of the time and cost.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Professional Headshots by City                                             */
/* -------------------------------------------------------------------------- */
function ByCity() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Professional headshots near you
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          Looking for headshots in your city? We have dedicated guides for 20
          major US cities — with local photographer cost comparisons and tips
          specific to your market.
        </p>
        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/professional-headshots/${c.slug}`}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              {c.city}, {c.state}
            </Link>
          ))}
        </div>
        <p className="mt-4 text-center">
          <Link
            href="/professional-headshots"
            className="text-sm text-primary underline underline-offset-2"
          >
            Back to Professional Headshots Guide →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  How to Get Professional Headshots (3 steps)                                */
/* -------------------------------------------------------------------------- */
const STEPS = [
  {
    step: "1",
    title: "Upload a selfie",
    body: "Take a well-lit selfie with your phone — natural window light, plain background, looking at the lens. One good photo is all you need. See our selfie guide for detailed tips.",
    link: "/blog/how-to-take-perfect-selfie-for-ai-headshots",
    linkLabel: "Selfie tips →",
  },
  {
    step: "2",
    title: "AI generates your headshots",
    body: "Our FLUX.2 AI model transforms your selfie into 30 studio-quality professional headshots — with different outfits, backgrounds, and lighting setups. Under 5 minutes.",
  },
  {
    step: "3",
    title: "Download & use everywhere",
    body: "Pick your favorites and download. Use them on LinkedIn, your company website, email signature, business cards, conference badges — anywhere you need to look professional.",
  },
];

function HowToGet() {
  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          How to get professional headshots in 2026
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground">
          Three steps. Five minutes. Zero photographers.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="relative rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                {s.step}
              </div>
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                {s.body}
              </p>
              {s.link && (
                <Link
                  href={s.link}
                  className="mt-3 inline-block text-sm font-medium text-primary underline underline-offset-2"
                >
                  {s.linkLabel}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  What to Look For                                                          */
/* -------------------------------------------------------------------------- */
const CRITERIA = [
  {
    title: "Identity preservation",
    body: "The #1 criterion: does the headshot actually look like you? Not a smoothed-over, generic version — you. The best AI tools prioritize identity preservation over artificial beautification.",
  },
  {
    title: "Background variety",
    body: "Professional headshots shouldn't all look the same. Look for tools that offer multiple backgrounds — modern office, outdoor, studio, library — so you have options for different contexts.",
  },
  {
    title: "Outfit diversity",
    body: "The ability to see yourself in different professional attire — formal business, smart casual, creative professional — helps you match your headshot to the right situation.",
  },
  {
    title: "Resolution & print quality",
    body: "Your headshot should work everywhere: tiny LinkedIn thumbnails, full-width website hero images, and printed business cards. High resolution (at least 1024×1024) matters.",
  },
  {
    title: "Delivery speed",
    body: "In 2026, professional headshots shouldn't take days. Modern AI tools deliver in under 10 minutes. If a service takes hours or days, they're using older technology.",
  },
  {
    title: "Refund protection",
    body: "If the AI fails to generate usable headshots, you shouldn't pay. Look for tools with automatic refund policies — not case-by-case manual review.",
  },
];

function WhatToLookFor() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          What to look for in professional headshots
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          Whether you go traditional or AI, these six criteria separate great
          headshots from mediocre ones.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CRITERIA.map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pricing (inline — matches CompactPricing from use-case-page)               */
/* -------------------------------------------------------------------------- */
const plans = [
  {
    name: "Free",
    price: "$0",
    model: "FLUX.2 pro",
    photos: "1 headshot",
    styles: "Natural style only",
    features: [
      "FLUX.2 pro model (same as Starter)",
      "1 professional headshot",
      "Natural style",
      "Upgrade to Starter or Pro anytime",
    ],
    cta: "Try free",
    href: "/generate?free=true",
    featured: false,
  },
  {
    name: "Starter",
    price: "$19",
    model: "FLUX.2 pro",
    photos: "30 headshots",
    styles: "10 style variations",
    features: [
      "FLUX.2 pro model",
      "30 professional headshots",
      "10 style variations",
      "Balanced / Natural / Polished",
      "No watermark",
      "Instant download (ZIP)",
      "Automatic refund if generation fails",
    ],
    cta: "Get Starter",
    href: "/generate?plan=starter",
    featured: false,
  },
  {
    name: "Pro",
    price: "$35",
    model: "FLUX.2 max",
    photos: "30 headshots",
    styles: "25 style variations",
    features: [
      "FLUX.2 max model (highest realism)",
      "30 professional headshots",
      "25 style variations",
      "Balanced / Natural / Polished",
      "No watermark",
      "Instant download (ZIP)",
      "Automatic refund if generation fails",
    ],
    cta: "Get Pro",
    href: "/generate?plan=pro",
    featured: true,
  },
];

function Pricing() {
  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Professional headshot pricing
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground">
          One-time payment. No subscription. Automatic refund if generation
          fails.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 transition-shadow hover:shadow-lg ${
                plan.featured
                  ? "border-primary/50 bg-card shadow-md ring-1 ring-primary/20"
                  : "border-border bg-card"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "$0" && (
                    <span className="text-muted-foreground text-sm">
                      one-time
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span className="rounded-md bg-muted px-2 py-0.5">
                    {plan.model}
                  </span>
                  <span className="rounded-md bg-muted px-2 py-0.5">
                    {plan.photos}
                  </span>
                  <span className="rounded-md bg-muted px-2 py-0.5">
                    {plan.styles}
                  </span>
                </div>
              </div>
              <ul className="mb-8 flex-1 space-y-3 text-base">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={plan.href} className="block">
                <Button
                  variant={plan.featured ? "default" : "outline"}
                  className="w-full"
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Need team pricing?{" "}
          <Link
            href="/use-cases/team-headshots"
            className="text-primary underline underline-offset-2 font-medium"
          >
            Contact us for volume discounts →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Compare AI Tools (link hub → /vs pages)                                    */
/* -------------------------------------------------------------------------- */
function CompareTools() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Compare AI headshot tools
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          Not all AI headshot generators are created equal. We've published
          honest, side-by-side comparisons with the top tools on the market.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {comparisons.map((c) => (
            <Link
              key={c.slug}
              href={`/vs/${c.slug}`}
              className="group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 hover:border-primary/30 transition-all"
            >
              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                TryOneTake vs {c.competitor}
              </span>
              <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
        <p className="mt-6 text-center text-base text-muted-foreground">
          Want a deeper dive?{" "}
          <Link
            href="/blog/best-ai-headshot-generator-2026"
            className="text-primary underline underline-offset-2 font-medium"
          >
            See our ranking of the top 7 AI headshot tools →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ (client interactive)                                                   */
/* -------------------------------------------------------------------------- */
const PILLAR_FAQS = [
  {
    q: "What is a professional headshot?",
    a: "A professional headshot is a high-quality portrait photograph used to represent you in business and career settings — LinkedIn, company websites, business cards, email signatures, conference materials, and press features. It's intentionally composed with proper lighting, appropriate attire, and a clean background to convey competence and approachability.",
  },
  {
    q: "How much do professional headshots cost?",
    a: "Traditional photography headshots cost $200–$500+ per session, depending on the photographer, location, and number of final images. AI-generated headshots range from free (for a single preview) to $19–$35 for a full set of 30 professional headshots with multiple outfits and backgrounds. See our complete cost guide for a detailed breakdown.",
  },
  {
    q: "Are AI headshots as good as traditional photography?",
    a: "For most professional use cases — LinkedIn, company websites, email signatures, conference badges — yes. Modern AI models like FLUX.2 produce headshots indistinguishable from studio photography in professional contexts. Traditional photography still has an edge for certain high-stakes scenarios (magazine covers, executive board portraits), but for 95% of professional needs, AI quality is equal or better.",
  },
  {
    q: "How many photos do I need for AI headshots?",
    a: "It depends on the tool. Some AI headshot generators require 10–20 photos. TryOneTake needs just 1 well-lit selfie. More photos don't automatically mean better results — what matters is the quality of the input photo and the AI model's ability to preserve your identity.",
  },
  {
    q: "Can recruiters tell if my headshot is AI-generated?",
    a: "Research shows ~60% of recruiters cannot distinguish modern AI headshots from real photos. The 40% who sometimes can are spotting bad AI — over-smoothed skin, distorted eyes, generic features. High-quality AI headshot generators that prioritize identity preservation produce results that even trained eyes can't distinguish from studio photography.",
  },
  {
    q: "What should I wear for a professional headshot?",
    a: "It depends on your industry and role. Finance, law, and consulting typically call for business formal (dark suit, tie or professional blouse). Tech, creative, and sales roles are fine with smart casual (well-fitted button-down or blazer). Solid colors photograph best — avoid busy patterns, logos, and overly bright colors. See our complete style guide for profession-specific recommendations.",
  },
  {
    q: "How long does it take to get AI headshots?",
    a: "Most AI headshot generators take 15 minutes to 2 hours. TryOneTake delivers in under 5 minutes. Traditional photography takes 1–2 weeks (scheduling, the shoot, editing, delivery).",
  },
  {
    q: "Can I use AI headshots on my resume or CV?",
    a: "It depends on the country. In the US, UK, and Canada, photos on resumes are generally discouraged (and can introduce bias). In Germany, Japan, and many European and Asian countries, a professional photo on your CV is expected. Always follow local norms. If you do include a photo, make sure it's professional — a high-quality AI headshot is far better than a cropped social media photo.",
  },
  {
    q: "What's the difference between free and paid AI headshot tools?",
    a: "Free AI headshot tools typically give you 1–3 low-resolution images with limited style options and may include watermarks. Paid tools ($19–$35) deliver 30+ high-resolution headshots with multiple outfits, backgrounds, and style variations — plus commercial usage rights, no watermarks, and refund protection. TryOneTake offers a free tier so you can test the quality before committing to a paid plan.",
  },
  {
    q: "Do I own the rights to my AI-generated headshots?",
    a: "With most reputable AI headshot services, yes — you own full commercial usage rights to the generated images. You can use them on LinkedIn, company websites, business cards, marketing materials, and anywhere else you need a professional photo. Always check the terms of service; the key question is whether you retain ownership of the output.",
  },
];

function PillarFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Frequently asked questions about professional headshots
        </h2>
        <div className="mt-8 divide-y divide-border">
          {PILLAR_FAQS.map((faq, i) => (
            <div key={i} className="py-5">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="pr-4 text-base font-medium">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all",
                  openIndex === i
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="pt-3 text-base text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bottom CTA                                                                 */
/* -------------------------------------------------------------------------- */
function BottomCta() {
  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to get your professional headshot?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Upload 1 photo. Get 30 studio-quality headshots in under 5 minutes.
          Try free — no credit card required.
        </p>
        <Link href="/generate" className="mt-6 inline-block">
          <Button size="lg" className="h-12 px-8 text-base">
            Try free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Page                                                                  */
/* -------------------------------------------------------------------------- */
const siteUrl = "https://tryonetake.com";

export function ProfessionalHeadshotsPage() {
  return (
    <>
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              {
                "@type": "ListItem",
                position: 2,
                name: "Professional Headshots",
                item: `${siteUrl}/professional-headshots`,
              },
            ],
          }),
        }}
      />
      {/* JSON-LD: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: PILLAR_FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />

      <Hero />
      <WhatAre />
      <WhyMatters />
      <ByProfession />
      <TraditionalVsAI />
      <HowToGet />
      <ByCity />
      <WhatToLookFor />
      <Pricing />
      <CompareTools />
      <PillarFaq />
      <BottomCta />
    </>
  );
}
