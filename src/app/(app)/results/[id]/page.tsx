"use client";

import { useEffect, useState, useCallback } from "react";
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
  completedPredictions: number;
  refundedAmount: number;
  refundStatus: string | null;
  failedPredictions: number;
}

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

  const fetchOrder = useCallback(async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setOrder(data);

      if (data.status === "generating" || data.status === "paid") {
        setPolling(true);
      } else {
        setPolling(false);
      }
    } catch {
      // Silent fail, retry on next poll
    } finally {
      setLoading(false);
    }
  }, [orderId]);

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

  // Auto-trigger generation if order is still pending (no webhook in local dev)
  useEffect(() => {
    if (!order || order.status !== "pending" || triggering) return;

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
              <h1 className="text-lg font-semibold">Your Headshots</h1>
              <p className="text-sm text-muted-foreground">
                {order.plan.charAt(0).toUpperCase() + order.plan.slice(1)} plan
                {isGenerating
                  ? ` · Generating ${order.completedPredictions}/${PHOTOS_PER_ORDER}`
                  : ` · ${order.outputPhotos.length} photos`}
              </p>
            </div>
          </div>

          {isGenerating && (
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
        </div>
      </div>

      {/* Generating progress bar */}
      {isGenerating && (
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
              The refund will appear on your card within 5–10 business days. Questions? Contact yueheng0816@gmail.com
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
          totalSlots={isGenerating ? PHOTOS_PER_ORDER : undefined}
        />
      </div>

      {/* Download bar */}
      <DownloadBar
        orderId={order.id}
        photos={order.outputPhotos}
        selected={selected}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
      />
    </div>
  );
}
