import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { useCases, getUseCase } from "@/lib/use-case-data";
import { UseCasePage } from "@/components/use-cases/use-case-page";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return useCases.map((uc) => ({ slug: uc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getUseCase(slug);
  if (!data) return {};

  return {
    metadataBase: new URL(siteUrl),
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: {
      canonical: `/use-cases/${slug}`,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${siteUrl}/use-cases/${slug}`,
      siteName: "TryOneTake",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `/images/landing/example-${data.exampleImages[0]}.jpg`,
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
      images: [`/images/landing/example-${data.exampleImages[0]}.jpg`],
    },
  };
}

export default async function UseCaseRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getUseCase(slug);
  if (!data) notFound();
  return <UseCasePage data={data} />;
}
