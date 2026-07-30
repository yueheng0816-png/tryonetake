import type { Metadata } from "next";
import { FreeHeadshotPage } from "@/components/landing/free-headshot-page";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Free AI Headshot Generator — Try Free, No Credit Card",
  description:
    "Get a professional AI headshot for free. Upload 1 selfie, get a studio-quality portrait in under 5 minutes — no credit card. Try free, upgrade only if you want more.",
  keywords: [
    "free AI headshot generator",
    "free professional headshot",
    "AI headshot free",
    "free AI profile picture",
    "no credit card headshot generator",
    "free LinkedIn photo AI",
    "AI headshot no payment",
    "AI headshot generator no sign up",
    "free AI headshot no registration",
    "AI headshot generator without account",
  ],
  alternates: {
    canonical: "/free-ai-headshot-generator",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/free-ai-headshot-generator`,
    siteName: "TryOneTake",
    title: "Free AI Headshot Generator — Try Free, No Credit Card",
    description:
      "Get a professional AI headshot for free. Upload 1 selfie, get a studio-quality portrait in under 5 minutes. No credit card, no catch.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Free AI Headshot Generator — TryOneTake",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Headshot Generator — Try Free, No Credit Card",
    description:
      "Get a professional AI headshot for free. Upload 1 selfie, under 5 minutes. No credit card, no catch.",
    images: ["/og-image.jpg"],
  },
};

export default function FreeHeadshotGeneratorPage() {
  return <FreeHeadshotPage />;
}
