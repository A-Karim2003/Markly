"use client";

import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-[#050509] text-white flex flex-col items-center justify-center gap-4 font-serif">
      <h2 className="text-2xl font-semibold text-zinc-100">
        Something went wrong
      </h2>
      <p className="text-zinc-500 text-sm">{error.message}</p>
      <Button
        onClick={reset}
        className="bg-indigo-700 hover:bg-indigo-600 text-zinc-100 rounded-xl"
      >
        Try again
      </Button>
    </div>
  );
}
