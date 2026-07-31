"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PricingSampleModal } from "@/components/landing/pricing-sample-modal";
import {
  FREE_SAMPLE,
  STARTER_SAMPLES,
  PRO_SAMPLES,
} from "@/lib/pricing-samples";

interface PricingPreviewProps {
  plan: "free" | "starter" | "pro";
  /** Override CTA text for the "see samples" link */
  linkLabel?: string;
}

export function PricingPreview({ plan, linkLabel }: PricingPreviewProps) {
  const [modalOpen, setModalOpen] = useState(false);

  if (plan === "free") {
    return (
      <div className="mb-5">
        <div className="relative mx-auto w-20 overflow-hidden rounded-lg border border-border bg-muted aspect-[3/4] sm:w-24">
          <Image
            src={FREE_SAMPLE.images[0]}
            alt="Free AI headshot sample"
            fill
            unoptimized
            className="object-cover"
            sizes="96px"
          />
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Free sample result
        </p>
      </div>
    );
  }

  const samples = plan === "starter" ? STARTER_SAMPLES : PRO_SAMPLES;

  return (
    <>
      <div className="mb-5 text-center">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {linkLabel ?? `See ${samples[0].images.length} sample headshots`}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {modalOpen && (
        <PricingSampleModal
          plan={plan}
          sampleSets={samples}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
