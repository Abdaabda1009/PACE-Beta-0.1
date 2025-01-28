import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const AuthButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        variant="ghost"
        className="text-white/90 h-full border border-blue-500/30 hover:text-white bg-black/10 text-sm px-3 sm:px-4"
        onClick={() => navigate("/login")}
      >
        Sign In
      </Button>
      <Button
        className=" h-full bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF] hover:bg-clip-text hover:text-transparent transition-colors duration-200"
        onClick={() => navigate("/login?view=sign_up")}
      >
        Get Started
      </Button>
    </div>
  );
};
