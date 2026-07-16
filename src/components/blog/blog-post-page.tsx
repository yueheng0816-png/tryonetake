import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, ArrowLeft } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://tryonetake.com";

/** Count words in an HTML string (strips tags, collapses whitespace). */
function wordCount(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text ? text.split(" ").length : 0;
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
  return (
    <article className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-base text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        All posts
      </Link>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {post.description}
        </p>
        <div className="mt-4 flex items-center gap-4 text-base text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </span>
        </div>
      </header>

      {/* Body */}
      <div
        className="prose prose-lg prose-neutral max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-p:text-base prose-p:leading-relaxed prose-p:text-muted-foreground
          prose-li:text-base prose-li:text-muted-foreground
          prose-strong:text-foreground
          prose-table:w-full prose-table:border-collapse
          prose-th:border prose-th:border-border prose-th:bg-muted/50 prose-th:px-4 prose-th:py-2 prose-th:text-base prose-th:font-medium
          prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2 prose-td:text-base prose-td:text-muted-foreground
          prose-ul:list-disc prose-ul:pl-6
          prose-ol:list-decimal prose-ol:pl-6"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />

      {/* CTA */}
      <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
        <h2 className="text-2xl font-bold">
          Ready to get your own AI headshots?
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Upload 1 photo. Get 30 studio-quality headshots in under 5 minutes.
          $19, automatic refund if generation fails.
        </p>
        <Link href="/sign-up" className="mt-6 inline-block">
          <Button size="lg" className="h-12 px-8 text-base">
            Get your headshots
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${siteUrl}/blog`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: canonicalUrl,
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${canonicalUrl}#article`,
            headline: post.title,
            description: post.description,
            image: `${siteUrl}/og-image.jpg`,
            datePublished: post.date,
            dateModified: post.date,
            wordCount: wordCount(post.body),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": canonicalUrl,
            },
            author: {
              "@type": "Organization",
              "@id": `${siteUrl}/#organization`,
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              "@id": `${siteUrl}/#organization`,
              name: "OneTake",
              url: siteUrl,
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/favicon.svg`,
              },
            },
          }),
        }}
      />
    </article>
  );
}
