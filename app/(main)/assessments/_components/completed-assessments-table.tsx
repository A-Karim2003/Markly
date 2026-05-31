import { Check, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getGradeClass,
  getGradeColor,
} from "../../modules/lib/utils/module-grades";

export type CompletedAssessment = {
  id: number;
  assessmentName: string;
  moduleName: string | undefined;
  code: string | undefined;
  weight: number | undefined;
  grade: number;
};

type CompletedAssessmentsTableProps = {
  assessments: CompletedAssessment[];
};

export function CompletedAssessmentsTable({
  assessments,
}: CompletedAssessmentsTableProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Completed Assessments
      </h2>
      <Card className="overflow-hidden rounded-radius border border-border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Assessment
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Module
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Weight
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Grade
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Classification
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((assessment) => (
              <TableRow
                key={assessment.id}
                className="group border-border transition-colors hover:bg-muted/40"
              >
                <TableCell className="font-medium">
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-radius bg-status-graded-bg">
                      <CheckCircle2 className="h-4 w-4 text-status-graded" />
                    </span>
                    {assessment.assessmentName}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <span className="text-foreground">
                      {assessment.moduleName}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-secondary font-mono text-[11px] font-normal text-muted-foreground"
                    >
                      {assessment.code}
                    </Badge>
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {assessment.weight}%
                </TableCell>
                <TableCell>
                  <span
                    className="font-semibold"
                    style={{ color: getGradeColor(assessment.grade) }}
                  >
                    {assessment.grade}%
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="rounded-radius font-medium"
                    style={{
                      backgroundColor: `${getGradeColor(assessment.grade)}15`,
                      color: getGradeColor(assessment.grade),
                    }}
                  >
                    {getGradeClass(assessment.grade)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="status-graded inline-flex items-center gap-1.5 rounded-radius px-2.5 py-1 text-xs font-medium">
                    <Check className="h-3.5 w-3.5" />
                    Graded
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
