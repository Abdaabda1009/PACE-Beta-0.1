import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarContent } from "@/components/dashboard/Sidebar/SideBarLogo";
import { MobileSidebar } from "@/components/dashboard/Sidebar/MobileSideBar/MobileSIdeBar";

export const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />;
  }

  return <SidebarContent />;
};
