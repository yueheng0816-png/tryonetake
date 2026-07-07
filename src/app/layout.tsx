import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
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
    "Upload 1 photo, get 30 studio-quality AI headshots in under 5 minutes. No photographer needed. FLUX.2 AI model — actually looks like you. $19, 100% money-back guarantee.",
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
      "Upload 1 photo, get 30 studio-quality AI headshots. No photographer needed. $19, 100% money-back guarantee.",
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
        <ClerkProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-center" richColors />
        </ClerkProvider>
      </body>
    </html>
  );
}
