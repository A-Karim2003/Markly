import { getSession } from "@/lib/actions/auth-actions";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) redirect("/dashboard");

  return children;
}
