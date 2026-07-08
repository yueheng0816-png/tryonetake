const CREEM_API_KEY = process.env.CREEM_API_KEY!;
const CREEM_WEBHOOK_SECRET = process.env.CREEM_WEBHOOK_SECRET!;
const STARTER_PRODUCT_ID = process.env.CREEM_STARTER_PRODUCT_ID!;
const PRO_PRODUCT_ID = process.env.CREEM_PRO_PRODUCT_ID!;

const BASE_URL =
  process.env.CREEM_BASE_URL || "https://test-api.creem.io";

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

// ── Webhook ───────────────────────────────────────────────

export { CREEM_WEBHOOK_SECRET };
