import { Check, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getGradeColor } from "../lib/utils/module-grades";

type AssessmentRow = {
  id: number;
  name: string;
  type: string;
  weight: number;
  grade: number | null;
};

type AssessmentsTableProps = {
  rows: AssessmentRow[];
  requiredGrade: number | null;
  targetGrade: number;
  gradedWeight: number;
  currentGrade: number;
};

export function AssessmentsTable({
  rows,
  requiredGrade,
  targetGrade,
  gradedWeight,
  currentGrade,
}: AssessmentsTableProps) {
  return (
    <Card className="overflow-hidden mb-6">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Assessments</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Assessment Name</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Weighted Contribution</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Required to Hit Target</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
            const weightedContribution =
              row.grade !== null ? row.grade * row.weight : null;
            const isGraded = row.grade !== null;

            return (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {(row.weight * 100).toFixed(0)}%
                </TableCell>
                <TableCell>
                  {isGraded ? (
                    <span
                      className="font-semibold"
                      style={{ color: getGradeColor(row.grade!) }}
                    >
                      {row.grade}%
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {weightedContribution !== null
                    ? `${weightedContribution.toFixed(1)}%`
                    : "—"}
                </TableCell>
                <TableCell>
                  {isGraded ? (
                    <span className="inline-flex items-center gap-1.5 text-sm text-[#16a34a]">
                      <Check className="h-4 w-4" />
                      Graded
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm text-[#d97706]">
                      <Clock className="h-4 w-4" />
                      Pending
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {!isGraded && requiredGrade !== null ? (
                    <span
                      className={`px-2.5 py-1 rounded-md text-sm font-medium ${
                        requiredGrade > 100
                          ? "bg-[#dc2626]/15 text-[#dc2626]"
                          : requiredGrade > 75
                            ? "bg-[#d97706]/15 text-[#d97706]"
                            : "bg-[#16a34a]/15 text-[#16a34a]"
                      }`}
                    >
                      {requiredGrade > 100
                        ? "Not achievable"
                        : `Need ${requiredGrade.toFixed(1)}%`}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}

          {/* Totals row */}
          <TableRow className="bg-muted/30 font-semibold">
            <TableCell>Total</TableCell>
            <TableCell>{(gradedWeight * 100).toFixed(0)}%</TableCell>
            <TableCell className="text-muted-foreground">—</TableCell>
            <TableCell>{currentGrade.toFixed(1)}%</TableCell>
            <TableCell colSpan={2} className="text-muted-foreground">
              Projected final if target met: {targetGrade}%
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Assessment
        </Button>
      </div>
    </Card>
  );
}
