import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SidebarContent } from "@/components/dashboard/Sidebar/SideBarLogo";

interface MobileSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileSidebar = ({ isOpen, setIsOpen }: MobileSidebarProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="p-0 w-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
};
