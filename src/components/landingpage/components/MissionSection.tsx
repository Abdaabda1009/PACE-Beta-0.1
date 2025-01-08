import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import  Stack  from "@/components/ui/Stack";

export const MissionSection = () => {
  return (
    <section className="py-12 lg:py-20 relative px-4 lg:px-0">
      <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
          Our Mission
        </h2>
        <p className="text-base sm:text-lg lg:text-xl italic text-gray-300">
          Is to empower individuals to take control of their personal finances
          with innovative tools and actionable insights. We strive to simplify
          financial management, helping you save smarter, spend wisely, and
          achieve your financial goals with confidence and ease.
        </p>
      </div>

      <Carousel className="max-w-[280px] sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
        <CarouselContent>
          <CarouselItem>
            <Stack />
          </CarouselItem>
        </CarouselContent>
        <div className="flex justify-between items-center mt-8">
          <span className="text-gray-300 text-sm sm:text-base lg:text-lg">
            ← Swipe left
          </span>
          <span className="text-gray-300 text-sm sm:text-base lg:text-lg">
            Swipe right →
          </span>
        </div>
      </Carousel>
    </section>
  );
};
