"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProgressBar } from "@/app/_components/progress-bar";
import { getGradeClass, getGradeColor } from "../lib/utils/module-grades";
import {
  StudentModules,
  StudentModuleWithGrades,
} from "@/lib/data/student-modules";
import { SwapModuleModal } from "./swap-module-modal";
import { Module } from "@/lib/data/modules";
import { getSwapCandidates } from "../lib/utils/modules";
import { swapModule } from "@/lib/actions/student-actions";
import { toast } from "react-toastify";

type ModuleCardProps = {
  module: StudentModuleWithGrades;
  currYearModules: Module[];
  studentModules: StudentModules;
  colorIndex?: number;
};

function moduleColorIndex(colorIndex: number) {
  return (colorIndex % 6) + 1;
}

export function ModuleCard({
  module,
  currYearModules,
  studentModules,
  colorIndex = 0,
}: ModuleCardProps) {
  const [isSwapOpen, setIsSwapOpen] = useState(false);
  const [isSwapping, startSwapTransition] = useTransition();
  const { module_info, assessments } = module;

  const n = moduleColorIndex(colorIndex);
  const moduleVar = `var(--module-${n})`;
  const softBg = `color-mix(in oklch, ${moduleVar} 14%, transparent)`;

  const swapCandidates = getSwapCandidates(currYearModules, studentModules);

  const totalAvailableAssessments =
    module_info?.module_assessments_scheme?.length ?? 0;

  const totalGradedAssessments = assessments.filter(
    (a) => a.grade !== null,
  ).length;

  const weightedAverage =
    totalGradedAssessments > 0
      ? assessments
          .filter((a) => a.grade !== null)
          .reduce((sum, a) => sum + a.grade! * a.weight, 0)
      : 0;

  const hasGrades = totalGradedAssessments > 0;
  const isComplete =
    totalGradedAssessments === totalAvailableAssessments &&
    totalAvailableAssessments > 0;

  function handleSwap(selectedModuleId: number) {
    startSwapTransition(async () => {
      const result = await swapModule(module.id, selectedModuleId);
      if (!result.success) {
        toast.error(result.error ?? "Failed to swap module");
        return;
      }
      toast.success("Module swapped successfully");
    });
  }

  return (
    <>
      <Card
        className="group relative cursor-pointer overflow-hidden rounded-2xl border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        style={{ "--module-accent": moduleVar } as React.CSSProperties}
      >
        {/* Accent strip down the left edge */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1"
          style={{ backgroundColor: moduleVar }}
        />

        <Link
          href={`/modules/${module.id}`}
          aria-label={`Open ${module_info?.name ?? "module"}`}
          className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--module-accent)/50"
        >
          <span className="sr-only">Open {module_info?.name ?? "module"}</span>
        </Link>

        <CardHeader className="relative flex flex-row items-start justify-between pb-2 pl-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {module_info?.code}
            </p>

            <h4 className="mt-0.5 text-base font-semibold leading-snug text-foreground text-balance transition-colors group-hover:text-(--module-accent)">
              {module_info?.name}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="border-transparent font-semibold"
              style={{ color: moduleVar, backgroundColor: softBg }}
            >
              {module_info?.credits} credits
            </Badge>
            {module_info?.is_optional && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="relative z-20 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
                aria-label={`Swap ${module_info?.name ?? "module"}`}
                onClick={() => setIsSwapOpen(true)}
              >
                <ArrowLeftRight className="size-3.5" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="relative space-y-4 pl-5">
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
              <span>Assessments graded</span>
              <span className="font-medium">
                {totalGradedAssessments}/{totalAvailableAssessments}
              </span>
            </div>

            <ProgressBar
              className="rounded-full"
              value={totalGradedAssessments}
              max={totalAvailableAssessments}
              color={moduleVar}
            />
          </div>

          <div className="flex items-end justify-between">
            <div>
              {hasGrades ? (
                <>
                  <p
                    className="text-2xl font-bold tracking-tight"
                    style={{
                      color: isComplete
                        ? getGradeColor(weightedAverage)
                        : undefined,
                    }}
                  >
                    {weightedAverage.toFixed(1)}%
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {isComplete
                      ? `${getGradeClass(weightedAverage)} · final grade`
                      : "weighted so far"}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-muted-foreground">—</p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    No grades yet
                  </p>
                </>
              )}
            </div>

            {isComplete ? (
              <Badge className="bg-[#16a34a]/15 text-[#16a34a] hover:bg-[#16a34a]/20">
                Complete
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-transparent font-medium"
                style={{ color: moduleVar, backgroundColor: softBg }}
              >
                {totalAvailableAssessments - totalGradedAssessments} remaining
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <SwapModuleModal
        open={isSwapOpen}
        onClose={() => setIsSwapOpen(false)}
        currentModule={{
          id: module.id,
          name: module_info?.name ?? "",
          credits: module_info?.credits ?? 0,
        }}
        availableModules={swapCandidates}
        onSwap={handleSwap}
        isSwapping={isSwapping}
      />
    </>
  );
}
