"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type OnboardingFooterProps = {
  totalModules: number;
  totalCredits: number;
  onBack: () => void;
  onContinue: () => void;
};

export default function OnboardingFooter({
  totalModules,
  totalCredits,
  onBack,
  onContinue,
}: OnboardingFooterProps) {
  const creditFill = Math.min((totalCredits / 120) * 100, 100);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="space-y-2 rounded-xl border border-border bg-card px-4 py-4">
          <div className="flex items-end justify-between gap-4 text-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Credit progress
              </p>
              <p className="mt-1 text-muted-foreground">
                Fill the track to 120 credits by selecting modules.
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium text-foreground">
                {totalCredits} / 120
              </p>
              <p className="text-xs text-muted-foreground">
                {totalModules} modules selected
              </p>
            </div>
          </div>

          <div
            role="progressbar"
            aria-label="Credit progress"
            aria-valuemin={0}
            aria-valuemax={120}
            aria-valuenow={totalCredits}
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
              style={{ width: `${creditFill}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-accent transition-colors gap-2"
            onClick={onBack}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            disabled={totalCredits < 120}
            className="bg-primary/80 hover:bg-primary text-primary-foreground border border-primary/30 px-8 py-6 rounded-xl transition-all disabled:opacity-40"
            onClick={onContinue}
          >
            Continue to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
