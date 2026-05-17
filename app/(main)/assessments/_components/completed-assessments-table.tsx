import { Check } from "lucide-react";
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
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assessment</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Classification</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">
                  {a.assessmentName}
                </TableCell>
                <TableCell>
                  <span className="text-foreground">{a.moduleName}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {a.code}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {a.weight}%
                </TableCell>
                <TableCell>
                  <span
                    className="font-semibold"
                    style={{ color: getGradeColor(a.grade) }}
                  >
                    {a.grade}%
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    style={{
                      backgroundColor: `${getGradeColor(a.grade)}15`,
                      color: getGradeColor(a.grade),
                    }}
                  >
                    {getGradeClass(a.grade)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 text-sm text-[#16a34a]">
                    <Check className="h-4 w-4" />
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
