import { Card, CardContent } from "@/components/ui/card";

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
    <div className="grid grid-cols-3 gap-4 mb-8">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Total Assessments</p>
          <p className="text-2xl font-bold text-foreground mt-1">{total}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold mt-1" style={{ color: "#16a34a" }}>
            {completed}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold mt-1" style={{ color: "#d97706" }}>
            {pending}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
