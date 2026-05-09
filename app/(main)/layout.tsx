import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import { getStudentProfile } from "@/lib/data/student-profiles";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const student = await getStudentProfile();

  if (!student || student.onboarding_step < 3) {
    redirect("/onboarding");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen pt-17.5 px-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
