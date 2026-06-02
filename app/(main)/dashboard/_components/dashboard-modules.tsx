import {
  getStudentModules,
  StudentModulesWithGrades,
} from "@/lib/data/student-modules";
import { ModuleCard } from "@/app/(main)/modules/components/module-card";
import { getModulesByYear } from "@/lib/data/modules";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DashboardModulesEmptyState } from "./dashboard-modules-empty-state";

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
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-foreground tracking-tight">
          My Modules
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground bg-muted px-2.5 py-1 rounded-radius font-medium">
            Year {year}
          </span>
          <Link
            href="/modules"
            className="flex items-center gap-1 text-sm font-medium text-brand hover:opacity-80 transition-opacity"
          >
            View all modules
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {modules.length === 0 ? (
        <DashboardModulesEmptyState year={year} />
      ) : (
        /* Module grid */
        <div className="modules-grid">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              module={module}
              currYearModules={currYearModules}
              studentModules={studentModules}
              colorIndex={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
