import type { Metadata } from "next";
import { PricingPage } from "@/components/landing/pricing-page";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI Headshot Generator Pricing — $0 to $35, One-Time Payment | TryOneTake",
  description:
    "Affordable AI headshot generator from just $19 one-time — no subscription, pay once, no watermark. Cheaper than HeadshotPro ($24+). Try free ($0). Studio-quality FLUX.2 AI headshots.",
  keywords: [
    "affordable AI headshot generator",
    "cheapest AI headshot generator",
    "AI headshot generator under $10",
    "AI headshot generator under $20",
    "best AI headshot generator under $30",
    "AI headshot generator no subscription",
    "AI headshot generator pay once",
    "AI headshot generator cheaper than HeadshotPro",
    "AI headshot pricing",
    "one-time payment headshot AI",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/pricing`,
    siteName: "TryOneTake",
    title: "AI Headshot Generator Pricing — $0 to $35, One-Time Payment | TryOneTake",
    description:
      "Affordable AI headshot generator from just $19 one-time — no subscription, pay once, no watermark. Try free, upgrade when ready.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TryOneTake Pricing — One-Time Payment, No Subscription",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Headshot Generator Pricing — One-Time Payment | TryOneTake",
    description:
      "Affordable AI headshots from $19 one-time. No subscription, no watermark. Try free ($0).",
    images: ["/og-image.jpg"],
  },
};

export default function PricingRoute() {
  return <PricingPage />;
}
