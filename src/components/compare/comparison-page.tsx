"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import type { ComparisonData } from "@/lib/comparison-data";

function Hero({ data }: { data: ComparisonData }) {
  const { isSignedIn } = useAuth();
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "VS", href: "/vs" },
            { label: data.title },
          ]}
        />
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-base text-muted-foreground">
          Honest Comparison
        </div>
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          OneTake vs {data.competitor}
        </h1>
        <p className="mt-6 text-balance text-lg text-muted-foreground md:text-xl max-w-2xl">
          An honest, side-by-side comparison. No marketing fluff — just facts to
          help you choose the right AI headshot tool.
        </p>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
          <Link href={isSignedIn ? "/generate" : "/sign-up"}>
            <Button size="lg" className="h-12 px-8 text-base">
              Try OneTake
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-base text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            $19 · Automatic refund if generation fails
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>
    </section>
  );
}

function ComparisonTable({ data }: { data: ComparisonData }) {
  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          OneTake vs {data.competitor} — feature by feature
        </h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 pr-4 text-base font-medium text-muted-foreground w-2/5">
                  Feature
                </th>
                <th className="py-3 px-4 text-base font-semibold text-primary">
                  OneTake
                </th>
                <th className="py-3 pl-4 text-base font-medium text-muted-foreground">
                  {data.competitor}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.advantages.map((row) => (
                <tr key={row.feature} className="border-b border-border">
                  <td className="py-4 pr-4 text-base font-medium">
                    {row.feature}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 shrink-0 text-green-500" />
                      <span className="text-base">{row.oneTake}</span>
                    </div>
                  </td>
                  <td className="py-4 pl-4">
                    <span className="text-base text-muted-foreground">
                      {row.competitor}
                    </span>
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

function Verdict({ data }: { data: ComparisonData }) {
  const { isSignedIn } = useAuth();
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          {data.summaryHeading}
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {data.summary}
        </p>
        <Link
          href={isSignedIn ? "/generate" : "/sign-up"}
          className="mt-8 inline-block"
        >
          <Button size="lg" className="h-12 px-8 text-base">
            Get your headshots with OneTake
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

const siteUrl = "https://tryonetake.com";

export function ComparisonPage({ data }: { data: ComparisonData }) {
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
              { "@type": "ListItem", position: 2, name: "VS", item: `${siteUrl}/vs` },
              { "@type": "ListItem", position: 3, name: data.title, item: `${siteUrl}/vs/${data.slug}` },
            ],
          }),
        }}
      />
      <Hero data={data} />
      <ComparisonTable data={data} />
      <Verdict data={data} />
    </>
  );
}
