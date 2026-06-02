import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, CheckCircle2, Clock } from "lucide-react";

type AssessmentsStatsProps = {
  total: number;
  completed: number;
  pending: number;
};

export function AssessmentsStats({
  total,
  completed,
  pending,
}: AssessmentsStatsProps) {
  return (
    <div className="stat-card-container">
      <Card className="rounded-radius border border-brand-muted bg-brand-subtle/40 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-radius bg-brand-muted">
              <ClipboardList className="h-5 w-5 text-brand" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Assessments</p>
              <p className="text-3xl font-bold tracking-tight mt-0.5 text-brand">
                {total}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-radius border border-grade-first-bg bg-grade-first-bg/40 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-radius bg-grade-first-bg/60 brightness-95">
              <CheckCircle2 className="h-5 w-5 text-grade-first" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-3xl font-bold tracking-tight mt-0.5 text-grade-first">
                {completed}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-radius border border-status-pending-bg bg-status-pending-bg/40 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-radius bg-status-pending-bg/60 brightness-95">
              <Clock className="h-5 w-5 text-status-pending" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-3xl font-bold tracking-tight mt-0.5 text-status-pending">
                {pending}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
