"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Settings,
  ChevronUp,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session, signOut } from "@/lib/actions/auth-actions";
import { StudentProfile } from "@/lib/data/student-profiles";
import Image from "next/image";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Modules", href: "/modules", icon: BookOpen },
  { label: "Assessments", href: "/assessments", icon: ClipboardList },
  { label: "Settings", href: "/settings", icon: Settings },
];

type AppSidebar = {
  student: StudentProfile;
  session: Session;
};
export function AppSidebar({ student, session }: AppSidebar) {
  const pathname = usePathname();
  return (
    <Sidebar>
      <Link href="/dashboard" className="mb-4">
        <SidebarHeader>
          <Image
            src="/logo-light.png"
            alt="Markly Logo"
            width={500}
            height={200}
            className="w-full h-auto dark:hidden"
          />
          <Image
            src="/logo-dark.png"
            alt="Markly Logo"
            width={500}
            height={200}
            className="hidden w-full h-auto dark:block"
          />
        </SidebarHeader>
      </Link>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="text-base py-6"
                    >
                      <Link href={item.href}>
                        <item.icon size={22} />
                        <span className="text-base">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-accent">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-12 hover:bg-accent/50">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {session.user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="text-sm font-semibold">
                      {session.user.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Year {student.year}
                    </span>
                  </div>
                  <ChevronUp className="h-4 w-4 ml-auto text-muted-foreground transition-transform" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuItem
                  className="cursor-pointer text-red-600"
                  onClick={signOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
