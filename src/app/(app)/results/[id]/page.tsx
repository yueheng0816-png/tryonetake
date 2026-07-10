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
  completedPredictions: number;
  refundedAmount: number;
  refundStatus: string | null;
  failedPredictions: number;
}

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  // Debug: confirm hydration and detect remount loops
  console.log("[OneTake] ResultsPage rendering, orderId:", orderId);

  useEffect(() => {
    console.log("[OneTake] 🔵 ResultsPage MOUNTED, orderId:", orderId);
    return () => {
      console.log("[OneTake] 🔴 ResultsPage UNMOUNTED, orderId:", orderId);
    };
  }, [orderId]);

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [polling, setPolling] = useState(false);
  const [triggering, setTriggering] = useState(false);
  const [triggerError, setTriggerError] = useState<string | null>(null);
  const [recovering, setRecovering] = useState(false);
  const recoveringRef = useRef(false); // ref to break useCallback dependency loop

  const fetchOrder = useCallback(async () => {
    console.log("[OneTake] fetchOrder called, orderId:", orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      console.log("[OneTake] fetchOrder response:", res.status);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      console.log("[OneTake] fetchOrder data:", data.status, "outputPhotos:", data.outputPhotos?.filter(Boolean).length);
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
        console.log(
          `[OneTake] Data corruption detected for ${orderId}: ` +
            `${data.completedPredictions} predictions done but 0 valid outputs. Starting recovery…`
        );
      } else if (data.status === "generating" || data.status === "paid") {
        setPolling(true);
      } else if (!needsRecovery) {
        recoveringRef.current = false;
        setPolling(false);
        setRecovering(false);
      }
    } catch (err) {
      console.error("[OneTake] fetchOrder ERROR:", err);
    } finally {
      console.log("[OneTake] fetchOrder finally — setting loading=false");
      setLoading(false);
    }
  }, [orderId]); // Only orderId as dependency — recovering uses ref to avoid loop

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
    console.log("[OneTake] Render: loading=true, showing spinner");
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  console.log("[OneTake] Render: loading=false, order=", order?.status, "photos=", order?.outputPhotos?.filter(Boolean).length);

  // ── TEMPORARY: Test if React can update the DOM ─────────────
  return (
    <div style={{padding: 100, textAlign: "center", background: "green", color: "white", fontSize: 48}}>
      ✅ LOADED — {order?.outputPhotos?.filter(Boolean).length} photos ready — {order?.status}
    </div>
  );
}
