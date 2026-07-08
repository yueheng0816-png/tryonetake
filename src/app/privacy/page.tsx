import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How OneTake collects, uses, and protects your personal data and photos. No data selling. Your photos are only used to generate your headshots.",
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

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to home
      </Link>
      <h1 className="mt-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: July 8, 2026
      </p>

      <div className="mt-8 space-y-10 text-base leading-relaxed">
        <p className="text-muted-foreground">
          OneTake (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;)
          is committed to protecting your privacy. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your information when you
          use our website and AI headshot generation service (collectively, the
          &ldquo;Service&rdquo;). By using the Service, you agree to the
          collection and use of information in accordance with this policy.
        </p>

        <Section id="information-we-collect" title="1. Information We Collect">
          <h3 className="text-lg font-medium text-foreground">
            1.1 Information You Provide
          </h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Account Information:</strong> When you sign up via Clerk,
              we receive your email address and name from the authentication
              provider. We do not receive your password — authentication is
              handled entirely by Clerk.
            </li>
            <li>
              <strong>Photos You Upload:</strong> To generate AI headshots, you
              upload photos of yourself. These photos are transmitted securely to
              our AI processing pipeline.
            </li>
            <li>
              <strong>Payment Information:</strong> When you make a purchase,
              your payment details (credit card number, billing address) are
              collected and processed by our payment processor. We never see or
              store your full credit card number.
            </li>
            <li>
              <strong>Communications:</strong> If you contact us via email, we
              receive your email address and any information you include in your
              message.
            </li>
          </ul>

          <h3 className="mt-4 text-lg font-medium text-foreground">
            1.2 Information Collected Automatically
          </h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Usage Data:</strong> We may collect information about how
              you access and use the Service, including your IP address, browser
              type, pages visited, and time spent on pages.
            </li>
            <li>
              <strong>Cookies:</strong> We use essential cookies for
              authentication (Clerk session management) and preference storage.
              We do not use third-party advertising or tracking cookies.
            </li>
          </ul>
        </Section>

        <Section id="how-we-use" title="2. How We Use Your Information">
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Service Delivery:</strong> To process your uploaded photos
              through our AI pipeline, generate headshots, and deliver the
              results to you.
            </li>
            <li>
              <strong>Authentication:</strong> To authenticate your identity via
              Clerk and maintain your account session.
            </li>
            <li>
              <strong>Payment Processing:</strong> To process your payment and
              fulfill your order.
            </li>
            <li>
              <strong>Communication:</strong> To send you order confirmations,
              delivery notifications, and respond to your inquiries.
            </li>
            <li>
              <strong>Improvement & Security:</strong> To monitor and improve the
              Service, detect and prevent fraud, and comply with legal
              obligations.
            </li>
          </ul>
          <p>
            <strong>We do not sell, rent, or trade your personal data.</strong>{" "}
            We do not use your uploaded photos for any purpose other than
            generating your headshots.
          </p>
        </Section>

        <Section id="third-party" title="3. Third-Party Service Providers">
          <p>
            We share your information with the following service providers, each
            of which has its own privacy policy:
          </p>
          <div className="overflow-x-auto">
            <table className="mt-2 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 font-semibold">Provider</th>
                  <th className="py-2 pr-4 font-semibold">Purpose</th>
                  <th className="py-2 font-semibold">Data Shared</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Clerk</td>
                  <td className="py-2 pr-4">Authentication & user management</td>
                  <td className="py-2">Email, name</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Payment Processor</td>
                  <td className="py-2 pr-4">Payment processing</td>
                  <td className="py-2">Payment details, billing address</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Replicate</td>
                  <td className="py-2 pr-4">AI model inference</td>
                  <td className="py-2">Uploaded photos</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Neon</td>
                  <td className="py-2 pr-4">Database hosting</td>
                  <td className="py-2">All stored data (encrypted)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Vercel</td>
                  <td className="py-2 pr-4">Application hosting</td>
                  <td className="py-2">Usage data, logs</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Resend</td>
                  <td className="py-2 pr-4">Transactional email</td>
                  <td className="py-2">Email address, order details</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            Each processor is contractually obligated to protect your data and
            use it only for the specified purpose. Replicate does not use
            customer data for model training.
          </p>
        </Section>

        <Section id="data-storage" title="4. Data Storage & Security">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Database:</strong> User data and order records are stored
              in Neon PostgreSQL, encrypted at rest and in transit (TLS).
            </li>
            <li>
              <strong>Generated Images:</strong> AI-generated headshots are
              stored in Cloudflare R2 with encryption at rest.
            </li>
            <li>
              <strong>Uploaded Photos:</strong> Photos are transmitted to
              Replicate over HTTPS. We do not retain uploaded photos on our
              servers longer than necessary (typically 7 days after order
              completion).
            </li>
            <li>
              <strong>Payment Data:</strong> We do not store full credit card
              numbers. All payment processing is handled by our PCI-compliant
              payment processor.
            </li>
          </ul>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal data. However, no method of electronic storage
            or transmission is 100% secure. We cannot guarantee absolute
            security.
          </p>
        </Section>

        <Section id="data-retention" title="5. Data Retention">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Account Data:</strong> Retained for the lifetime of your
              account. You may delete your account at any time via Clerk.
            </li>
            <li>
              <strong>Generated Headshots:</strong> Retained for 90 days after
              your last order to allow you to download your results.
            </li>
            <li>
              <strong>Uploaded Source Photos:</strong> Deleted within 7 days of
              order completion.
            </li>
            <li>
              <strong>Order Records:</strong> Retained for legal and accounting
              purposes as required by applicable law.
            </li>
          </ul>
          <p>
            You may request deletion of your data at any time by contacting us
            at{" "}
            <a
              href="mailto:support@tryonetake.com"
              className="text-primary underline"
            >
              support@tryonetake.com
            </a>
            . We will respond to deletion requests within 30 days.
          </p>
        </Section>

        <Section id="your-rights" title="6. Your Data Rights">
          <p>
            Depending on your jurisdiction, you may have the following rights:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Access:</strong> Request a copy of the personal data we
              hold about you.
            </li>
            <li>
              <strong>Correction:</strong> Request correction of inaccurate or
              incomplete data.
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your personal data
              (&ldquo;right to be forgotten&rdquo;).
            </li>
            <li>
              <strong>Portability:</strong> Request a copy of your data in a
              structured, machine-readable format.
            </li>
            <li>
              <strong>Objection:</strong> Object to certain processing of your
              data.
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a
              href="mailto:support@tryonetake.com"
              className="text-primary underline"
            >
              support@tryonetake.com
            </a>
            . We will verify your identity before processing your request.
          </p>
        </Section>

        <Section id="legal-basis" title="7. Legal Basis for Processing">
          <p>We process your personal data on the following legal bases:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Contractual Necessity:</strong> Processing your photos,
              email, and payment to fulfill your order.
            </li>
            <li>
              <strong>Legitimate Interests:</strong> Monitoring and improving the
              Service, preventing fraud.
            </li>
            <li>
              <strong>Consent:</strong> Where required by law, we obtain your
              explicit consent before processing.
            </li>
          </ul>
        </Section>

        <Section id="children" title="8. Children&rsquo;s Privacy">
          <p>
            Our Service is not intended for individuals under the age of 16. We
            do not knowingly collect personal data from children. If you believe
            a child has provided us with personal data, please contact us
            immediately.
          </p>
        </Section>

        <Section id="international" title="9. International Data Transfers">
          <p>
            Your data may be transferred to and processed in countries other
            than your country of residence, including the United States where our
            hosting infrastructure (Vercel) and AI processing (Replicate) are
            located. We ensure appropriate safeguards are in place, including
            standard contractual clauses, to protect your data during such
            transfers.
          </p>
        </Section>

        <Section id="changes" title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of material changes by posting the updated policy on this page
            and updating the &ldquo;Last updated&rdquo; date. Your continued use
            of the Service after changes take effect constitutes acceptance of
            the updated policy.
          </p>
        </Section>

        <Section id="contact" title="11. Contact Us">
          <p>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at{" "}
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
