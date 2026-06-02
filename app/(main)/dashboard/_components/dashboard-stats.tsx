"use client";

import { Card, CardContent } from "@/components/ui/card";
import { StudentModulesWithGrades } from "@/lib/data/student-modules";
import { BookOpen, Target } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import CircleIcon from "./circle-icon";

type DashboardStatsProps = {
  modules: StudentModulesWithGrades;
  targetGrade: number;
};

function getTargetLabel(targetGrade: number): string {
  if (targetGrade >= 70) return "First";
  if (targetGrade >= 60) return "2:1";
  return "2:2";
}

const COLORS = {
  brand: "#7c6af7",
  blue: "#3b6fd4",
  green: "#22a06b",
} as const;

// creating the shape of the sparkline
const avgSparkData = [
  { v: 30 },
  { v: 75 },
  { v: 50 },
  { v: 65 },
  { v: 45 },
  { v: 80 },
  { v: 70 },
  { v: 120 },
];

function InlineSparkline() {
  return (
    <div className="h-14 w-32.5 shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={avgSparkData}
          margin={{ top: 10, right: 6, left: 6, bottom: 6 }}
        >
          <defs>
            <linearGradient id="spark-brand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.brand} stopOpacity={3} />
              <stop offset="100%" stopColor={COLORS.brand} stopOpacity={0.08} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke={COLORS.brand}
            strokeWidth={2.5}
            fill="url(#spark-brand)"
            dot={false}
            isAnimationActive={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DashboardStats({ modules, targetGrade }: DashboardStatsProps) {
  // Year average — weighted grade so far across all modules
  const allGradedAssessments = modules.flatMap((sm) =>
    sm.assessments.filter((a) => a.grade !== null),
  );

  const totalGradedWeight = allGradedAssessments.reduce(
    (sum, assessment) => sum + assessment.weight,
    0,
  );

  const yearAverage =
    allGradedAssessments.length > 0
      ? allGradedAssessments.reduce((sum, a) => sum + a.grade! * a.weight, 0) /
        totalGradedWeight
      : null;

  // Credits tracked
  const totalTrackedCredits = modules.reduce(
    (sum, sm) => sum + (sm.module_info?.credits ?? 0),
    0,
  );

  const MAX_CREDITS = 120;

  // list of modules on track to achieving 70%
  const modulesOnTrack = modules.filter((module) => {
    // graded returns all graded assessments for the specific module
    const gradedAssessments = module.assessments.filter(
      (a) => a.grade !== null,
    );
    if (gradedAssessments.length === 0) return false;

    const currentGrade = gradedAssessments.reduce(
      (sum, assessment) => sum + assessment.grade! * assessment.weight,
      0,
    );

    const remainingWeight = module.assessments
      .filter((a) => a.grade === null)
      .reduce((sum, assessment) => sum + assessment.weight, 0);

    // branch handles the case where all assessments are graded then just check if the final grade clears the target grade.
    if (remainingWeight === 0) return currentGrade >= targetGrade;

    const requiredGrade = (targetGrade - currentGrade) / remainingWeight;
    return requiredGrade <= 100;
  }).length;

  return (
    <div className="stat-card-container">
      {/* ── Year Average */}
      <Card className="rounded-radius border border-brand/20 bg-brand-subtle shadow-sm">
        <CardContent className="p-6">
          <p className="mb-2 text-sm font-semibold text-brand">Year Average</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold tracking-tight text-foreground">
                {yearAverage !== null ? `${yearAverage.toFixed(1)}%` : "—"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {yearAverage !== null ? "weighted so far" : "no grades yet"}
              </p>
            </div>
            <InlineSparkline />
          </div>
        </CardContent>
      </Card>

      {/* ── Credits Tracked */}
      <Card className="rounded-radius border border-grade-upper-second/25 bg-grade-upper-second-bg shadow-sm">
        <CardContent className="p-6">
          <p className="mb-2 text-sm font-semibold text-grade-upper-second">
            Credits Tracked
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold tracking-tight text-foreground">
                {totalTrackedCredits}
                <span className="ml-1 text-xl font-normal text-muted-foreground">
                  / {MAX_CREDITS}
                </span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {modules.length} modules enrolled
              </p>
            </div>
            <CircleIcon
              className="bg-grade-upper-second-bg"
              icon={<BookOpen className="h-6 w-6 text-grade-upper-second" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Modules on Track */}
      <Card className="rounded-radius border border-grade-first/25 bg-grade-first-bg shadow-sm">
        <CardContent className="p-6">
          <p className="mb-2 text-sm font-semibold text-grade-first">
            Modules on Track
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold tracking-tight text-foreground">
                {modulesOnTrack}
                <span className="ml-1 text-xl font-normal text-muted-foreground">
                  / {modules.length}
                </span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                targeting {getTargetLabel(targetGrade)} ({targetGrade}%)
              </p>
            </div>
            <CircleIcon
              className="bg-grade-first-bg"
              icon={<Target className="h-6 w-6 text-grade-first" />}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
