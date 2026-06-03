import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import { getStudentProfile } from "@/lib/data/student-profiles";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/actions/auth-actions";
import { Bounce, ToastContainer } from "react-toastify";
import { ThemeToggle } from "@/components/theme-toggle";

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
      <main
        className="w-full h-screen pt-4 px-4 overflow-hidden flex flex-col bg-brand-subtle"
        style={{ maxWidth: "1600px" }}
      >
        <div className="flex items-center justify-between gap-3 mb-3 px-0.5">
          <SidebarTrigger />
          <ThemeToggle />
        </div>
        <div className="flex-1 overflow-scroll border p-4 pt-8 rounded-radius bg-background">
          {children}
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          closeOnClick={false}
          transition={Bounce}
        />
      </main>
    </SidebarProvider>
  );
}
