import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import { getStudentProfile } from "@/lib/data/student-profiles";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/actions/auth-actions";
import { Bounce, ToastContainer } from "react-toastify";

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
        className="w-full h-screen pt-4 px-4 overflow-hidden flex flex-col"
        style={{ maxWidth: "1600px" }}
      >
        <SidebarTrigger />
        {children}
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
