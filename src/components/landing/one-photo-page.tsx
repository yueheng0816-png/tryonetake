"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ArrowRight, Check, ChevronDown, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

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
            { label: "One-Photo AI Headshots" },
          ]}
          className="mb-6"
        />
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-base text-muted-foreground">
          <Check className="h-4 w-4 text-green-500" />
          Only 1 photo required
        </div>
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          AI Headshots From Just One Photo — Studio Quality, Actually Looks Like
          You
        </h1>
        <p className="mt-6 text-balance text-lg text-muted-foreground md:text-xl max-w-2xl">
          No 10–20 photo uploads like other tools. Upload 1 selfie and our
          FLUX.2 AI generates 30 realistic professional headshots with different
          outfits, backgrounds, and lighting — in under 5 minutes. Try free.
        </p>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link href="/generate?free=true">
            <Button size="lg" className="h-12 px-8 text-base">
              Try free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-base text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            No credit card · 1 free headshot · Under 5 minutes
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
/*  Why Only One Photo                                                         */
/* -------------------------------------------------------------------------- */
const FLUX_ADVANTAGES = [
  {
    title: "FLUX.2 is a newer, smarter model",
    body: "Older AI models (FLUX.1, proprietary models from 2023–2024) need 6–20 reference photos to understand what you look like — they need multiple angles to fill in the gaps. FLUX.2 (the latest generation, released 2025) understands facial geometry from a single well-lit photo. Fewer inputs, better output.",
  },
  {
    title: "One photo = faster generation",
    body: "Every extra photo you upload slows down the AI pipeline. More images to process, more facial features to reconcile, more potential conflicts. A single clean selfie gives the AI one clear reference — processing is faster and more consistent.",
  },
  {
    title: "The best AI headshot model on the market",
    body: "TryOneTake runs on FLUX.2 pro (Starter) and FLUX.2 max (Pro) — the most realistic AI image models available. FLUX.2's identity preservation outperforms every competitor we've tested. One photo is all it needs because the model is that good.",
  },
];

