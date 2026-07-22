import type { Metadata } from "next";
import Link from "next/link";
import { useCases } from "@/lib/use-case-data";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ArrowRight } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI Headshot Use Cases — For Every Profession",
  description:
    "Explore how TryOneTake AI headshots serve different professions. LinkedIn headshots, corporate team photos, actor portfolios, real estate agent photos — $19, under 5 minutes.",
  keywords: [
    "AI headshot use cases",
    "professional AI headshots",
    "LinkedIn headshot AI",
    "corporate headshots AI",
    "actor headshots AI",
    "realtor headshots AI",
  ],
  alternates: {
    canonical: "/use-cases",
  },
  openGraph: {
    title: "AI Headshot Use Cases — For Every Profession | TryOneTake",
    description:
      "Explore how TryOneTake AI headshots serve different professions. LinkedIn, corporate, actors, real estate agents — $19, under 5 minutes.",
    url: `${siteUrl}/use-cases`,
    siteName: "TryOneTake",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TryOneTake AI Headshot Use Cases",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Headshot Use Cases — For Every Profession | TryOneTake",
    description:
      "Explore how TryOneTake AI headshots serve different professions. $19, under 5 minutes.",
    images: ["/og-image.jpg"],
  },
};

export default function UseCasesIndex() {
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
                  name: "Use Cases",
                  item: `${siteUrl}/use-cases`,
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "AI Headshot Use Cases",
              description:
                "Explore how TryOneTake AI headshots serve different professions.",
              url: `${siteUrl}/use-cases`,
              hasPart: useCases.map((uc) => ({
                "@type": "WebPage",
                name: uc.title,
                url: `${siteUrl}/use-cases/${uc.slug}`,
                description: uc.description,
              })),
            },
          ]),
        }}
      />

      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Use Cases" },
          ]}
        />
        <h1 className="text-4xl font-bold tracking-tight">
          AI Headshots for Every Profession
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          No matter what you do, a professional headshot opens doors. Explore how
          TryOneTake serves different professions — all from 1 photo, under 5
          minutes, $19.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {useCases.map((uc) => (
            <Link
              key={uc.slug}
              href={`/use-cases/${uc.slug}`}
              className="group rounded-xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-sm text-muted-foreground">
                {uc.badge}
              </div>
              <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {uc.title}
              </h2>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                {uc.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-base font-medium text-primary">
                Learn more
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
