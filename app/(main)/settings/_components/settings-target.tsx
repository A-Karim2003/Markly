"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CLASSIFICATIONS = [
  { value: 70, label: "First", sublabel: "70%" },
  { value: 60, label: "2:1", sublabel: "60%" },
  { value: 50, label: "2:2", sublabel: "50%" },
] as const;

type SettingsTargetProps = {
  targetGrade: number | null;
  onTargetChange: (grade: number) => void;
};

export function SettingsTarget({
  targetGrade,
  onTargetChange,
}: SettingsTargetProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">
          Default Target Classification
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4">
          This will be your default target when viewing your modules and
          dashboard.
        </p>
        <div className="flex gap-2">
          {CLASSIFICATIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onTargetChange(option.value)}
              className={cn(
                "px-4 py-2 rounded-radius text-sm font-medium transition-all",
                option.value === targetGrade
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/40",
              )}
            >
              {option.label}{" "}
              <span
                className={cn(
                  "text-xs",
                  option.value === targetGrade
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground",
                )}
              >
                ({option.sublabel})
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
