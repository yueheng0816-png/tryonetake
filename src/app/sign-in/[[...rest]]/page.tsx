import { SignIn } from "@clerk/nextjs";
import { ShieldCheck, Zap, Star } from "lucide-react";

const APPEARANCE = {
  variables: {
    colorPrimary: "#3D3528",
    colorTextOnPrimaryBackground: "#FAFAF8",
    colorBackground: "#FFFFFF",
    colorText: "#1A1815",
    colorTextSecondary: "#6B6560",
    colorInputBackground: "#F8F7F5",
    colorInputText: "#1A1815",
    colorInputBorder: "#DFDBD5",
    colorShimmer: "#F0EDEA",
    colorDanger: "#DC2626",
    colorSuccess: "#16A34A",
    fontFamily: "var(--font-sans)",
    borderRadius: "0.625rem",
  },
  layout: {
    logoPlacement: "none" as const,
    socialButtonsPlacement: "bottom" as const,
    socialButtonsVariant: "blockButton" as const,
  },
  elements: {
    rootBox: "w-full",
    card: "shadow-none border border-border rounded-2xl bg-card p-6 sm:p-8",
    headerTitle: "text-2xl font-bold tracking-tight text-foreground",
    headerSubtitle: "text-sm text-muted-foreground mt-1.5",
    formFieldLabel: "text-sm font-medium text-foreground",
    formFieldInput:
      "h-10 w-full rounded-lg border border-border bg-muted/50 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors",
    formButtonPrimary:
      "h-10 w-full rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80 active:translate-y-px transition-all",
    formFieldAction: "text-sm text-primary font-medium hover:text-primary/80",
    footerActionLink: "text-sm text-primary font-semibold hover:text-primary/80",
    footerActionText: "text-sm text-foreground",
    socialButtonsBlockButton:
      "h-10 w-full rounded-lg border border-border bg-card text-foreground text-sm font-medium hover:bg-muted transition-colors",
    socialButtonsBlockButtonText: "text-sm font-medium",
    dividerLine: "bg-border",
    dividerText: "text-xs text-muted-foreground",
    formResendCodeLink: "text-sm text-primary font-medium hover:text-primary/80",
    identityPreviewText: "text-sm text-foreground font-medium",
    otpCodeFieldInput:
      "h-12 w-10 rounded-lg border border-border bg-muted/50 text-center text-lg font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors",
    alert: "rounded-lg border border-destructive/30 bg-destructive/5 text-sm text-destructive p-3",
    alertText: "text-destructive",
    formFieldErrorText: "text-xs text-destructive mt-1",
    badge: "rounded-full bg-muted text-foreground text-xs font-medium px-2 py-0.5",
    userButtonPopoverCard: "shadow-lg border border-border rounded-xl",
  },
} as const;

const TRUST_ITEMS = [
  { icon: Zap, text: "30 headshots in under 5 minutes" },
  { icon: ShieldCheck, text: "Automatic refund if generation fails" },
  { icon: Star, text: "FLUX.2 — state-of-the-art AI model" },
];

export default function SignInPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-2 lg:gap-12">
        {/* ── Brand Panel ── */}
        <div className="hidden flex-col justify-center lg:flex">
          <a href="/" className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
            <span aria-hidden>📸</span>
            <span className="text-primary">TryOneTake</span>
          </a>
          <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight lg:text-4xl">
            Welcome back
          </h2>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
            Sign in to your TryOneTake account and continue your journey to the perfect professional headshot.
          </p>

          {/* Trust badges */}
          <ul className="mt-8 space-y-3">
            {TRUST_ITEMS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                <Icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Form Panel ── */}
        <div className="flex flex-col justify-center">
          {/* Mobile-only brand header */}
          <div className="mb-6 text-center lg:hidden">
            <a href="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight">
              <span aria-hidden>📸</span>
              <span className="text-primary">TryOneTake</span>
            </a>
          </div>

          <SignIn appearance={APPEARANCE} />
        </div>
      </div>
    </div>
  );
}
