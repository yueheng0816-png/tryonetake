"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageLightbox } from "@/components/landing/image-lightbox";

const BASE = "/images/landing";

function ExampleImage({
  index,
  onClick,
}: {
  index: number;
  onClick?: () => void;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-border bg-card aspect-[3/4]">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
          <span className="text-3xl">📷</span>
          <span className="mt-2 text-xs text-muted-foreground">
            example-{index + 1}.jpg
          </span>
          <span className="mt-0.5 text-[10px] text-muted-foreground/50">
            Place in public/images/landing/
          </span>
        </div>
      </div>
    );
  }

  const src = `${BASE}/example-${index + 1}.jpg`;

  return (
    <button
      type="button"
      className="relative overflow-hidden rounded-xl border border-border bg-card aspect-[3/4] cursor-zoom-in group w-full p-0"
      onClick={onClick}
    >
      <Image
        src={src}
        alt={`AI-generated professional headshot example ${index + 1}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 250px"
        onError={() => setErrored(true)}
      />
      {/* Hover: dark overlay + "Click to enlarge" hint — pointer-events-none for mobile taps */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20 pointer-events-none">
        <span className="opacity-0 transition-opacity group-hover:opacity-100 text-white text-sm font-medium drop-shadow-lg">
          Click to enlarge
        </span>
      </div>
    </button>
  );
}

interface GalleryProps {
  title: string;
  subtitle: string;
  /** 0-based starting index. example-{startIndex + i + 1}.jpg */
  startIndex: number;
  count: number;
  variant?: "muted" | "white";
}

export function ExamplesGallery({
  title,
  subtitle,
  startIndex = 0,
  count = 8,
  variant = "muted",
}: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = Array.from({ length: count }).map((_, i) => ({
    src: `${BASE}/example-${startIndex + i + 1}.jpg`,
    alt: `AI-generated professional headshot example ${startIndex + i + 1}`,
  }));

  const wrap = (i: number | null, delta: number) =>
    i === null ? 0 : (i + delta + images.length) % images.length;

  return (
    <section
      className={
        variant === "white"
          ? "border-t border-border"
          : "border-t border-border bg-muted/50"
      }
    >
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((_, i) => (
            <ExampleImage
              key={i}
              index={startIndex + i}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => wrap(i, -1))}
          onNext={() => setLightboxIndex((i) => wrap(i, 1))}
        />
      )}
    </section>
  );
}
