"use client";

import { useState } from "react";
import { ChevronDown, Check, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TIPS = [
  { text: "Face forward, look directly at the camera at eye level" },
  { text: "Face a window or natural light source (not overhead light)" },
  { text: "Your face should fill at least 30% of the image" },
  { text: "No sunglasses, hats, or anything covering your face" },
  { text: "Single person only — no group photos or other people" },
  { text: "Use a plain, uncluttered background (no busy patterns)" },
  { text: "No heavy beauty filters — natural skin texture works best" },
];

export function PhotoTips() {
  const [open, setOpen] = useState(true);
  const [goodError, setGoodError] = useState(false);
  const [badError, setBadError] = useState(false);

  return (
    <div className="rounded-xl border border-amber-200/60 bg-amber-50/50">
      {/* Header toggle */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">💡</span>
          <span className="text-sm font-semibold text-amber-900">
            Photo Tips — get the best results
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-amber-600 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="px-5 pb-4 space-y-4">
          {/* Tip list */}
          <ul className="space-y-2">
            {TIPS.map((tip, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-amber-900/80"
              >
                <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-green-600" />
                <span>{tip.text}</span>
              </li>
            ))}
          </ul>

          {/* Example images row */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Good example */}
            <div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg border-2 border-green-300 bg-green-50">
                {goodError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-green-700">
                    <ImageIcon className="h-6 w-6 opacity-25" />
                    <span className="text-xs font-medium opacity-50">
                      Good example
                    </span>
                  </div>
                ) : (
                  <img
                    src="/images/landing/photo-guide-good.jpg"
                    alt="Good example: front-facing, natural light, plain background, no accessories"
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={() => setGoodError(true)}
                  />
                )}
              </div>
              <p className="mt-1 text-center text-xs font-medium text-green-700">
                ✅ Good
              </p>
            </div>

            {/* Bad example */}
            <div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg border-2 border-red-200 bg-red-50">
                {badError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-red-700">
                    <ImageIcon className="h-6 w-6 opacity-25" />
                    <span className="text-xs font-medium opacity-50">
                      Bad example
                    </span>
                  </div>
                ) : (
                  <img
                    src="/images/landing/photo-guide-bad.jpg"
                    alt="Bad example: sunglasses, hat, side angle, dark lighting, group photo"
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={() => setBadError(true)}
                  />
                )}
              </div>
              <p className="mt-1 text-center text-xs font-medium text-red-700">
                ❌ Avoid
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
