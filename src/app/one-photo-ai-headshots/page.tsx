import type { Metadata } from "next";
import { OnePhotoPage } from "@/components/landing/one-photo-page";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI Headshots From One Photo — 1 Selfie, 30 Professional Results | TryOneTake",
  description:
    "Get professional AI headshots from just one photo — not 10-20 like other tools. Upload 1 selfie, get 30 realistic studio-quality portraits with multiple outfits & backgrounds. FLUX.2 AI. Try free.",
  keywords: [
    "AI headshot generator from one selfie",
    "AI headshot generator with one photo",
    "realistic AI headshot generator",
    "1 photo AI headshot",
    "single selfie AI headshot",
    "one photo professional headshot AI",
    "AI headshot one picture",
  ],
  alternates: {
    canonical: "/one-photo-ai-headshots",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/one-photo-ai-headshots`,
    siteName: "TryOneTake",
    title: "AI Headshots From One Photo — 1 Selfie, 30 Professional Results | TryOneTake",
    description:
      "Get professional AI headshots from just one photo. Upload 1 selfie, get 30 realistic studio-quality portraits. FLUX.2 AI — actually looks like you.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "One Photo AI Headshots — TryOneTake",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Headshots From One Photo — Realistic Results | TryOneTake",
    description:
      "1 selfie = 30 professional AI headshots. No 10-20 photo uploads. FLUX.2 AI.",
    images: ["/og-image.jpg"],
  },
};

export default function OnePhotoRoute() {
  return <OnePhotoPage />;
}
