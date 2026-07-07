import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Simple, automatic refunds. All 30 headshots fail → full refund. Partial failure → pro-rata refund. No action needed.",
};

export default function RefundPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to home
      </Link>
      <h1 className="mt-6 text-3xl font-bold">Refund Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: July 2026</p>

      <div className="mt-8 space-y-8 text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold">How Refunds Work</h2>
          <p className="mt-2 text-muted-foreground">
            OneTake is committed to delivering working AI-generated headshots for every
            order. Our refund policy is designed to be simple, fair, and automatic.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Technical Failures</h2>
          <p className="mt-2 text-muted-foreground">
            If our AI service fails to generate headshots due to a technical issue:
          </p>
          <ul className="mt-2 space-y-2 text-muted-foreground list-disc pl-5">
            <li>
              <strong>All 30 fail:</strong> Full refund — we automatically refund 100% of
              your payment. You&apos;ll receive an email confirmation.
            </li>
            <li>
              <strong>Partial failure (e.g., 15 of 30 fail):</strong> Pro-rata refund —
              we refund the percentage that failed. The successful headshots are still
              yours to download.
            </li>
          </ul>
          <p className="mt-2 text-muted-foreground">
            Refunds are processed automatically through Stripe — no action needed from you.
            They typically appear on your card within 5–10 business days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">What&apos;s Not Refunded</h2>
          <p className="mt-2 text-muted-foreground">
            If all 30 headshots generate successfully but you&apos;re not satisfied with
            the aesthetic quality, this is not eligible for automatic refund — AI
            generation costs are incurred per photo. We recommend following our upload
            guidelines (good lighting, front-facing, no filters) to get the best results.
            If you have concerns, contact us and we&apos;ll work with you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Duplicate Charges</h2>
          <p className="mt-2 text-muted-foreground">
            If you were charged more than once for the same order, contact us immediately
            for a full refund of the duplicate charge.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Questions?</h2>
          <p className="mt-2 text-muted-foreground">
            If you have questions about a refund or believe you&apos;re entitled to one
            that wasn&apos;t processed, contact us at{" "}
            <a href="mailto:yueheng0816@gmail.com" className="text-primary underline">
              yueheng0816@gmail.com
            </a>{" "}
            with your order details.
          </p>
        </section>
      </div>
    </div>
  );
}
