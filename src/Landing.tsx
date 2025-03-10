import { LandingNavbar } from "@/components/landingpage/components/Navbar/LandingNavbar";
import { HeroSection } from "@/components/landingpage/components/Hero/HeroSection";
import { PoweredBy } from "@/components/landingpage/components/PoweredBy";
import { MobileAppSection } from "./components/landingpage/components/MobileAppSection";
import "@/components/landingpage/assets/SpotlightCard.css";
import { ActionButtonCard } from "@/components/landingpage/components/Action-button/ActionButtonCard";
import { Footer } from "@/components/landingpage/components/footer/Footer";
import { PricingSection } from "@/components/landingpage/components/PricingSection";
import { AboutSection } from "@/components/landingpage/components/Streamline-Subscription-Section/AboutSection";

export const Landing = () => {
  return (
    <div className="w-full">
      <LandingNavbar />
      <main className="w-full px-5 sm:px-6 lg:px-1 sm:py-12">
        <HeroSection />
        <div className="Continer w-full h-auto md:h-[1100px]">
          <AboutSection />
        </div>
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <MobileAppSection />
          <PoweredBy />
        </div>

        <PricingSection />

        <div className="flex justify-center mt-10 sm:mt-16 flex-col sm:flex-row gap-4">
          <ActionButtonCard />
        </div>
      </main>

      <Footer />
    </div>
  );
};
