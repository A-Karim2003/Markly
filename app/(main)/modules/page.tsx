import { getStudentModulesWithGrades } from "@/lib/data/student-modules";
import { ModuleSection } from "./components/module-section";

const modules = [
  {
    id: "1",
    code: "CE201-5-FY",
    name: "Team Project Challenge",
    credits: 15,
    is_optional: false,
    average: 74.5,
    graded: 2,
    total: 3,
  },
  {
    id: "2",
    code: "CE202-5-XA",
    name: "Software Engineering",
    credits: 15,
    is_optional: false,
    average: 61.0,
    graded: 1,
    total: 3,
  },
  {
    id: "3",
    code: "CE203-5-AU",
    name: "Application Programming",
    credits: 15,
    is_optional: false,
    average: 79.5,
    graded: 3,
    total: 3,
  },
  {
    id: "4",
    code: "CE204-5-AU",
    name: "Data Structures and Algorithms II",
    credits: 15,
    is_optional: false,
    average: 55.0,
    graded: 1,
    total: 2,
  },
  {
    id: "5",
    code: "CE212-5-SP",
    name: "Web Application Programming",
    credits: 15,
    is_optional: true,
    average: 88.0,
    graded: 2,
    total: 2,
  },
  {
    id: "6",
    code: "CE213-5-SP",
    name: "Introduction to Artificial Intelligence",
    credits: 15,
    is_optional: true,
    average: 0,
    graded: 0,
    total: 3,
  },
];

export type Module = (typeof modules)[number];

export default async function ModulesPage() {
  const coreModules = modules.filter((m) => !m.is_optional);
  const optionalModules = modules.filter((m) => m.is_optional);
  const data = await getStudentModulesWithGrades();
  console.log(data);

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
