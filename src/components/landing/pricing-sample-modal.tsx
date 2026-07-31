"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronDown } from "lucide-react";
import type { SampleSet } from "@/lib/pricing-samples";

interface PricingSampleModalProps {
  plan: "starter" | "pro";
  sampleSets: SampleSet[];
  onClose: () => void;
}

/* -------------------------------------------------------------------------- */
/*  Mobile Tab Select (dropdown-style for narrow screens)                     */
/* -------------------------------------------------------------------------- */
function MobileTabSelect({
  sets,
  activeIndex,
  onSelect,
}: {
  sets: SampleSet[];
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="relative w-full">
      <select
        value={activeIndex}
        onChange={(e) => onSelect(Number(e.target.value))}
        className="w-full appearance-none rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {sets.map((s, i) => (
          <option key={i} value={i}>
            {s.profession} — {s.specificRole}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Desktop Tabs                                                              */
/* -------------------------------------------------------------------------- */
function DesktopTabs({
  sets,
  activeIndex,
  onSelect,
}: {
  sets: SampleSet[];
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {sets.map((s, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            i === activeIndex
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          }`}
        >
          {s.specificRole || s.profession}
        </button>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Modal                                                                     */
/* -------------------------------------------------------------------------- */
export function PricingSampleModal({
  plan,
  sampleSets,
  onClose,
}: PricingSampleModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = sampleSets[activeIndex];
  const hasTabs = sampleSets.length > 1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Sheet / Modal */}
      <div
        className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl border border-border bg-card shadow-2xl sm:rounded-2xl sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={`${plan === "starter" ? "Starter" : "Pro"} plan sample headshots`}
      >
        {/* ── Header ── */}
        <div className="shrink-0 border-b border-border px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight sm:text-xl">
              {plan === "starter" ? "Starter" : "Pro"} Plan — Sample Headshots
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Tabs */}
          {hasTabs && (
            <>
              {/* Mobile: dropdown */}
              <div className="mt-3 sm:hidden">
                <MobileTabSelect
                  sets={sampleSets}
                  activeIndex={activeIndex}
                  onSelect={setActiveIndex}
                />
              </div>
              {/* Desktop: pill tabs */}
              <div className="mt-3 hidden sm:flex">
                <DesktopTabs
                  sets={sampleSets}
                  activeIndex={activeIndex}
                  onSelect={setActiveIndex}
                />
              </div>
            </>
          )}

          {/* Current set label */}
          <p className="mt-3 text-sm text-muted-foreground">
            {active.profession}
            {active.specificRole ? ` — ${active.specificRole}` : ""}
          </p>
        </div>

        {/* ── Image Grid ── */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 pt-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {active.images.map((src, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-lg border border-border bg-muted aspect-[3/4]"
              >
                <Image
                  src={src}
                  alt={`Sample headshot ${i + 1} — ${active.profession}${
                    active.specificRole ? `, ${active.specificRole}` : ""
                  }`}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
