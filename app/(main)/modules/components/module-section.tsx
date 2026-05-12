import { StudentModulesWithGrades } from "@/lib/data/student-modules";
import { ModuleCard } from "./module-card";

type ModuleSectionProps = {
  title: string;
  modules: StudentModulesWithGrades;
};

export function ModuleSection({ title, modules }: ModuleSectionProps) {
  return (
    <div className="mb-10">
      <h2 className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-4">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
