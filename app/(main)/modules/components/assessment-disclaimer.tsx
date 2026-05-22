import { AlertTriangle } from "lucide-react";

export default function AssessmentDisclaimer() {
  return (
    <div className="flex gap-3 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30">
      <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-500" />
      <p className="text-sm text-amber-800 dark:text-amber-400">
        <span className="font-medium">Heads up</span> — make sure your
        assessment weights add up to 100% across all assessments. If they don't,
        your grade calculations and projections may be inaccurate.
      </p>
    </div>
  );
}
