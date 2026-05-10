"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProgressBar } from "@/app/_components/progress-bar";
import { getGradeClass, getGradeColor } from "../lib/utils/module-grades";

export function ModuleCard({ module }: { module: Module }) {
  const hasGrades = module.graded > 0;
  const isComplete = module.graded === module.total && module.total > 0;

  return (
    <Link href={`/modules/${module.id}`}>
      <Card className="hover:border-primary/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-all duration-300 cursor-pointer group">
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              {module.code}
            </p>

            <h4 className="text-base font-semibold text-foreground mt-0.5 group-hover:text-primary transition-colors">
              {module.name}
            </h4>
          </div>

          <Badge variant="secondary">{module.credits} credits</Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>Assessments graded</span>
              <span>
                {module.graded}/{module.total}
              </span>
            </div>

            <ProgressBar
              value={module.graded}
              max={module.total}
              color="var(--primary)"
            />
          </div>

          <div className="flex items-end justify-between">
            <div>
              {hasGrades ? (
                <>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: getGradeColor(module.average) }}
                  >
                    {module.average.toFixed(1)}%
                  </p>

                  <p className="text-xs text-muted-foreground mt-0.5">
                    {getGradeClass(module.average)} · weighted average
                  </p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-muted-foreground">—</p>

                  <p className="text-xs text-muted-foreground mt-0.5">
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
                {module.total - module.graded} remaining
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
