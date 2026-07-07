"use client";

interface SkeletonCardProps {
  index: number;
}

export function SkeletonCard({ index }: SkeletonCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border/50">
      {/* Shimmer placeholder in 2:3 aspect ratio */}
      <div className="aspect-[2/3] bg-muted animate-pulse">
        <div className="flex h-full items-center justify-center">
          <span className="text-xs text-muted-foreground/40">
            #{index + 1}
          </span>
        </div>
      </div>
    </div>
  );
}
