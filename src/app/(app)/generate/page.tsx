"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PhotoUploader } from "@/components/upload/photo-uploader";
import { StylePreference } from "@/components/upload/style-preference";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Users, Briefcase } from "lucide-react";
import { toast } from "sonner";
import type { Gender, Profession } from "@/lib/prompts";
import { PROFESSION_OPTIONS, GENDER_OPTIONS } from "@/lib/prompts";

type StyleOption = "natural" | "balanced" | "polished";
type PlanOption = "free" | "starter" | "pro";

const PLAN_CARDS = [
  {
    key: "free" as PlanOption,
    label: "Free",
    price: "$0",
    model: "FLUX.2 pro model",
    photos: "1 professional headshot",
    styles: "Natural style",
    description: "Try before you buy — same AI quality as Starter",
    badge: null,
  },
  {
    key: "starter" as PlanOption,
    label: "Starter",
    price: "$19",
    model: "FLUX.2 pro model",
    photos: "30 professional headshots",
    styles: "10 style variations",
    description: "Excellent quality for professional headshots",
    badge: null,
  },
  {
    key: "pro" as PlanOption,
    label: "Pro",
    price: "$35",
    model: "FLUX.2 max model",
    photos: "30 professional headshots",
    styles: "25 style variations",
    description: "Maximum sharpness, detail, and variety",
    badge: "Best Quality",
  },
];

export default function GeneratePage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto max-w-2xl px-4 py-24 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-4 text-muted-foreground">Loading…</p>
          </div>
        </div>
      }
    >
      <GeneratePageInner />
    </Suspense>
  );
}

function GeneratePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlPlan = searchParams.get("plan");
  const initialPlan: PlanOption =
    urlPlan === "pro" ? "pro" : urlPlan === "starter" ? "starter" : "free";

  const [photos, setPhotos] = useState<File[]>([]);
  const [style, setStyle] = useState<StyleOption>("balanced");
  const [plan, setPlan] = useState<PlanOption>(initialPlan);
  const [gender, setGender] = useState<Gender | null>(null);
  const [profession, setProfession] = useState<Profession | null>(null);
  const [specificRole, setSpecificRole] = useState("");
  const [uploading, setUploading] = useState(false);

  const isFree = plan === "free";

  const handleSubmit = async () => {
    if (photos.length === 0) {
      toast.error("Please upload at least 1 photo");
      return;
    }
    if (!gender) {
      toast.error("Please select your presentation style");
      return;
    }
    if (!profession) {
      toast.error("Please select your profession");
      return;
    }

    setUploading(true);
    try {
      // 1. Upload photos to server
      const formData = new FormData();
      photos.forEach((file) => formData.append("photos", file));

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        toast.error("Failed to upload photos. Please try again.");
        setUploading(false);
        return;
      }

      const { urls: photoUrls } = await uploadRes.json();

      // ── Free preview path ──────────────────────────────
      if (isFree) {
        const freeRes = await fetch("/api/free-preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ photoUrls, gender, profession }),
        });

        const freeData = await freeRes.json();

        if (!freeRes.ok) {
          toast.error(
            freeData.message ??
              freeData.error ??
              "Free preview failed. Please try again."
          );
          setUploading(false);
          return;
        }

        router.push(`/results/${freeData.orderId}`);
        return;
      }

      // ── Paid path ──────────────────────────────────────
      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          stylePreference: style,
          photoCount: photos.length,
          photoUrls,
          gender,
          profession,
          specificRole: specificRole.trim() || null,
        }),
      });

      const data = await checkoutRes.json();

      if (!checkoutRes.ok) {
        toast.error(data.error ?? "Checkout failed. Please try again.");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("No checkout URL returned. Please try again.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Failed: ${message}`);
    } finally {
      setUploading(false);
    }
  };

  const canSubmit = photos.length > 0 && !!gender && !!profession;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      {/* Progress indicator */}
      <div className="mb-10 flex items-center justify-center gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-base font-medium text-primary-foreground">
            1
          </div>
          <span className="text-base font-medium text-foreground hidden sm:inline">
            Configure
          </span>
        </div>
        <div className="hidden sm:block h-px w-16 bg-border" />
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-base font-medium text-muted-foreground">
            2
          </div>
          <span className="text-base text-muted-foreground hidden sm:inline">
            {isFree ? "Generate" : "Payment"}
          </span>
        </div>
      </div>

      <div className="space-y-8">
        {/* ── Upload ──────────────────────────────────────── */}
        <PhotoUploader photos={photos} onChange={setPhotos} />

        {/* ── About You ───────────────────────────────────── */}
        <div className="space-y-5 rounded-xl border bg-card p-6">
          <h3 className="text-base font-semibold uppercase tracking-wide text-muted-foreground">
            About You
          </h3>
          <p className="text-sm text-muted-foreground -mt-3">
            These help us match the right backgrounds and styles to your profession.
          </p>

          {/* Gender */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-base font-medium">
              <Users className="h-4 w-4 text-muted-foreground" />
              How do you typically dress for work?
            </label>
            <div className="flex gap-3">
              {GENDER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setGender(opt.value)}
                  className={`flex-1 rounded-lg border-2 px-4 py-3 text-base font-medium transition-all ${
                    gender === opt.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-background text-muted-foreground hover:border-border/80"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Profession */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-base font-medium">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              Your profession
            </label>
            <select
              value={profession ?? ""}
              onChange={(e) =>
                setProfession((e.target.value || null) as Profession | null)
              }
              className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>
                Select your profession...
              </option>
              {PROFESSION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Specific Role (optional) */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-base font-medium text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              Specific role (optional)
            </label>
            <input
              type="text"
              value={specificRole}
              onChange={(e) => setSpecificRole(e.target.value)}
              placeholder='e.g. "3rd grade teacher", "airline pilot", "yoga instructor"'
              className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              maxLength={120}
            />
            <p className="text-xs text-muted-foreground">
              Describe your role for better-matched backgrounds and scenes
            </p>
          </div>
        </div>

        {/* ── Style (paid only) ─────────────────────────── */}
        {!isFree && <StylePreference value={style} onChange={setStyle} />}

        {/* ── Plan Selection ─────────────────────────────── */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">Choose your plan</h3>
            <p className="mt-1 text-base text-muted-foreground">
              {isFree
                ? "Try free. Upgrade to Starter or Pro when you're ready."
                : "30 professional headshots — the difference is AI model quality and style variety."}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {PLAN_CARDS.map((card) => (
              <button
                key={card.key}
                type="button"
                onClick={() => setPlan(card.key)}
                className={`relative rounded-xl border-2 p-5 text-left transition-all ${
                  plan === card.key
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-border/80"
                }`}
              >
                {card.badge && (
                  <div className="absolute -top-3 right-2 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                    {card.badge}
                  </div>
                )}
                <h4 className="font-semibold text-base">{card.label}</h4>
                <p className="mt-1 text-2xl font-bold">{card.price}</p>
                {card.price !== "$0" && (
                  <p className="mt-1 text-xs text-muted-foreground">one-time</p>
                )}
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <li>· {card.model}</li>
                  <li>· {card.photos}</li>
                  <li>· {card.styles}</li>
                </ul>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* ── Submit button ──────────────────────────────── */}
        <div className="flex justify-end border-t pt-6">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={!canSubmit || uploading}
            className="h-12 px-8 text-base"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Uploading...
              </>
            ) : isFree ? (
              <>
                Generate free preview
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                Continue to Payment
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
