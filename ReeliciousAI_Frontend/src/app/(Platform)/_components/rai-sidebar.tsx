"use client";
import Image from "next/image";
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
import { LayoutDashboard, LucideIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

const NAV_MAIN_ITEMS = [
  {
    title: "Main",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Video,
  },
] as {
  title: string;
  url: string;
  icon: LucideIcon;
}[];

export const RAISidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-8 pb-4">
        <div className="flex items-center justify-center align-middle ">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
          <p className="leading-1 font-bold text-2xl">ReeliciousAI</p>
        </div>
        <hr className="w-full h-1 rai-gradient border-0 rounded-xs" />
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_MAIN_ITEMS.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton
                    variant={pathname == url ? "outline" : "default"}
                    asChild
                  >
                    <a href={url}>
                      <Icon />
                      <span>{title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-8 pb-6 space-y-8">
          <Button variant={"premium"} size={"full"}>
            Get ReelPro
          </Button>
          <Button
            onClick={() => router.push("/templates/create")}
            size={"full"}
            className="bg-purple-800 py-4 text-xl tracking-wider"
          >
            CREATE
          </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
