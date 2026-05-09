import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type OnboardingFooterProps = {
  totalModules: number;
  totalCredits: number;
  onBack: () => void;
};

export default function OnboardingFooter({
  totalModules,
  totalCredits,
  onBack,
}: OnboardingFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#050509]/80 backdrop-blur-md border-t border-zinc-800/50 p-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Button
          variant="ghost"
          className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors gap-2"
          onClick={onBack}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
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
  );
}
