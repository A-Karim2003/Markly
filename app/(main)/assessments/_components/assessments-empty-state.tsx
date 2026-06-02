import Link from "next/link";
import { ClipboardList, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function AssessmentsEmptyState() {
  return (
    <Card className="overflow-hidden rounded-radius border border-border bg-card shadow-sm">
      <CardContent className="flex flex-col items-center px-6 py-10 text-center sm:px-10 sm:py-12">
        <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-brand/15 text-brand">
          <ClipboardList className="size-6" />
        </div>

        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          No assessments yet
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          You do not have any assessments yet. Add modules to your academic
          year and your assessments will appear here automatically.
        </p>

        <Button asChild className="mt-6 rounded-radius px-4">
          <Link href="/modules">
            Go to modules
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}