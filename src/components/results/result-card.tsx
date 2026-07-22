"use client";

import { useState } from "react";
import { Check, Download, Loader2, Maximize2 } from "lucide-react";

interface ResultCardProps {
  url: string;
  index: number;
  selected: boolean;
  onToggle: () => void;
  onPreview: () => void;
  /** Watermark text to overlay (e.g. "TRYONETAKE.COM · FREE PREVIEW") */
  watermark?: string;
}

export function ResultCard({
  url,
  index,
  selected,
  onToggle,
  onPreview,
  watermark,
}: ResultCardProps) {
  const [loaded, setLoaded] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(url);
      const blob = await res.blob();

      if (watermark) {
        // Bypass CORS tainting: load image via fetch → Blob → object URL
        // avoids cross-origin canvas taint from Vercel Blob domain
        const img = new Image();
        const objectUrl = URL.createObjectURL(blob);
        img.src = objectUrl;
        await new Promise<void>((resolve) => { img.onload = () => resolve(); });

        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(objectUrl); // clean up now that image is drawn

        // Single watermark at bottom-right
        const fontSize = Math.max(14, Math.floor(img.width / 40));
        ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`;
        const text = "tryonetake.com";
        const metrics = ctx.measureText(text);
        const padding = fontSize * 1.2;
        const textW = metrics.width + padding;
        const textH = fontSize + padding * 0.6;

        // Background pill
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

        // Text
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.textBaseline = "middle";
        ctx.fillText(text, x + padding / 2, y + textH / 2);

        canvas.toBlob((watermarked) => {
          if (!watermarked) {
            // Fallback: download without watermark if toBlob fails
            const fallbackUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = fallbackUrl;
            a.download = `headshot-${index + 1}.jpg`;
            a.click();
            URL.revokeObjectURL(fallbackUrl);
            return;
          }
          const blobUrl = URL.createObjectURL(watermarked);
          const a = document.createElement("a");
          a.href = blobUrl;
          a.download = `headshot-${index + 1}-tryonetake.jpg`;
          a.click();
          URL.revokeObjectURL(blobUrl);
        }, "image/jpeg", 0.92);
      } else {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `headshot-${index + 1}.jpg`;
        a.click();
        URL.revokeObjectURL(blobUrl);
      }
    } catch {
      // Download failed silently
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border-2 transition-all ${
        selected
          ? "border-primary ring-2 ring-primary/30"
          : "border-transparent hover:border-primary/50"
      }`}
    >
      {/* Clickable image area → opens lightbox */}
      <button
        onClick={onPreview}
        className="relative block w-full cursor-zoom-in"
        aria-label={`View headshot ${index + 1}`}
      >
        <div className="aspect-[2/3] bg-muted">
          {!loaded && (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={`Headshot ${index + 1}`}
            className={`h-full w-full object-cover ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
            loading="lazy"
          />
        </div>

        {/* Hover overlay: magnify icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/10 group-hover:opacity-100">
          <Maximize2 className="h-8 w-8 text-white drop-shadow-lg" />
        </div>
      </button>

      {/* Selection checkmark — independent of image click */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-white/60 bg-black/20 opacity-0 group-hover:opacity-100 hover:!opacity-100"
        }`}
        aria-label={selected ? "Deselect" : "Select"}
      >
        {selected && <Check className="h-3.5 w-3.5" />}
      </button>

      {/* Download button (on hover) */}
      <button
        onClick={handleDownload}
        className="absolute bottom-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-all hover:bg-black/70 group-hover:opacity-100"
        title="Download single"
      >
        <Download className="h-4 w-4" />
      </button>

      {/* Watermark overlay — single text at bottom-right */}
      {watermark && (
        <div className="pointer-events-none absolute bottom-2 right-2 z-5">
          <span
            className="select-none rounded-md bg-black/45 px-2 py-0.5 text-xs text-white/80"
            style={{ fontSize: "clamp(8px, 1.5vw, 12px)" }}
          >
            tryonetake.com
          </span>
        </div>
      )}

      {/* Index badge */}
      <div className="pointer-events-none absolute bottom-2 left-2 rounded bg-black/50 px-1.5 py-0.5 text-xs text-white">
        #{index + 1}
      </div>
    </div>
  );
}
