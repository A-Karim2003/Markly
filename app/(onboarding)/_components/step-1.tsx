"use client";

import { useState } from "react";
import { Sprout, Layers, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StudentProfile } from "@/lib/data/student-profiles";
import {
  updateStudentOnboardingStep,
  updateStudentYear,
} from "@/lib/actions/student-actions";
import OnboardingHeader from "./Onboarding-header";

const years = [
  {
    id: 1,
    title: "Year 1",
    description: "Foundations (does not count toward final grade)",
    icon: Sprout,
  },
  {
    id: 2,
    title: "Year 2",
    description: "Core Theory (40% of final degree)",
    icon: Layers,
  },
  {
    id: 3,
    title: "Year 3",
    description: "Specialisation (60% of final degree)",
    icon: Trophy,
  },
];

type Step1Props = {
  setCurrentStep: (step: number) => void;
  student: StudentProfile;
};

export default function Step1({ setCurrentStep, student }: Step1Props) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  async function handleYearSelect(studentId: number, year: 1 | 2 | 3) {
    if (!selectedYear) return;

    setSelectedYear(year);

    await Promise.all([
      updateStudentYear(studentId, year),
      updateStudentOnboardingStep(studentId, 2),
    ]);
    setCurrentStep(2);
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 font-serif">
      <OnboardingHeader>Step 1 of 2</OnboardingHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-10">
        {years.map((year) => {
          const Icon = year.icon;
          const isSelected = selectedYear === year.id;

          return (
            <Card
              key={year.id}
              onClick={() => setSelectedYear(year.id)}
              className={`cursor-pointer transition-all border-border bg-card hover:border-primary/50 ${
                isSelected ? "ring-2 ring-primary border-transparent" : ""
              }`}
            >
              <CardContent className="p-8 flex flex-col items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {year.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed italic">
                    {year.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button
        className="w-full max-w-4xl bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg font-medium rounded-xl transition-colors cursor-pointer"
        disabled={!selectedYear}
        onClick={() => handleYearSelect(student.id, selectedYear as 1 | 2 | 3)}
      >
        Continue
      </Button>
    </div>
  );
}
