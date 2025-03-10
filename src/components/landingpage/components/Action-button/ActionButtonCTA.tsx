import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ActionButtonCTAProps {
  className?: string;
}

export const ActionButtonCTA = ({ className }: ActionButtonCTAProps) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div
      className={cn(
        "flex gap-4 mt-8",
        isMobile ? "flex-col items-center w-full" : "flex-row"
      )}
    >
      <SpotlightCard
        className={cn(
          "border-0 p-1 rounded-lg bg-transparent flex justify-center hover:scale-105 transition-transform duration-200",
          isMobile ? "w-full h-[50px]" : "w-[350px] h-[60px]"
        )}
        spotlightColor="rgba(65, 126, 223, 0.25)"
      >
        <Button
          className="h-full w-full bg-transparent border-2 md:border-blue-600/50 hover:bg-blue-600/5 transition-colors duration-200 rounded-lg text-white font-semibold"
          onClick={() => navigate("/login?view=sign_up")}
        >
          Download App
        </Button>
      </SpotlightCard>
    </div>
  );
};
