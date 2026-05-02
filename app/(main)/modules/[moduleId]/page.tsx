"use client";

import Link from "next/link";
import { ChevronRight, Check, Clock, Plus } from "lucide-react";
import { use } from "react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

const moduleData = {
  id: "1",
  code: "CE203-5-AU",
  name: "Application Programming",
  credits: 15,
  currentAverage: 79.5,
  targetGrade: 70,
  assessments: [
    {
      id: "1",
      name: "Coursework 1",
      weight: 20,
      grade: 72,
      status: "graded" as const,
    },
    {
      id: "2",
      name: "Quiz",
      weight: 20,
      grade: 87.5,
      status: "graded" as const,
    },
    {
      id: "3",
      name: "Final Exam",
      weight: 60,
      grade: null,
      status: "pending" as const,
    },
  ],
};

function getGradeColor(grade: number): string {
  if (grade >= 70) return "#16a34a";
  if (grade >= 60) return "#2563eb";
  if (grade >= 50) return "#d97706";
  return "#dc2626";
}

function calcRequired(
  assessments: typeof moduleData.assessments,
  targetGrade: number,
): number | null {
  const earnedWeight = assessments.reduce(
    (sum, a) => sum + (a.grade !== null ? a.weight : 0),
    0,
  );
  const earnedPoints = assessments.reduce(
    (sum, a) => sum + (a.grade !== null ? (a.grade * a.weight) / 100 : 0),
    0,
  );
  const pendingWeight = 100 - earnedWeight;
  if (pendingWeight <= 0) return null;
  return (targetGrade - earnedPoints) / (pendingWeight / 100);
}

export default function ModuleDetailPage({ params }: PageProps) {
  const { id } = use(params);

  const isOnTrack = moduleData.currentAverage >= moduleData.targetGrade;
  const required = calcRequired(moduleData.assessments, moduleData.targetGrade);

  const earnedPoints = moduleData.assessments.reduce(
    (sum, a) => sum + (a.grade !== null ? (a.grade * a.weight) / 100 : 0),
    0,
  );
  const earnedWeight = moduleData.assessments.reduce(
    (sum, a) => sum + (a.grade !== null ? a.weight : 0),
    0,
  );

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link
          href="/dashboard"
          className="hover:text-foreground transition-colors"
        >
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href="/modules"
          className="hover:text-foreground transition-colors"
        >
          Modules
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{moduleData.name}</span>
      </nav>

      {/* Header Card */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {moduleData.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              {moduleData.code} · {moduleData.credits} credits
            </p>
          </div>
        </div>

        <div className="flex items-center gap-12 mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Current Average
            </p>
            <p
              className="text-4xl font-bold"
              style={{ color: getGradeColor(moduleData.currentAverage) }}
            >
              {moduleData.currentAverage.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Target</p>
            <p className="text-4xl font-bold text-foreground">
              {moduleData.targetGrade}%
            </p>
          </div>
        </div>

        <div
          className={`px-4 py-3 rounded-xl text-sm font-medium ${
            isOnTrack
              ? "bg-[#16a34a]/10 text-[#16a34a] border border-[#16a34a]/20"
              : "bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20"
          }`}
        >
          {isOnTrack
            ? "You are on track for a First in this module"
            : `You need ${required !== null ? required.toFixed(1) : "—"}% in remaining assessments to achieve your target`}
        </div>
      </div>

      {/* Assessments Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden mb-6">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Assessments</h2>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">
                Assessment Name
              </th>
              <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">
                Weight
              </th>
              <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">
                Grade
              </th>
              <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">
                Weighted Contribution
              </th>
              <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">
                Status
              </th>
              <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">
                Required to Hit Target
              </th>
            </tr>
          </thead>
          <tbody>
            {moduleData.assessments.map((assessment) => {
              const weighted =
                assessment.grade !== null
                  ? (assessment.grade * assessment.weight) / 100
                  : null;

              return (
                <tr
                  key={assessment.id}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="px-4 py-4 text-sm font-medium text-foreground">
                    {assessment.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    {assessment.weight}%
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {assessment.grade !== null ? (
                      <span
                        style={{ color: getGradeColor(assessment.grade) }}
                        className="font-semibold"
                      >
                        {assessment.grade}%
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    {weighted !== null ? `${weighted.toFixed(1)}%` : "—"}
                  </td>
                  <td className="px-4 py-4">
                    {assessment.status === "graded" ? (
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
                  </td>
                  <td className="px-4 py-4">
                    {assessment.status === "pending" && required !== null ? (
                      <span
                        className={`px-2.5 py-1 rounded-md text-sm font-medium ${
                          required > 100
                            ? "bg-[#dc2626]/15 text-[#dc2626]"
                            : required > 75
                              ? "bg-[#d97706]/15 text-[#d97706]"
                              : "bg-[#16a34a]/15 text-[#16a34a]"
                        }`}
                      >
                        {required > 100
                          ? "Not achievable"
                          : `Need ${required.toFixed(1)}%`}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              );
            })}

            {/* Totals row */}
            <tr className="bg-muted/30">
              <td className="px-4 py-4 text-sm font-semibold text-foreground">
                Total
              </td>
              <td className="px-4 py-4 text-sm font-semibold text-foreground">
                {earnedWeight}%
              </td>
              <td className="px-4 py-4 text-sm text-muted-foreground">—</td>
              <td className="px-4 py-4 text-sm font-semibold text-foreground">
                {earnedPoints.toFixed(1)}%
              </td>
              <td
                className="px-4 py-4 text-sm text-muted-foreground"
                colSpan={2}
              >
                Projected final if target met: {moduleData.targetGrade}%
              </td>
            </tr>
          </tbody>
        </table>

        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Assessment
          </Button>
        </div>
      </div>

      {/* Explanation Card */}
      <div className="bg-card rounded-xl border border-border p-4">
        <p className="text-sm text-muted-foreground">
          Based on your grades so far ({earnedPoints.toFixed(1)}% from{" "}
          {earnedWeight}% of assessments), you need{" "}
          <span className="text-foreground font-medium">
            {required !== null ? `${required.toFixed(1)}%` : "—"}
          </span>{" "}
          in the remaining assessments (worth {100 - earnedWeight}%) to achieve{" "}
          {moduleData.targetGrade}% overall in this module.
        </p>
      </div>
    </div>
  );
}
