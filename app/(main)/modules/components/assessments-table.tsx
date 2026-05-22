"use client";

import { useState } from "react";
import { Check, Clock, Plus, Pencil, Trash2 } from "lucide-react";
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
import { AssessmentModal } from "./assessment-modal";

export type AssessmentRow = {
  id: number;
  name: string;
  type: string | null;
  weight: number;
  grade: number | null;
  isCustom: boolean;
};

export type ModalState =
  | { mode: "closed" }
  | { mode: "add" }
  | { mode: "edit"; row: AssessmentRow };

type AssessmentsTableProps = {
  rows: AssessmentRow[];
  requiredGrade: number | null;
  targetGrade: number;
  gradedWeight: number;
  currentGrade: number;
  moduleId: number;
};

export function AssessmentsTable({
  rows,
  requiredGrade,
  targetGrade,
  gradedWeight,
  currentGrade,
  moduleId,
}: AssessmentsTableProps) {
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });

  return (
    <>
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
              <TableHead />
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
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => setModal({ mode: "edit", row })}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
              <TableCell colSpan={3}>
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <span>Projected final if target met:</span>
                  <span className="font-semibold text-foreground">
                    {targetGrade}%
                  </span>
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => setModal({ mode: "add" })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Assessment
          </Button>
        </div>
      </Card>

      <AssessmentModal
        studentModuleId={moduleId}
        modal={modal}
        onClose={() => setModal({ mode: "closed" })}
      />
    </>
  );
}
