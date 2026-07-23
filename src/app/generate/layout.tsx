import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create AI Headshots",
  description:
    "Upload your photos and get professional AI headshots in under 5 minutes. Free preview available. Starter ($19) or Pro ($35). Actually looks like you.",
  robots: {
    index: false,
  },
};

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
