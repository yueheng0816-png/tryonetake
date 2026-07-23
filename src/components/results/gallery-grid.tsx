"use client";

import { useState, useCallback } from "react";
import { ResultCard } from "./result-card";
import { SkeletonCard } from "./skeleton-card";
import { Lightbox } from "./lightbox";

interface GalleryGridProps {
  photos: string[];
  selected: Set<number>;
  onToggle: (index: number) => void;
  /** Total slots to show during generation (e.g. 30) */
  totalSlots?: number;
  /** Watermark text for free preview mode */
  watermark?: string;
}

export function GalleryGrid({
  photos,
  selected,
  onToggle,
  totalSlots,
  watermark,
}: GalleryGridProps) {
  const slots = totalSlots ?? photos.length;

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : slots - 1;
    });
  }, [slots]);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev < slots - 1 ? prev + 1 : 0;
    });
  }, [slots]);

  // Only photos with actual URLs (not skeletons)
  const validPhotos = photos.filter(Boolean);

  if (slots === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 text-6xl">📸</div>
        <p className="text-sm text-muted-foreground">
          Your photos will appear here once generated.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: slots }).map((_, i) => {
          const url = photos[i];
          if (!url) {
            return <SkeletonCard key={i} index={i} />;
          }
          return (
            <ResultCard
              key={i}
              url={url}
              index={i}
              selected={selected.has(i)}
              onToggle={() => onToggle(i)}
              onPreview={() => openLightbox(i)}
              watermark={watermark}
            />
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && validPhotos.length > 0 && (
        <Lightbox
          photos={validPhotos}
          currentIndex={Math.min(lightboxIndex, validPhotos.length - 1)}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
          watermark={watermark}
        />
      )}
    </>
  );
}
