import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View your AI headshot orders, track generation progress, and download results.",
  robots: {
    index: false, // User-specific page — don't index
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
