
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CreditsDisplay } from "./credits-display";
import { UserButton } from "./user-button";

interface RAIHeaderProps {
    title: string;
}

export const RAIHeader = ({title}:RAIHeaderProps) => {
  return (
    <div className="bg-sidebar border-sidebar-border border-b flex flex-row align-middle items-center p-2 pr-4 py-4">
      <SidebarTrigger />
      <h1 className="ml-2 text-2xl font-bold tracking-wide">{title}</h1>
      <div className="grow flex flex-row justify-end space-x-4 items-center">
        <CreditsDisplay/>
        <UserButton/>
      </div>
    </div>
  );
};
