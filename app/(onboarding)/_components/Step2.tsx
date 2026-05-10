"use client";

import { useState } from "react";
import { Module } from "@/lib/data/modules";
import ModuleCardCore from "./module-card-core";
import ModuleCardOptional from "./module-card-optional";
import OnboardingHeader from "./Onboarding-header";
import OnboardingFooter from "./onboarding-footer";
import { StudentProfile } from "@/lib/data/student-profiles";

type Step2Props = {
  setCurrentStep: (step: number) => void;
  modules: Module[];
  student: StudentProfile;
};

export default function Step2({
  setCurrentStep,
  modules,
  student,
}: Step2Props) {
  const [selectedOptionalIds, setSelectedOptionalIds] = useState<number[]>([]);

  const coreModules = modules.filter((module) => !module.is_optional);
  const optionalModules = modules.filter((module) => module.is_optional);

  const toggleOptional = (id: number) => {
    setSelectedOptionalIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const totalCredits =
    coreModules.reduce((sum, module) => sum + module.credits, 0) +
    optionalModules
      .filter((module) => selectedOptionalIds.includes(module.id))
      .reduce((sum, module) => sum + module.credits, 0);

  const totalModules = coreModules.length + selectedOptionalIds.length;
  const isMaxed = totalCredits >= 120;

  async function handleOnboardingSubmit(studentId: number) {
    const moduleIds = [...selectedOptionalIds, ...coreModules.map((m) => m.id)];
    console.log(moduleIds);

    //! Handle logic for updating onboarding step to step 3:
    //! if modules are selected navigate to /dashboard using router.push()
  }

  return (
    <div className="min-h-screen bg-[#050509] text-white flex flex-col items-center pt-16 pb-32 px-6 font-serif">
      <OnboardingHeader>Step 2 of 2</OnboardingHeader>

      <div className="w-full max-w-4xl space-y-12">
        {/* Core Modules */}
        <div>
          <h3 className="text-xs font-bold text-zinc-500 tracking-widest uppercase mb-6">
            Core Modules
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {coreModules.map((module) => (
              <ModuleCardCore key={module.id} module={module} />
            ))}
          </div>
        </div>

        {/* Optional Modules */}
        <div className="mb-24">
          <h3 className="text-xs font-bold text-zinc-500 tracking-widest uppercase mb-6">
            Optional Modules
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {optionalModules.map((module) => (
              <ModuleCardOptional
                key={module.id}
                module={module}
                isSelected={selectedOptionalIds.includes(module.id)}
                onToggle={toggleOptional}
                isMaxed={isMaxed}
              />
            ))}
          </div>
        </div>
      </div>

      <OnboardingFooter
        totalModules={totalModules}
        totalCredits={totalCredits}
        onBack={() => setCurrentStep(1)}
        onContinue={() => handleOnboardingSubmit(student.id)}
      />
    </div>
  );
}
