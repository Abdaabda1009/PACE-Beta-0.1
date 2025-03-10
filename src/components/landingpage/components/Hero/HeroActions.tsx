
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { ROUTES } from "@/lib/constants";

export const HeroActions = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("SignUp");
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
      <SpotlightCard
        className="w-[250px] h-[60px] border-0 p-1 rounded-lg bg-transparent flex justify-center hover:scale-105"
        spotlightColor="rgba(65, 126, 223, 0.25)"
      >
        <Button
          className="h-full w-full bg-transparent border-2 md:border-blue-600/50 hover:bg-blue-600/5 transition-colors duration-200 rounded-lg text-whitefont-semibold"
          onClick={handleNavigation}
        >
          Get Early Access
        </Button>
      </SpotlightCard>
      <span className="text-xs sm:text-sm text-dashboard-muted">Beta 1.0</span>
    </div>
  );
};
