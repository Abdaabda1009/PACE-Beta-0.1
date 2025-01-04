import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LandingNavbar = () => {
  const navigate = useNavigate();
  const navLinkStyle = "hover:bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF] hover:bg-clip-text hover:text-transparent transition-colors duration-200";

  return (
    <nav className="flex justify-between items-center mb-16 md:mb-24">
      <img src="assets/logo.png" alt="Logo" className="w-32 h-16" />

      <div className="flex items-center gap-8 ml-[260px] mr-auto">
        <Button
          variant="ghost"
          className={`text-white ${navLinkStyle} hidden md:inline-flex`}
          onClick={() => navigate("/about")}
        >
          About Us
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`text-white ${navLinkStyle} hidden md:inline-flex items-center gap-1`}
            >
              Community
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-dashboard-card">
            <DropdownMenuItem className="text-white hover:bg-dashboard-background/100">
              Forums
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-dashboard-background/100">
              Events
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-dashboard-background/100">
              Groups
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`text-white ${navLinkStyle} hidden md:inline-flex items-center gap-1`}
            >
              Resources
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-dashboard-card">
            <DropdownMenuItem className="text-white hover:bg-dashboard-background/100">
              Guides
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-dashboard-background/100">
              Tutorials
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-dashboard-background/100">
              Documentation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          className={`text-white ${navLinkStyle} hidden md:inline-flex`}
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="text-white hover:text-dashboard-background"
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>
        <Button
          className="bg-blue-600 hover:text-dashboard-background text-white"
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
};