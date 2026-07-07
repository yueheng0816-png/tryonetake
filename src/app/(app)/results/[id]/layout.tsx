import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Headshots",
  description: "View, select, and download your AI-generated professional headshots.",
  robots: {
    index: false, // User-specific page — don't index
  },
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
