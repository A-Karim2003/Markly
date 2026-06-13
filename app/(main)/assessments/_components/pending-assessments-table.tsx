"use client";

import { useRouter } from "next/navigation";
import { Clock, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type PendingAssessment = {
  id: number;
  moduleId: number;
  assessmentName: string;
  moduleName: string | undefined;
  code: string | undefined;
  weight: number | undefined;
  type: string | null;
};

type PendingAssessmentsTableProps = {
  assessments: PendingAssessment[];
};

export function PendingAssessmentsTable({
  assessments,
}: PendingAssessmentsTableProps) {
  const router = useRouter();

  const goToModule = (moduleId: number) => {
    router.push(`/modules/${moduleId}`);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Pending Assessments
      </h2>
      <Card className="overflow-hidden rounded-radius border border-border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Assessment
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Type
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Module
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Weight
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((a) => (
              <TableRow
                key={a.id}
                className="group cursor-pointer border-border transition-colors hover:bg-muted/40 focus-visible:bg-muted/40"
                tabIndex={0}
                role="link"
                aria-label={`Go to ${a.moduleName ?? "module"}`}
                onClick={() => goToModule(a.moduleId)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    goToModule(a.moduleId);
                  }
                }}
              >
                <TableCell className="max-w-75 whitespace-normal wrap-break-word font-medium align-top">
                  <span className="flex min-w-0 items-start gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-radius bg-brand-subtle">
                      <ClipboardList className="h-4 w-4 text-brand" />
                    </span>
                    <span className="min-w-0 whitespace-normal wrap-break-word">
                      {a.assessmentName}
                    </span>
                  </span>
                </TableCell>
                <TableCell className="max-w-75 whitespace-normal wrap-break-word align-top text-muted-foreground">
                  {a.type}
                </TableCell>
                <TableCell className="max-w-75 whitespace-normal wrap-break-word align-top">
                  <span className="flex min-w-0 items-start gap-2">
                    <span className="min-w-0 whitespace-normal wrap-break-word text-foreground">
                      {a.moduleName}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-secondary font-mono text-[11px] font-normal text-muted-foreground"
                    >
                      {a.code}
                    </Badge>
                  </span>
                </TableCell>
                <TableCell className="max-w-75 whitespace-normal wrap-break-word align-top text-muted-foreground">
                  {a.weight}%
                </TableCell>
                <TableCell className="align-top">
                  <span className="status-pending inline-flex items-center gap-1.5 rounded-radius px-2.5 py-1 text-xs font-medium">
                    <Clock className="h-3.5 w-3.5" />
                    Pending
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
