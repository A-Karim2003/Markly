import { getModulesByYear } from "@/lib/data/modules";
import { getStudentProfile } from "@/lib/data/student-profiles";
import { getStudentModulesWithGrades } from "@/lib/data/student-modules";
import { SetupYearCard } from "./components/setup-year-card";
import { ModuleSection } from "./components/module-section";

function ModulesPageHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Modules
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        View and manage your modules
      </p>
    </div>
  );
}

export default async function ModulesPage() {
  const studentProfile = await getStudentProfile();
  const modules = await getStudentModulesWithGrades();

  if (modules.length === 0) {
    const yearModules = studentProfile.year
      ? await getModulesByYear(studentProfile.year)
      : [];

    return (
      <div>
        <ModulesPageHeader />
        <SetupYearCard year={studentProfile.year!} modules={yearModules} />
      </div>
    );
  }

  const coreModules = modules.filter(
    (module) => !module.module_info?.is_optional,
  );
  const optionalModules = modules.filter(
    (module) => module.module_info?.is_optional,
  );

  return (
    <div>
      <ModulesPageHeader />

      <ModuleSection title="Core Modules" modules={coreModules} />
      <ModuleSection title="Optional Modules" modules={optionalModules} />
    </div>
  );
}
