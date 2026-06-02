"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateStudentProfile } from "@/lib/actions/student-actions";
import { cn } from "@/lib/utils";

type YearSelectorProps = {
  year: number;
};

export function YearSelector({ year }: YearSelectorProps) {
  const [selectedYear, setSelectedYear] = useState(year.toString());
  const [isPending, startTransition] = useTransition();

  function handleYearChange(newYearValue: string) {
    if (newYearValue === selectedYear || isPending) return;

    const previousYear = selectedYear;
    setSelectedYear(newYearValue);

    startTransition(async () => {
      const result = await updateStudentProfile({
        year: Number(newYearValue),
      });

      // revert back to previous year on error
      if (!result.success) {
        setSelectedYear(previousYear);
        return;
      }
    });
  }

  return (
    <Select value={selectedYear} onValueChange={handleYearChange}>
      <SelectTrigger
        className={cn(
          "relative w-40 rounded-radius border border-border bg-card px-3 py-1.5 text-sm shadow-sm",
          isPending && "cursor-wait",
          isPending && "[&>svg:last-child]:opacity-0",
        )}
        disabled={isPending}
        aria-busy={isPending}
      >
        <SelectValue />
        {isPending ? (
          <span className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Loader2 className="size-3.5 animate-spin" />
          </span>
        ) : null}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Years</SelectLabel>
          <SelectItem value="1">Year 1</SelectItem>
          <SelectItem value="2">Year 2</SelectItem>
          <SelectItem value="3">Year 3</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
