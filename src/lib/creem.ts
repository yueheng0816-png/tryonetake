const CREEM_API_KEY = process.env.CREEM_API_KEY!;
const CREEM_WEBHOOK_SECRET = process.env.CREEM_WEBHOOK_SECRET!;
const STARTER_PRODUCT_ID = process.env.CREEM_STARTER_PRODUCT_ID!;
const PRO_PRODUCT_ID = process.env.CREEM_PRO_PRODUCT_ID!;

const BASE_URL =
  process.env.CREEM_BASE_URL || "https://api.creem.io";

// ── Plan helpers ──────────────────────────────────────────

export function getProductId(plan: "starter" | "pro"): string {
  return plan === "starter" ? STARTER_PRODUCT_ID : PRO_PRODUCT_ID;
}

export function getPlanAmount(plan: "starter" | "pro"): number {
  return plan === "starter" ? 1900 : 3500; // cents
}

// ── Checkout Session ──────────────────────────────────────

export interface CreateCheckoutParams {
  plan: "starter" | "pro";
  orderId: string;
  userEmail: string;
  successUrl: string;
}

export interface CreemCheckout {
  id: string;
  checkout_url: string;
}

export async function createCheckout(
  params: CreateCheckoutParams
): Promise<CreemCheckout> {
  const { plan, orderId, userEmail, successUrl } = params;

  const res = await fetch(`${BASE_URL}/v1/checkouts`, {
    method: "POST",
    headers: {
      "x-api-key": CREEM_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_id: getProductId(plan),
      request_id: `order_${orderId}`,
      success_url: successUrl,
      customer: { email: userEmail },
      metadata: { orderId, plan },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Creem checkout failed: ${res.status} ${body}`);
  }

  return res.json();
}

// ── Refund ────────────────────────────────────────────────

export async function createRefund(params: {
  checkoutId: string;
  amount: number; // cents
  reason: string;
}): Promise<{ success: boolean; refundId?: string; error?: string }> {
  const { checkoutId, amount, reason } = params;

  if (amount <= 0) return { success: true, refundId: "zero-amount" };

  try {
    const res = await fetch(`${BASE_URL}/v1/refunds`, {
      method: "POST",
      headers: {
        "x-api-key": CREEM_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkout_id: checkoutId,
        amount,
        reason,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return { success: false, error: `${res.status} ${body}` };
    }

    const data = await res.json();
    console.log(
      `[OneTake] Creem refund: ${data.id} $${(amount / 100).toFixed(2)}`
    );
    return { success: true, refundId: data.id };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[OneTake] Creem refund failed:", msg);
    return { success: false, error: msg };
  }
}

// ── Content Moderation ────────────────────────────────────
// Required by Creem for all AI image generation platforms.
// Every prompt sent to a generation model must pass through
// this endpoint first. Fail-closed: if the moderation API is
// unreachable, generation must NOT proceed.

export interface ModerationResult {
  decision: "allow" | "deny" | "flag";
}

export async function moderatePrompt(
  prompt: string,
  externalId?: string
): Promise<{ success: true; decision: "allow" | "deny" | "flag" } | { success: false; error: string }> {
  try {
    const res = await fetch(`${BASE_URL}/v1/moderation/prompt`, {
      method: "POST",
      headers: {
        "x-api-key": CREEM_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        ...(externalId ? { external_id: externalId } : {}),
      }),
      // Fail-closed: 5-second timeout. If Creem is slow, we
      // block generation rather than letting an unscreened
      // prompt through.
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(
        `[OneTake] Moderation API error ${res.status}: ${body}`
      );
      return { success: false, error: `moderation_unavailable: ${res.status}` };
    }

    const data = await res.json();
    const decision = data.decision as string;

    console.log(
      `[OneTake] Moderation: ${decision}` +
        (data.id ? ` (id: ${data.id})` : "") +
        (externalId ? ` for ${externalId}` : "")
    );

    if (decision === "allow") {
      return { success: true, decision: "allow" };
    }

    // Both "deny" and "flag" should block generation per Creem docs.
    // "flag" means the prompt raised a concern even if not explicitly
    // prohibited — treat it the same as deny.
    console.warn(
      `[OneTake] Moderation blocked prompt (${decision})` +
        (data.id ? ` id: ${data.id}` : "")
    );
    return { success: true, decision: decision as "deny" | "flag" };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    const isTimeout =
      (typeof DOMException !== "undefined" &&
        error instanceof DOMException &&
        (error.name === "TimeoutError" || error.name === "AbortError")) ||
      (error instanceof Error && error.name === "AbortError");
    console.error(
      `[OneTake] Moderation API ${isTimeout ? "timeout" : "error"}: ${msg}`
    );
    // Fail-closed: treat any network/timeout error as a block.
    // Never let an unscreened prompt reach a generation model.
    return { success: false, error: `moderation_unavailable: ${msg}` };
  }
}

// ── Webhook ───────────────────────────────────────────────

export { CREEM_WEBHOOK_SECRET };