function WhyOnePhoto() {
  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Why TryOneTake only needs 1 photo — while competitors ask for 10+
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          More photos doesn&apos;t mean better results. It usually means an older AI
          model that needs extra data to compensate. Here&apos;s the real story.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {FLUX_ADVANTAGES.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Before/After */}
        <div className="mt-10 mx-auto max-w-2xl">
          <div className="relative rounded-2xl border border-border bg-card p-3 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative overflow-hidden rounded-xl bg-muted aspect-[3/4]">
                <Image
                  src="/images/landing/before-selfie-v2.jpg"
                  alt="Original selfie — the single photo uploaded"
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 332px"
                />
                <div className="absolute top-2 left-2 rounded-md bg-background/85 px-2 py-0.5 text-xs font-medium backdrop-blur">
                  Before — 1 selfie
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl bg-muted aspect-[3/4]">
                <Image
                  src="/images/landing/after-headshot-v2.jpg"
                  alt="AI-generated professional headshot from one selfie"
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 332px"
                />
                <div className="absolute top-2 left-2 rounded-md bg-background/85 px-2 py-0.5 text-xs font-medium backdrop-blur">
                  After — AI headshot
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-base text-muted-foreground">
              Same person. One selfie. 30 professional results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Photo Requirements Comparison                                              */
/* -------------------------------------------------------------------------- */
const PHOTO_REQS = [
  { tool: "TryOneTake", photos: "1 photo", highlight: true },
  { tool: "HeadshotPro", photos: "6–12 photos", highlight: false },
  { tool: "Aragon AI", photos: "8–12 photos", highlight: false },
  { tool: "Secta AI", photos: "10+ photos", highlight: false },
  { tool: "InstaHeadshots", photos: "10–15 photos", highlight: false },
  { tool: "Dreamwave", photos: "8–12 photos", highlight: false },
  { tool: "Headshots.com", photos: "10–20 photos", highlight: false },
];

function PhotoReqComparison() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          One photo vs the rest — how many photos does each tool need?
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground">
          TryOneTake: 1. Everyone else: 6 to 20. That&apos;s not a marketing gimmick
          — it&apos;s a difference in AI model generation.
        </p>
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-base">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left font-medium">Tool</th>
                <th className="px-6 py-4 text-left font-medium">Photos required</th>
                <th className="px-6 py-4 text-left font-medium">AI model</th>
              </tr>
            </thead>
            <tbody>
              {PHOTO_REQS.map((row) => (
                <tr
                  key={row.tool}
                  className={`border-b border-border last:border-0 ${
                    row.highlight ? "bg-primary/5 font-semibold" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    {row.highlight ? (
                      <span className="text-primary">{row.tool}</span>
                    ) : (
                      row.tool
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {row.highlight ? (
                      <span className="text-green-600">{row.photos}</span>
                    ) : (
                      row.photos
                    )}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {row.highlight ? "FLUX.2 pro / max" : "Older / proprietary"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Realism Section                                                            */
/* -------------------------------------------------------------------------- */
const REALISM_POINTS = [
  {
    title: "Identity preservation",
    body: "FLUX.2 maintains your facial structure — bone shape, eye spacing, lip contour — without the 'generic AI face' look some older models produce. The result looks like you, not like a 'type' of person.",
  },
  {
    title: "Natural texture, not over-smoothing",
    body: "Cheap AI headshot tools over-smooth the skin to hide artifacts. TryOneTake preserves natural skin texture, pores, and fine details — the things that make a photo look real, not plastic.",
  },
  {
    title: "Diverse output, consistent identity",
    body: "30 headshots, different outfits, backgrounds, and lighting — all clearly the same person. Our AI generates variety without losing your identity across the set.",
  },
  {
    title: "Built on 2.5 billion images",
    body: "FLUX.2 was trained on a massive, carefully curated dataset. It understands how real studio lighting, professional backgrounds, and natural expressions work — and reproduces them accurately from a single selfie.",
  },
];

function RealismSection() {
  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Realistic AI headshots — not generic AI faces
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          The difference between a headshot that looks like you and one that looks
          like &quot;someone like you&quot; comes down to the AI model. Here&apos;s how
          TryOneTake gets it right.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {REALISM_POINTS.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <Check className="h-5 w-5 text-green-500 mb-3" />
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                        */
/* -------------------------------------------------------------------------- */
const ONE_PHOTO_FAQS = [
  {
    q: "Can AI really generate a professional headshot from just one photo?",
    a: "Yes — with the right AI model. FLUX.2, the model powering TryOneTake, was released in 2025 and represents a significant advance in facial understanding. Older AI models (FLUX.1, proprietary 2023–2024 models) need 8–20 photos because they can't accurately reconstruct a face from limited data. FLUX.2 can. One well-lit selfie — natural window light, plain background, looking at the lens — is all it needs.",
  },
  {
    q: "Why do other AI headshot generators need 10+ photos?",
    a: "They run on older AI models that need more reference data to produce usable results. More photos compensate for less capable AI. It's the difference between asking an experienced portrait artist to sketch you from one glance vs asking a beginner who needs you to sit for hours. FLUX.2 is the experienced artist — one look, and it gets you.",
  },
  {
    q: "Are AI headshots from one photo actually realistic?",
    a: "TryOneTake's AI headshots are consistently rated as more realistic than competitors that require 10+ photos — because FLUX.2 preserves facial identity naturally without the over-smoothing and generic 'AI look' common in older models. See the before/after examples above for a real comparison. The best test: try the free tier and judge for yourself.",
  },
  {
    q: "What kind of selfie works best for one-photo AI headshots?",
    a: "Natural window light (soft, diffused — overcast days are ideal), plain background (white or light-colored wall), eye-level angle, looking directly at the lens with a neutral or slight natural smile. Avoid flash, harsh overhead light, and busy backgrounds. One good photo is all you need — take 5–10 and upload the best one. See our full selfie guide for detailed tips.",
  },
  {
    q: "Can I get different outfits and backgrounds from just one selfie?",
    a: "Yes. FLUX.2 generates the outfit, background, and lighting independently based on your style selection — it learned to do this from 2.5 billion training images. Your face stays the same; everything else is generated fresh for each headshot. Starter gets you 10 style variations (30 headshots total); Pro gives you 25 variations (30 headshots total).",
  },
];

function OnePhotoFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Frequently asked questions about one-photo AI headshots
        </h2>
        <div className="mt-8 divide-y divide-border">
          {ONE_PHOTO_FAQS.map((faq, i) => (
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
          Ready to try? 1 selfie. 30 headshots. Under 5 minutes.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Upload a single photo, get professional AI headshots that actually look
          like you. Try free — no credit card, no catch.
        </p>
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/generate?free=true">
            <Button size="lg" className="h-12 px-8 text-base">
              Try free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/generate?plan=starter">
            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
              Get Starter ($19)
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          See our{" "}
          <Link
            href="/pricing"
            className="text-primary underline underline-offset-2 font-medium"
          >
            pricing page →
          </Link>{" "}
          for full plan details. One-time payment, no subscription.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Page                                                                  */
/* -------------------------------------------------------------------------- */
const siteUrl = "https://tryonetake.com";

export function OnePhotoPage() {
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
                name: "One-Photo AI Headshots",
                item: `${siteUrl}/one-photo-ai-headshots`,
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
            mainEntity: ONE_PHOTO_FAQS.map((faq) => ({
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
      <WhyOnePhoto />
      <PhotoReqComparison />
      <RealismSection />
      <OnePhotoFaq />
      <BottomCta />
    </>
  );
}
