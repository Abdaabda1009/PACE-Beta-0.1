import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/lib/constants";

const navLinkStyle = "hover:bg-white/5 transition-colors duration-200";

export const NavLinks = () => {
  const navigate = useNavigate();
  
  const handleNavigation = (action: () => void) => {
    // If we're not on the home page, navigate home first
    if (location.pathname !== ROUTES.HOME) {
      navigate(ROUTES.HOME);
      // Wait for the navigation to complete before scrolling
      setTimeout(action, 1000);
    } else {
      action();
    }
  };
  
  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('#features-grid');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPricing = () => {
    const pricingSection = document.querySelector('#pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCompany = () => {
    const companySection = document.querySelector('#company-section');
    if (companySection) {
      companySection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <>
      <Button
        variant="ghost"
        className={`text-white w-full md:w-auto justify-start md:justify-center text-base md:text-sm font-normal hover:bg-blue-200/20`}
        onClick={() => handleNavigation(scrollToFeatures)}
      >
        Product
      </Button>

      <Button
        variant="ghost"
        className={`text-white w-full md:w-auto justify-start md:justify-center text-base md:text-sm font-normal hover:bg-blue-200/20`}
        onClick={() => handleNavigation(scrollToPricing)}
      >
        Pricing
      </Button>

      <Button
        variant="ghost"
        className={`text-white w-full md:w-auto justify-start md:justify-center text-base md:text-sm font-normal hover:bg-blue-200/20`}
        onClick={() => handleNavigation(scrollToCompany)}
      >
        Company
      </Button>

      <Button
        variant="ghost"
        className={`text-white w-full md:w-auto justify-start md:justify-center text-base md:text-sm font-normal hover:bg-blue-200/20`}
        onClick={() => navigate(ROUTES.BLOG)}
      >
        Blog
      </Button>

      <Button
        variant="ghost"
        className={`text-white w-full md:w-auto justify-start md:justify-center text-base md:text-sm font-normal hover:bg-blue-200/20`}
        onClick={() => navigate(ROUTES.CHANGELOG)}
      >
        Changelog
      </Button>
    </>
  );
};