"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Module } from "@/lib/data/modules";
import ModuleCardCore from "./module-card-core";
import ModuleCardOptional from "./module-card-optional";
import Link from "next/link";

type Step2Props = {
  setCurrentStep: (step: number) => void;
  modules: Module[];
};

export default function Step2({ setCurrentStep, modules }: Step2Props) {
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

  return (
    <div className="min-h-screen bg-[#050509] text-white flex flex-col items-center pt-16 pb-32 px-6 font-serif">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-400 mb-2">Markly</h1>
        <p className="text-zinc-500 text-sm uppercase tracking-widest mb-8">
          Step 2 of 2
        </p>
        <h2 className="text-3xl font-semibold mb-3">Select your modules</h2>
        <p className="text-zinc-400 max-w-md mx-auto">
          Core modules are pre-selected. Choose your optional modules below.
        </p>
      </div>

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

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#050509]/80 backdrop-blur-md border-t border-zinc-800/50 p-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-sm font-sans">
            <span className="text-zinc-100 font-medium">
              {totalModules} modules selected
            </span>
            <span className="text-zinc-500"> · {totalCredits} credits</span>
            {totalCredits < 120 && (
              <span className="text-orange-400 ml-2">
                (need {120 - totalCredits} more)
              </span>
            )}
          </div>
          <Link href="/dashboard">
            <Button
              disabled={totalCredits < 120}
              className="bg-indigo-700/50 hover:bg-indigo-600/60 text-indigo-200 border border-indigo-500/30 px-8 py-6 rounded-xl transition-all disabled:opacity-40"
            >
              Continue to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
