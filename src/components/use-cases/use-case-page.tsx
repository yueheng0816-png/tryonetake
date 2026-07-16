"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { UseCaseData } from "@/lib/use-case-data";

const BASE = "/images/landing";

function UseCaseHero({ data }: { data: UseCaseData }) {
  const { isSignedIn } = useAuth();

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Use Cases", href: "/use-cases" },
            { label: data.title },
          ]}
          className="mb-6"
        />
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-base text-muted-foreground">
          {data.badge}
        </div>

        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          {data.headline}
        </h1>
        <p className="mt-6 text-balance text-lg text-muted-foreground md:text-xl max-w-2xl">
          {data.subtitle}
        </p>

        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
          <Link href={isSignedIn ? "/generate" : "/sign-up"}>
            <Button size="lg" className="h-12 px-8 text-base">
              Get your headshots
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-base text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            $19 · Automatic refund if generation fails
          </div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>
    </section>
  );
}

function ExampleStrip({ imageIndices }: { imageIndices: number[] }) {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-5xl px-4 py-10">
        <p className="mb-6 text-center text-base text-muted-foreground">
          Sample AI-generated headshots
        </p>
        <div className="grid grid-cols-3 gap-4">
          {imageIndices.map((idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-xl border border-border bg-card aspect-[3/4]"
            >
              <Image
                src={`${BASE}/example-${idx}.jpg`}
                alt={`AI-generated professional headshot example ${idx}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 300px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits({
  heading,
  benefits,
}: {
  heading: string;
  benefits: { title: string; body: string }[];
}) {
  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          {heading}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="font-semibold text-lg">{b.title}</h3>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCaseFaq({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Frequently asked questions
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

      {/* JSON-LD: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
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
    </section>
  );
}

function CompactPricing() {
  const { isSignedIn } = useAuth();
  const plans = [
    {
      name: "Starter",
      price: "$19",
      desc: "10 style variations · FLUX.2 pro",
      cta: "Get Starter",
      href: "/sign-up?plan=starter",
      hrefLoggedIn: "/generate?plan=starter",
    },
    {
      name: "Pro",
      price: "$35",
      desc: "25 style variations · FLUX.2 max",
      cta: "Get Pro",
      href: "/sign-up?plan=pro",
      hrefLoggedIn: "/generate?plan=pro",
      featured: true,
    },
  ];

  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground">
          One-time payment. No subscription. Automatic refund if generation fails.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 max-w-xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 ${
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
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-sm">one-time</span>
              </div>
              <p className="mt-3 text-base text-muted-foreground">
                {plan.desc}
              </p>
              <Link
                href={
                  isSignedIn ? (plan.hrefLoggedIn ?? plan.href) : plan.href
                }
                className="mt-6 block"
              >
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

function BottomCta() {
  const { isSignedIn } = useAuth();
  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to upgrade your professional image?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Upload 1 photo. Get 30 studio-quality headshots in under 5 minutes.
        </p>
        <Link href={isSignedIn ? "/generate" : "/sign-up"} className="mt-6 inline-block">
          <Button size="lg" className="h-12 px-8 text-base">
            Get your headshots now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

const ucSiteUrl = "https://tryonetake.com";

export function UseCasePage({ data }: { data: UseCaseData }) {
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
              { "@type": "ListItem", position: 1, name: "Home", item: ucSiteUrl },
              { "@type": "ListItem", position: 2, name: "Use Cases", item: `${ucSiteUrl}/use-cases` },
              { "@type": "ListItem", position: 3, name: data.title, item: `${ucSiteUrl}/use-cases/${data.slug}` },
            ],
          }),
        }}
      />
      <UseCaseHero data={data} />
      <ExampleStrip imageIndices={data.exampleImages} />
      <Benefits heading={data.benefitsHeading} benefits={data.benefits} />
      <CompactPricing />
      <UseCaseFaq faqs={data.faqs} />
      <BottomCta />
    </>
  );
}
