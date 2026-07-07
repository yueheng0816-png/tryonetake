"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DownloadBarProps {
  orderId: string;
  photos: string[];
  selected: Set<number>;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export function DownloadBar({
  orderId,
  photos,
  selected,
  onSelectAll,
  onDeselectAll,
}: DownloadBarProps) {
  const [downloading, setDownloading] = useState(false);
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
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `headshot-${idx + 1}.jpg`;
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
              const blob = await res.blob();
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
    } catch {
      toast.error("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="sticky bottom-0 z-10 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
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
