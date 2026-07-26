"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Check, Copy, X } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const PROFESSIONS = [
  { value: "executive", label: "Executive / CEO" },
  { value: "finance", label: "Finance / Accounting" },
  { value: "legal", label: "Legal / Law" },
  { value: "tech", label: "Tech / Engineering" },
  { value: "medical", label: "Medical / Healthcare" },
  { value: "consulting", label: "Consulting" },
  { value: "real-estate", label: "Real Estate" },
  { value: "creative", label: "Creative / Design" },
  { value: "academia", label: "Academia / Research" },
  { value: "education", label: "Education / Teaching" },
  { value: "engineering", label: "Engineering / Manufacturing" },
  { value: "public-service", label: "Public Service / Government" },
  { value: "general", label: "General Professional" },
] as const;

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function ShowcasePage() {
  const [photoUrl, setPhotoUrl] = useState("");
  const [profession, setProfession] = useState<string>("general");
  const [gender, setGender] = useState<string>("male");
  const [count, setCount] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<{
    predictionIds: string[];
    prompts: string[];
    profession: string;
    count: number;
    errors?: string[];
  } | null>(null);

  async function handleGenerate() {
    if (!photoUrl.trim()) return;
    setGenerating(true);
    setResult(null);

    try {
      const res = await fetch("/api/internal/generate-showcase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photoUrl: photoUrl.trim(),
          profession,
          gender,
          count,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Generation failed");
        return;
      }
      setResult(data);
    } catch (e) {
      alert(String(e));
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold">Showcase Generator</h1>
      <p className="mt-1 text-muted-foreground">
        Generate profession-matched headshots for landing page / blog imagery.
      </p>

      <div className="mt-8 space-y-6">
        {/* Photo URL */}
        <div>
          <label className="block text-sm font-medium mb-1">Photo URL</label>
          <input
            type="url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="https://your-uploaded-photo-url.jpg"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Upload a photo somewhere first, then paste the URL here.
          </p>
        </div>

        {/* Profession & Gender row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">
              Profession Category
            </label>
            <select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {PROFESSIONS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {GENDERS.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Count */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Number of headshots:{" "}
            <span className="font-bold text-primary">{count}</span>
          </label>
          <input
            type="range"
            min={1}
            max={30}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1</span>
            <span>15</span>
            <span>30</span>
          </div>
        </div>

        {/* Generate */}
        <Button
          size="lg"
          onClick={handleGenerate}
          disabled={!photoUrl.trim() || generating}
          className="w-full h-12 text-base"
        >
          {generating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              Generate {count} headshots
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-10 space-y-6">
          <div className="rounded-xl border border-green-500/30 bg-green-50 dark:bg-green-950/20 p-5">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-700 dark:text-green-400">
                Generated {result.count} headshots
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Profession: {result.profession} &middot; Prediction IDs below
            </p>
          </div>

          {/* Prediction IDs */}
          <div>
            <h3 className="text-sm font-semibold mb-2">
              Prediction IDs ({result.predictionIds.length})
            </h3>
            <div className="space-y-1">
              {result.predictionIds.map((id, i) => (
                <PredictionIdRow key={id} id={id} index={i} />
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => {
                navigator.clipboard.writeText(result.predictionIds.join("\n"));
              }}
            >
              <Copy className="mr-1 h-3.5 w-3.5" />
              Copy all IDs
            </Button>
          </div>

          {/* Errors */}
          {result.errors && result.errors.length > 0 && (
            <div className="rounded-xl border border-red-500/30 bg-red-50 dark:bg-red-950/20 p-5">
              <h3 className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">
                Errors ({result.errors.length})
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {result.errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Prediction ID Row                                                         */
/* -------------------------------------------------------------------------- */

function PredictionIdRow({ id, index }: { id: string; index: number }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 font-mono text-sm">
      <span className="text-muted-foreground shrink-0">#{index + 1}</span>
      <span className="truncate">{id}</span>
      <button
        className="ml-auto shrink-0 text-muted-foreground hover:text-foreground"
        onClick={() => {
          navigator.clipboard.writeText(id);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
