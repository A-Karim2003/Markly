import { getStudentModulesWithGrades } from "@/lib/data/student-modules";
import { getStudentProfile } from "@/lib/data/student-profiles";
import { DashboardStats } from "./_components/dashboard-stats";
import { DashboardModules } from "./_components/dashboard-modules";

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
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track your academic progress
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm text-muted-foreground">
          Target:{" "}
          <span className="text-foreground font-medium">
            {getTargetLabel(targetGrade)} ({targetGrade}%)
          </span>
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
