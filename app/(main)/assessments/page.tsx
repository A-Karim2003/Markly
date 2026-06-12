import { AssessmentsStats } from "./_components/assessments-stats";
import { PendingAssessmentsTable } from "./_components/pending-assessments-table";
import { CompletedAssessmentsTable } from "./_components/completed-assessments-table";
import { getAssessments } from "@/lib/data/assessments";
import { AssessmentsEmptyState } from "./_components/assessments-empty-state";

function toPercentage(weight: number | undefined) {
  return Math.round((weight ?? 0) * 100);
}

export default async function AssessmentsPage() {
  const assessments = await getAssessments();

  const pendingAssessments = assessments
    .filter((assessment) => !assessment.grade)
    .map((assessment) => ({
      id: assessment.id,
      assessmentName: assessment.name,
      moduleName: assessment.student_modules.modules?.name,
      code: assessment.student_modules.modules?.code,
      weight: toPercentage(assessment.module_assessments_scheme?.weight),
    }));

  const completedAssessments = assessments
    .filter((assessment) => !!assessment.grade)
    .map((assessment) => ({
      id: assessment.id,
      assessmentName: assessment.name,
      moduleName: assessment.student_modules.modules?.name,
      code: assessment.student_modules.modules?.code,
      weight: toPercentage(assessment.module_assessments_scheme?.weight),
      grade: assessment.grade as number,
    }));

  // TODO: Update assessments table to give more info later such as whether its a coursework/exam or maybe weight shown in percentage e.g 60%	rather than 0.6%. Maybe I also need to update database assessments column to add an extra column for assessment type.

  // TODO: custom assessments do not have weight
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

      {pendingAssessments.length + completedAssessments.length === 0 ? (
        <AssessmentsEmptyState />
      ) : (
        <>
          <PendingAssessmentsTable assessments={pendingAssessments} />

          <CompletedAssessmentsTable assessments={completedAssessments} />
        </>
      )}
    </div>
  );
}
