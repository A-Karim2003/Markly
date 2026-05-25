"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SwapModuleModalProps = {
  open: boolean;
  onClose: () => void;
  currentModule: { id: number; name: string; credits: number };
  availableModules: {
    id: number;
    code: string;
    name: string;
    credits: number;
  }[];
};

export function SwapModuleModal({
  open,
  onClose,
  currentModule,
  availableModules,
}: SwapModuleModalProps) {
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  const selectedModule = useMemo(
    () =>
      availableModules.find((module) => module.id === selectedModuleId) ?? null,
    [availableModules, selectedModuleId],
  );

  const handleClose = () => {
    setSelectedModuleId(null);
    onClose();
  };

  const handleConfirm = () => {
    if (selectedModuleId === null) return;

    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && handleClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Swap Module</DialogTitle>
          <DialogDescription>
            Select a module to replace{" "}
            <span className="font-medium text-foreground">
              {currentModule.name}
            </span>
          </DialogDescription>
        </DialogHeader>

        {availableModules.length > 0 ? (
          <div
            className="max-h-[58vh] space-y-3 overflow-y-auto pr-1"
            aria-label="Available modules"
          >
            {availableModules.map((module) => {
              const isSelected = module.id === selectedModuleId;

              return (
                <Card
                  key={module.id}
                  className={cn(
                    "overflow-hidden border transition-all duration-200",
                    isSelected
                      ? "border-primary/40 bg-primary/5 ring-2 ring-primary/10"
                      : "hover:border-primary/25 hover:bg-muted/40",
                  )}
                >
                  <div
                    className="flex w-full items-start justify-between gap-4 px-4 py-3 text-left"
                    onClick={() => setSelectedModuleId(module.id)}
                  >
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
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed bg-muted/30 px-6 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              No other modules available for your year.
            </p>
          </div>
        )}

        <p className="text-orange-400 text-md text-center">
          Swapping modules will delete all grades entered for this module. This
          cannot be undone.
        </p>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedModule}
          >
            Confirm Swap
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
