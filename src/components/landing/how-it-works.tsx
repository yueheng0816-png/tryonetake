import { Upload, Sparkles, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload 1 photo",
    description:
      "Take a selfie or use any photo. Just one is enough — upload up to 10 for even better variety.",
  },
  {
    icon: Sparkles,
    title: "AI generates 30 headshots",
    description:
      "Our AI creates studio-quality professional headshots with different outfits, backgrounds, and poses. Choose Natural, Balanced, or Polished style.",
  },
  {
    icon: Download,
    title: "Pick & download",
    description:
      "Select your favorites and download them instantly. Ready for LinkedIn, resumes, company websites, and anywhere you need to look professional.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From selfie to studio-quality headshot in minutes.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="absolute top-8 left-[60%] hidden h-px w-[80%] bg-border md:block" />
              )}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
