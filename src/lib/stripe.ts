import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const STARTER_PRICE_ID = process.env.STRIPE_STARTER_PRICE_ID!;
const PRO_PRICE_ID = process.env.STRIPE_PRO_PRICE_ID!;

export function getPlanPriceId(plan: "starter" | "pro"): string {
  return plan === "starter" ? STARTER_PRICE_ID : PRO_PRICE_ID;
}

export function getPlanAmount(plan: "starter" | "pro"): number {
  return plan === "starter" ? 1900 : 3500; // cents
}
