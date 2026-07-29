"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X, RefreshCw, ExternalLink, ImageIcon } from "lucide-react";

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
/*  Order data (from polling)                                                 */
/* -------------------------------------------------------------------------- */

interface OrderData {
  id: string;
  status: string;
  outputPhotos: string[];
  promptIds: string[];
  predictionIds: string[];
  completedPredictions: number;
  profession: string;
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function ShowcasePage() {
  const [photoUrl, setPhotoUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profession, setProfession] = useState<string>("general");
  const [gender, setGender] = useState<string>("male");
  const [count, setCount] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  // Results state
  const [orderId, setOrderId] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [polling, setPolling] = useState(false);

  /* ---- Upload helpers ---- */

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPhotoUrl("");
    setPreview(URL.createObjectURL(file));
  }

  function clearFile() {
    setSelectedFile(null);
    setPreview(null);
    setPhotoUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  /* ---- Poll order ---- */

  const fetchOrder = useCallback(async () => {
    if (!orderId) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) return;
      const data: OrderData = await res.json();
      setOrder(data);
      if (data.status === "completed" || data.status === "failed") {
        setPolling(false);
      }
    } catch {
      // retry on next poll
    }
  }, [orderId]);

  useEffect(() => {
    if (!polling) return;
    const tick = async () => {
      await fetch(`/api/orders/${orderId}/check`).catch(() => {});
      await fetchOrder();
    };
    tick();
    const interval = setInterval(tick, 3000);
    return () => clearInterval(interval);
  }, [polling, fetchOrder, orderId]);

  /* ---- Generate ---- */

  async function handleGenerate() {
    if (!selectedFile && !photoUrl.trim()) return;

    setGenerating(true);
    setGenError(null);
    setOrder(null);
    setOrderId(null);
    setPolling(false);

    try {
      let targetUrl = photoUrl.trim();

      // Upload file first if needed
      if (selectedFile && !targetUrl) {
        setUploading(true);
        const formData = new FormData();
        formData.append("photos", selectedFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) {
          setGenError("Upload failed");
          setGenerating(false);
          setUploading(false);
          return;
        }
        const { urls } = await uploadRes.json();
        targetUrl = urls[0];
        setPhotoUrl(targetUrl);
        setUploading(false);
      }

      const res = await fetch("/api/internal/generate-showcase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photoUrl: targetUrl,
          profession,
          gender,
          count,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setGenError(data.error || "Generation failed");
        setGenerating(false);
        return;
      }

      setOrderId(data.orderId);
      setPolling(true);
      setGenerating(false);
      setUploading(false);

      // Fetch immediately to show initial state
      fetch(`/api/orders/${data.orderId}`)
        .then((r) => r.json())
        .then(setOrder)
        .catch(() => {});
    } catch (e) {
      setGenError(String(e));
      setGenerating(false);
      setUploading(false);
    }
  }

  const isLoading = generating || uploading;

  /* ---- Render ---- */

  const validPhotos = (order?.outputPhotos ?? []).filter(Boolean);
  const totalExpected = order?.promptIds.length ?? count;
  const isGenerating = order?.status === "generating" || order?.status === "paid";

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-bold">Showcase Generator</h1>
      <p className="mt-1 text-muted-foreground">
        Upload a photo, select profession & count, generate. Results sync to{" "}
        <a href="/internal/orders" className="text-primary underline" target="_blank">
          Orders Dashboard
        </a>
        .
      </p>

      {/* ── Form ──────────────────────────────────────────────── */}
      <div className="mt-8 space-y-6">
        {/* Photo upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Photo</label>
          {preview ? (
            <div className="relative inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Preview"
                className="h-32 w-auto rounded-lg border border-border object-cover"
              />
              <button
                onClick={clearFile}
                className="absolute -top-2 -right-2 rounded-full bg-destructive text-destructive-foreground p-0.5 shadow"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-lg border-2 border-dashed border-border p-8 text-center hover:border-primary/50 hover:bg-muted/30 transition-colors"
            >
              <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Click to select a photo
              </p>
              <p className="text-xs text-muted-foreground/60">
                JPG or PNG, any resolution
              </p>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Profession & Gender */}
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

        {/* Count slider */}
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

        {/* Generate button */}
        <Button
          size="lg"
          onClick={handleGenerate}
          disabled={(!selectedFile && !photoUrl.trim()) || isLoading || polling}
          className="w-full h-12 text-base"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Uploading...
            </>
          ) : generating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating predictions...
            </>
          ) : (
            <>Generate {count} headshots</>
          )}
        </Button>

        {genError && (
          <p className="text-sm text-destructive font-medium">{genError}</p>
        )}
      </div>

      {/* ── Results ────────────────────────────────────────────── */}
      {order && (
        <div className="mt-10 space-y-4">
          {/* Status bar */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  Order{" "}
                  <code className="text-sm bg-muted px-1 rounded">{order.id}</code>
                </p>
                <p className="text-sm text-muted-foreground">
                  Profession: {order.profession} &middot;{" "}
                  {isGenerating ? (
                    <span className="text-amber-600">
                      Generating {order.completedPredictions}/{totalExpected}
                    </span>
                  ) : (
                    <span className="text-green-600">
                      Completed — {validPhotos.length} photos
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isGenerating && (
                  <RefreshCw className="h-4 w-4 animate-spin text-amber-500" />
                )}
                <a
                  href={`/internal/orders`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-sm text-primary underline"
                >
                  Orders Dashboard <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Progress bar */}
            {isGenerating && (
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{
                    width: `${totalExpected > 0 ? (order.completedPredictions / totalExpected) * 100 : 0}%`,
                  }}
                />
              </div>
            )}
          </div>

          {/* Image grid */}
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {order.promptIds.map((pid, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card overflow-hidden"
              >
                {validPhotos[i] ? (
                  <a
                    href={validPhotos[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={validPhotos[i]}
                      alt={`Prompt ${pid}`}
                      className="w-full aspect-[3/4] object-cover"
                      loading="lazy"
                    />
                  </a>
                ) : (
                  <div className="w-full aspect-[3/4] flex items-center justify-center bg-muted">
                    {isGenerating ? (
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/40" />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-muted-foreground/40" />
                    )}
                  </div>
                )}
                <div className="p-1.5">
                  <p
                    className="text-xs font-mono text-muted-foreground truncate"
                    title={pid}
                  >
                    {pid}
                  </p>
                  {order.predictionIds[i] && (
                    <p className="text-[10px] text-muted-foreground/60 truncate">
                      {order.predictionIds[i].slice(0, 16)}...
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
