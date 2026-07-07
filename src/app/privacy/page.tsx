import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How OneTake collects, uses, and protects your personal data and photos. No data selling. Your photos are only used to generate your headshots.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to home
      </Link>
      <h1 className="mt-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: July 2026</p>

      <div className="mt-8 space-y-8 text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <p className="mt-2 text-muted-foreground">
            When you use OneTake, we collect the photos you upload and your email address
            (via Clerk authentication) to process your headshot orders and deliver results.
            We do not sell, rent, or share your personal data with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. How We Use Your Photos</h2>
          <p className="mt-2 text-muted-foreground">
            Your uploaded photos are transmitted to Replicate to run the FLUX.2 AI model.
            Photos are stored securely and are only used to generate your headshots.
            Replicate does not train on customer data. We do not use your photos for any
            other purpose.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Data Storage & Security</h2>
          <p className="mt-2 text-muted-foreground">
            Your data is stored on Neon PostgreSQL (encrypted at rest and in transit) and
            Cloudflare R2 (for generated images). Authentication is handled by Clerk.
            Payments are processed by Stripe — we never see or store your credit card details.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Data Retention</h2>
          <p className="mt-2 text-muted-foreground">
            Your photos and generated headshots are retained for 90 days after your last
            order. You may request deletion at any time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Contact</h2>
          <p className="mt-2 text-muted-foreground">
            Questions about this policy? Contact us at{" "}
            <a href="mailto:yueheng0816@gmail.com" className="text-primary underline">
              yueheng0816@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
