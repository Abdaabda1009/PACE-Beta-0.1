import { LandingNavbar } from "@/components/landingpage/components/Navbar/LandingNavbar";
import { HeroSection } from "@/components/landingpage/components/Hero/HeroSection";
import { DashboardPic } from "@/components/landingpage/components/DashboardPic";
import { PoweredBy } from "@/components/landingpage/components/PoweredBy";
import { FeaturesGrid } from "@/components/landingpage/components/FeaturesGrid";
import "@/components/landingpage/assets/SpotlightCard.css";
import { ActionButtonCard } from "@/components/landingpage/components/Action-button/ActionButtonCard";
import { Footer } from "@/components/landingpage/components/footer/Footer";

export const Landing = () => {
  return (
    <div className="container w-full px-4 sm:px-6 lg:px-12 py-14">
      <LandingNavbar />
      <HeroSection />
      <DashboardPic />
      <PoweredBy />
      <FeaturesGrid />
      <ActionButtonCard />
      <Footer />
    </div>
  );
};
