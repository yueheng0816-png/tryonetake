"use client";

import { cn } from "@/lib/utils";
import { Sparkles, Scan, Camera } from "lucide-react";

type StyleOption = "natural" | "balanced" | "polished";

const styles = [
  {
    id: "natural" as StyleOption,
    label: "Natural",
    subtitle: "True to you",
    description: "Minimal retouching. Keeps your original skin texture, pores, and facial features exactly as they are.",
    icon: Scan,
    promptInjection:
      "natural skin texture, visible pores, minimal retouching, photorealistic, no beauty filter, keep original facial features",
  },
  {
    id: "balanced" as StyleOption,
    label: "Balanced",
    subtitle: "Recommended",
    description: "Subtle refinement under flattering studio lighting. You, just a little more polished. Still unmistakably you.",
    icon: Camera,
    promptInjection:
      "subtle skin refinement, flattering studio lighting, natural-looking enhancement, professional retouch",
  },
  {
    id: "polished" as StyleOption,
    label: "Polished",
    subtitle: "Camera-ready",
    description: "Magazine-quality soft glamour. Smooth, bright, and polished — with your identity still intact.",
    icon: Sparkles,
    promptInjection:
      "beauty lighting, smooth skin (subtle), polished professional look, soft glamour, magazine quality",
  },
];

interface StylePreferenceProps {
  value: StyleOption;
  onChange: (value: StyleOption) => void;
}

export function StylePreference({ value, onChange }: StylePreferenceProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold">Style preference</h3>
        <p className="mt-1 text-base text-muted-foreground">
          How much retouching do you want? We&apos;ll keep your identity no matter what.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {styles.map((style) => {
          const Icon = style.icon;
          const isSelected = value === style.id;

          return (
            <button
              key={style.id}
              onClick={() => onChange(style.id)}
              className={cn(
                "relative flex flex-col items-center gap-3 rounded-xl border-2 p-5 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-border/80 hover:bg-muted/50"
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  isSelected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="font-semibold text-base">{style.label}</span>
                  {style.subtitle && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        isSelected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      )}
                    >
                      {style.subtitle}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {style.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function getStylePrompt(style: StyleOption): string {
  const match = styles.find((s) => s.id === style);
  return match?.promptInjection ?? styles[1].promptInjection;
}
