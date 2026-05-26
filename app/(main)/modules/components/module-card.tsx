"use client";

import Link from "next/link";
import { useState } from "react";
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

type ModuleCardProps = {
  module: StudentModuleWithGrades;
  currYearModules: Module[];
  studentModules: StudentModules;
};

export function ModuleCard({
  module,
  currYearModules,
  studentModules,
}: ModuleCardProps) {
  const [isSwapOpen, setIsSwapOpen] = useState(false);
  const { module_info, assessments } = module;

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

  return (
    <>
      <Card className="group relative cursor-pointer overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]">
        <Link
          href={`/modules/${module.id}`}
          aria-label={`Open ${module_info?.name ?? "module"}`}
          className="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <span className="sr-only">Open {module_info?.name ?? "module"}</span>
        </Link>

        <CardHeader className="relative flex flex-row items-start justify-between pb-2">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              {module_info?.code}
            </p>

            <h4 className="mt-0.5 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
              {module_info?.name}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">{module_info?.credits} credits</Badge>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="relative z-20 text-muted-foreground hover:text-foreground"
              aria-label={`Swap ${module_info?.name ?? "module"}`}
              onClick={() => setIsSwapOpen(true)}
            >
              <ArrowLeftRight className="size-3.5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-4">
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
              <span>Assessments graded</span>
              <span>
                {totalGradedAssessments}/{totalAvailableAssessments}
              </span>
            </div>

            <ProgressBar
              className="border rounded-md"
              value={totalGradedAssessments}
              max={totalAvailableAssessments}
              color="var(--primary)"
            />
          </div>

          <div className="flex items-end justify-between">
            <div>
              {hasGrades ? (
                <>
                  <p
                    className="text-2xl font-bold"
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
              <Badge variant="outline">
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
      />
    </>
  );
}
