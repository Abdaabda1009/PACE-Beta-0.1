import React from "react";
import { Sparkles } from "lucide-react";

export const HeroDescription = () => {
  return (
    <div className="flex flex-col items-center gap-8 mt-12">
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-blue-500/20">
        <Sparkles className="w-4 h-4 text-blue-400" />
        <span className="text-sm text-Purple-200 animate-focus-in">
          Effortlessly monitor all your subscriptions in one place
        </span>
      </div>
    </div>
  );
};
