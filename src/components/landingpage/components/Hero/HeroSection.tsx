import React from "react";
import { HeroTitle } from "./HeroTitle";
import { HeroDescription } from "./HeroDescription";
import { HeroActions } from "./HeroActions";

export const HeroSection = () => {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center text-center py-12 px-2">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-4 ">
          <HeroTitle />
          <HeroDescription />
        </div>
        <HeroActions />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-500/30 to-purple-600/30 blur-3xl" />
      </div>
    </main>
  );
};
