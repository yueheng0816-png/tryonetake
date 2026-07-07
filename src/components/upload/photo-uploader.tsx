"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Upload, X, ImagePlus, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhotoTips } from "./photo-tips";

interface PhotoUploaderProps {
  photos: File[];
  onChange: (photos: File[]) => void;
  maxPhotos?: number;
}

const MAX_SIZE = 1280; // Max width/height for compression
const JPEG_QUALITY = 0.85;

async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      let { width, height } = img;

      if (width > MAX_SIZE || height > MAX_SIZE) {
        if (width > height) {
          height = Math.round(height * (MAX_SIZE / width));
          width = MAX_SIZE;
        } else {
          width = Math.round(width * (MAX_SIZE / height));
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          } else {
            reject(new Error("Compression failed"));
          }
        },
        "image/jpeg",
        JPEG_QUALITY
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

export function PhotoUploader({ photos, onChange, maxPhotos = 10 }: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files).filter((f) => f.type.startsWith("image/"));
      const remaining = maxPhotos - photos.length;
      const toAdd = fileArray.slice(0, remaining);

      if (toAdd.length === 0) return;

      const compressed = await Promise.all(toAdd.map(compressImage));
      const newPreviews = compressed.map((f) => URL.createObjectURL(f));

      setPreviews((prev) => [...prev, ...newPreviews]);
      onChange([...photos, ...compressed]);
    },
    [photos, onChange, maxPhotos]
  );

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    onChange(photos.filter((_, i) => i !== index));
  };

  // Manually sync counter DOM — bypass React reconciliation quirks
  useEffect(() => {
    if (counterRef.current && lightboxIndex !== null) {
      counterRef.current.textContent = `${lightboxIndex + 1} / ${previews.length}`;
    }
  }, [lightboxIndex, previews.length]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold">Upload your photos</h3>
        <p className="mt-1 text-base text-muted-foreground">
          1 photo is enough. 3–5 photos give the best variety. Max {maxPhotos}.
        </p>
      </div>

      <PhotoTips />

      {/* Upload zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 sm:p-10 transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
        )}
      >
        <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-base font-medium">
          Drag & drop your photos here
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          or click to browse · JPG, PNG, WebP
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && processFiles(e.target.files)}
        />
      </div>

      {/* Preview strip */}
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {previews.map((preview, i) => (
            <div key={i} className="group relative">
              <button
                onClick={() => setLightboxIndex(i)}
                className="relative block cursor-zoom-in"
              >
                <img
                  src={preview}
                  alt={`Photo ${i + 1}`}
                  className="h-24 w-24 rounded-xl border border-border object-cover transition-transform group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/0 transition-colors group-hover:bg-black/20">
                  <ZoomIn className="h-4 w-4 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removePhoto(i);
                }}
                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100 z-10"
              >
                <X className="h-3 w-3" />
              </button>
              <span className="mt-1 block text-center text-[10px] text-muted-foreground">
                {i + 1}
              </span>
            </div>
          ))}
          {previews.length < maxPhotos && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="flex h-24 w-24 items-center justify-center rounded-xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-muted-foreground/30 hover:text-foreground"
            >
              <ImagePlus className="h-5 w-5" />
            </button>
          )}
        </div>
      )}

      {/* Lightbox — rendered via portal to avoid parent rendering quirks */}
      {lightboxIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setLightboxIndex(null); }}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur transition-colors hover:bg-white/25"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Counter — synced via ref in useEffect above */}
            <div
              ref={counterRef}
              className="absolute top-4 left-4 z-10 rounded-md bg-white/10 px-3 py-1 text-sm text-white backdrop-blur tabular-nums"
            >
              {lightboxIndex + 1} / {previews.length}
            </div>

            {/* Prev */}
            {lightboxIndex > 0 && (
              <button
                onClick={() => setLightboxIndex(lightboxIndex - 1)}
                className="absolute left-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur transition-colors hover:bg-white/25"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Next */}
            {lightboxIndex < previews.length - 1 && (
              <button
                onClick={() => setLightboxIndex(lightboxIndex + 1)}
                className="absolute right-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur transition-colors hover:bg-white/25"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            {/* Image */}
            <img
              src={previews[lightboxIndex]}
              alt={`Photo ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-[85vw] rounded-2xl object-contain select-none"
              draggable={false}
            />

            {/* Keyboard nav */}
            <KeyboardNav
              onClose={() => setLightboxIndex(null)}
              onPrev={lightboxIndex > 0 ? () => setLightboxIndex(lightboxIndex - 1) : null}
              onNext={lightboxIndex < previews.length - 1 ? () => setLightboxIndex(lightboxIndex + 1) : null}
            />
          </div>,
          document.body
        )}
    </div>
  );
}

// Tiny component just for keyboard events — re-mounts every time handlers change
function KeyboardNav({ onClose, onPrev, onNext }: {
  onClose: () => void;
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
}) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return null;
}
