import { Clock } from "lucide-react";
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
  id: string;
  name: string;
  module: string;
  code: string;
  weight: number;
};

type PendingAssessmentsTableProps = {
  assessments: PendingAssessment[];
};

export function PendingAssessmentsTable({
  assessments,
}: PendingAssessmentsTableProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Pending Assessments
      </h2>
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assessment</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.name}</TableCell>
                <TableCell>
                  <span className="text-foreground">{a.module}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {a.code}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {a.weight}%
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 text-sm text-[#d97706]">
                    <Clock className="h-4 w-4" />
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
