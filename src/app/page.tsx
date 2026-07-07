import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ComparisonTable } from "@/components/landing/comparison-table";
import { ExamplesGallery } from "@/components/landing/examples-gallery";
import { PricingSection } from "@/components/landing/pricing-section";
import { Faq } from "@/components/landing/faq";
import { ThemeSwitcher } from "@/components/landing/theme-switcher";

export default function Home() {
  return (
    <>
      <Hero />
      <ExamplesGallery
        title="Real results from real selfies"
        subtitle="Generated from a single photo. No touch-ups, no cherry-picking — just AI that actually knows your face."
        startIndex={0}
        count={8}
      />
      <ExamplesGallery
        title="Beyond the standard headshot"
        subtitle="Sitting at a boardroom table, leaning against a riverside railing, standing in a law firm lobby — your AI headshots fit every professional context."
        startIndex={8}
        count={8}
        variant="white"
      />
      <HowItWorks />
      <ComparisonTable />
      <PricingSection />
      <Faq />
      <ThemeSwitcher />
    </>
  );
}
