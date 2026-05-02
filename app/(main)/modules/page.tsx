"use client";

import { ProgressBar } from "@/app/_components/progress-bar";
import Link from "next/link";

// Static module data
const modules = [
  {
    id: "1",
    code: "CE203",
    name: "Application Programming",
    credits: 15,
    average: 79.5,
    graded: 2,
    total: 3,
  },
  {
    id: "2",
    code: "CE204",
    name: "Data Structures and Algorithms",
    credits: 15,
    average: 71.0,
    graded: 2,
    total: 3,
  },
  {
    id: "3",
    code: "CE205",
    name: "Software Engineering",
    credits: 15,
    average: 74.5,
    graded: 2,
    total: 3,
  },
  {
    id: "4",
    code: "CE206",
    name: "Computer Networks",
    credits: 15,
    average: 63.5,
    graded: 2,
    total: 3,
  },
  {
    id: "5",
    code: "CE207",
    name: "Database Systems",
    credits: 15,
    average: 81.0,
    graded: 1,
    total: 2,
  },
  {
    id: "6",
    code: "CE208",
    name: "Operating Systems",
    credits: 15,
    average: 58.0,
    graded: 1,
    total: 2,
  },
  {
    id: "7",
    code: "CE209",
    name: "Artificial Intelligence",
    credits: 15,
    average: 85.0,
    graded: 1,
    total: 2,
  },
  {
    id: "8",
    code: "CE210",
    name: "Web Development",
    credits: 15,
    average: 90.4,
    graded: 2,
    total: 2,
  },
];

function getGradeColor(grade: number): string {
  if (grade >= 70) return "#16a34a";
  if (grade >= 60) return "#2563eb";
  if (grade >= 50) return "#d97706";
  return "#dc2626";
}

export default function ModulesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Modules</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your modules
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {modules.map((module) => (
          <Link key={module.id} href={`/modules/${module.id}`}>
            <div className="bg-card rounded-xl border border-border p-5 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-all duration-300 cursor-pointer group">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    {module.code}
                  </p>
                  <h4 className="text-base font-semibold text-foreground mt-0.5 group-hover:text-primary transition-colors">
                    {module.name}
                  </h4>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary">
                  {module.credits} credits
                </span>
              </div>

              {/* Progress */}
              <div className="mb-3">
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

              {/* Grade */}
              <div className="flex items-end justify-between">
                <div>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: getGradeColor(module.average) }}
                  >
                    {module.average.toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Current weighted average
                  </p>
                </div>

                {module.graded < module.total && (
                  <div className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#16a34a]/15 text-[#16a34a]">
                    Need 70% to hit target
                  </div>
                )}

                {module.graded === module.total && (
                  <div className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#16a34a]/15 text-[#16a34a]">
                    Complete
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
