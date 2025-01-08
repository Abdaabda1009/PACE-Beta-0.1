import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export const HeroActions = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4">
      <Button
        size="lg"
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base"
        onClick={() => navigate("/login?view=sign_up")}
      >
        TRY IT FREE
      </Button>
      <span className="text-xs sm:text-sm text-dashboard-muted">Beta 1.0</span>
    </div>
  );
};
