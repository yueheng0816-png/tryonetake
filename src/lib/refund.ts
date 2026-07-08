import { createRefund } from "@/lib/creem";
import { db } from "@/lib/db";

// ── Failure Diagnosis ──────────────────────────────────────

export interface Diagnosis {
  category: "rate_limit" | "api_error" | "network" | "unknown";
  userMessage: string;
  adminMessage: string;
}

export function diagnoseFailures(errorMessages: string[]): Diagnosis {
  const all = errorMessages.filter(Boolean).join(" ").toLowerCase();
  const rl = ["429", "rate limit", "too many requests"];
  const isRL = rl.some((p) => all.includes(p));
  const nw = ["econnreset", "etimedout", "fetch failed", "network", "enotfound", "dns", "timeout", "abort"];
  const isNW = nw.some((p) => all.includes(p));
  if (isRL) {
    return {
      category: "rate_limit",
      userMessage: "OneTake is experiencing unusually high demand right now. Your payment has been fully refunded — please try again in a few minutes.",
      adminMessage: "Rate limit. " + errorMessages.length + " predictions failed.",
    };
  }
  if (isNW) {
    return {
      category: "network",
      userMessage: "A temporary network issue prevented your headshots from being generated. Your payment has been refunded — please try again shortly.",
      adminMessage: "Network errors. Sample: " + errorMessages.slice(0, 3).join(" | "),
    };
  }
  const api = ["api", "model", "invalid", "unauthorized", "payment", "quota"];
  const isAPI = api.some((p) => all.includes(p));
  if (isAPI) {
    return {
      category: "api_error",
      userMessage: "Our AI service is temporarily unavailable. Your payment has been refunded — we're working on a fix and will be back shortly.",
      adminMessage: "API errors. Sample: " + errorMessages.slice(0, 3).join(" | "),
    };
  }
  return {
    category: "unknown",
    userMessage: "Something went wrong during generation and we weren't able to produce your headshots. Your payment has been fully refunded. If you need immediate assistance, contact support@tryonetake.com.",
    adminMessage: "Unknown failure. Sample: " + errorMessages.slice(0, 5).join(" | "),
  };
}

// ── Creem Refund ───────────────────────────────────────────

export async function executeRefund(params: {
  orderId: string;
  checkoutId: string;
  amount: number;
  reason: string;
}): Promise<{ success: boolean; refundId?: string; error?: string }> {
  const { orderId, checkoutId, amount, reason } = params;
  if (!checkoutId) return { success: false, error: "No checkoutId" };
  if (amount <= 0) return { success: true, refundId: "zero-amount" };

  const result = await createRefund({ checkoutId, amount, reason });

  if (result.success) {
    console.log("[OneTake] Refund: " + result.refundId + " $" + (amount / 100).toFixed(2) + " order " + orderId);
  } else {
    console.error("[OneTake] Refund failed order " + orderId + ":", result.error);
  }

  return result;
}

// ── Orchestrator ───────────────────────────────────────────

export interface RefundResult {
  successCount: number;
  failedCount: number;
  totalCount: number;
  refundAmount: number;
  refundStatus: "full" | "partial" | "none";
  diagnosis: Diagnosis | null;
}

export async function handleOrderCompletion(params: {
  orderId: string;
  checkoutId: string | null;
  userEmail: string;
  plan: string;
  orderAmount: number;
  totalPredictions: number;
  failedPredictions: number;
  errorMessages: string[];
}): Promise<RefundResult> {
  const {
    orderId, checkoutId, userEmail, plan,
    orderAmount, totalPredictions, failedPredictions, errorMessages,
  } = params;
  const successCount = totalPredictions - failedPredictions;

  if (failedPredictions === 0) {
    return {
      successCount, failedCount: 0, totalCount: totalPredictions,
      refundAmount: 0, refundStatus: "none", diagnosis: null,
    };
  }

  const isAllFailed = successCount === 0;
  const refundAmount = isAllFailed
    ? orderAmount
    : Math.round((orderAmount * failedPredictions) / totalPredictions);
  const diagnosis = diagnoseFailures(errorMessages);

  if (checkoutId) {
    await executeRefund({ orderId, checkoutId, amount: refundAmount, reason: diagnosis.userMessage });
  } else {
    console.error("[OneTake] Order " + orderId + ": Cannot refund - no checkoutId");
  }

  const refundStatus: "full" | "partial" = isAllFailed ? "full" : "partial";
  const newStatus = isAllFailed ? "failed" : "completed";

  await db.order.update({
    where: { id: orderId },
    data: { status: newStatus, refundedAmount: refundAmount, refundStatus },
  });

  const { sendUserRefundEmail, sendAdminAlert } = await import("./email");
  sendUserRefundEmail({ to: userEmail, refundAmount, successCount, totalCount: totalPredictions, reason: diagnosis.userMessage })
    .catch((e) => console.error("[OneTake] User email:", e));
  sendAdminAlert({
    orderId, userEmail, plan, diagnosis: diagnosis.adminMessage,
    errorSummary: errorMessages.filter(Boolean).slice(0, 10).join("\n") || "N/A",
    refundAmount, successCount, totalCount: totalPredictions,
  }).catch((e) => console.error("[OneTake] Admin alert:", e));

  console.log("[OneTake] Order " + orderId + ": " + successCount + "/" + totalPredictions + " ok, $" + (refundAmount / 100).toFixed(2) + " refunded (" + refundStatus + ")");
  return { successCount, failedCount: failedPredictions, totalCount: totalPredictions, refundAmount, refundStatus, diagnosis };
}
