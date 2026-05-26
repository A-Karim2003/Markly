import {
  getStudentModules,
  StudentModulesWithGrades,
} from "@/lib/data/student-modules";
import { ModuleCard } from "@/app/(main)/modules/components/module-card";
import { getModulesByYear } from "@/lib/data/modules";

type DashboardModulesProps = {
  modules: StudentModulesWithGrades;
  year: number;
};

export async function DashboardModules({
  modules,
  year,
}: DashboardModulesProps) {
  const currYearModules = await getModulesByYear(year);
  const studentModules = await getStudentModules();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">My Modules</h2>
        <span className="text-sm text-muted-foreground">Year {year}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            currYearModules={currYearModules}
            studentModules={studentModules}
          />
        ))}
      </div>
    </div>
  );
}
