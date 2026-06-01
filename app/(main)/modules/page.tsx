import { getModulesByYear } from "@/lib/data/modules";
import { getStudentProfile } from "@/lib/data/student-profiles";
import { getStudentModulesWithGrades } from "@/lib/data/student-modules";
import { SetupYearCard } from "./components/setup-year-card";
import { ModuleSection } from "./components/module-section";

export default async function ModulesPage() {
  const studentProfile = await getStudentProfile();
  const modules = await getStudentModulesWithGrades();

  if (modules.length === 0) {
    const yearModules = studentProfile.year
      ? await getModulesByYear(studentProfile.year)
      : [];

    return <SetupYearCard year={studentProfile.year!} modules={yearModules} />;
  }

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
