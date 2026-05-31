import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ModulesLoadingSkeleton() {
  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <Skeleton className="h-8 w-48" />
          <div className="mt-2">
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <Skeleton className="h-3 w-32" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="relative flex items-start justify-between pb-2">
              <div>
                <Skeleton className="h-3 w-16" />
                <div className="mt-1">
                  <Skeleton className="h-5 w-40" />
                </div>
              </div>

              <div>
                <Skeleton className="h-6 w-20 rounded-radius" />
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <Skeleton className="h-2 w-full" />
              <div className="flex items-end justify-between">
                <div>
                  <Skeleton className="h-8 w-20" />
                  <div className="mt-2">
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
                <Skeleton className="h-6 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-4">
        <Skeleton className="h-3 w-36" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx}>
            <CardHeader className="relative flex items-start justify-between pb-2">
              <div>
                <Skeleton className="h-3 w-16" />
                <div className="mt-1">
                  <Skeleton className="h-5 w-40" />
                </div>
              </div>

              <div>
                <Skeleton className="h-6 w-6 rounded-radius" />
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <Skeleton className="h-2 w-full" />
              <div className="flex items-end justify-between">
                <div>
                  <Skeleton className="h-8 w-20" />
                  <div className="mt-2">
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
                <Skeleton className="h-6 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
