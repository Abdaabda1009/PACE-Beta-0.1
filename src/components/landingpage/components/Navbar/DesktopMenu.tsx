import { NavLinks } from "./NavLinks";
import { AuthButtons } from "@/components/landingpage/components/Navbar/AuthButton";

export const DesktopMenu = () => {
  return (
    <>
      <div className="hidden md:flex items-center gap-6 lg:gap-8 ml-[200px] lg:ml-[260px] mr-auto">
        <NavLinks />
      </div>
      <div className="hidden md:flex items-center gap-4">
        <AuthButtons />
      </div>
    </>
  );
};
