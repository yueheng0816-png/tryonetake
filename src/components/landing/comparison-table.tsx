import React from "react";
import { Check, X } from "lucide-react";

const Icon = {
  Check: <Check className="h-5 w-5 text-green-500" />,
  X: <X className="h-5 w-5 text-red-400" />,
};

const rows = [
  { label: "Photos needed", TryOneTake: "1 photo", traditional: "In-person shoot", otherAI: "12–20 photos" },
  { label: "Price", TryOneTake: "$19", traditional: "$200–$500", otherAI: "$29–$75" },
  { label: "Turnaround", TryOneTake: "< 5 minutes", traditional: "Days to weeks", otherAI: "30 min – 4 hours" },
  { label: "Looks like you?", TryOneTake: Icon.Check, traditional: Icon.Check, otherAI: Icon.X },
  { label: "Background variety", TryOneTake: "25+ styles", traditional: "Limited by studio", otherAI: "10–15 styles" },
  { label: "Retakes", TryOneTake: "Instant regen", traditional: "Reschedule + fee", otherAI: "Usually limited" },
  { label: "Ready for LinkedIn", TryOneTake: Icon.Check, traditional: Icon.Check, otherAI: "Sometimes" },
];

export function ComparisonTable() {
  return (
    <section id="comparison" className="border-t border-border">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Why TryOneTake?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Studio quality. AI speed. Actually looks like you.
          </p>
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[600px] text-base">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left font-medium" />
                <th className="px-6 py-4 text-center font-semibold">
                  <span className="rounded-md bg-primary/10 px-3 py-1 text-primary">TryOneTake</span>
                </th>
                <th className="px-6 py-4 text-center text-muted-foreground">Traditional Photography</th>
                <th className="px-6 py-4 text-center text-muted-foreground">Other AI Tools</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const Td = ({ children, muted }: { children: React.ReactNode; muted?: boolean }) => (
                  <td className={`px-6 py-4 text-center${muted ? " text-muted-foreground" : ""}`}>
                    {React.isValidElement(children)
                      ? <div className="flex justify-center">{children}</div>
                      : children}
                  </td>
                );
                return (
                  <tr key={row.label} className="border-b border-border last:border-0 transition-colors hover:bg-muted/30">
                    <td className="px-6 py-4 font-medium">{row.label}</td>
                    <Td>{row.TryOneTake}</Td>
                    <Td muted>{row.traditional}</Td>
                    <Td muted>{row.otherAI}</Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
