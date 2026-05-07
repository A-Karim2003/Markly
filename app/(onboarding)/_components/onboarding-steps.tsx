"use client";

import { useState } from "react";
import Step1 from "./step-1";
import Step2 from "./Step2";
import type { Module } from "@/lib/data/modules";
import { Tables } from "@/types/supabase";

type StudentProfile = Tables<"student_profiles">;

type OnboardingStepsProp = {
  modules: Module[];
  student: StudentProfile;
};

export default function OnboardingSteps({
  modules,
  student,
}: OnboardingStepsProp) {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div>
      {currentStep === 1 && <Step1 setCurrentStep={setCurrentStep} />}
      {currentStep === 2 && (
        <Step2 setCurrentStep={setCurrentStep} modules={modules} />
      )}
    </div>
  );
}
