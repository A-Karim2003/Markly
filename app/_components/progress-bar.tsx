"use client";

import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  max?: number;
  className?: string;
  color?: string;
  showLabel?: boolean;
};

export function ProgressBar({
  value,
  max = 100,
  className,
  color = "#7C3AED",
  showLabel = false,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="h-2 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-muted-foreground">
          {value} / {max}
        </div>
      )}
    </div>
  );
}
