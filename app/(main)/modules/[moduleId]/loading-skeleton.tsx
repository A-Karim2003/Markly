import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ModuleDetailLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <Skeleton className="h-3 w-20" />
          <div className="mt-2">
            <Skeleton className="h-8 w-96" />
          </div>
        </div>

        <Skeleton className="h-8 w-24 rounded-radius" />
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex gap-6">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>
        </CardContent>
      </Card>

      <div>
        <Skeleton className="h-6 w-48 mb-4" />

        <Card>
          <CardContent className="p-4">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="grid grid-cols-5 gap-4 mb-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>

                {Array.from({ length: 5 }).map((_, row) => (
                  <div key={row} className="grid grid-cols-5 gap-4 py-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-8 w-20 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
