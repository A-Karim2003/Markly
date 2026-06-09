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
        "bg-card transition-all duration-200 relative",
        isDisabled
          ? "cursor-not-allowed opacity-40 border-border"
          : "cursor-pointer hover:border-primary/40 hover:shadow-md",
        isSelected && !isDisabled
          ? "border-primary bg-primary/5"
          : "border-border",
      )}
    >
      <CardContent className="p-4">
        {isSelected && (
          <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
            <Check className="h-3 w-3 text-primary-foreground" />
          </div>
        )}
        <h4 className="text-sm font-semibold text-foreground">{module.name}</h4>
        <p className="text-xs text-muted-foreground mt-1 font-sans">
          {module.code} · {module.credits} credits
        </p>
      </CardContent>
    </Card>
  );
}
