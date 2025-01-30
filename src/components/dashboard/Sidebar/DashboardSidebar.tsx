import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarContent } from "@/components/dashboard/Sidebar/SidebarContent";
import { MobileSidebar } from "@/components/dashboard/Sidebar/MobileSideBar/MobileSIdeBar";

export const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />;
  }

  return (
    <div className="w-50 min-h-screen bg-rgb(59 130 246 / 0.5 border border-blue-500/30 flex-shrink-0">
      <SidebarContent />;
    </div>
  );
};
