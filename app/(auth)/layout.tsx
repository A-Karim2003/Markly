import { getSession } from "@/lib/actions/auth-actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex w-full max-w-7xl items-center px-6 py-5 sm:px-8">
        <Link href="/" className="inline-flex items-center gap-3">
          <Image
            src="/logo-light.png"
            alt="Markly"
            width={168}
            height={20}
            priority
            className="h-auto w-auto dark:hidden"
          />
          <Image
            src="/logo-dark.png"
            alt="Markly"
            width={168}
            height={20}
            priority
            className="hidden h-auto w-auto dark:block"
          />
          <span className="sr-only">Back to homepage</span>
        </Link>
      </header>

      <main>{children}</main>
    </div>
  );
}
