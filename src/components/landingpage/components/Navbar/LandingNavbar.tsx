import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileMenu } from "@/components/landingpage/components/Navbar/MobileMenu";
import { DesktopMenu } from "@/components/landingpage/components/Navbar/DesktopMenu";

export const LandingNavbar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-50">
      <div className="flex justify-between items-center mb-8 md:mb-16 lg:mb-24 px-4 md:px-6 py-4 md:py-6">
        <img
        src="assets/logo.png"
        alt="Logo"
        className="w-8 h-8 md:w-24 md:h-12 "></img>

        {isMobile ? (
          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        ) : (
          <DesktopMenu />
        )}
      </div>
    </nav>
  );
};
