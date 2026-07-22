import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OneTake — Professional AI Headshots That Actually Look Like You",
    template: "%s | OneTake",
  },
  description:
    "Upload 1 photo, get 30 studio-quality AI headshots in under 5 minutes. No photographer needed. FLUX.2 AI model — actually looks like you. $19, automatic refund if generation fails.",
  keywords: [
    "AI headshots",
    "professional headshots",
    "LinkedIn photo",
    "AI portrait",
    "corporate headshot",
    "business headshot",
    "AI-generated portrait",
    "professional profile picture",
  ],
  authors: [{ name: "OneTake" }],
  creator: "OneTake",
  publisher: "OneTake",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "OneTake",
    title: "OneTake — Professional AI Headshots That Actually Look Like You",
    description:
      "Upload 1 photo, get 30 studio-quality AI headshots. No photographer needed. $19, automatic refund if generation fails.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OneTake — AI Headshots",
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "N9l4zPahRdJ_BiBUHwLHyp4NV2v8pNIhyaFKgA7DrOo",
  },
  other: {
    "p:domain_verify": "012f30abe6306b50d85e90fd68154fd7",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ClerkProvider
          allowedRedirectOrigins={[
            "https://tryonetake.com",
            "https://www.tryonetake.com",
            "https://ai-headshot-kohl.vercel.app",
          ]}
        >
          {/* JSON-LD: Organization + WebSite */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                {
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: "OneTake",
                  url: siteUrl,
                  logo: `${siteUrl}/favicon.svg`,
                  description:
                    "Upload 1 photo, get 30 studio-quality AI headshots in under 5 minutes.",
                  email: "support@tryonetake.com",
                  sameAs: [
                    "https://x.com/tryonetake",
                  ],
                },
                {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "OneTake",
                  description:
                    "Upload 1 photo, get 30 studio-quality AI headshots in under 5 minutes.",
                  publisher: {
                    "@id": `${siteUrl}/#organization`,
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
              ]),
            }}
          />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-center" richColors />
          <Analytics />
          <SpeedInsights />
        </ClerkProvider>
      </body>
    </html>
  );
}
