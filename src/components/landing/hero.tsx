"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { ImageLightbox } from "@/components/landing/image-lightbox";

/** Paths to landing page images. Place your files in public/images/landing/ */
const BEFORE_IMG = "/images/landing/before-selfie.jpg";
const AFTER_IMG = "/images/landing/after-headshot.jpg";

const HERO_IMAGES = [
  { src: BEFORE_IMG, alt: "Original selfie before AI transformation" },
  { src: AFTER_IMG, alt: "AI-generated professional headshot" },
];

function BeforeAfterImage({
  src,
  alt,
  label,
  labelClassName,
  onClick,
}: {
  src: string;
  alt: string;
  label: string;
  labelClassName?: string;
  onClick?: () => void;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-muted aspect-[3/4]">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
          <span className="text-3xl">{label === "Before" ? "🤳" : "✨"}</span>
          <span className="mt-2 text-xs font-medium">
            {label === "Before" ? "Your selfie" : "AI Headshot"}
          </span>
          <span className="mt-1 text-[10px] text-muted-foreground/60">
            Place {label === "Before" ? "before-selfie.jpg" : "after-headshot.jpg"} in public/images/landing/
          </span>
        </div>
        <div
          className={`absolute top-2 left-2 rounded-md px-2 py-0.5 text-xs font-medium backdrop-blur ${
            labelClassName ?? ""
          }`}
        >
          {label}
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="relative overflow-hidden rounded-xl bg-muted aspect-[3/4] cursor-zoom-in group/image w-full border-0 p-0"
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover/image:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 332px"
        onError={() => setErrored(true)}
      />
      {/* Hover hint — pointer-events-none so taps pass through to onClick on mobile */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover/image:bg-black/10 pointer-events-none">
        <span className="opacity-0 transition-opacity group-hover/image:opacity-100 text-white text-sm font-medium drop-shadow-lg">Click to enlarge</span>
      </div>
      <div
        className={`absolute top-2 left-2 rounded-md px-2 py-0.5 text-xs font-medium backdrop-blur ${
          labelClassName ?? ""
        }`}
      >
        {label}
      </div>
    </button>
  );
}

export function Hero() {
  const { isSignedIn } = useAuth();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 py-6 md:py-12 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-base text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            AI professional headshots — from just 1 photo
          </div>

          {/* Headline */}
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Professional headshots
            <br />
            don&apos;t need a photographer.
          </h1>
          <p className="mt-6 text-balance text-lg text-muted-foreground md:text-xl">
            They just need you.
          </p>

          {/* Subhead */}
          <p className="mt-6 text-balance text-lg text-muted-foreground md:text-xl">
            Upload 1 photo. Get 30 studio-quality headshots that{" "}
            <span className="font-medium text-foreground">actually look like you</span>.
            No plastic skin. No 20-photo uploads.
          </p>

          {/* CTA */}
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href={isSignedIn ? "/generate" : "/sign-up"}>
              <Button size="lg" className="h-12 px-8 text-base">
                Get your headshot
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-base text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              $19 · Automatic refund if generation fails
            </div>
          </div>

          {/* Before/After Visual */}
          <div className="mt-8 mx-auto max-w-2xl">
            <div className="relative rounded-2xl border border-border bg-card p-3 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <BeforeAfterImage
                  src={BEFORE_IMG}
                  alt="Original selfie before AI transformation"
                  label="Before"
                  labelClassName="bg-background/85 text-foreground"
                  onClick={() => setLightboxIndex(0)}
                />
                <BeforeAfterImage
                  src={AFTER_IMG}
                  alt="AI-generated professional headshot"
                  label="After"
                  labelClassName="bg-background/85 text-foreground"
                  onClick={() => setLightboxIndex(1)}
                />
              </div>
              <p className="mt-3 text-center text-base md:text-lg text-muted-foreground">
                Same person. Same face. Studio-quality result — from a single selfie.
              </p>
            </div>
          </div>

          {/* Social proof bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-base text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">1</span> photo needed
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">30</span> headshots
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">&lt;5 min</span> turnaround
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={HERO_IMAGES}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((i) =>
              i === null ? 0 : (i - 1 + HERO_IMAGES.length) % HERO_IMAGES.length
            )
          }
          onNext={() =>
            setLightboxIndex((i) =>
              i === null ? 0 : (i + 1) % HERO_IMAGES.length
            )
          }
        />
      )}
    </section>
  );
}
