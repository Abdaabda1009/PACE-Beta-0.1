import { LandingNavbar } from "@/components/landingpage/components/Navbar/LandingNavbar";
import { HeroSection } from "@/components/landingpage/components/Hero/HeroSection";
import { DashboardPic } from "@/components/landingpage/components/DashboardPic";
import { PoweredBy } from "@/components/landingpage/components/PoweredBy";
import { FeaturesGrid } from "@/components/landingpage/components/FeaturesGrid";
import "@/components/landingpage/assets/SpotlightCard.css";
import { ActionButtonCard } from "@/components/landingpage/components/Action-button/ActionButtonCard";
import { Footer } from "@/components/landingpage/components/footer/Footer";
import { PricingSection } from "@/components/landingpage/components/PricingSection";
import { AboutSection } from "@/components/landingpage/components/AboutSection";


export const Landing = () => {
  return (
    <div className="w-full">
      <LandingNavbar />
      <main className="container mx-auto px-5 sm:px-6 lg:px-12 py-10 sm:py-14">
        <HeroSection />
        <DashboardPic />
        <FeaturesGrid />

        <div className="mb-16 sm:mb-20 lg:mb-24">
          <PoweredBy />
        </div>

        <PricingSection />
        <AboutSection />

        <div className="flex justify-center mt-10 sm:mt-16">
          <ActionButtonCard />
        </div>
      </main>

      <Footer />
    </div>
  );
};