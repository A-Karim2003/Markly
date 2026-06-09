import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Module } from "@/lib/data/modules";

export default function ModuleCardCore({ module }: { module: Module }) {
  return (
    <Card className="border-primary/20 bg-primary/5 relative">
      <CardContent className="p-4">
        <div className="absolute top-3 right-3">
          <Lock className="h-4 w-4 text-primary/70" />
        </div>
        <Badge className="bg-primary/10 text-primary border-none hover:bg-primary/10 font-sans text-[10px] uppercase tracking-wider px-2 py-0.5 mb-2">
          Required
        </Badge>
        <h4 className="text-sm font-semibold text-foreground">{module.name}</h4>
        <p className="text-xs text-muted-foreground mt-1 font-sans">
          {module.code} · {module.credits} credits
        </p>
      </CardContent>
    </Card>
  );
}
