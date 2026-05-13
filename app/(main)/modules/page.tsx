import { getStudentModulesWithGrades } from "@/lib/data/student-modules";
import { ModuleSection } from "./components/module-section";

const actualModules = [
  {
    id: 1,
    module_info: {
      code: "CE303-6-AU",
      name: "Advanced Programming",
      credits: 15,
      is_optional: true,
    },
    assessments: [],
  },
  {
    id: 2,
    module_info: {
      code: "CE314-6-AU",
      name: "Natural Language Engineering",
      credits: 15,
      is_optional: true,
    },
    assessments: [],
  },
  {
    id: 3,
    module_info: {
      code: "CE316-6-SP",
      name: "Computer Vision",
      credits: 15,
      is_optional: true,
    },
    assessments: [[Object]],
  },
  {
    id: 4,
    module_info: {
      code: "CE320-6-AU",
      name: "Large Scale Software Systems and Extreme Programming",
      credits: 15,
      is_optional: true,
    },
    assessments: [],
  },
  {
    id: 5,
    module_info: {
      code: "CE326-6-AU",
      name: "Machine Learning",
      credits: 15,
      is_optional: true,
    },
    assessments: [],
  },
  {
    id: 6,
    module_info: {
      code: "CE301-6-FY",
      name: "Individual Capstone Project Challenge",
      credits: 45,
      is_optional: false,
    },
    assessments: [],
  },
];

export default async function ModulesPage() {
  const modules = await getStudentModulesWithGrades();

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
