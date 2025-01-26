import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export const HeroActions = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
      <Button
        size="lg"
        className="bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF] hover:bg-clip-text hover:text-transparent transition-colors duration-200"
        onClick={() => navigate("/login?view=sign_up")}
      >
        Sign Up for Early Access
      </Button>
      <span className="text-xs sm:text-sm text-dashboard-muted">Beta 1.0</span>
    </div>
  );
};
