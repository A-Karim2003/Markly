import { Card, CardContent } from "@/components/ui/card";
import { getGradeColor, getGradeClass } from "../lib/utils/module-grades";

type ModuleHeaderProps = {
  name: string;
  code: string;
  credits: number;
  currentGrade: number;
  targetGrade: number;
  requiredGrade: number | null;
};

export function ModuleHeader({
  name,
  code,
  credits,
  currentGrade,
  targetGrade,
  requiredGrade,
}: ModuleHeaderProps) {
  const isOnTrack = currentGrade >= targetGrade;

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold text-foreground">{name}</h1>
        <p className="text-muted-foreground mt-1">
          {code} · {credits} credits
        </p>

        <div className="flex items-center gap-12 mt-4 mb-4 h-22">
          <div className="flex flex-col h-full">
            <p className="text-sm text-muted-foreground mb-1">Current Grade</p>
            <p
              className="text-4xl font-bold"
              style={{ color: getGradeColor(currentGrade) }}
            >
              {currentGrade.toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {getGradeClass(currentGrade)} · weighted so far
            </p>
          </div>
          <div className="flex flex-col h-full">
            <p className="text-sm text-muted-foreground mb-1">Target</p>
            <p className="text-4xl font-bold text-foreground">{targetGrade}%</p>
          </div>
        </div>

        <div
          className={`px-4 py-3 rounded-radius text-sm font-medium ${
            isOnTrack
              ? "bg-[#16a34a]/10 text-[#16a34a] border border-[#16a34a]/20"
              : "bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20"
          }`}
        >
          {isOnTrack
            ? `You are on track for a ${getGradeClass(currentGrade)} in this module`
            : `You need ${requiredGrade !== null ? requiredGrade.toFixed(1) : "—"}% in remaining assessments to achieve your target`}
        </div>
      </CardContent>
    </Card>
  );
}
