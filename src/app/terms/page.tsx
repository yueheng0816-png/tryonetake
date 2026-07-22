import Link from "next/link";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "TryOneTake terms of service — account terms, acceptable use, AI-generated content, intellectual property, refunds, and liability limitations.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service — TryOneTake",
    description:
      "TryOneTake terms of service — account terms, acceptable use, AI-generated content, intellectual property, refunds, and liability limitations.",
    url: `${siteUrl}/terms`,
    siteName: "TryOneTake",
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

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to home
      </Link>
      <h1 className="mt-6 text-3xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: July 8, 2026
      </p>

      <div className="mt-8 space-y-10 text-base leading-relaxed">
        <p className="text-muted-foreground">
          Welcome to TryOneTake. By accessing or using our website and AI headshot
          generation service (collectively, the &ldquo;Service&rdquo;), you
          agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If
          you do not agree to these Terms, you may not use the Service.
        </p>

        <Section id="eligibility" title="1. Eligibility & Account">
          <h3 className="text-lg font-medium text-foreground">1.1 Eligibility</h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>You must be at least 16 years old to use the Service.</li>
            <li>
              If you are using the Service on behalf of an organization, you
              represent that you have the authority to bind that organization to
              these Terms.
            </li>
            <li>
              You are responsible for ensuring that your use of the Service
              complies with all applicable laws and regulations in your
              jurisdiction.
            </li>
          </ul>

          <h3 className="mt-4 text-lg font-medium text-foreground">
            1.2 Account Responsibility
          </h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account.
            </li>
            <li>
              You agree to provide accurate, current, and complete information
              during registration and to update such information as necessary.
            </li>
            <li>
              We reserve the right to suspend or terminate accounts that violate
              these Terms or are used for fraudulent or illegal purposes.
            </li>
          </ul>
        </Section>

        <Section id="service-description" title="2. Service Description">
          <p>
            TryOneTake provides AI-generated professional headshots. You upload
            photos of yourself, and our AI pipeline (powered by the FLUX.2 model
            family running on Replicate) generates a set of headshot variations.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              This is a <strong>one-time purchase</strong> service. There are no
              subscriptions, no recurring charges, and no automatic renewals.
            </li>
            <li>
              Service availability is not guaranteed. We may experience downtime
              for maintenance, updates, or due to factors beyond our control.
            </li>
            <li>
              We reserve the right to modify, suspend, or discontinue any aspect
              of the Service at any time with reasonable notice.
            </li>
          </ul>
        </Section>

        <Section id="acceptable-use" title="3. Acceptable Use">
          <h3 className="text-lg font-medium text-foreground">
            3.1 Photo Upload Requirements
          </h3>
          <p>You agree that the photos you upload:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Are photos of <strong>yourself</strong>.</li>
            <li>
              If they contain images of other people, you have obtained their
              explicit, informed consent to be photographed, to have their
              likeness generated by AI, and to use the resulting images as
              described in these Terms.
            </li>
            <li>
              Do not contain nudity, sexually explicit content, hate speech,
              violence, or any illegal material.
            </li>
            <li>
              Do not infringe on the intellectual property or privacy rights of
              any third party.
            </li>
          </ul>

          <h3 className="mt-4 text-lg font-medium text-foreground">
            3.2 Prohibited Activities
          </h3>
          <p>You may not:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Use the Service to generate misleading, deceptive, or fraudulent
              content (including deepfakes intended to impersonate others
              without consent).
            </li>
            <li>
              Use the Service to create AI models, datasets, or training data
              that competes with TryOneTake.
            </li>
            <li>
              Attempt to reverse engineer, decompile, or extract the underlying
              AI model weights or architecture.
            </li>
            <li>
              Use automated means (bots, scrapers) to access the Service without
              our prior written permission.
            </li>
            <li>
              Interfere with or disrupt the Service, its servers, or its
              networks.
            </li>
            <li>
              Resell, redistribute, or sublicense the Service or its outputs as
              a standalone product.
            </li>
          </ul>
        </Section>

        <Section id="ai-results" title="4. AI-Generated Content">
          <h3 className="text-lg font-medium text-foreground">
            4.1 Nature of AI Output
          </h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              AI-generated headshots are produced by generative models and may
              vary in quality, realism, and accuracy based on input photo
              quality.
            </li>
            <li>
              We do not guarantee that every generated headshot will meet your
              aesthetic expectations. We recommend uploading clear,
              well-lit, front-facing photos without filters or heavy makeup for
              best results.
            </li>
          </ul>

          <h3 className="mt-4 text-lg font-medium text-foreground">
            4.2 Ownership of Output
          </h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Subject to your compliance with these Terms, you own the
              AI-generated headshots produced from your uploaded photos.
            </li>
            <li>
              You grant TryOneTake a limited, non-exclusive license to store and
              deliver the generated headshots to you, and to retain them for the
              period specified in our{" "}
              <Link href="/privacy" className="text-primary underline">
                Privacy Policy
              </Link>
              .
            </li>
            <li>
              TryOneTake does not claim ownership of your uploaded photos or
              generated headshots. We do not use your outputs to train our
              own models or for any purpose other than providing the Service to
              you.
            </li>
          </ul>
        </Section>

        <Section id="payment" title="5. Payment & Pricing">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              All prices are listed in US Dollars (USD) and are subject to
              change with notice. Price changes do not affect orders already
              placed.
            </li>
            <li>
              Payment is processed by our third-party payment processor. By
              making a purchase, you agree to the payment processor&rsquo;s
              terms and conditions.
            </li>
            <li>
              You are responsible for any applicable taxes, duties, or fees
              imposed by your jurisdiction. Our payment processor handles
              VAT/GST/sales tax collection where required by law.
            </li>
            <li>
              We reserve the right to refuse or cancel any order at our
              discretion, including orders suspected of fraud or unauthorized
              payment methods.
            </li>
          </ul>
        </Section>

        <Section id="refunds" title="6. Refunds">
          <p>
            Our refund policy is detailed in full on our{" "}
            <Link href="/refund" className="text-primary underline">
              Refund Policy
            </Link>{" "}
            page. Key points:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Technical failures only:</strong> Automatic refunds apply
              when our AI service fails to generate headshots due to a technical
              issue on our end.
            </li>
            <li>
              <strong>Full refund:</strong> If all ordered headshots fail to
              generate.
            </li>
            <li>
              <strong>Pro-rata refund:</strong> If only some headshots fail, we
              refund the proportional amount.
            </li>
            <li>
              Refunds are processed through our payment processor and typically
              appear within 5–10 business days.
            </li>
          </ul>
        </Section>

        <Section id="ip" title="7. Intellectual Property">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              The TryOneTake brand, logo, website design, and original content are
              our exclusive property and are protected by copyright, trademark,
              and other intellectual property laws.
            </li>
            <li>
              The underlying AI models (FLUX.2) are owned by their respective
              developers and are used under license via Replicate.
            </li>
            <li>
              You retain all rights to the photos you upload. You grant us a
              limited, non-exclusive license to process those photos solely for
              the purpose of providing the Service.
            </li>
          </ul>
        </Section>

        <Section id="third-party-services" title="8. Third-Party Services">
          <p>
            The Service integrates with third-party services including Clerk
            (authentication), our payment processor, Replicate (AI inference),
            Neon (database hosting), Vercel (application hosting), and Resend
            (email delivery). We are not responsible for the availability,
            accuracy, or practices of these third-party services. Your use of
            these services may be subject to their respective terms and privacy
            policies.
          </p>
        </Section>

        <Section id="disclaimers" title="9. Disclaimers">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              THE SERVICE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS
              AVAILABLE&rdquo; BASIS. WE MAKE NO WARRANTIES, EXPRESS OR IMPLIED,
              REGARDING THE SERVICE, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
              NON-INFRINGEMENT.
            </li>
            <li>
              We do not warrant that the Service will be uninterrupted,
              error-free, or free of harmful components, or that AI-generated
              results will meet your particular expectations.
            </li>
            <li>
              AI-generated headshots are synthetic images. You are solely
              responsible for determining whether they are suitable for your
              intended use (e.g., professional profiles, identification
              documents).
            </li>
          </ul>
        </Section>

        <Section id="limitation" title="10. Limitation of Liability">
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              TryOneTake, its owners, employees, and affiliates shall not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages arising out of or relating to your use of, or inability to
              use, the Service.
            </li>
            <li>
              Our total liability for any claim arising out of or relating to
              the Service shall not exceed the amount you paid us for the
              specific order giving rise to the claim in the 12 months preceding
              the event.
            </li>
            <li>
              These limitations apply regardless of the theory of liability
              (contract, tort, negligence, strict liability, or otherwise) and
              even if we have been advised of the possibility of such damages.
            </li>
          </ul>
        </Section>

        <Section id="indemnification" title="11. Indemnification">
          <p>
            You agree to indemnify, defend, and hold harmless TryOneTake and its
            owners, employees, and affiliates from and against any and all
            claims, liabilities, damages, losses, and expenses (including
            reasonable attorneys&rsquo; fees) arising out of or relating to:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Your violation of these Terms.</li>
            <li>Your use of the Service in violation of applicable law.</li>
            <li>
              Photos you upload that infringe third-party rights (privacy,
              publicity, intellectual property).
            </li>
            <li>
              Your use of AI-generated headshots in a manner that causes harm to
              third parties.
            </li>
          </ul>
        </Section>

        <Section id="termination" title="12. Termination">
          <p>
            We may terminate or suspend your account and access to the Service
            immediately, without prior notice or liability, if you breach these
            Terms. Upon termination, your right to use the Service will
            immediately cease. You may terminate your account at any time by
            contacting us. Provisions that by their nature should survive
            termination (including ownership, disclaimers, limitation of
            liability, and indemnification) shall survive.
          </p>
        </Section>

        <Section id="governing-law" title="13. Governing Law & Dispute Resolution">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              These Terms shall be governed by and construed in accordance with
              the laws of Hong Kong SAR, without regard to its conflict of law
              provisions.
            </li>
            <li>
              Any dispute arising out of or relating to these Terms shall first
              be attempted to be resolved through informal negotiation. If the
              dispute cannot be resolved informally within 30 days, either party
              may pursue resolution through binding arbitration in Hong Kong.
            </li>
            <li>
              You agree to resolve disputes on an individual basis, and waive
              any right to participate in a class action or class-wide
              arbitration.
            </li>
          </ul>
        </Section>

        <Section id="changes-terms" title="14. Changes to These Terms">
          <p>
            We reserve the right to modify these Terms at any time. Material
            changes will be communicated by updating the &ldquo;Last
            updated&rdquo; date on this page and, where appropriate, by email
            notification. Your continued use of the Service after such
            modifications constitutes acceptance of the updated Terms.
          </p>
        </Section>

        <Section id="contact-terms" title="15. Contact">
          <p>
            For questions about these Terms, please contact us at{" "}
            <a
              href="mailto:support@tryonetake.com"
              className="text-primary underline"
            >
              support@tryonetake.com
            </a>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}
