"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Star, X } from "lucide-react";
import { toast } from "sonner";
import { TRUSTPILOT_REVIEW_URL } from "@/lib/constants";

interface DownloadBarProps {
  orderId: string;
  photos: string[];
  selected: Set<number>;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  /** Watermark text to apply on download (free preview mode) */
  watermark?: string;
}

/**
 * Apply a single bottom-right watermark to an image blob via Canvas.
 * Returns a new watermarked blob, or the original blob on failure.
 */
async function applyWatermark(blob: Blob, text: string): Promise<Blob> {
  try {
    const img = new Image();
    const objectUrl = URL.createObjectURL(blob);
    img.src = objectUrl;
    await new Promise<void>((resolve) => { img.onload = () => resolve(); });

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(objectUrl);

    const fontSize = Math.max(14, Math.floor(img.width / 40));
    ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`;
    const metrics = ctx.measureText(text);
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
    ctx.fillText(text, x + padding / 2, y + textH / 2);

    return new Promise((resolve) => {
      canvas.toBlob((wm) => resolve(wm ?? blob), "image/jpeg", 0.92);
    });
  } catch {
    return blob; // fallback: original unwatermarked
  }
}

export function DownloadBar({
  orderId,
  photos,
  selected,
  onSelectAll,
  onDeselectAll,
  watermark,
}: DownloadBarProps) {
  const [downloading, setDownloading] = useState(false);
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [reviewDismissed, setReviewDismissed] = useState(false);
  const selectedCount = selected.size;

  const handleDownload = async () => {
    const toDownloadIndices =
      selectedCount > 0
        ? Array.from(selected)
        : photos.map((_, i) => i);

    if (toDownloadIndices.length === 0) return;

    setDownloading(true);

    try {
      // Single photo — direct download
      if (toDownloadIndices.length === 1) {
        const idx = toDownloadIndices[0];
        const url = photos[idx];
        if (!url) {
          toast.error("Image not available yet.");
          setDownloading(false);
          return;
        }
        const res = await fetch(url);
        let blob = await res.blob();
        if (watermark) {
          blob = await applyWatermark(blob, watermark);
        }
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `headshot-${idx + 1}${watermark ? "-tryonetake" : ""}.jpg`;
        a.click();
        URL.revokeObjectURL(blobUrl);
        toast.success("Downloaded!");
      } else {
        // Multiple photos — ZIP
        const JSZip = (await import("jszip")).default;
        const zip = new JSZip();

        const downloads = await Promise.all(
          toDownloadIndices
            .filter((i) => !!photos[i])
            .map(async (i) => {
              const res = await fetch(photos[i]);
              let blob = await res.blob();
              if (watermark) {
                blob = await applyWatermark(blob, watermark);
              }
              return { blob, index: i };
            })
        );

        downloads.forEach(({ blob, index }) => {
          zip.file(`headshot-${index + 1}.jpg`, blob);
        });

        const zipBlob = await zip.generateAsync({ type: "blob" });
        const zipUrl = URL.createObjectURL(zipBlob);
        const a = document.createElement("a");
        a.href = zipUrl;
        a.download = "headshots.zip";
        a.click();
        URL.revokeObjectURL(zipUrl);

        toast.success(`Downloaded ${downloads.length} headshots as ZIP!`);
      }

      // ── Feedback tracking: report downloaded indices ──
      fetch(`/api/orders/${orderId}/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ indices: toDownloadIndices }),
      }).catch(() => {
        // Silent — don't block the user on tracking failure
      });

      // ── Review prompt: user just downloaded = happiest moment ──
      if (!reviewDismissed) {
        setShowReviewPrompt(true);
      }
    } catch {
      toast.error("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="sticky bottom-0 z-10 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Review prompt — shown after a successful download */}
      {showReviewPrompt && !reviewDismissed && (
        <div className="border-b bg-primary/5">
          <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-2.5">
            <div className="flex items-center gap-2 text-sm">
              <span className="flex text-amber-400">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </span>
              <span className="font-medium">Happy with your headshots?</span>
              <span className="hidden sm:inline text-muted-foreground">
                A quick review helps others find us.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={TRUSTPILOT_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Leave a review
              </a>
              <button
                onClick={() => setReviewDismissed(true)}
                className="text-muted-foreground hover:text-foreground p-1"
                aria-label="Dismiss review prompt"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {photos.filter(Boolean).length} headshots · {selectedCount} selected
          </span>
          {selectedCount > 0 ? (
            <button
              onClick={onDeselectAll}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Deselect all
            </button>
          ) : (
            <button
              onClick={onSelectAll}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Select all
            </button>
          )}
        </div>

        <Button
          onClick={handleDownload}
          disabled={downloading || photos.length === 0}
          size="sm"
          className="h-9"
        >
          {downloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download{selectedCount > 0 ? ` (${selectedCount})` : " all"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
