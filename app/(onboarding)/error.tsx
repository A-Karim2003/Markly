"use client";

import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="dark min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-4 font-serif">
      <h2 className="text-2xl font-semibold text-foreground">
        Something went wrong
      </h2>
      <p className="text-muted-foreground text-sm">{error.message}</p>
      <Button
        onClick={reset}
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
      >
        Try again
      </Button>
    </div>
  );
}
