"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

const plans = [
  {
    name: "Starter",
    price: "$19",
    model: "FLUX.2 pro",
    photos: "30 headshots",
    styles: "10 style variations",
    upload: "1–10 photos",
    features: [
      "FLUX.2 pro model",
      "30 professional headshots",
      "10 style variations",
      "Balanced / Natural / Polished",
      "Instant download (ZIP)",
      "100% money-back guarantee",
    ],
    cta: "Get Starter",
    href: "/sign-up?plan=starter",
    hrefLoggedIn: "/generate?plan=starter",
    featured: false,
  },
  {
    name: "Pro",
    price: "$35",
    model: "FLUX.2 max",
    photos: "30 headshots",
    styles: "25 style variations",
    upload: "1–10 photos",
    features: [
      "FLUX.2 max model (highest realism)",
      "30 professional headshots",
      "25 style variations",
      "Balanced / Natural / Polished",
      "Instant download (ZIP)",
      "100% money-back guarantee",
    ],
    cta: "Get Pro",
    href: "/sign-up?plan=pro",
    hrefLoggedIn: "/generate?plan=pro",
    featured: true,
  },
  {
    name: "Team",
    price: "Custom",
    model: "FLUX.2 max",
    photos: "Bulk pricing",
    styles: "All styles",
    upload: "Per person",
    features: [
      "FLUX.2 max model",
      "Bulk pricing per person",
      "All style variations",
      "Consistent team look",
      "Priority support",
      "Flexible billing",
    ],
    cta: "Contact us",
    href: "mailto:yueheng0816@gmail.com",
    featured: false,
  },
];

export function PricingSection() {
  const { isSignedIn } = useAuth();

  return (
    <section id="pricing" className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            One-time payment. No subscription. 100% money-back guarantee.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 transition-shadow hover:shadow-lg ${
                plan.featured
                  ? "border-primary/50 bg-card shadow-md ring-1 ring-primary/20"
                  : "border-border bg-card"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground text-sm">one-time</span>}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span className="rounded-md bg-muted px-2 py-0.5">{plan.model}</span>
                  <span className="rounded-md bg-muted px-2 py-0.5">{plan.photos}</span>
                  <span className="rounded-md bg-muted px-2 py-0.5">{plan.styles}</span>
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-3 text-base">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={isSignedIn ? (plan.hrefLoggedIn ?? plan.href) : plan.href} className="block">
                <Button
                  variant={plan.featured ? "default" : "outline"}
                  className="w-full"
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
