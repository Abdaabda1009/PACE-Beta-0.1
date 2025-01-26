import { NavLinks } from "./NavLinks";
import { AuthButtons } from "@/components/landingpage/components/Navbar/AuthButton";

export const DesktopMenu = () => {
  return (
    <div className="hidden md:flex items-center justify-between flex-1 pl-8 lg:pl-12 xl:pl-16">
      <div className="flex items-center gap-4 lg:gap-6 xl:gap-8">
        <NavLinks />
      </div>
      <div className="flex items-center">
        <AuthButtons />
      </div>
    </div>
  );
};
