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
    <p className="text-sm text-muted-foreground">
      Based on your grades so far ({currentGrade.toFixed(1)}% from{" "}
      {(gradedWeight * 100).toFixed(0)}% of assessments), you need{" "}
      <span className="font-medium text-foreground">
        {requiredGrade !== null ? `${requiredGrade.toFixed(1)}%` : "—"}
      </span>{" "}
      in the remaining assessments (worth {(remainingWeight * 100).toFixed(0)}%)
      to achieve {targetGrade}% overall in this module.
    </p>
  );
}
