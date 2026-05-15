import { Card, CardContent } from "@/components/ui/card";

type GradeSummaryProps = {
  currentGrade: number;
  gradedWeight: number;
  remainingWeight: number;
  requiredGrade: number | null;
  targetGrade: number;
};

export function GradeSummary({
  currentGrade,
  gradedWeight,
  remainingWeight,
  requiredGrade,
  targetGrade,
}: GradeSummaryProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">
          Based on your grades so far ({currentGrade.toFixed(1)}% from{" "}
          {(gradedWeight * 100).toFixed(0)}% of assessments), you need{" "}
          <span className="text-foreground font-medium">
            {requiredGrade !== null ? `${requiredGrade.toFixed(1)}%` : "—"}
          </span>{" "}
          in the remaining assessments (worth{" "}
          {(remainingWeight * 100).toFixed(0)}%) to achieve {targetGrade}%
          overall in this module.
        </p>
      </CardContent>
    </Card>
  );
}
