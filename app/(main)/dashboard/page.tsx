import { getStudentModulesWithGrades } from "@/lib/data/student-modules";
import { getStudentProfile } from "@/lib/data/student-profiles";
import { DashboardStats } from "./_components/dashboard-stats";
import { DashboardModules } from "./_components/dashboard-modules";
import { Target, ChevronDown } from "lucide-react";

function getTargetLabel(targetGrade: number): string {
  if (targetGrade >= 70) return "First";
  if (targetGrade >= 60) return "2:1";
  return "2:2";
}

export default async function DashboardPage() {
  const [studentModules, studentProfile] = await Promise.all([
    getStudentModulesWithGrades(),
    getStudentProfile(),
  ]);

  const targetGrade = studentProfile?.target_grade ?? 70;
  const year = studentProfile.year!;

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your academic progress 👋
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Year selector */}
          <div className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-sm shadow-sm w-40">
            <span className="font-medium text-foreground">Year {year}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </div>

          {/* Target badge */}
          <div className="flex items-center gap-2 rounded-xl bg-brand/15 px-3 py-1.5 text-sm w-50">
            <Target className="h-3.5 w-3.5 text-brand" />
            <span className="text-muted-foreground">Target:</span>
            <span className="font-semibold text-brand">
              {getTargetLabel(targetGrade)} ({targetGrade}%)
            </span>
          </div>
        </div>
      </div>

      <DashboardStats
        modules={studentModules ?? []}
        targetGrade={targetGrade}
      />

      <DashboardModules modules={studentModules ?? []} year={year} />
    </div>
  );
}
