"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        {/* Visual */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary">
          <Camera className="h-10 w-10 text-primary-foreground" strokeWidth={1.5} />
        </div>

        {/* Heading */}
        <h1 className="text-7xl font-bold tracking-tight text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page not found</h2>

        {/* Description */}
        <p className="mt-3 text-muted-foreground leading-relaxed">
          This shot didn&apos;t come out. The page you&apos;re looking for doesn&apos;t
          exist or has been moved — just like a bad headshot, it happens to the best
          of us.
        </p>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "default", size: "lg" }))}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/generate"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Get Your Headshots
          </Link>
        </div>
      </div>
    </div>
  );
}
