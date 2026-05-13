import { getStudentModulesWithGrades } from "@/lib/data/student-modules";
import { ModuleSection } from "./components/module-section";

export default async function ModulesPage() {
  const modules = await getStudentModulesWithGrades();

  console.log(modules);

  const coreModules = modules.filter(
    (module) => !module.module_info?.is_optional,
  );
  const optionalModules = modules.filter(
    (module) => module.module_info?.is_optional,
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Modules</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your modules
        </p>
      </div>

      <ModuleSection title="Core Modules" modules={coreModules} />
      <ModuleSection title="Optional Modules" modules={optionalModules} />
    </div>
  );
}
