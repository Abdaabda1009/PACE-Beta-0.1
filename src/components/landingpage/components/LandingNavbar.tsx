import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const LandingNavbar = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const navLinkStyle =
    "hover:bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF] hover:bg-clip-text hover:text-transparent transition-colors duration-200";

  const NavLinks = () => (
    <>
      <Button
        variant="ghost"
        className={`text-white ${navLinkStyle} w-full md:w-auto justify-start md:justify-center`}
        onClick={() => navigate("/about")}
      >
        About Us
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={`text-white ${navLinkStyle} w-full md:w-auto justify-start md:justify-center items-center gap-1`}
          >
            Community
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-dashboard-card">
          <DropdownMenuItem className="text-white hover:bg-dashboard-background/50">
            Reddit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white hover:bg-dashboard-background/50">
            X
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white hover:bg-dashboard-background/50">
            Discord
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={`text-white ${navLinkStyle} w-full md:w-auto justify-start md:justify-center items-center gap-1`}
          >
            Resources
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-dashboard-card">
          <DropdownMenuItem className="text-white hover:bg-dashboard-background/50">
            Guides
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white hover:bg-dashboard-background/50">
            Tutorials
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white hover:bg-dashboard-background/50">
            Documentation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        className={`text-white ${navLinkStyle} w-full md:w-auto justify-start md:justify-center`}
        onClick={() => navigate("/contact")}
      >
        Contact Us
      </Button>
    </>
  );

  return (
    <nav className="relative z-50">
      <div className="flex justify-between items-center mb-16 md:mb-24">
        <img 
        src="assets/logo.png"
        alt="Logo"
        className="w-20 h-20 md:w-24 md:h-12"
        />

        {isMobile ? (
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full ml-auto"
          >
            <div className="flex items-center gap-4">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  {isOpen ? (
                    <X className="h-6 w-6 text-white" />
                  ) : (
                    <Menu className="h-6 w-6 text-white" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="text-white hover:text-dashboard-background"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => navigate("/login?view=sign_up")}
                >
                  Get Started
                </Button>
              </div>
            </div>
            <CollapsibleContent className="absolute top-full left-0 w-full bg-dashboard-background p-4 space-y-2 border-t border-white/10">
              <NavLinks />
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <>
            <div className="hidden md:flex items-center gap-8 ml-[260px] mr-auto">
              <NavLinks />
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="outline"
                className="text-white hover:text-dashboard-background"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate("/login?view=sign_up")}
              >
                Get Started
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
