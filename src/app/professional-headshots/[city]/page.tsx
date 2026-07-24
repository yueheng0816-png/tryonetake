import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getCity } from "@/lib/city-data";
import { CityPage } from "@/components/landing/city-page";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const data = getCity(city);
  if (!data) return {};

  return {
    metadataBase: new URL(siteUrl),
    title: `Professional Headshots in ${data.city}, ${data.state} — AI vs Photographer`,
    description: data.description,
    keywords: data.keywords,
    alternates: {
      canonical: `/professional-headshots/${data.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${siteUrl}/professional-headshots/${data.slug}`,
      siteName: "TryOneTake",
      title: `Professional Headshots in ${data.city}, ${data.state} — AI vs Photographer | TryOneTake`,
      description: data.description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Professional Headshots in ${data.city}, ${data.state}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Professional Headshots in ${data.city}, ${data.state} | TryOneTake`,
      description: data.description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function CityRoute({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = getCity(city);
  if (!data) notFound();
  return <CityPage data={data} />;
}
