"use client";

import { useState } from "react";
import Step1 from "./step-1";
import Step2 from "./Step2";
import type { Module } from "@/lib/data/modules";
import type { StudentProfile } from "@/lib/data/student-profiles";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/actions/auth-actions";

type OnboardingStepsProp = {
  modules: Module[];
  student: StudentProfile;
};

export default function OnboardingSteps({
  modules,
  student,
}: OnboardingStepsProp) {
  const [currentStep, setCurrentStep] = useState(
    student.onboarding_step === 2 ? 2 : 1,
  );

  return (
    <div className="relative">
      <div className="absolute right-6 top-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          title="Sign out"
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      {currentStep === 2 ? (
        <Step2
          setCurrentStep={setCurrentStep}
          modules={modules}
          student={student}
        />
      ) : (
        <Step1 setCurrentStep={setCurrentStep} student={student} />
      )}
    </div>
  );
}
