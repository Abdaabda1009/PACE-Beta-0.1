import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const AuthButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <Button
        variant="outline"
        className="text-white hover:text-dashboard-background text-sm px-3 py-1.5"
        onClick={() => navigate("/login")}
      >
        Sign In
      </Button>
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5"
        onClick={() => navigate("/login?view=sign_up")}
      >
        Get Started
      </Button>
    </div>
  );
};
