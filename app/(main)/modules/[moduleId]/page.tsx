import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ModuleHeader } from "../components/module-header";
import { AssessmentsTable } from "../components/assessments-table";
import { GradeSummary } from "../components/grade-summary";
import { getStudentModuleById } from "@/lib/data/student-modules";

interface PageProps {
  params: Promise<{ moduleId: string }>;
}

export default async function ModuleDetailPage({ params }: PageProps) {
  const { moduleId } = await params;

  const studentModule = await getStudentModuleById(Number(moduleId));

  const moduleInfo = studentModule.module_info;
  const scheme = moduleInfo?.module_assessments_scheme ?? [];
  const assessments = studentModule.assessments;

  // Merge scheme + assessments: each row is a scheme entry with its grade looked up
  const rows = scheme.map((s) => {
    const match = assessments.find((a) => a.scheme_id === s.id);
    return {
      id: s.id,
      name: s.name,
      type: s.type,
      weight: s.weight,
      grade: match?.grade ?? null,
    };
  });

  const gradedRows = rows.filter((r) => r.grade !== null);
  const currentGrade = gradedRows.reduce(
    (sum, r) => sum + r.grade! * r.weight,
    0,
  );
  const gradedWeight = gradedRows.reduce((sum, r) => sum + r.weight, 0);
  const remainingWeight = rows
    .filter((r) => r.grade === null)
    .reduce((sum, r) => sum + r.weight, 0);

  const TARGET_GRADE = 70;
  const requiredGrade =
    remainingWeight > 0
      ? (TARGET_GRADE - currentGrade) / remainingWeight
      : null;

  return (
    <div>
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link
          href="/dashboard"
          className="hover:text-foreground transition-colors"
        >
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href="/modules"
          className="hover:text-foreground transition-colors"
        >
          Modules
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{moduleInfo?.name}</span>
      </nav>

      <ModuleHeader
        name={moduleInfo?.name ?? ""}
        code={moduleInfo?.code ?? ""}
        credits={moduleInfo?.credits ?? 0}
        currentGrade={currentGrade}
        targetGrade={TARGET_GRADE}
        requiredGrade={requiredGrade}
      />

      <AssessmentsTable
        rows={rows}
        requiredGrade={requiredGrade}
        targetGrade={TARGET_GRADE}
        gradedWeight={gradedWeight}
        currentGrade={currentGrade}
      />

      <GradeSummary
        currentGrade={currentGrade}
        gradedWeight={gradedWeight}
        remainingWeight={remainingWeight}
        requiredGrade={requiredGrade}
        targetGrade={TARGET_GRADE}
      />
    </div>
  );
}
