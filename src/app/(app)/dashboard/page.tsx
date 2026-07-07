"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Camera,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Package,
  Upload,
  Wand2,
  Download,
  User,
} from "lucide-react";

interface Order {
  id: string;
  status: string;
  plan: string;
  amount: number;
  outputPhotos: string[];
  completedPredictions: number;
  createdAt: string;
}

const statusConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  pending: { icon: Clock, label: "Awaiting payment", color: "text-yellow-500" },
  paid: { icon: Clock, label: "Payment confirmed", color: "text-blue-500" },
  generating: { icon: Loader2, label: "Generating...", color: "text-blue-500" },
  completed: { icon: CheckCircle2, label: "Ready", color: "text-green-500" },
  failed: { icon: AlertCircle, label: "Failed", color: "text-red-500" },
};

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // ── Stats ──────────────────────────────────────────────────

  const stats = {
    total: orders.length,
    completed: orders.filter((o) => o.status === "completed").length,
    generating: orders.filter((o) => o.status === "generating" || o.status === "paid").length,
    failed: orders.filter((o) => o.status === "failed").length,
  };

  const statCards = [
    { key: "total", label: "Orders", value: stats.total, icon: Package, color: "text-foreground" },
    { key: "completed", label: "Ready", value: stats.completed, icon: CheckCircle2, color: "text-green-600" },
    { key: "generating", label: "Active", value: stats.generating, icon: Loader2, color: "text-blue-600" },
    { key: "failed", label: "Failed", value: stats.failed, icon: AlertCircle, color: "text-red-500" },
  ];

  // ── Loading ────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-base text-muted-foreground">
            Your headshot orders and activity
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => router.push("/generate")} size="lg">
            <Camera className="mr-2 h-5 w-5" />
            New headshots
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* ── Main content (2/3) ────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats row */}
          {orders.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {statCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.key}
                    className="rounded-xl border bg-card p-4 text-center"
                  >
                    <Icon
                      className={`mx-auto mb-1 h-5 w-5 ${card.color} ${
                        card.key === "generating" ? "animate-spin" : ""
                      }`}
                    />
                    <p className="text-2xl font-bold tabular-nums">{card.value}</p>
                    <p className="text-xs text-muted-foreground">{card.label}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Order list */}
          {orders.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wide">
                Recent Orders
              </h2>
              {orders.map((order) => {
                const cfg = statusConfig[order.status] ?? statusConfig.pending;
                const isGenerating =
                  order.status === "generating" || order.status === "paid";
                const isReady = order.status === "completed";

                return (
                  <button
                    key={order.id}
                    onClick={() => router.push(`/results/${order.id}`)}
                    className="flex w-full items-center justify-between rounded-xl border p-5 text-left transition-all hover:border-primary/50 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cfg.color}>
                        {isGenerating ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <cfg.icon className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-base">
                          {order.plan.charAt(0).toUpperCase() +
                            order.plan.slice(1)}{" "}
                          · ${(order.amount / 100).toFixed(0)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isGenerating
                            ? `${order.completedPredictions}/30 generated`
                            : isReady
                              ? `${order.outputPhotos.length} headshots ready`
                              : cfg.label}
                          {" · "}
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Sidebar (1/3) ─────────────────────────────────── */}
        <div className="space-y-4">
          {/* User card */}
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-3">
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="Avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-base font-semibold truncate">
                  {user?.fullName ?? "User"}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {user?.primaryEmailAddress?.emailAddress ?? ""}
                </p>
              </div>
            </div>
          </div>

          {/* Quick tips */}
          <div className="rounded-xl border bg-card p-5">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Quick Tips
            </h3>
            <ul className="mt-3 space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 flex-shrink-0 text-green-600">✓</span>
                <span>Use 3–5 photos with different outfits for best variety</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 flex-shrink-0 text-green-600">✓</span>
                <span>Face the camera directly in natural window light</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 flex-shrink-0 text-green-600">✓</span>
                <span>Pro plan uses FLUX.2 max for sharper, more detailed results</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Empty State ────────────────────────────────────────────────

const STEPS = [
  { icon: Upload, title: "Upload", desc: "3–5 photos of yourself" },
  { icon: Wand2, title: "Generate", desc: "AI creates 30 headshots in ~3 min" },
  { icon: Download, title: "Download", desc: "Pick your favorites, one-click download" },
];

function EmptyState() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center py-10 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Camera className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold">No headshots yet</h2>
      <p className="mt-2 max-w-sm text-base text-muted-foreground">
        Get your first batch of AI-generated professional headshots in minutes.
      </p>

      {/* How it works mini */}
      <div className="mt-8 grid w-full max-w-lg grid-cols-3 gap-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-semibold">{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.desc}</p>
            </div>
          );
        })}
      </div>

      <Button className="mt-8" size="lg" onClick={() => router.push("/generate")}>
        Get started
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}
