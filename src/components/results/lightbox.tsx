"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface LightboxProps {
  photos: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  /** Watermark text — when set, renders via canvas so right-click save is watermarked */
  watermark?: string;
}

/** Renders an image on a hidden canvas with watermark, then shows the canvas
 *  so that right-click → "Save image as" captures the watermarked version. */
function WatermarkedCanvas({
  url,
  watermark,
}: {
  url: string;
  watermark: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const draw = async () => {
      try {
        const res = await fetch(url);
        const blob = await res.blob();
        if (cancelled) return;

        const img = new Image();
        const objectUrl = URL.createObjectURL(blob);
        img.src = objectUrl;
        await new Promise<void>((resolve) => { img.onload = () => resolve(); });
        if (cancelled) { URL.revokeObjectURL(objectUrl); return; }

        const canvas = canvasRef.current;
        if (!canvas) { URL.revokeObjectURL(objectUrl); return; }

        // Fit to viewport while keeping aspect ratio
        const maxW = window.innerWidth * 0.9;
        const maxH = window.innerHeight * 0.9;
        const scale = Math.min(maxW / img.width, maxH / img.height, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(objectUrl);

        // Watermark at bottom-right
        const fontSize = Math.max(14, Math.floor(canvas.width / 40));
        ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`;
        const metrics = ctx.measureText(watermark);
        const padding = fontSize * 1.2;
        const textW = metrics.width + padding;
        const textH = fontSize + padding * 0.6;
        const x = canvas.width - textW - padding;
        const y = canvas.height - textH - padding;

        ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
        ctx.beginPath();
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(x, y, textW, textH, fontSize * 0.4);
        } else {
          ctx.fillRect(x, y, textW, textH);
        }
        ctx.fill();
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.textBaseline = "middle";
        ctx.fillText(watermark, x + padding / 2, y + textH / 2);

        if (!cancelled) setDrawing(false);
      } catch {
        if (!cancelled) setDrawing(false);
      }
    };
    draw();
    return () => { cancelled = true; };
  }, [url, watermark]);

  return (
    <div className="relative">
      {drawing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-white/60" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`max-h-[90vh] max-w-[90vw] rounded-lg object-contain ${drawing ? "invisible" : ""}`}
      />
    </div>
  );
}

export function Lightbox({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  watermark,
}: LightboxProps) {
  const total = photos.length;
  const currentUrl = photos[currentIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          onPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          onNext();
          break;
      }
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!currentUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 z-10 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white tabular-nums">
        {currentIndex + 1} / {total}
      </div>

      {/* Previous arrow */}
      {total > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {watermark ? (
          <WatermarkedCanvas url={currentUrl} watermark={watermark} />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={currentUrl}
            alt={`Headshot ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            draggable={false}
          />
        )}
      </div>

      {/* Next arrow */}
      {total > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
