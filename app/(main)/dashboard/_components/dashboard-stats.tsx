import { Card, CardContent } from "@/components/ui/card";
import { StudentModulesWithGrades } from "@/lib/data/student-modules";

type DashboardStatsProps = {
  studentModules: StudentModulesWithGrades;
  targetGrade: number;
};

function getTargetLabel(targetGrade: number): string {
  if (targetGrade >= 70) return "First";
  if (targetGrade >= 60) return "2:1";
  return "2:2";
}

export function DashboardStats({
  studentModules,
  targetGrade,
}: DashboardStatsProps) {
  // Year average — weighted grade so far across all modules
  const allGradedAssessments = studentModules.flatMap((sm) =>
    sm.assessments.filter((a) => a.grade !== null),
  );

  const totalGradedWeight = allGradedAssessments.reduce(
    (sum, assessment) => sum + assessment.weight,
    0,
  );

  const yearAverage =
    allGradedAssessments.length > 0
      ? allGradedAssessments.reduce((sum, a) => sum + a.grade! * a.weight, 0) /
        totalGradedWeight
      : null;

  // Credits tracked
  const totalTrackedCredits = studentModules.reduce(
    (sum, sm) => sum + (sm.module_info?.credits ?? 0),
    0,
  );

  const MAX_CREDITS = 120;

  // list of modules on track to achieving 70%
  const modulesOnTrack = studentModules.filter((module) => {
    // graded returns all graded assessments for the specific module
    const gradedAssessments = module.assessments.filter(
      (a) => a.grade !== null,
    );
    if (gradedAssessments.length === 0) return false;

    const currentGrade = gradedAssessments.reduce(
      (sum, assessment) => sum + assessment.grade! * assessment.weight,
      0,
    );

    const remainingWeight = module.assessments
      .filter((a) => a.grade === null)
      .reduce((sum, assessment) => sum + assessment.weight, 0);

    // branch handles the case where all assessments are graded then just check if the final grade clears the target grade.
    if (remainingWeight === 0) return currentGrade >= targetGrade;

    const requiredGrade = (targetGrade - currentGrade) / remainingWeight;
    return requiredGrade <= 100;
  }).length;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {/* Year Average */}
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Year Average</p>
          {yearAverage !== null ? (
            <>
              <p className="text-4xl font-bold text-foreground">
                {yearAverage.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                weighted so far
              </p>
            </>
          ) : (
            // if no assessment is graded
            <>
              <p className="text-4xl font-bold text-muted-foreground">—</p>
              <p className="text-xs text-muted-foreground mt-1">
                no grades yet
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Credits Tracked */}
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Credits Tracked</p>
          <p className="text-4xl font-bold text-foreground">
            {totalTrackedCredits}{" "}
            <span className="text-lg font-normal text-muted-foreground">
              / {MAX_CREDITS}
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {studentModules.length} modules enrolled
          </p>
        </CardContent>
      </Card>

      {/* Modules on Track */}
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Modules on Track</p>
          <p className="text-4xl font-bold text-foreground">
            {modulesOnTrack}{" "}
            <span className="text-lg font-normal text-muted-foreground">
              / {studentModules.length}
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            targeting {getTargetLabel(targetGrade)} ({targetGrade}%)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
