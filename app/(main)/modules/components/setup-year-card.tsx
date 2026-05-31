"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SetupYearModal } from "./setup-year-modal";
import type { Module } from "@/lib/data/modules";

type SetupYearCardProps = {
  year: number;
  modules: Module[];
};

export function SetupYearCard({ year, modules }: SetupYearCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center py-10">
        <Card className="w-full max-w-2xl border-dashed bg-muted/20 shadow-none">
          <CardContent className="flex flex-col items-center px-8 py-12 text-center sm:px-10 sm:py-14">
            <div className="mb-6 flex size-20 items-center justify-center rounded-radius border border-primary/10 bg-primary/10 shadow-sm">
              <BookOpen className="size-5 text-primary" aria-hidden="true" />
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Set up Year {year}
            </h2>

            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Enrol in your Year {year} modules to start tracking your grades
            </p>

            <Button
              type="button"
              className="mt-8 min-w-36"
              onClick={() => setOpen(true)}
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>

      <SetupYearModal
        open={open}
        onClose={() => setOpen(false)}
        year={year}
        modules={modules}
      />
    </>
  );
}
