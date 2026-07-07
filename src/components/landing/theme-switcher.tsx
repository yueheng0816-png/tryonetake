"use client";

import { useState, useEffect } from "react";
import { Palette } from "lucide-react";

const THEMES = [
  { key: "", label: "Warm Cream", desc: "暖奶油 · 当前" },
  { key: "cool", label: "Cool Slate", desc: "冷灰蓝 · Linear 风" },
  { key: "cream", label: "Warm Cream", desc: "暖奶油 · 精品感" },
  { key: "crisp", label: "Pure Minimal", desc: "纯白极简 · Apple 风" },
] as const;

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    setCurrent(document.documentElement.getAttribute("data-theme") ?? "");
  }, []);

  function apply(key: string) {
    if (key) {
      document.documentElement.setAttribute("data-theme", key);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    setCurrent(key);
    setOpen(false);
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-lg transition-all hover:shadow-xl hover:scale-105"
        title="Switch color theme"
      >
        <Palette className="h-4 w-4 text-muted-foreground" />
      </button>

      {/* Dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="fixed bottom-20 right-6 z-50 w-56 rounded-xl border border-border bg-card p-2 shadow-xl">
            <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Color Theme
            </p>
            {THEMES.map((t) => (
              <button
                key={t.key}
                onClick={() => apply(t.key)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted ${
                  current === t.key
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground"
                }`}
              >
                <span>{t.label}</span>
                <span className="text-xs text-muted-foreground">{t.desc}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}
