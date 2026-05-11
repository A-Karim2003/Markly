import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import { getStudentProfile } from "@/lib/data/student-profiles";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/actions/auth-actions";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [student, session] = await Promise.all([
    getStudentProfile(),
    getSession(),
  ]);

  if (!session) redirect("/sign-in");
  if (!student || student.onboarding_step < 3) redirect("/onboarding");

  return (
    <SidebarProvider>
      <AppSidebar student={student} session={session} />
      <main className="w-full h-screen pt-17.5 px-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
