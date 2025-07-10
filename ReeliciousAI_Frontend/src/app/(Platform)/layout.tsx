import { SidebarProvider } from "@/components/ui/sidebar";
import { RAISidebar } from "./_components/rai-sidebar";
import { RabbitQListener } from "@/rabbit/RabbitQListener";
import { SessionProvider } from "next-auth/react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <SessionProvider>
        <SidebarProvider>
          <RabbitQListener />
          <RAISidebar />
          <main className="w-full overflow-hidden">{children}</main>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
