import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Module } from "@/lib/data/modules";

export default function ModuleCardCore({ module }: { module: Module }) {
  return (
    <Card className="border-indigo-500/30 bg-indigo-500/5 relative">
      <CardContent className="p-4">
        <div className="absolute top-3 right-3">
          <Lock className="h-4 w-4 text-indigo-400/60" />
        </div>
        <Badge className="bg-indigo-500/20 text-indigo-400 border-none hover:bg-indigo-500/20 font-sans text-[10px] uppercase tracking-wider px-2 py-0.5 mb-2">
          Required
        </Badge>
        <h4 className="text-sm font-semibold text-zinc-100">{module.name}</h4>
        <p className="text-xs text-zinc-500 mt-1 font-sans">
          {module.code} · {module.credits} credits
        </p>
      </CardContent>
    </Card>
  );
}
