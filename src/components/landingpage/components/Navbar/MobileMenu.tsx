import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NavLinks } from "./NavLinks";
import { AuthButtons } from "@/components/landingpage/components/Navbar/AuthButton";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <div className="flex items-center gap-2 md:gap-4">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </Button>
        </CollapsibleTrigger>
        <AuthButtons />
      </div>
      <CollapsibleContent className="absolute top-full left-0 w-full bg-dashboard-background p-4 space-y-3 border-t border-white/10 shadow-lg">
        <NavLinks />
      </CollapsibleContent>
    </Collapsible>
  );
};
