import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import  Stack  from "@/components/ui/Stack";
export const MissionSection = () => {
  return (
    <section className="py-4 relative">
      <div className="max-w-4xl mx-auto text-center mb-0">
        <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
        <p className="text-xl italic text-gray-300">
          Is to empower individuals to take control of their personal finances
          with innovative tools and actionable insights. We strive to simplify
          financial management, helping you save smarter, spend wisely, and
          achieve your financial goals with confidence and ease.
        </p>
      </div>
      <Carousel className="max-w-4x3 mx-12 ">
        <CarouselContent>
          <CarouselItem>
            <Stack />
          </CarouselItem>
        </CarouselContent>
        <div className="flex justify-between items-center mt-0"></div>
      </Carousel>
    </section>
  );
};