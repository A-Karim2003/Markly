"use client";

import { useState } from "react";
import { Check, Clock, Plus, Pencil } from "lucide-react";
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
import { AssessmentDeleteDialog } from "./assessment-delete-dialog";
import { AssessmentModal } from "./assessment-modal";
import { deleteAssessment } from "@/lib/actions/assessment-actions";
import { toast } from "react-toastify";
import { GradeSummary } from "./grade-summary";

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
  remainingWeight: number;
  moduleId: number;
};

export function AssessmentsTable({
  rows,
  requiredGrade,
  targetGrade,
  gradedWeight,
  currentGrade,
  remainingWeight,
  moduleId,
}: AssessmentsTableProps) {
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });

  async function handleDelete(row: AssessmentRow) {
    const result = await deleteAssessment(row.id);
    if (result.success) {
      toast.success(`"${row.name}" deleted`);
    } else {
      toast.error(result.error);
    }
  }

  return (
    <>
      <Card className="overflow-hidden mb-6">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-medium text-foreground">Assessments</h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="uppercase text-[12px] tracking-wide text-muted-foreground">
                Assessment Name
              </TableHead>
              <TableHead className="uppercase text-[12px] tracking-wide text-muted-foreground">
                Weight
              </TableHead>
              <TableHead className="uppercase text-[12px] tracking-wide text-muted-foreground">
                Grade
              </TableHead>
              <TableHead className="uppercase text-[12px] tracking-wide text-muted-foreground">
                Weighted Contribution
              </TableHead>
              <TableHead className="uppercase text-[12px] tracking-wide text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="uppercase text-[12px] tracking-wide text-muted-foreground">
                Required to Hit Target
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const isGraded = row.grade !== null;

              const weightedContribution = isGraded
                ? row.grade! * row.weight
                : null;

              return (
                <TableRow key={row.id}>
                  <TableCell
                    className={
                      isGraded
                        ? "font-medium text-foreground"
                        : "font-medium text-muted-foreground"
                    }
                  >
                    {row.name}
                  </TableCell>
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
                      <span className="inline-flex items-center gap-1 rounded-full bg-grade-first-bg px-2 py-0.5 text-xs font-medium text-grade-first">
                        <Check className="h-4 w-4" />
                        Graded
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-status-pending-bg px-2 py-0.5 text-xs font-medium text-status-pending">
                        <Clock className="h-4 w-4" />
                        Pending
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {!isGraded && requiredGrade !== null ? (
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          requiredGrade > 100
                            ? "bg-[#dc2626]/15 text-[#dc2626]"
                            : requiredGrade > 75
                              ? "bg-status-pending-bg text-status-pending"
                              : "bg-grade-first-bg text-grade-first"
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
                      {/* edit button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-status-pending hover:text-foreground"
                        onClick={() => setModal({ mode: "edit", row })}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {/* delete button */}
                      <AssessmentDeleteDialog
                        assessmentName={row.name}
                        isCustom={row.isCustom}
                        onConfirm={() => handleDelete(row)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}

            {/* Totals row */}
            <TableRow className="bg-muted/40 font-semibold">
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
            variant="ghost"
            className="border border-dashed border-muted-foreground/40 text-muted-foreground hover:text-foreground"
            onClick={() => setModal({ mode: "add" })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Assessment
          </Button>
        </div>

        <div className="border-t border-border bg-muted/20 px-4 py-4">
          <GradeSummary
            currentGrade={currentGrade}
            gradedWeight={gradedWeight}
            remainingWeight={remainingWeight}
            requiredGrade={requiredGrade}
            targetGrade={targetGrade}
          />
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
