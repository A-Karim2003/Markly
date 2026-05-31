import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoadingSkeleton() {
  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <Skeleton className="h-8 w-48" />
          <div className="mt-2">
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        <Skeleton className="h-7 w-24 rounded-radius" />
      </div>

      {/* stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[0, 1, 2].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-3 w-24 mb-2" />
              <Skeleton className="h-10 w-40" />
              <div className="mt-2">
                <Skeleton className="h-3 w-32" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <Skeleton className="h-6 w-36 mb-4" />

        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Card key={idx}>
              <CardHeader className="relative flex items-start justify-between pb-2">
                <div>
                  <Skeleton className="h-3 w-16" />
                  <div className="mt-1">
                    <Skeleton className="h-5 w-40" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-20 rounded-radius" />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <Skeleton className="h-2 w-full rounded-radius" />

                <div className="flex items-end justify-between">
                  <div>
                    <Skeleton className="h-8 w-20" />
                    <div className="mt-2">
                      <Skeleton className="h-3 w-28" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
