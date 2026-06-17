import { Skeleton } from "@/components/ui/skeleton";

export default function PageSkeleton() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-radius border border-border bg-card p-8 shadow-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 w-fit">
              <Skeleton className="h-8 w-40 rounded" />
            </div>
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-11 w-full rounded" />

            <div className="py-2">
              <Skeleton className="h-6 w-full rounded" />
            </div>

            <Skeleton className="h-11 w-full rounded" />
            <Skeleton className="h-11 w-full rounded" />
            <Skeleton className="h-11 w-full rounded" />

            <Skeleton className="h-11 w-full rounded" />
          </div>

          <div className="mt-6 text-center">
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
