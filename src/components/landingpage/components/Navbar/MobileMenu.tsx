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
      <div className="flex items-center gap-3 px-2 py-2">
        <AuthButtons />
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/5 transition-colors"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      {isOpen && (
        <CollapsibleContent className="absolute top-full left-0 w-full bg-black backdrop-blur-sm border-t border-white/10">
          <div className="px-4 py-4 space-y-2">
            <NavLinks />
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};
