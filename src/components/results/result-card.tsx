"use client";

import { useState } from "react";
import { Check, Download, Loader2, Maximize2 } from "lucide-react";

interface ResultCardProps {
  url: string;
  index: number;
  selected: boolean;
  onToggle: () => void;
  onPreview: () => void;
}

export function ResultCard({
  url,
  index,
  selected,
  onToggle,
  onPreview,
}: ResultCardProps) {
  const [loaded, setLoaded] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `headshot-${index + 1}.jpg`;
      a.click();
      URL.revokeObjectURL(blobUrl);
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

      {/* Index badge */}
      <div className="pointer-events-none absolute bottom-2 left-2 rounded bg-black/50 px-1.5 py-0.5 text-xs text-white">
        #{index + 1}
      </div>
    </div>
  );
}
