import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create AI Headshots",
  description:
    "Upload your photos and get 30 professional AI headshots in under 5 minutes. Choose Starter ($19) or Pro ($35). Actually looks like you.",
  robots: {
    index: false, // Upload page — no SEO value, don't index
  },
};

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
