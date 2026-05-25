"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModalState } from "./assessments-table";
import { z } from "zod";
import AssessmentDisclaimer from "./assessment-disclaimer";
import {
  addCustomAssessment,
  updateAssessment,
} from "@/lib/actions/assessment-actions";
import { toast } from "react-toastify";

type AssessmentModalProps = {
  modal: ModalState;
  studentModuleId: number;
  onClose: () => void;
};

const customAssessmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  weight: z.coerce.number().min(1, "Minimum 1%").max(100, "Maximum 100%"),
  grade: z.coerce
    .number()
    .min(0, "Minimum 0")
    .max(100, "Maximum 100")
    .nullable(),
});

const gradeOnlySchema = z.object({
  grade: z.coerce
    .number()
    .min(0, "Minimum 0")
    .max(100, "Maximum 100")
    .nullable(),
});

export type Assessment = z.infer<typeof customAssessmentSchema>;
type FieldErrors = Partial<Record<"name" | "weight" | "grade", string[]>>;

export function AssessmentModal({
  modal,
  onClose,
  studentModuleId,
}: AssessmentModalProps) {
  const [errors, setErrors] = useState<FieldErrors>({});

  const isAdd = modal.mode === "add";
  const isEdit = modal.mode === "edit";

  const defaultName = isEdit ? modal.row.name : "";
  const defaultWeight = isEdit ? (modal.row.weight * 100).toFixed(0) : "";
  const defaultGrade =
    isEdit && modal.row.grade !== null ? String(modal.row.grade) : "";

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);

    if (modal.mode === "add") {
      const result = customAssessmentSchema.safeParse({
        name: formData.get("name"),
        weight: formData.get("weight"),
        grade: formData.get("grade") || null,
      });

      if (!result.success) {
        const formatted = z.flattenError(result.error);
        setErrors(formatted.fieldErrors);
        return;
      }

      const res = await addCustomAssessment(studentModuleId, result.data);
      if (res.success) {
        toast.success(`"${result.data.name}" added`);
      } else {
        toast.error(res.error);
        return;
      }
    } else if (modal.mode === "edit") {
      if (modal.row.isCustom) {
        const result = customAssessmentSchema.safeParse({
          name: formData.get("name"),
          weight: formData.get("weight"),
          grade: formData.get("grade") || null,
        });

        if (!result.success) {
          const formatted = z.flattenError(result.error);
          setErrors(formatted.fieldErrors);
          return;
        }

        const res = await updateAssessment(modal.row.id, {
          name: result.data.name,
          weight: result.data.weight,
          grade: result.data.grade,
        });
        if (res.success) {
          toast.success(`"${modal.row.name}" updated`);
        } else {
          toast.error(res.error);
          return;
        }
      } else {
        const result = gradeOnlySchema.safeParse({
          grade: formData.get("grade") || null,
        });

        if (!result.success) {
          const formatted = z.flattenError(result.error);
          setErrors(formatted.fieldErrors);
          return;
        }

        const res = await updateAssessment(modal.row.id, {
          grade: result.data.grade,
        });
        if (res.success) {
          toast.success(`"${modal.row.name}" updated`);
        } else {
          toast.error(res.error);
          return;
        }
      }
    }

    onClose();
  }

  const handleClose = () => {
    setErrors({});
    onClose();
  };
  return (
    <Dialog
      open={modal.mode !== "closed"}
      onOpenChange={(open: boolean) => !open && handleClose()}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isAdd ? "Add Assessment" : "Edit Assessment"}
          </DialogTitle>
        </DialogHeader>

        {isAdd && (
          <AssessmentDisclaimer>
            <span className="font-medium">Heads up</span> — make sure your
            assessment weights add up to 100% across all assessments. If they
            don&apos;t, your grade calculations and projections may be
            inaccurate.
          </AssessmentDisclaimer>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Assessment Name</Label>
            <Input
              disabled={isEdit && !modal.row.isCustom}
              id="name"
              name="name"
              placeholder="e.g. Coursework 1"
              defaultValue={defaultName}
            />
            {errors.name && (
              <p className="text-destructive text-xs">{errors.name[0]}</p>
            )}
          </div>

          {/* Weight */}
          <div className="space-y-1.5">
            <Label htmlFor="weight">Weight (%)</Label>
            <Input
              disabled={isEdit && !modal.row.isCustom}
              id="weight"
              name="weight"
              type="number"
              placeholder="e.g. 30"
              min={1}
              max={100}
              defaultValue={defaultWeight}
            />
            {errors.weight && (
              <p className="text-destructive text-xs">{errors.weight[0]}</p>
            )}
          </div>

          {/* Grade */}
          <div className="space-y-1.5">
            <Label htmlFor="grade">
              Grade (%){" "}
              <span className="text-muted-foreground font-normal text-xs">
                optional
              </span>
            </Label>
            <Input
              id="grade"
              name="grade"
              type="number"
              placeholder="e.g. 72"
              min={0}
              max={100}
              defaultValue={defaultGrade}
            />
            {errors.grade && (
              <p className="text-destructive text-xs">{errors.grade[0]}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">{isAdd ? "Add" : "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
