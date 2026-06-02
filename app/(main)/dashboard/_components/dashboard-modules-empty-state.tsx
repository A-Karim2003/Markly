import Link from "next/link";
import { Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";

type DashboardModulesEmptyStateProps = {
  year: number;
};

export function DashboardModulesEmptyState({
  year,
}: DashboardModulesEmptyStateProps) {
  return (
    <div className="rounded-radius border border-border bg-card px-6 py-8 shadow-sm">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
            <Layers3 className="size-5" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              No modules selected yet
            </h3>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              Head to the modules page to add the modules for Year {year} so
              your dashboard can start tracking progress.
            </p>
          </div>
        </div>

        <Button asChild className="shrink-0 rounded-radius px-4">
          <Link href="/modules">Go to modules</Link>
        </Button>
      </div>
    </div>
  );
}
