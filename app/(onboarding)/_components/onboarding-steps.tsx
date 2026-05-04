"use client";

import { useState } from "react";
import Step1 from "./step-1";
import Step2 from "./Step2";
import type { Module } from "@/lib/data/modules";

export default function OnboardingSteps({ modules }: { modules: Module[] }) {
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
