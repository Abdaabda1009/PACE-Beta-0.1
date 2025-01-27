import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileMenu } from "./MobileMenu";
import { DesktopMenu } from "./DesktopMenu";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/constants";

export const LandingNavbar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            onClick={() => navigate(ROUTES.HOME)}
          >
            <img
              src="/assets/logoicon.png"
              alt="Logo"
              className="w-7 h-7 md:w-12 md:h-12"
            />
          </div>

          {isMobile ? (
            <div className="flex items-center">
              <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          ) : (
            <DesktopMenu />
          )}
        </div>
      </div>
    </nav>
  );
};