import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinkStyle =
  "hover:bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF] hover:bg-clip-text hover:text-transparent transition-colors duration-200";

export const NavLinks = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="ghost"
        className={`text-white ${navLinkStyle} w-full md:w-auto justify-start md:justify-center text-base md:text-sm`}
        onClick={() => navigate("/about")}
      >
        About Us
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={`text-white ${navLinkStyle} w-full md:w-auto justify-start md:justify-center items-center gap-1 text-base md:text-sm`}
          >
            Community
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-dashboard-card w-48">
          <DropdownMenuItem className="text-white hover:bg-dashboard-background/50">
            Forums
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white hover:bg-dashboard-background/50">
            Events
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white hover:bg-dashboard-background/50">
            Groups
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={`text-white ${navLinkStyle} w-full md:w-auto justify-start md:justify-center items-center gap-1 text-base md:text-sm`}
          >
            Resources
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-dashboard-card w-48">
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
        className={`text-white ${navLinkStyle} w-full md:w-auto justify-start md:justify-center text-base md:text-sm`}
        onClick={() => navigate("/contact")}
      >
        Contact Us
      </Button>
    </>
  );
};
