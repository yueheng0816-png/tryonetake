import type { Metadata } from "next";
import Link from "next/link";
import { comparisons } from "@/lib/comparison-data";
import { ArrowRight } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "OneTake vs Competitors — Honest AI Headshot Comparisons",
  description:
    "Honest, side-by-side comparisons of OneTake vs other AI headshot generators. Compare pricing, speed, quality, and features. Find the best AI headshot tool for your needs.",
  keywords: [
    "AI headshot comparison",
    "OneTake vs competitors",
    "best AI headshot generator",
    "AI headshot tool comparison",
    "HeadshotPro alternative",
    "Aragon AI alternative",
  ],
  alternates: {
    canonical: "/vs",
  },
  openGraph: {
    title: "OneTake vs Competitors — Honest AI Headshot Comparisons",
    description:
      "Honest, side-by-side comparisons of OneTake vs other AI headshot generators. Compare pricing, speed, quality, and features.",
    url: `${siteUrl}/vs`,
    siteName: "OneTake",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OneTake vs Competitors — AI Headshot Comparison",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OneTake vs Competitors — Honest AI Headshot Comparisons",
    description:
      "Honest, side-by-side comparisons of OneTake vs other AI headshot generators.",
    images: ["/og-image.jpg"],
  },
};

export default function VsIndex() {
  return (
    <>
      {/* JSON-LD: BreadcrumbList + CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: siteUrl,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "VS",
                  item: `${siteUrl}/vs`,
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "OneTake vs Competitors",
              description:
                "Honest, side-by-side comparisons of OneTake vs other AI headshot generators.",
              url: `${siteUrl}/vs`,
              hasPart: comparisons.map((c) => ({
                "@type": "WebPage",
                name: c.title,
                url: `${siteUrl}/vs/${c.slug}`,
                description: c.description,
              })),
            },
          ]),
        }}
      />

      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <h1 className="text-4xl font-bold tracking-tight">
          OneTake vs Competitors
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Honest, side-by-side comparisons. No marketing fluff — just the facts
          you need to choose the right AI headshot generator for your needs and
          budget.
        </p>

        <div className="mt-10 divide-y divide-border">
          {comparisons.map((c) => (
            <Link
              key={c.slug}
              href={`/vs/${c.slug}`}
              className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-5 hover:bg-muted/30 px-4 -mx-4 rounded-lg transition-colors"
            >
              <div>
                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {c.title}
                </h2>
                <p className="mt-1 text-base text-muted-foreground">
                  {c.description}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-base font-medium text-primary shrink-0">
                Compare
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
