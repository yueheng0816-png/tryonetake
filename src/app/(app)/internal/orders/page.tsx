"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ExternalLink, ImageIcon, XCircle } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface OrderItem {
  id: string;
  plan: string;
  profession: string;
  gender: string;
  specificRole: string | null;
  status: string;
  promptIds: string[];
  outputPhotos: string[];
  predictionIds: string[];
  failedPredictions: number;
  errorMessages: string[];
  completedPredictions: number;
  createdAt: string;
  user?: { email: string };
}

interface OrdersResponse {
  orders: OrderItem[];
  nextCursor: string | null;
  total: number;
}

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const PROFESSIONS = [
  "general", "executive", "finance", "legal", "tech", "medical",
  "consulting", "real-estate", "creative", "academia", "education",
  "engineering", "public-service",
];

const STATUSES = ["completed", "generating", "failed", "pending", "paid"];

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function OrdersDashboard() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterProfession, setFilterProfession] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "30" });
      if (filterProfession) params.set("profession", filterProfession);
      if (filterStatus) params.set("status", filterStatus);

      const res = await fetch(`/api/internal/orders?${params}`);
      const data: OrdersResponse = await res.json();
      setOrders(data.orders);
      setTotal(data.total);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [filterProfession, filterStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  /* Stats */
  const completedCount = orders.filter((o) => o.status === "completed").length;
  const failedCount = orders.filter((o) => o.status === "failed").length;
  const totalPhotos = orders.reduce((s, o) => s + o.outputPhotos.filter(Boolean).length, 0);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Order Dashboard</h1>
      <p className="mt-1 text-muted-foreground">
        Track generated orders, image quality, and prompt performance.
      </p>

      {/* Stats bar */}
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <Stat label="Total Orders" value={total} />
        <Stat label="Completed" value={completedCount} color="green" />
        <Stat label="Failed" value={failedCount} color="red" />
        <Stat label="Output Photos" value={totalPhotos} />
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-3">
        <select
          value={filterProfession}
          onChange={(e) => setFilterProfession(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
        >
          <option value="">All Professions</option>
          {PROFESSIONS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <Button variant="outline" size="sm" onClick={fetchOrders}>
          Refresh
        </Button>
      </div>

      {/* Orders table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-base">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-left text-sm font-medium">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Profession</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Photos</th>
              <th className="px-4 py-3">Failed</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} className="px-4 py-12 text-center text-muted-foreground">
                  Loading...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-12 text-center text-muted-foreground">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <OrderRow
                  key={o.id}
                  order={o}
                  expanded={expanded.has(o.id)}
                  onToggle={() => toggleExpand(o.id)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Order Row                                                                 */
/* -------------------------------------------------------------------------- */

function OrderRow({
  order,
  expanded,
  onToggle,
}: {
  order: OrderItem;
  expanded: boolean;
  onToggle: () => void;
}) {
  const validPhotos = order.outputPhotos.filter(Boolean);
  const statusColor =
    order.status === "completed"
      ? "text-green-600"
      : order.status === "failed"
        ? "text-red-600"
        : "text-amber-600";

  return (
    <>
      <tr className="border-b border-border hover:bg-muted/30 transition-colors">
        <td className="px-4 py-3 font-mono text-sm">{order.id.slice(0, 8)}...</td>
        <td className="px-4 py-3 text-sm">{order.user?.email ?? "—"}</td>
        <td className="px-4 py-3">{order.profession}</td>
        <td className="px-4 py-3 text-sm text-muted-foreground">
          {order.specificRole || "—"}
        </td>
        <td className="px-4 py-3 text-muted-foreground">{order.plan}</td>
        <td className={`px-4 py-3 font-medium ${statusColor}`}>{order.status}</td>
        <td className="px-4 py-3">
          {validPhotos.length} / {order.promptIds.length}
        </td>
        <td className="px-4 py-3">
          {order.failedPredictions > 0 ? (
            <span className="text-red-600 font-medium">{order.failedPredictions}</span>
          ) : (
            <span className="text-muted-foreground">0</span>
          )}
        </td>
        <td className="px-4 py-3 text-sm text-muted-foreground">
          {new Date(order.createdAt).toLocaleDateString()}
        </td>
        <td className="px-4 py-3">
          <button onClick={onToggle} className="text-muted-foreground hover:text-foreground">
            <ChevronDown
              className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </td>
      </tr>

      {/* Expanded: image grid */}
      {expanded && (
        <tr>
          <td colSpan={10} className="px-4 py-4 bg-muted/20">
            <div className="space-y-3">
              {/* Errors */}
              {order.errorMessages.length > 0 && (
                <div className="rounded-lg border border-red-500/30 bg-red-50 dark:bg-red-950/20 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-red-700">
                    <XCircle className="h-4 w-4" />
                    Errors ({order.errorMessages.length})
                  </div>
                  <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                    {order.errorMessages.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Image grid */}
              <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
                {order.promptIds.map((pid, i) => (
                  <div key={i} className="relative rounded-lg border border-border bg-card overflow-hidden">
                    {validPhotos[i] ? (
                      <a href={validPhotos[i]} target="_blank" rel="noopener noreferrer">
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
                        <ImageIcon className="h-6 w-6 text-muted-foreground/40" />
                      </div>
                    )}
                    <div className="p-1.5">
                      <p className="text-xs font-mono text-muted-foreground truncate" title={pid}>
                        {pid.slice(0, 12)}...
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Pred: {order.predictionIds[i]?.slice(0, 12)}...
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Link to user-facing result page */}
              <a
                href={`/results/${order.id}`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 text-sm text-primary underline"
              >
                Open result page <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stat                                                                      */
/* -------------------------------------------------------------------------- */

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: "green" | "red";
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p
        className={`mt-1 text-2xl font-bold ${
          color === "green"
            ? "text-green-600"
            : color === "red"
              ? "text-red-600"
              : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
