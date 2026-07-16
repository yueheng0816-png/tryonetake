import type { MetadataRoute } from "next";
import { useCases } from "@/lib/use-case-data";
import { comparisons } from "@/lib/comparison-data";
import { blogPosts } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    // Homepage
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Legal
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/refund`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    // Use-case index
    {
      url: `${siteUrl}/use-cases`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // VS index
    {
      url: `${siteUrl}/vs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Blog index
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Use-case pages
    ...useCases.map(
      (uc): MetadataRoute.Sitemap[number] => ({
        url: `${siteUrl}/use-cases/${uc.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      })
    ),
    // Comparison pages
    ...comparisons.map(
      (c): MetadataRoute.Sitemap[number] => ({
        url: `${siteUrl}/vs/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      })
    ),
    // Blog posts
    ...blogPosts.map(
      (post): MetadataRoute.Sitemap[number] => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
      })
    ),
  ];

  return entries;
}
