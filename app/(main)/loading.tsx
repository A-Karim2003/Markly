import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-8 animate-spin text-muted-foreground", className)}
      {...props}
    />
  );
}

export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex items-center gap-3 rounded-radius border border-border/40 bg-background/80 px-6 py-4 shadow-sm">
        <Spinner />
        <p className="text-lg font-medium text-muted-foreground">Loading</p>
      </div>
    </div>
  );
}
