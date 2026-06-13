"use client";

import { useRouter } from "next/navigation";
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
  moduleId: number;
  assessmentName: string;
  moduleName: string | undefined;
  code: string | undefined;
  weight: number | undefined;
  grade: number;
  type: string | null;
};

type CompletedAssessmentsTableProps = {
  assessments: CompletedAssessment[];
};

export function CompletedAssessmentsTable({
  assessments,
}: CompletedAssessmentsTableProps) {
  const router = useRouter();

  const goToModule = (moduleId: number) => {
    router.push(`/modules/${moduleId}`);
  };

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
                Type
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
                className="group cursor-pointer border-border transition-colors hover:bg-muted/40 focus-visible:bg-muted/40"
                tabIndex={0}
                role="link"
                aria-label={`Go to ${assessment.moduleName ?? "module"}`}
                onClick={() => goToModule(assessment.moduleId)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    goToModule(assessment.moduleId);
                  }
                }}
              >
                <TableCell className="max-w-50 whitespace-normal wrap-break-word font-medium align-top">
                  <span className="flex min-w-0 items-start gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-radius bg-status-graded-bg">
                      <CheckCircle2 className="h-4 w-4 text-status-graded" />
                    </span>
                    <span className="min-w-0 whitespace-normal wrap-break-word">
                      {assessment.assessmentName}
                    </span>
                  </span>
                </TableCell>
                <TableCell className="max-w-75 whitespace-normal wrap-break-word align-top text-muted-foreground">
                  {assessment.type}
                </TableCell>
                <TableCell className="max-w-75 whitespace-normal wrap-break-word align-top">
                  <span className="flex min-w-0 items-start gap-2">
                    <span className="min-w-0 whitespace-normal wrap-break-word text-foreground">
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
                <TableCell className="max-w-75 whitespace-normal wrap-break-word align-top text-muted-foreground">
                  {assessment.weight}%
                </TableCell>
                <TableCell className="align-top">
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
