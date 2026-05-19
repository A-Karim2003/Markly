import { StudentModulesWithGrades } from "@/lib/data/student-modules";
import { ModuleCard } from "@/app/(main)/modules/components/module-card";

type DashboardModulesProps = {
  studentModules: StudentModulesWithGrades;
  year: number;
};

export function DashboardModules({
  studentModules,
  year,
}: DashboardModulesProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">My Modules</h2>
        <span className="text-sm text-muted-foreground">Year {year}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {studentModules.map((studentModule) => (
          <ModuleCard key={studentModule.id} module={studentModule} />
        ))}
      </div>
    </div>
  );
}
