import { AssessmentsStats } from "./_components/assessments-stats";
import { PendingAssessmentsTable } from "./_components/pending-assessments-table";
import { CompletedAssessmentsTable } from "./_components/completed-assessments-table";
import { getAssessments } from "@/lib/data/assessments";

export default async function AssessmentsPage() {
  const assessments = await getAssessments();

  const pendingAssessments = assessments
    .filter((assessment) => !assessment.grade)
    .map((assessment) => ({
      id: assessment.id,
      assessmentName: assessment.name,
      moduleName: assessment.student_modules.modules?.name,
      code: assessment.student_modules.modules?.code,
      weight: assessment.module_assessments_scheme?.weight,
    }));

  const completedAssessments = assessments
    .filter((assessment) => !!assessment.grade)
    .map((assessment) => ({
      id: assessment.id,
      assessmentName: assessment.name,
      moduleName: assessment.student_modules.modules?.name,
      code: assessment.student_modules.modules?.code,
      weight: assessment.module_assessments_scheme?.weight,
      grade: assessment.grade as number,
    }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Assessments</h1>
        <p className="text-muted-foreground mt-1">
          View all your assessments across modules
        </p>
      </div>

      <AssessmentsStats
        total={pendingAssessments.length + completedAssessments.length}
        completed={completedAssessments.length}
        pending={pendingAssessments.length}
      />

      <PendingAssessmentsTable assessments={pendingAssessments} />

      <CompletedAssessmentsTable assessments={completedAssessments} />
    </div>
  );
}
