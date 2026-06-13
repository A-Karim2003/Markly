import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ModuleHeader } from "../components/module-header";
import { AssessmentsTable } from "../components/assessments-table";
import { getStudentModuleById } from "@/lib/data/student-modules";
import { getStudentProfile } from "@/lib/data/student-profiles";

interface PageProps {
  params: Promise<{ moduleId: string }>;
}

export default async function ModuleDetailPage({ params }: PageProps) {
  const { moduleId } = await params;
  if (!/^[1-9]\d*$/.test(moduleId)) {
    notFound();
  }

  const moduleIdNumber = Number(moduleId);

  const [studentModule, studentProfile] = await Promise.all([
    getStudentModuleById(moduleIdNumber),
    getStudentProfile(),
  ]);

  if (!studentModule) notFound();

  const { module_info: moduleInfo, assessments } = studentModule;

  const assessmentRows = assessments.map((assessment) => ({
    id: assessment.id,
    name: assessment.name,
    type: assessment.type,
    weight: assessment.weight,
    grade: assessment.grade ?? null,
    isCustom: assessment.scheme_id === null,
  }));

  const gradedRows = assessmentRows.filter((r) => r.grade !== null);

  const currentGrade = gradedRows.reduce(
    (sum, r) => sum + r.grade! * r.weight,
    0,
  );
  const gradedWeight = gradedRows.reduce((sum, r) => sum + r.weight, 0);
  const remainingWeight = assessmentRows
    .filter((r) => r.grade === null)
    .reduce((sum, r) => sum + r.weight, 0);

  const TARGET_GRADE = studentProfile.target_grade ?? 70;

  const requiredGrade =
    remainingWeight > 0
      ? (TARGET_GRADE - currentGrade) / remainingWeight
      : null;

  return (
    <div>
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
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
        gradedWeight={gradedWeight}
        gradedCount={gradedRows.length}
        totalCount={assessmentRows.length}
      />

      <AssessmentsTable
        rows={assessmentRows}
        requiredGrade={requiredGrade}
        targetGrade={TARGET_GRADE}
        gradedWeight={gradedWeight}
        currentGrade={currentGrade}
        remainingWeight={remainingWeight}
        moduleId={Number(moduleId)}
      />
    </div>
  );
}
