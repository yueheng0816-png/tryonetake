import Link from "next/link";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "OneTake refund policy — automatic refunds for technical failures: full refund if all headshots fail, pro-rata refund for partial failures. Simple and fair.",
  alternates: {
    canonical: "/refund",
  },
  openGraph: {
    title: "Refund Policy — OneTake",
    description:
      "OneTake refund policy — automatic refunds for technical failures: full refund if all headshots fail, pro-rata refund for partial failures.",
    url: `${siteUrl}/refund`,
    siteName: "OneTake",
    locale: "en_US",
    type: "website",
  },
};

const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id}>
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="mt-2 space-y-3 text-muted-foreground">{children}</div>
  </section>
);

export default function RefundPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to home
      </Link>
      <h1 className="mt-6 text-3xl font-bold">Refund Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: July 8, 2026
      </p>

      <div className="mt-8 space-y-10 text-base leading-relaxed">
        <p className="text-muted-foreground">
          At OneTake, we stand behind our AI headshot service. This Refund
          Policy explains when and how refunds are issued. Our policy is
          designed to be simple, fair, and where possible, automatic — so you
          don&rsquo;t need to jump through hoops to get your money back when
          something goes wrong on our end.
        </p>

        <Section id="coverage" title="1. What Is Covered">
          <p>
            Refunds are issued for <strong>technical failures</strong> — when
            our AI service fails to generate headshots due to an issue on our
            side. Specifically:
          </p>

          <h3 className="text-lg font-medium text-foreground">
            1.1 Complete Failure (All Headshots Fail)
          </h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              If all headshots in your order fail to generate due to a technical
              error (e.g., AI model outage, processing pipeline failure), you
              receive a <strong>full refund of 100%</strong> of your payment.
            </li>
            <li>
              The refund is processed automatically — no action is required from
              you.
            </li>
            <li>
              You will receive an email confirmation when the refund is
              initiated.
            </li>
          </ul>

          <h3 className="mt-4 text-lg font-medium text-foreground">
            1.2 Partial Failure (Some Headshots Fail)
          </h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              If some but not all headshots fail to generate, you receive a{" "}
              <strong>pro-rata (proportional) refund</strong> for the failed
              portion.
            </li>
            <li>
              Example: If you ordered 30 headshots and 15 succeed while 15 fail,
              you receive a 50% refund. The 15 successful headshots remain
              available for you to download.
            </li>
            <li>
              This is also processed automatically where possible. In cases
              requiring manual review, we will initiate the refund within 2
              business days.
            </li>
          </ul>

          <h3 className="mt-4 text-lg font-medium text-foreground">
            1.3 Duplicate Charges
          </h3>
          <p>
            If you are charged more than once for the same order due to a
            processing error, contact us immediately at{" "}
            <a
              href="mailto:support@tryonetake.com"
              className="text-primary underline"
            >
              support@tryonetake.com
            </a>{" "}
            for a full refund of the duplicate charge.
          </p>
        </Section>

        <Section id="not-covered" title="2. What Is Not Covered">
          <p>
            To be transparent: not every situation qualifies for a refund. Here
            is what is <strong>not</strong> covered:
          </p>

          <h3 className="text-lg font-medium text-foreground">
            2.1 Aesthetic Dissatisfaction (All Headshots Generated Successfully)
          </h3>
          <p>
            If all headshots generate successfully but you are not satisfied
            with how they look, this does not qualify for an automatic refund.
            This is because AI inference costs are incurred per photo — we
            cannot recover these costs after generation. We invest significant
            effort into prompt engineering and model optimization to maximize
            quality, and we provide upload guidelines to help you get the best
            results.
          </p>
          <p>
            <strong>However</strong>, we want you to be happy. If you&rsquo;re
            unsatisfied with your results, contact us — we will work with you to
            find a solution, which may include a courtesy partial refund on a
            case-by-case basis.
          </p>

          <h3 className="mt-4 text-lg font-medium text-foreground">
            2.2 User Error
          </h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Uploading photos that do not meet our guidelines (e.g., group
              photos, photos with faces partially obscured, extremely low
              resolution, heavy filters).
            </li>
            <li>
              Uploading photos of someone other than yourself without consent,
              resulting in account suspension.
            </li>
          </ul>

          <h3 className="mt-4 text-lg font-medium text-foreground">
            2.3 Change of Mind
          </h3>
          <p>
            We do not offer refunds for change of mind after the AI generation
            process has begun, as computational costs are incurred immediately
            upon processing.
          </p>
        </Section>

        <Section id="process" title="3. How Refunds Work">
          <h3 className="text-lg font-medium text-foreground">
            3.1 Automatic Refunds
          </h3>
          <p>
            For technical failures detected by our system, refunds are processed
            automatically through our payment processor. You do not need to
            contact us or submit a request. You will receive an email
            notification when the refund is initiated.
          </p>

          <h3 className="mt-4 text-lg font-medium text-foreground">
            3.2 Manual Refund Requests
          </h3>
          <p>
            If you believe you are entitled to a refund that was not
            automatically processed, or if you have a special circumstance:
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Email us at{" "}
              <a
                href="mailto:support@tryonetake.com"
                className="text-primary underline"
              >
                support@tryonetake.com
              </a>
            </li>
            <li>
              Include your <strong>order ID</strong> (found in your confirmation
              email or dashboard).
            </li>
            <li>Briefly describe the issue.</li>
            <li>
              We will review your request and respond within{" "}
              <strong>2 business days</strong>.
            </li>
          </ol>

          <h3 className="mt-4 text-lg font-medium text-foreground">
            3.3 Timeline
          </h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Once a refund is initiated, it typically appears on your original
              payment method within <strong>5–10 business days</strong>,
              depending on your bank or card issuer.
            </li>
            <li>
              Processing times vary by payment method and financial institution.
              We cannot expedite your bank&rsquo;s processing time.
            </li>
          </ul>
        </Section>

        <Section id="disputes" title="4. Disputes & Chargebacks">
          <p>
            We encourage you to contact us before initiating a payment dispute
            (chargeback) with your bank or card issuer. Chargebacks are a
            last-resort mechanism intended for fraud or unauthorized charges.
            If you have a legitimate refund request, we will process it
            promptly — reaching out to us directly is almost always faster than
            going through the chargeback process. Frivolous or fraudulent
            chargebacks may result in account termination.
          </p>
        </Section>

        <Section id="questions" title="5. Questions?">
          <p>
            If you have any questions about this Refund Policy, need help with a
            refund, or want to discuss your specific situation, contact us at{" "}
            <a
              href="mailto:support@tryonetake.com"
              className="text-primary underline"
            >
              support@tryonetake.com
            </a>
            . We&rsquo;re real people behind this product and we&rsquo;ll
            respond personally.
          </p>
        </Section>
      </div>
    </div>
  );
}
