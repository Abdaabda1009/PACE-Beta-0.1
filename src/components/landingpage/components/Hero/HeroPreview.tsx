import React from "react";
export const HeroPreview = () => {
  return (
    <div className="hidden lg:block relative">
      <div className="aspect-square rounded-lg  backdrop-blur-sm p-8">
      <img
      src="/assets/logoicon.png"
      alt="logo"
      className="object-cover rounded-lg"
      />
      </div>
    </div>
  );
};
