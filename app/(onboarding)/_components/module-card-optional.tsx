import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Module } from "@/lib/data/modules";

type Props = {
  module: Module;
  isSelected: boolean;
  onToggle: (id: number) => void;
  isMaxed: boolean;
};

export default function ModuleCardOptional({
  module,
  isSelected,
  onToggle,
  isMaxed,
}: Props) {
  const isDisabled = isMaxed && !isSelected;
  return (
    <Card
      onClick={() => !isDisabled && onToggle(module.id)}
      className={cn(
        "bg-[#07070e] transition-all duration-200 relative",
        isDisabled
          ? "cursor-not-allowed opacity-40 border-zinc-800/60"
          : "cursor-pointer hover:border-indigo-500/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]",
        isSelected && !isDisabled
          ? "border-indigo-500 bg-indigo-500/5"
          : "border-zinc-800/60",
      )}
    >
      <CardContent className="p-4">
        {isSelected && (
          <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
            <Check className="h-3 w-3 text-white" />
          </div>
        )}
        <h4 className="text-sm font-semibold text-zinc-100">{module.name}</h4>
        <p className="text-xs text-zinc-500 mt-1 font-sans">
          {module.code} · {module.credits} credits
        </p>
      </CardContent>
    </Card>
  );
}
