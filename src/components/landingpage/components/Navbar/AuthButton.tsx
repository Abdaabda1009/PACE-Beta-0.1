import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const AuthButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        variant="ghost"
        className="text-white/90 hover:text-white hover:bg-white/10 text-sm font-medium px-3 sm:px-4"
        onClick={() => navigate("/login")}
      >
        Sign In
      </Button>
      <Button
        className=" bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF] hover:bg-[#4F378B]/90 text-white text-sm font-medium px-3 sm:px-4"
        onClick={() => navigate("/login?view=sign_up")}
      >
        Get Started
      </Button>
    </div>
  );
};
