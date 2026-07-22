"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { GalleryGrid } from "@/components/results/gallery-grid";
import { DownloadBar } from "@/components/results/download-bar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, RefreshCw } from "lucide-react";

const PHOTOS_PER_ORDER = 30;

interface OrderData {
  id: string;
  status: string;
  plan: string;
  outputPhotos: string[];
  predictionIds: string[];
  completedPredictions: number;
  refundedAmount: number;
  refundStatus: string | null;
  failedPredictions: number;
}

const WATERMARK_TEXT = "tryonetake.com";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [polling, setPolling] = useState(false);
  const [triggering, setTriggering] = useState(false);
  const [triggerError, setTriggerError] = useState<string | null>(null);
  const [recovering, setRecovering] = useState(false);
  const recoveringRef = useRef(false); // ref to break useCallback dependency loop

  const fetchOrder = useCallback(async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setOrder(data);

      // Detect data corruption: order says "completed" with predictions
      // done, but outputPhotos has zero valid URLs.
      // This happens when the old webhook race condition corrupted the
      // outputPhotos array. Kick off a recovery via the check route.
      const validOutputs = (data.outputPhotos as string[]).filter(Boolean).length;
      const needsRecovery =
        data.status === "completed" &&
        data.completedPredictions > 0 &&
        validOutputs === 0;

      if (needsRecovery && !recoveringRef.current) {
        recoveringRef.current = true;
        setRecovering(true);
        setPolling(true); // Start polling to recover
      } else if (data.status === "generating" || data.status === "paid") {
        setPolling(true);
      } else if (!needsRecovery) {
        recoveringRef.current = false;
        setPolling(false);
        setRecovering(false);
      }
    } catch {
      // Silent fail, retry on next poll
    } finally {
      setLoading(false);
    }
  }, [orderId]); // Only orderId — recovering uses ref to avoid infinite loop

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  // Poll every 3s while generating — check Replicate + refresh DB
  useEffect(() => {
    if (!polling) return;
    const tick = async () => {
      // First, check Replicate for any newly-completed predictions
      // (needed for local dev since webhooks can't reach localhost)
      await fetch(`/api/orders/${orderId}/check`).catch(() => {});
      // Then refresh from DB
      await fetchOrder();
    };
    tick(); // run immediately on first poll
    const interval = setInterval(tick, 3000);
    return () => clearInterval(interval);
  }, [polling, fetchOrder, orderId]);

  // Auto-trigger generation if order has no predictions yet
  // Handles two cases:
  //   1. "pending" — webhook never fired (local dev, or Creem webhook delayed)
  //   2. "paid" — webhook fired, claimed the order, but startBatchGeneration
  //      silently failed (e.g., Replicate API token missing, prompt error)
  useEffect(() => {
    if (!order || triggering) return;
    const needsTrigger =
      order.status === "pending" ||
      (order.status === "paid" && !order.predictionIds?.some(Boolean));
    if (!needsTrigger) return;

    setTriggering(true);
    fetch(`/api/orders/${orderId}/trigger`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.triggered) {
          fetchOrder();
        }
        if (data.errors?.length > 0) {
          setTriggerError(data.errors[0]);
        }
      })
      .catch(() => {
        // Trigger may have completed despite fetch timeout — refresh order
        fetchOrder();
      })
      .finally(() => setTriggering(false));
  }, [order, orderId, triggering, fetchOrder]);

  const handleToggle = (index: number) => {
    const next = new Set(selected);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setSelected(next);
  };

  const handleSelectAll = () => {
    if (!order) return;
    setSelected(new Set(order.outputPhotos.map((_, i) => i)));
  };

  const handleDeselectAll = () => {
    setSelected(new Set());
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-20 text-center">
        <h2 className="text-xl font-semibold">Order not found</h2>
        <p className="mt-2 text-muted-foreground">
          This order doesn&apos;t exist or you don&apos;t have access.
        </p>
        <Button className="mt-6" onClick={() => router.push("/generate")}>
          Create a new order
        </Button>
      </div>
    );
  }

  const isGenerating =
    order.status === "paid" || order.status === "generating";
  const isFree = order.plan === "free";

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-lg font-semibold">
                {isFree ? "Your Free Preview" : "Your Headshots"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isFree
                  ? "Free · 1 professional photo"
                  : `${order.plan.charAt(0).toUpperCase() + order.plan.slice(1)} plan`}
                {isGenerating && !isFree
                  ? ` · Generating ${order.completedPredictions}/${PHOTOS_PER_ORDER}`
                  : !isFree
                    ? ` · ${order.outputPhotos.length} photos`
                    : ""}
              </p>
            </div>
          </div>

          {isGenerating && !isFree && (
            <div className="flex items-center gap-2 text-sm">
              <RefreshCw className="h-4 w-4 animate-spin text-primary" />
              <span className="font-medium text-primary tabular-nums">
                {order.completedPredictions}/{PHOTOS_PER_ORDER} done
              </span>
              <span className="text-muted-foreground">
                {order.completedPredictions > 0
                  ? `${PHOTOS_PER_ORDER - order.completedPredictions} remaining…`
                  : "Starting AI generation…"}
              </span>
            </div>
          )}

          {/* Free preview: generating indicator */}
          {isGenerating && isFree && (
            <div className="flex items-center gap-2 text-sm">
              <RefreshCw className="h-4 w-4 animate-spin text-primary" />
              <span className="font-medium text-primary">
                Generating your free preview…
              </span>
            </div>
          )}

          {/* Recovery indicator */}
          {recovering && !isGenerating && (
            <div className="flex items-center gap-2 text-sm">
              <RefreshCw className="h-4 w-4 animate-spin text-amber-500" />
              <span className="font-medium text-amber-600">
                Recovering photos from AI service…
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Free preview: upgrade CTA banner */}
      {isFree && !isGenerating && (
        <div className="border-b border-primary/30 bg-primary/5">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-foreground">
                  Like what you see? Get all 30 headshots — no watermark.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Starter ($19) or Pro ($35) — one-time payment, automatic refund if generation fails.
                </p>
              </div>
              <a
                href={`/generate?plan=starter`}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shrink-0"
              >
                Upgrade now
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Generating progress bar */}
      {isGenerating && !isFree && (
        <div className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-1000"
                  style={{
                    width: `${(order.completedPredictions / PHOTOS_PER_ORDER) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm font-medium tabular-nums">
                {order.completedPredictions}/{PHOTOS_PER_ORDER}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {order.completedPredictions > 0
                ? `${order.completedPredictions} photos ready — they appear below as they finish.`
                : "Starting AI generation. Photos will appear as they finish. This takes 2–5 minutes."}
            </p>
          </div>
        </div>
      )}

      {/* Trigger error */}
      {triggerError && (
        <div className="border-b border-destructive/30 bg-destructive/5">
          <div className="container mx-auto px-4 py-3">
            <p className="text-sm font-medium text-destructive">
              Generation failed: {triggerError}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Check your Replicate API token and network connection.
            </p>
          </div>
        </div>
      )}

      {/* Refund notice */}
      {order.refundStatus && (
        <div className="border-b border-amber-200 bg-amber-50">
          <div className="container mx-auto px-4 py-3">
            <p className="text-sm font-medium text-amber-800">
              {order.refundStatus === "full"
                ? "No photos could be generated — your payment has been fully refunded."
                : `Partial refund of $${(order.refundedAmount / 100).toFixed(2)} — ${order.failedPredictions} out of ${PHOTOS_PER_ORDER} photos failed to generate.`}
            </p>
            <p className="mt-1 text-xs text-amber-600">
              The refund will appear on your card within 5–10 business days. Questions? Contact support@tryonetake.com
            </p>
          </div>
        </div>
      )}

      {/* Gallery */}
      <div className="container mx-auto flex-1 px-4 py-6">
        <GalleryGrid
          photos={order.outputPhotos}
          selected={selected}
          onToggle={handleToggle}
          totalSlots={isFree ? PHOTOS_PER_ORDER : isGenerating ? PHOTOS_PER_ORDER : undefined}
          watermark={isFree ? WATERMARK_TEXT : undefined}
        />
      </div>

      {/* Download bar */}
      <DownloadBar
        orderId={order.id}
        photos={order.outputPhotos}
        selected={selected}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        watermark={isFree ? WATERMARK_TEXT : undefined}
      />
    </div>
  );
}
