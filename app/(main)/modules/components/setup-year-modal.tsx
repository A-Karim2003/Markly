"use client";

import { useState, useTransition } from "react";
import { Check, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/app/_components/progress-bar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { enrolStudentModules } from "@/lib/actions/student-actions";
import type { Module } from "@/lib/data/modules";

type SetupYearModalProps = {
  open: boolean;
  onClose: () => void;
  year: number;
  studentId: number;
  modules: Module[];
};

export function SetupYearModal({
  open,
  onClose,
  year,
  studentId,
  modules,
}: SetupYearModalProps) {
  const router = useRouter();
  const [selectedOptionalIds, setSelectedOptionalIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const coreModules = modules.filter((module) => !module.is_optional);
  const optionalModules = modules.filter((module) => module.is_optional);

  const toggleOptional = (id: number) => {
    setSelectedOptionalIds((prev) =>
      prev.includes(id)
        ? prev.filter((moduleId) => moduleId !== id)
        : [...prev, id],
    );
  };

  const totalCredits =
    coreModules.reduce((sum, module) => sum + module.credits, 0) +
    optionalModules
      .filter((module) => selectedOptionalIds.includes(module.id))
      .reduce((sum, module) => sum + module.credits, 0);

  const totalModules = coreModules.length + selectedOptionalIds.length;
  const isMaxed = totalCredits >= 120;

  function handleConfirm() {
    setError(null);

    startTransition(async () => {
      try {
        const moduleIds = [
          ...coreModules.map((module) => module.id),
          ...selectedOptionalIds,
        ];

        await enrolStudentModules(studentId, moduleIds);

        toast.success(`Year ${year} modules added`);
        handleClose();
        router.refresh();
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
        else console.error("Unknown error", error);
        setError("Failed to set up your modules. Please try again.");
      }
    });
  }

  const handleClose = () => {
    setSelectedOptionalIds([]);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && handleClose()}>
      <DialogContent className="no-scrollbar max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Set up Year {year}</DialogTitle>
          <DialogDescription>
            Select the modules you&apos;re taking this year so we can start
            tracking your grades.
          </DialogDescription>
        </DialogHeader>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="space-y-2 rounded-xl border bg-muted/30 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-foreground">Credit target</p>
            <p className="text-sm text-muted-foreground">
              {totalCredits}/120 credits
            </p>
          </div>

          <ProgressBar value={totalCredits} max={120} color="var(--primary)" />

          <p className="text-xs text-muted-foreground">
            Core modules are included automatically, and optional modules help
            you reach the 120-credit target.
          </p>
        </div>

        <div className="space-y-8 py-2">
          <div>
            <h3 className="mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Core Modules
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {coreModules.map((module) => (
                <Card
                  key={module.id}
                  className="relative h-full border-primary/20 bg-primary/5"
                >
                  <CardContent className="p-4">
                    <div className="absolute top-3 right-3">
                      <Lock className="size-4 text-primary/60" />
                    </div>
                    <Badge className="mb-2 border-none bg-primary/15 px-2 py-0.5 text-[10px] font-sans tracking-wider text-primary hover:bg-primary/15">
                      Required
                    </Badge>
                    <h4 className="text-sm font-semibold text-foreground">
                      {module.name}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground font-sans">
                      {module.code} · {module.credits} credits
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Optional Modules
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {optionalModules.map((module) => {
                const isSelected = selectedOptionalIds.includes(module.id);
                const isDisabled = isMaxed && !isSelected;

                return (
                  <Card
                    key={module.id}
                    className={cn(
                      "overflow-hidden border transition-all duration-200",
                      isDisabled
                        ? "cursor-not-allowed border-border/60 opacity-40"
                        : "cursor-pointer hover:border-primary/40 hover:bg-muted/40",
                      isSelected && !isDisabled
                        ? "border-primary bg-primary/5 ring-2 ring-primary/10"
                        : "border-border",
                    )}
                    onClick={() => !isDisabled && toggleOptional(module.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">
                            {module.code}
                          </p>
                          <p className="truncate font-semibold text-foreground">
                            {module.name}
                          </p>
                        </div>

                        <Badge variant="secondary" className="shrink-0">
                          {module.credits} credits
                        </Badge>
                      </div>

                      {isSelected && (
                        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                          <Check className="size-3.5" />
                          Selected
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          {totalModules} modules selected · {totalCredits} credits
        </p>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Saving..." : "Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
