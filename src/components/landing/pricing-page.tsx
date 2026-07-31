"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ArrowRight, Check, ChevronDown, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { PricingPreview } from "@/components/landing/pricing-preview";

/* -------------------------------------------------------------------------- */
/*  Plans data (mirrors pricing-section.tsx — single source of truth target)   */
/* -------------------------------------------------------------------------- */
const PLANS = [
  {
    name: "Free",
    price: "$0",
    model: "FLUX.2 pro",
    photos: "1 headshot",
    styles: "Natural style",
    features: [
      "FLUX.2 pro model (same as Starter)",
      "1 professional headshot",
      "Full resolution",
      "Natural style",
      "No watermark",
      "Instant delivery",
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
      "Full resolution",
      "No watermark",
      "Instant download (ZIP)",
      "Automatic refund if generation fails",
    ],
    cta: "Get Starter",
    href: "/generate?plan=starter",
    featured: true,
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
      "Full resolution",
      "No watermark",
      "Instant download (ZIP)",
      "Automatic refund if generation fails",
    ],
    cta: "Get Pro",
    href: "/generate?plan=pro",
    featured: false,
  },
];

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
            { label: "Pricing" },
          ]}
          className="mb-6"
        />
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-base text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          One-time payment · No subscription
        </div>
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          AI Headshot Generator Pricing — One-Time Payment, No Subscription
        </h1>
        <p className="mt-6 text-balance text-lg text-muted-foreground md:text-xl max-w-2xl">
          Professional AI headshots from $19 — less than a photographer charges
          for a single consultation. Try free ($0), upgrade when ready. Pay once,
          own your headshots forever. No monthly fees, no hidden costs, no
          watermark.
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
            No credit card · 1 free headshot
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
/*  Pricing Cards                                                              */
/* -------------------------------------------------------------------------- */
function PricingCards() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground">
          One-time payment. No subscription. Automatic refund if generation fails.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => (
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
                    <span className="text-muted-foreground text-sm">one-time</span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span className="rounded-md bg-muted px-2 py-0.5">{plan.model}</span>
                  <span className="rounded-md bg-muted px-2 py-0.5">{plan.photos}</span>
                  <span className="rounded-md bg-muted px-2 py-0.5">{plan.styles}</span>
                </div>
              </div>
              <ul className="mb-8 flex-1 space-y-3 text-base">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <PricingPreview plan={plan.name.toLowerCase() as "free" | "starter" | "pro"} />
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
          All plans: one-time payment. No subscription.{" "}
          <Link
            href="/refund"
            className="text-primary underline underline-offset-2 font-medium"
          >
            Automatic refund if generation fails →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Budget Breakdown                                                            */
/* -------------------------------------------------------------------------- */
const BUDGET_TIERS = [
  {
    budget: "Under $10",
    label: "Budget-conscious",
    body: "TryOneTake's free tier is genuinely free ($0). One professional headshot, full resolution, no credit card. Most other tools advertising 'free' either require a credit card or deliver a tiny watermarked thumbnail. For sustainable professional results under $10, TryOneTake's free tier is the only real option — upgrade to Starter ($19) when you need the full set.",
    cta: "Try free",
    href: "/generate?free=true",
  },
  {
    budget: "Under $20",
    label: "Best value",
    body: "TryOneTake's Starter plan ($19 one-time) gives you 30 professional headshots across 10 style variations using the FLUX.2 pro model. Full resolution, no watermark, instant ZIP download. Competitors like HeadshotPro start at $24 for fewer styles on an older AI model (FLUX.1). At $19, Starter is the best value in AI headshots — period.",
    cta: "Get Starter ($19)",
    href: "/generate?plan=starter",
  },
  {
    budget: "Under $30",
    label: "Premium tier",
    body: "TryOneTake's Pro plan ($35 one-time) runs on FLUX.2 max — the most realistic AI headshot model available. 30 headshots, 25 style variations, the highest facial fidelity. Most competitors charge $29–$59/month (subscription) for comparable quality. $35 one-time for results you can actually use on LinkedIn, your company site, and conference materials.",
    cta: "Get Pro ($35)",
    href: "/generate?plan=pro",
  },
];

function BudgetBreakdown() {
  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Find the right plan for your budget
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          Whether you want to try free or need the full set — there&apos;s a
          TryOneTake plan that fits.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {BUDGET_TIERS.map((tier) => (
            <div
              key={tier.budget}
              className="rounded-xl border border-border bg-card p-6 flex flex-col"
            >
              <h3 className="text-xl font-bold text-primary">{tier.budget}</h3>
              <span className="mt-1 text-sm font-medium text-muted-foreground">
                {tier.label}
              </span>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed flex-1">
                {tier.body}
              </p>
              <Link href={tier.href} className="mt-6 inline-block">
                <Button variant="outline" size="sm">
                  {tier.cta}
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
/*  Price Comparison vs Competitors                                             */
/* -------------------------------------------------------------------------- */
const COMPETITOR_PRICES = [
  {
    tool: "HeadshotPro",
    startingPrice: "$24",
    model: "FLUX.1",
    billing: "One-time",
    photos: "40 headshots",
    link: "/vs/headshotpro",
  },
  {
    tool: "Aragon AI",
    startingPrice: "$29",
    model: "Proprietary",
    billing: "One-time",
    photos: "40 headshots",
    link: "/vs/aragon-ai",
  },
  {
    tool: "BetterPic",
    startingPrice: "$19",
    model: "Proprietary",
    billing: "One-time",
    photos: "40–120 headshots",
    link: "/vs/betterpic",
  },
  {
    tool: "Dreamwave",
    startingPrice: "$17",
    model: "Older model",
    billing: "One-time",
    photos: "40 headshots",
    link: "/vs/dreamwave",
  },
];

const TRYONETAKE_ROW = {
  tool: "TryOneTake",
  startingPrice: "$19",
  model: "FLUX.2 pro",
  billing: "One-time",
  photos: "30 headshots",
};

function PriceComparison() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          How TryOneTake pricing compares
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          TryOneTake starts at $19 with a better AI model (FLUX.2) than tools
          charging more. And unlike most, there&apos;s no subscription — ever.
        </p>
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[600px] text-base">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left font-medium">Tool</th>
                <th className="px-6 py-4 text-left font-medium">Starting price</th>
                <th className="px-6 py-4 text-left font-medium">AI model</th>
                <th className="px-6 py-4 text-left font-medium">Billing</th>
                <th className="px-6 py-4 text-left font-medium">Output</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {/* TryOneTake — highlighted */}
              <tr className="border-b border-border bg-primary/5">
                <td className="px-6 py-4 font-semibold text-primary">
                  {TRYONETAKE_ROW.tool}
                </td>
                <td className="px-6 py-4 font-semibold">
                  {TRYONETAKE_ROW.startingPrice}
                </td>
                <td className="px-6 py-4 font-medium text-green-600">
                  {TRYONETAKE_ROW.model}
                </td>
                <td className="px-6 py-4">{TRYONETAKE_ROW.billing}</td>
                <td className="px-6 py-4">{TRYONETAKE_ROW.photos}</td>
                <td className="px-6 py-4" />
              </tr>
              {COMPETITOR_PRICES.map((c) => (
                <tr key={c.tool} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 font-medium">{c.tool}</td>
                  <td className="px-6 py-4">{c.startingPrice}</td>
                  <td className="px-6 py-4 text-muted-foreground">{c.model}</td>
                  <td className="px-6 py-4">{c.billing}</td>
                  <td className="px-6 py-4">{c.photos}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={c.link}
                      className="text-sm text-primary underline underline-offset-2 font-medium whitespace-nowrap"
                    >
                      Compare →
                    </Link>
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
/*  One-Time vs Subscription                                                   */
/* -------------------------------------------------------------------------- */
const PAYMENT_COMPARISON = [
  {
    label: "Payment model",
    tryonetake: "One-time payment",
    tryonetakeGood: true,
    others: "Monthly subscription ($10–$30/month)",
  },
  {
    label: "Cost over 1 year",
    tryonetake: "$19 (Starter) or $35 (Pro)",
    tryonetakeGood: true,
    others: "$120–$360 per year",
  },
  {
    label: "Auto-renewal",
    tryonetake: "Never — you pay once, you're done",
    tryonetakeGood: true,
    others: "Auto-charge each month unless you cancel",
  },
  {
    label: "Cancellation hassle",
    tryonetake: "None — one payment, no cancellation needed",
    tryonetakeGood: true,
    others: "Often hidden behind multi-click flows",
  },
  {
    label: "Unexpected charges",
    tryonetake: "None — price you see is price you pay",
    tryonetakeGood: true,
    others: "Price increases, add-on fees, overage charges",
  },
];

function OneTimeVsSubscription() {
  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          One-time payment vs subscription — the honest comparison
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          Most AI headshot tools lock you into monthly subscriptions. TryOneTake
          doesn&apos;t. You pay once, you own your headshots. Here&apos;s what
          that actually means for your wallet.
        </p>
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[600px] text-base">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left font-medium w-1/3" />
                <th className="px-6 py-4 text-left font-semibold">
                  <span className="rounded-md bg-primary/10 px-3 py-1 text-primary">
                    TryOneTake (one-time)
                  </span>
                </th>
                <th className="px-6 py-4 text-left text-muted-foreground">
                  Most AI headshot tools (subscription)
                </th>
              </tr>
            </thead>
            <tbody>
              {PAYMENT_COMPARISON.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 font-medium">{row.label}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-green-600">
                      {row.tryonetake}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{row.others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-center text-base text-muted-foreground max-w-2xl mx-auto">
          A headshot is a one-time asset — your face doesn&apos;t change every
          month. A subscription for headshots makes about as much sense as a
          subscription for a haircut. You pay once, you get your photos, you move
          on with your life.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Cheaper Than HeadshotPro                                                   */
/* -------------------------------------------------------------------------- */
function CheaperThanCompetitors() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Cheaper than HeadshotPro — with a better AI model
        </h2>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          TryOneTake Starter is <strong>$19 one-time</strong> with FLUX.2 pro.
          HeadshotPro starts at <strong>$24</strong> with the older FLUX.1 model.
          That&apos;s 20% less for a newer, more realistic AI — and the same
          one-time payment model, no subscription catch.
        </p>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Aragon AI starts at <strong>$29</strong>. BetterPic starts at{" "}
          <strong>$19</strong> — same price point, but with an older proprietary
          model rather than FLUX.2. At every price tier, TryOneTake gives you the
          newest AI model for the same or lower cost.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/generate?plan=starter">
            <Button size="lg" className="h-12 px-8 text-base">
              Get Starter ($19)
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/vs/headshotpro">
            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
              Full comparison vs HeadshotPro →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                        */
/* -------------------------------------------------------------------------- */
const PRICING_FAQS = [
  {
    q: "Is there a good AI headshot generator under $10?",
    a: "TryOneTake's free tier is $0 — genuinely free, no credit card required. If you have a budget under $10, start there. Most other tools advertising 'free' either require a credit card or deliver a tiny watermarked thumbnail. For sustainable professional results under $10, TryOneTake's free tier is the only real option. Upgrade to Starter ($19 one-time) when you need the full set of 30 headshots with 10 style variations.",
  },
  {
    q: "What's the cheapest AI headshot generator that actually delivers professional results?",
    a: "TryOneTake's Starter plan at $19 is the best combination of price and quality. It uses the FLUX.2 pro model — a newer, more realistic AI than HeadshotPro's FLUX.1 (which charges $24+). You get 30 headshots, 10 style variations, full resolution, no watermark, and instant download. All of our competitors either charge more (HeadshotPro $24, Aragon AI $29), use older AI models, or lock you into a monthly subscription.",
  },
  {
    q: "Is there an AI headshot generator under $20 worth paying for?",
    a: "TryOneTake Starter ($19 one-time) is the most recommended AI headshot plan under $20. 30 headshots, 10 style variations, FLUX.2 pro model, full resolution, no watermark. At the same price point, BetterPic ($19) uses an older proprietary model. Most tools under $20 are either freemium (limited quality) or charge a subscription on top. TryOneTake Starter is genuinely one-time — pay once, done.",
  },
  {
    q: "What's the best AI headshot generator under $30?",
    a: "TryOneTake Pro ($35 one-time, slightly above $30) runs on FLUX.2 max — the highest-realism AI headshot model available. At the $29–$30 price range, Aragon AI is the main competitor — TryOneTake beats it on AI model freshness (FLUX.2 max vs proprietary older model) and style variety (25 vs fewer). If you can stretch to $35, Pro is the best quality-per-dollar in AI headshots.",
  },
  {
    q: "Do AI headshot generators require a subscription?",
    a: "TryOneTake charges a one-time payment — $19 (Starter) or $35 (Pro). You pay once, you get your headshots, you're done. No monthly billing, no auto-renewal, no cancellation dance. Several competitors (including some photo AI platforms) charge $10–$30/month. A headshot is a one-time asset — your face doesn't change every month. Paying a subscription for headshots doesn't make sense, and TryOneTake doesn't make you.",
  },
  {
    q: "What's the cheapest pay-once AI headshot generator?",
    a: "TryOneTake Starter at $19 one-time is the most affordable pay-once AI headshot generator using a current-generation model (FLUX.2 pro). Dreamwave is cheaper at $17, but uses an older AI model with less realistic output. TryOneTake gives you a newer model, more style variety, and better identity preservation for $2 more — the quality difference is visible.",
  },
];

function PricingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Frequently asked questions about AI headshot pricing
        </h2>
        <div className="mt-8 divide-y divide-border">
          {PRICING_FAQS.map((faq, i) => (
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
          Ready to get professional AI headshots — one-time, no subscription?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Try free ($0). Upgrade to Starter ($19) or Pro ($35) when you&apos;re
          ready. Pay once, own your headshots forever.
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
        <p className="mt-6 text-sm text-muted-foreground">
          All plans: one-time payment. No subscription.{" "}
          <Link
            href="/refund"
            className="text-primary underline underline-offset-2 font-medium"
          >
            Automatic refund if generation fails →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Page                                                                  */
/* -------------------------------------------------------------------------- */
const siteUrl = "https://tryonetake.com";

export function PricingPage() {
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
              { "@type": "ListItem", position: 2, name: "Pricing", item: `${siteUrl}/pricing` },
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
            mainEntity: PRICING_FAQS.map((faq) => ({
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
      <PricingCards />
      <BudgetBreakdown />
      <PriceComparison />
      <OneTimeVsSubscription />
      <CheaperThanCompetitors />
      <PricingFaq />
      <BottomCta />
    </>
  );
}
