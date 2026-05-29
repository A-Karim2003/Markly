import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="w-full max-w-2xl rounded-xl border border-dashed bg-muted/10 p-12 text-center">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="text-muted-foreground mt-2">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link href="/modules">
            <Button>Browse Modules</Button>
          </Link>

          <Link href="/dashboard">
            <Button variant="ghost">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
