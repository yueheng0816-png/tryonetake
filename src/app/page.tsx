import type { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ComparisonTable } from "@/components/landing/comparison-table";
import { ExamplesGallery } from "@/components/landing/examples-gallery";
import { PricingSection } from "@/components/landing/pricing-section";
import { Faq } from "@/components/landing/faq";
import { ThemeSwitcher } from "@/components/landing/theme-switcher";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "OneTake — Professional AI Headshots That Actually Look Like You",
  description:
    "Upload 1 photo, get 30 studio-quality AI headshots in under 5 minutes. No photographer needed. FLUX.2 AI model — one payment of $19, automatic refund if generation fails. Trusted by professionals across 10+ industries.",
  keywords: [
    "AI headshots",
    "professional headshots",
    "LinkedIn photo AI",
    "AI portrait generator",
    "corporate headshot AI",
    "business headshot",
    "AI-generated portrait",
    "professional profile picture",
    "headshot generator",
    "OneTake AI",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "OneTake",
    title: "OneTake — Professional AI Headshots That Actually Look Like You",
    description:
      "Upload 1 photo, get 30 studio-quality AI headshots. No photographer needed, no outfit menus, no background catalogs. $19 flat.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OneTake — AI Headshots That Actually Look Like You",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OneTake — AI Headshots That Actually Look Like You",
    description:
      "Upload 1 photo, get 30 studio-quality headshots in under 5 minutes. $19 flat.",
    images: ["/og-image.jpg"],
  },
};

export default function Home() {
  return (
    <>
      {/* JSON-LD: WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "OneTake",
            url: "https://tryonetake.com",
            description:
              "Upload 1 photo, get 30 studio-quality AI headshots in under 5 minutes. FLUX.2 AI model.",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "19.00",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <Hero />
      <ExamplesGallery
        title="Sample AI-generated headshots"
        subtitle="Generated from a single photo. No touch-ups, no cherry-picking — just AI that actually knows your face."
        startIndex={0}
        count={8}
      />
      <ExamplesGallery
        title="Beyond the standard headshot"
        subtitle="Sitting at a boardroom table, leaning against a riverside railing, standing in a law firm lobby — your AI headshots fit every professional context."
        startIndex={8}
        count={8}
        variant="white"
      />
      <HowItWorks />
      <ComparisonTable />
      <PricingSection />
      <Faq />
      <ThemeSwitcher />
    </>
  );
}
