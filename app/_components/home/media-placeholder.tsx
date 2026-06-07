import { LayoutDashboard } from "lucide-react";

interface MediaPlaceholderProps {
  label: string;
}

export function MediaPlaceholder({ label }: MediaPlaceholderProps) {
  return (
    <div className="relative w-full aspect-16/10 rounded-2xl border border-border bg-muted/30 overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-2 text-muted-foreground/60">
        <div className="h-10 w-10 rounded-xl bg-muted/60 border border-border flex items-center justify-center">
          <LayoutDashboard className="h-5 w-5" />
        </div>
        <span className="text-xs font-medium">{label}</span>
      </div>
    </div>
  );
}
