"use client";

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
import { AssessmentRow } from "./assessments-table";

type ModalState =
  | { mode: "closed" }
  | { mode: "add" }
  | { mode: "edit"; row: AssessmentRow };

type AssessmentModalProps = {
  modal: ModalState;
  onClose: () => void;
};

export function AssessmentModal({ modal, onClose }: AssessmentModalProps) {
  const isAdd = modal.mode === "add";
  const isEdit = modal.mode === "edit";

  const defaultName = isEdit ? modal.row.name : "";
  const defaultWeight = isEdit ? (modal.row.weight * 100).toFixed(0) : "";
  const defaultGrade =
    isEdit && modal.row.grade !== null ? String(modal.row.grade) : "";

  return (
    <Dialog
      open={modal.mode !== "closed"}
      onOpenChange={(open: boolean) => !open && onClose()}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isAdd ? "Add Assessment" : "Edit Assessment"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Assessment Name</Label>
            <Input
              id="name"
              placeholder="e.g. Coursework 1"
              defaultValue={defaultName}
            />
          </div>

          {/* Weight */}
          <div className="space-y-1.5">
            <Label htmlFor="weight">Weight (%)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="e.g. 30"
              min={1}
              max={100}
              defaultValue={defaultWeight}
            />
          </div>

          {/* Grade */}
          <div className="space-y-1.5">
            <Label htmlFor="grade">
              Grade (%){"  "}
              <span className="text-muted-foreground font-normal text-xs">
                optional
              </span>
            </Label>
            <Input
              id="grade"
              type="number"
              placeholder="e.g. 72"
              min={0}
              max={100}
              defaultValue={defaultGrade}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>{isAdd ? "Add" : "Save Changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
