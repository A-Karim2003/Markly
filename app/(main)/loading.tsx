import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-5 animate-spin text-muted-foreground", className)}
      {...props}
    />
  );
}

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
      <div className="flex items-center gap-3 rounded-full border border-border/40 bg-background/80 px-4 py-2 shadow-sm">
        <Spinner />
        <p className="text-sm font-medium text-muted-foreground">Loading</p>
      </div>
    </div>
  );
}
