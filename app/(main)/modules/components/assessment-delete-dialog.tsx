"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AssessmentDisclaimer from "./assessment-disclaimer";

type AssessmentDeleteDialogProps = {
  assessmentName: string;
  onConfirm: () => Promise<void>;
  isCustom: boolean;
};

export function AssessmentDeleteDialog({
  assessmentName,
  onConfirm,
  isCustom,
}: AssessmentDeleteDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete assessment?</AlertDialogTitle>
          {!isCustom && (
            <AssessmentDisclaimer>
              <span className="font-medium">Heads up</span> — this assessment is
              part of your module&apos;s scheme. Deleting it will remove your
              grade for it and may affect your overall calculations and
              projections.
            </AssessmentDisclaimer>
          )}
          <AlertDialogDescription>
            This will permanently remove <strong>{assessmentName}</strong>. You
            won&apos;t be able to undo this action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="text-white cursor-pointer font-bold"
            onClick={onConfirm}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
