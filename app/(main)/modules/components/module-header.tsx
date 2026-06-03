import { Card, CardContent } from "@/components/ui/card";
import { getGradeColor, getGradeClass } from "../lib/utils/module-grades";

type ModuleHeaderProps = {
  name: string;
  code: string;
  credits: number;
  currentGrade: number;
  targetGrade: number;
  requiredGrade: number | null;
  gradedWeight: number;
  gradedCount: number;
  totalCount: number;
};

export function ModuleHeader({
  name,
  code,
  credits,
  currentGrade,
  targetGrade,
  requiredGrade,
  gradedWeight,
  gradedCount,
  totalCount,
}: ModuleHeaderProps) {
  const isOnTrack = currentGrade >= targetGrade;
  const progress = gradedWeight * 100;

  /* Use `requiredGrade` to pick the accent color. `currentGrade` 
    can be misleading while not all assessments are graded.
  */

  let currentGradeColor: string;
  if (requiredGrade === null) {
    // Use the default grade color based on the current grade
    currentGradeColor = getGradeColor(currentGrade);
  } else if (requiredGrade > 100) {
    currentGradeColor = "var(--color-status-pending)";
  } else {
    currentGradeColor = "var(--color-grade-first)";
  }

  return (
    <Card className="mb-6 overflow-hidden rounded-radius border-border shadow-sm">
      <CardContent className="p-6">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-foreground">
            {name}
          </h1>
          <p className="my-1 text-sm text-muted-foreground">
            {code} · {credits} credits
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-4">
          <Card className="rounded-radius border border-brand/20 bg-brand-subtle shadow-sm">
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-brand">Current grade</p>
              <p
                className="mt-2 text-4xl font-bold tracking-tight"
                style={{ color: currentGradeColor }}
              >
                {currentGrade.toFixed(1)}%
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {getGradeClass(currentGrade)} · weighted so far
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-radius border border-border bg-card shadow-sm">
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-muted-foreground">
                Target grade
              </p>
              <p className="mt-2 text-4xl font-bold tracking-tight text-foreground">
                {targetGrade}%
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                First classification
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-radius border border-status-pending-bg bg-status-pending-bg/40 shadow-sm">
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-status-pending">
                Progress
              </p>
              <p className="mt-2 text-4xl font-bold tracking-tight text-foreground">
                {progress.toFixed(0)}%
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {gradedCount} of {totalCount} assessed
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-brand/15">
                <div
                  className="h-1.5 rounded-full bg-brand"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-radius border border-grade-first/25 bg-grade-first-bg shadow-sm">
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-grade-first">
                Required in remaining assessments
              </p>
              <p className="mt-2 text-4xl font-bold tracking-tight text-grade-first">
                {requiredGrade !== null ? `${requiredGrade.toFixed(1)}%` : "—"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                To reach your target
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                You need{" "}
                {requiredGrade !== null ? `${requiredGrade.toFixed(1)}%` : "—"}{" "}
                in remaining assessments to achieve your target
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
