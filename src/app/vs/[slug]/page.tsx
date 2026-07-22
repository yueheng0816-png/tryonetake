import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { comparisons, getComparison } from "@/lib/comparison-data";
import { ComparisonPage } from "@/components/compare/comparison-page";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getComparison(slug);
  if (!data) return {};

  return {
    metadataBase: new URL(siteUrl),
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: {
      canonical: `/vs/${slug}`,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${siteUrl}/vs/${slug}`,
      siteName: "TryOneTake",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function ComparisonRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getComparison(slug);
  if (!data) notFound();
  return <ComparisonPage data={data} />;
}
