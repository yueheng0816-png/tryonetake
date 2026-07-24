"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ShieldCheck,
  Zap,
  Camera,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CityData } from "@/lib/city-data";

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */
function Hero({ data }: { data: CityData }) {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Professional Headshots", href: "/professional-headshots" },
            { label: `${data.city}, ${data.state}` },
          ]}
          className="mb-6"
        />
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-base text-muted-foreground">
          📍 {data.city}, {data.state}
        </div>
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          Professional Headshots in {data.city}, {data.state}
        </h1>
        <p className="mt-6 text-balance text-lg text-muted-foreground md:text-xl max-w-2xl">
          Studio-quality professional headshots without the{" "}
          {data.photographerCost} local photographer price tag. Upload 1 photo,
          get 30 headshots in under 5 minutes — try free.
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
/*  Cost Comparison                                                           */
/* -------------------------------------------------------------------------- */
function CostComparison({ data }: { data: CityData }) {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          What headshots cost in {data.city}
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          The going rate for a professional photographer in {data.city} runs{" "}
          {data.photographerCost} per session. TryOneTake delivers comparable
          quality — starting free.
        </p>
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[500px] text-base">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left font-medium">Factor</th>
                <th className="px-6 py-4 text-left font-semibold">
                  <span className="rounded-md bg-primary/10 px-3 py-1 text-primary">
                    TryOneTake
                  </span>
                </th>
                <th className="px-6 py-4 text-left text-muted-foreground">
                  {data.city} Photographer
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-6 py-4 font-medium">Cost</td>
                <td className="px-6 py-4 font-semibold">Free to try</td>
                <td className="px-6 py-4 text-muted-foreground">
                  {data.photographerCost}
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-6 py-4 font-medium">Turnaround</td>
                <td className="px-6 py-4 font-semibold">Under 5 minutes</td>
                <td className="px-6 py-4 text-muted-foreground">
                  1–2 weeks
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-6 py-4 font-medium">Photo needed</td>
                <td className="px-6 py-4 font-semibold">1 selfie</td>
                <td className="px-6 py-4 text-muted-foreground">
                  In-person session
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-6 py-4 font-medium">Output</td>
                <td className="px-6 py-4 font-semibold">
                  30 variations, multiple outfits
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  1–3 final images
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Retakes</td>
                <td className="px-6 py-4 font-semibold">
                  Instant — upload again
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  Re-book + re-pay
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Why [City]                                                                */
/* -------------------------------------------------------------------------- */
function WhyCity({ data }: { data: CityData }) {
  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight">
          Why {data.city} professionals choose AI headshots
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
            <p>{data.businessContext}</p>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Zap className="h-5 w-5 text-primary" />
                Faster than booking a photographer
              </div>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                Skip the scheduling, commuting, and waiting. Get 30
                professional headshots in under 5 minutes — from your phone,
                anywhere in {data.city}.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Camera className="h-5 w-5 text-primary" />
                Same studio quality
              </div>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                Our FLUX.2 AI model generates headshots indistinguishable from
                studio photography — with multiple outfits, backgrounds, and
                lighting setups in one batch.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Download className="h-5 w-5 text-primary" />
                Instant, unlimited downloads
              </div>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                Download your favorites immediately — individually or as a ZIP.
                Use them on LinkedIn, your company website, business cards, or
                anywhere you need to look professional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  How It Works (3 steps — compact)                                          */
/* -------------------------------------------------------------------------- */
function HowItWorks() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          How to get professional headshots
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground">
          Three steps. Five minutes. From anywhere.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
              1
            </div>
            <h3 className="font-semibold text-lg">Upload a selfie</h3>
            <p className="mt-2 text-base text-muted-foreground leading-relaxed">
              Take a well-lit selfie with your phone. One good photo is all it
              takes. Natural window light works best.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
              2
            </div>
            <h3 className="font-semibold text-lg">AI generates headshots</h3>
            <p className="mt-2 text-base text-muted-foreground leading-relaxed">
              FLUX.2 transforms your selfie into 30 studio-quality headshots
              with different outfits, backgrounds, and lighting.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
              3
            </div>
            <h3 className="font-semibold text-lg">Download & use</h3>
            <p className="mt-2 text-base text-muted-foreground leading-relaxed">
              Pick your favorites. Upload to LinkedIn, company website, email
              signature, business cards — anywhere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pricing                                                                   */
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
          Simple, transparent pricing
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
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  City FAQ                                                                  */
/* -------------------------------------------------------------------------- */
function cityFaqs(data: CityData) {
  return [
    {
      q: `How much do professional headshots cost in ${data.city}?`,
      a: `Traditional headshot photographers in ${data.city} charge ${data.photographerCost} per session, depending on the photographer's experience, studio location, and number of final images. AI headshots from TryOneTake start free — you can get 30 professional headshots with multiple outfits and backgrounds for a fraction of the cost, with no scheduling or travel required.`,
    },
    {
      q: `Can I get a professional headshot without going to a ${data.city} photo studio?`,
      a: `Yes. TryOneTake lets you get studio-quality professional headshots from anywhere in ${data.city} — your home, office, or co-working space. Upload a well-lit selfie taken with your phone, and our FLUX.2 AI generates 30 professional headshots in under 5 minutes. No commute, no scheduling, no studio visit required.`,
    },
    {
      q: `Are AI headshots good enough for LinkedIn and company websites in ${data.city}?`,
      a: `Absolutely. Modern AI headshots from FLUX.2 are indistinguishable from studio photography in professional contexts. Many ${data.city} professionals use AI headshots on LinkedIn, company About pages, business cards, and conference materials — and no one can tell the difference. The key is choosing a tool that prioritizes identity preservation so the results actually look like you.`,
    },
    {
      q: `How quickly can I get headshots in ${data.city}?`,
      a: `TryOneTake delivers 30 professional headshots in under 5 minutes. Compare that to the traditional ${data.city} photographer route: 1–2 weeks (schedule the shoot, commute to the studio, do the session, wait for editing, receive final images). For professionals who need headshots now — for a new job, conference, or LinkedIn update — AI is the clear winner on speed.`,
    },
  ];
}

function CityFaq({ data }: { data: CityData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = cityFaqs(data);

  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Professional headshots in {data.city} — FAQ
        </h2>
        <div className="mt-8 divide-y divide-border">
          {faqs.map((faq, i) => (
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
/*  Bottom CTA                                                                */
/* -------------------------------------------------------------------------- */
function BottomCta({ data }: { data: CityData }) {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to upgrade your headshot, {data.city}?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Upload 1 photo. Get 30 studio-quality headshots in under 5 minutes.
          Skip the {data.photographerCost} photographer. Try free — no credit
          card required.
        </p>
        <div className="mt-6 flex flex-col items-center gap-4">
          <Link href="/generate">
            <Button size="lg" className="h-12 px-8 text-base">
              Try free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link
            href="/professional-headshots"
            className="text-base text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
          >
            ← Back to Professional Headshots Guide
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Page Export                                                          */
/* -------------------------------------------------------------------------- */
const siteUrl = "https://tryonetake.com";

export function CityPage({ data }: { data: CityData }) {
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
              {
                "@type": "ListItem",
                position: 3,
                name: `${data.city}, ${data.state}`,
                item: `${siteUrl}/professional-headshots/${data.slug}`,
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
            mainEntity: cityFaqs(data).map((faq) => ({
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
      <Hero data={data} />
      <CostComparison data={data} />
      <WhyCity data={data} />
      <HowItWorks />
      <Pricing />
      <CityFaq data={data} />
      <BottomCta data={data} />
    </>
  );
}
