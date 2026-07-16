import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "OneTake Blog — AI Headshot Tips, Guides & Industry Insights",
  description:
    "Expert guides on AI headshots, professional photography tips, LinkedIn profile optimization, and AI ethics. Stay informed with the OneTake blog.",
  keywords: [
    "AI headshot blog",
    "professional headshot tips",
    "LinkedIn photo guide",
    "AI photography blog",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "OneTake Blog — AI Headshot Tips & Guides",
    description:
      "Expert guides on AI headshots, professional photography tips, and LinkedIn optimization.",
    url: `${siteUrl}/blog`,
    siteName: "OneTake",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OneTake Blog — AI Headshot Tips & Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OneTake Blog — AI Headshot Tips & Guides",
    description:
      "Expert guides on AI headshots, professional photography tips, and LinkedIn optimization.",
    images: ["/og-image.jpg"],
  },
};

export default function BlogIndex() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />
      <h1 className="text-4xl font-bold tracking-tight">OneTake Blog</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        AI headshot tips, professional photography guides, and industry insights.
      </p>

      <div className="mt-10 divide-y divide-border">
        {blogPosts.map((post) => (
          <article key={post.slug} className="py-6">
            <Link
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-base text-muted-foreground">
                {post.description}
              </p>
              <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-base font-medium text-primary">
                Read more
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
