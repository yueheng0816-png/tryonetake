import type { Metadata } from "next";
import { ProfessionalHeadshotsPage } from "@/components/landing/professional-headshots-page";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Professional Headshots — The Complete 2026 Guide",
  description:
    "Everything about professional headshots: what they are, why they matter, cost comparison (AI vs traditional photography), how to get them, and what to look for. Complete guide for 2026.",
  keywords: [
    "professional headshots",
    "professional headshot photography",
    "business headshots",
    "corporate headshots",
    "professional headshot cost",
    "professional headshot tips",
    "AI professional headshots",
    "professional portrait photography",
  ],
  alternates: {
    canonical: "/professional-headshots",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/professional-headshots`,
    siteName: "TryOneTake",
    title: "Professional Headshots — The Complete 2026 Guide",
    description:
      "Everything about professional headshots: what they are, cost comparison (AI vs photography), how to get them, and what to look for. The complete 2026 guide.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Professional Headshots — The Complete 2026 Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Headshots — The Complete 2026 Guide",
    description:
      "Everything about professional headshots: what they are, cost comparison, how to get them, and what to look for.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <ProfessionalHeadshotsPage />;
}
