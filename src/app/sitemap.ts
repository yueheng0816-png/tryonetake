import type { MetadataRoute } from "next";
import { useCases } from "@/lib/use-case-data";
import { comparisons } from "@/lib/comparison-data";
import { blogPosts } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  // Fixed dates for content that rarely changes.
  // Using real dates instead of `new Date()` (which would report "now"
  // on every deployment) gives Google honest change signals.
  const LAUNCH_DATE = new Date("2026-07-01");     // initial site launch
  const CONTENT_UPDATE = new Date("2026-07-15");  // use-case / vs pages last refreshed

  const entries: MetadataRoute.Sitemap = [
    // Homepage
    {
      url: siteUrl,
      lastModified: CONTENT_UPDATE,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Legal
    {
      url: `${siteUrl}/privacy`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/refund`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    // Use-case index
    {
      url: `${siteUrl}/use-cases`,
      lastModified: CONTENT_UPDATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // VS index
    {
      url: `${siteUrl}/vs`,
      lastModified: CONTENT_UPDATE,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Blog index
    {
      url: `${siteUrl}/blog`,
      lastModified: CONTENT_UPDATE,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Use-case pages
    ...useCases.map(
      (uc): MetadataRoute.Sitemap[number] => ({
        url: `${siteUrl}/use-cases/${uc.slug}`,
        lastModified: CONTENT_UPDATE,
        changeFrequency: "monthly",
        priority: 0.8,
      })
    ),
    // Comparison pages
    ...comparisons.map(
      (c): MetadataRoute.Sitemap[number] => ({
        url: `${siteUrl}/vs/${c.slug}`,
        lastModified: CONTENT_UPDATE,
        changeFrequency: "monthly",
        priority: 0.7,
      })
    ),
    // Blog posts — use their actual publish dates
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
