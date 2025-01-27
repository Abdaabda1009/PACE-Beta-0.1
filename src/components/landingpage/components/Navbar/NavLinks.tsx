import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/constants";

const navLinkStyle = "hover:bg-white/5 transition-colors duration-200";

export const NavLinks = () => {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    const featuresSection = document.querySelector("#features-grid");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPricing = () => {
    const pricingSection = document.querySelector("#pricing-section");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  

  return (
    <>
      <Button
        variant="ghost"
        className={`text-white ${navLinkStyle} w-full md:w-auto justify-start md:justify-center text-base md:text-sm font-normal`}
        onClick={scrollToFeatures}
      >
        Product
      </Button>

      <Button
        variant="ghost"
        className={`text-white ${navLinkStyle} w-full md:w-auto justify-start md:justify-center text-base md:text-sm font-normal`}
        onClick={scrollToPricing}
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
        onClick={() => navigate(ROUTES.BLOG)}
      >
        Blog
      </Button>

      <Button
        variant="ghost"
        className={`text-white ${navLinkStyle} w-full md:w-auto justify-start md:justify-center text-base md:text-sm font-normal`}
        onClick={() => navigate(ROUTES.CHANGELOG)}
      >
        Changelog
      </Button>
    </>
  );
};
