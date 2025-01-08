import React from "react";
import { HeroTitle } from "./HeroTitle";
import { HeroDescription } from "./HeroDescription";
import { HeroActions } from "./HeroActions";
import { HeroPreview } from "./HeroPreview";

export const HeroSection = () => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-8 lg:py-16">
      <div className="space-y-6 lg:space-y-8 px-4 lg:px-0">
        <div className="space-y-4">
          <HeroTitle />
          <HeroDescription />
        </div>
        <HeroActions />
      </div>
      <HeroPreview />
    </main>
  );
};
