"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Is it really just 1 photo?",
    a: "Yes. OneTake works with a single selfie. For best results with more expression variety, we recommend uploading 3–5 photos with different angles and expressions — but 1 is enough to get started.",
  },
  {
    q: "Will the headshots actually look like me?",
    a: "That's our #1 priority. Unlike other AI tools that apply heavy beauty filters and make everyone look the same, OneTake is built on FLUX.2 — the most realistic AI model available. We prioritize identity preservation over artificial beautification.",
  },
  {
    q: "What's the difference between Starter and Pro?",
    a: "Starter uses FLUX.2 pro with 10 style variations. Pro uses FLUX.2 max — the highest-realism model — with 25 style variations. Both deliver 30 headshots. Pro gives you more outfit, background, and pose diversity with noticeably better skin texture and detail.",
  },
  {
    q: "Is my data safe?",
    a: "Your photos are encrypted during upload, used only to generate your headshots, and permanently deleted within 24 hours after generation is complete. We never use your photos to train AI models. We never share your data with third parties.",
  },
  {
    q: "What style options do I have?",
    a: "You can choose between Natural (minimal retouching, keeps your original features), Balanced (subtle refinement under flattering lighting), and Polished (magazine-quality soft glamour). You also get variety across different outfits, backgrounds, and poses.",
  },
  {
    q: "What if I don't like the results?",
    a: "We offer a 100% money-back guarantee. If you're not satisfied with your headshots, contact us within 7 days and we'll refund your payment — no questions asked.",
  },
  {
    q: "Can I use these on LinkedIn or my company website?",
    a: "Absolutely. OneTake headshots are designed for professional use — LinkedIn, resumes, company team pages, email signatures, conference badges, and more. You get full commercial usage rights.",
  },
  {
    q: "How long does it take?",
    a: "Most orders are ready in under 5 minutes. During peak times, it may take up to 10 minutes. We'll email you as soon as your headshots are ready.",
  },
  {
    q: "Do you support team orders?",
    a: "Yes. Contact us for team pricing — we offer bulk discounts and can help ensure a consistent look across your entire organization.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="border-t border-border">
      <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about OneTake headshots.
          </p>
        </div>

        <div className="mt-8 divide-y divide-border">
          {faqs.map((faq, i) => (
            <div key={i} className="py-5">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="pr-4 text-base font-medium">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all",
                  openIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="pt-3 text-base text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
