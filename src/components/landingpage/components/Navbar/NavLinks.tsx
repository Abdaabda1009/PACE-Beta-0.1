import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinkStyle = "hover:bg-white/5 transition-colors duration-200";

export const NavLinks = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="ghost"
        className={`text-white ${navLinkStyle} w-full md:w-auto justify-start md:justify-center text-base md:text-sm font-normal`}
        onClick={() => navigate("/about")}
      >
        Product
      </Button>

      <Button
        variant="ghost"
        className={`text-white ${navLinkStyle} w-full md:w-auto justify-start md:justify-center text-base md:text-sm font-normal`}
        onClick={() => navigate("/pricing")}
      >
        Pricing
      </Button>

      <Button
        variant="ghost"
        className={`text-white ${navLinkStyle} w-full md:w-auto justify-start md:justify-center text-base md:text-sm font-normal`}
        onClick={() => navigate("/company")}
      >
        Company
      </Button>

      <Button
        variant="ghost"
        className={`text-white ${navLinkStyle} w-full md:w-auto justify-start md:justify-center text-base md:text-sm font-normal`}
        onClick={() => navigate("/blog")}
      >
        Blog
      </Button>

      <Button
        variant="ghost"
        className={`text-white ${navLinkStyle} w-full md:w-auto justify-start md:justify-center text-base md:text-sm font-normal`}
        onClick={() => navigate("/changelog")}
      >
        Changelog
      </Button>
    </>
  );
};
