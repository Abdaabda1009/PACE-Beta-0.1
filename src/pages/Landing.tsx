import { LandingNavbar } from "@/components/landingpage/components/LandingNavbar";
import { HeroSection } from "@/components/landingpage/components/HeroSection";
import { FeaturesSection } from "@/components/landingpage/components/FeaturesSection";
import { VideoSection } from "@/components/landingpage/components/VideoSection";
import { PoweredBy } from "@/components/landingpage/components/PoweredBy";
import { FeaturesGrid } from "@/components/landingpage/components/FeaturesGrid";
import { MissionSection } from "@/components/landingpage/components/MissionSection";
import "@/components/landingpage/assets/SpotlightCard.css";
import { ActionButtonCard } from "@/components/landingpage/components/ActionButtonCard";
import { Footer } from "@/components/landingpage/components/Footer";

export const Landing = () => {
  return (
    <div className="pr-20 pl-20 mx-auto bg-black px-4 py-8 relative">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <VideoSection />
      <PoweredBy />
      <FeaturesGrid />
      <MissionSection />
      <ActionButtonCard />
      < Footer />
    </div>
  );
};
