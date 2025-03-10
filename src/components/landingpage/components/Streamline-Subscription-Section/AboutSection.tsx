import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Sparkles } from "lucide-react";
import { DashboardPic } from "./DashboardPic";

export const AboutSection = () => {
  return (
    <section
      id="company-section"
      className="relative overflow-hidden md:mr-24 py-8 h-full border-b md:border-blue-600/20"
    >
      <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Main content */}
        <div className=" mx-auto mr-4">
          {/* Left column - Text content */}
          <div className="space-y-8 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight ">
              Streamline Your
              <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                {" "}
                Subscriptions
              </span>
            </h2>
            <p className="text-1g text-gray-300">
              Managing multiple subscriptions doesn’t have to be complicated.
              Our platform unifies all your recurring payments into one
              intuitive dashboard, providing detailed analytics, timely alerts,
              and effortless management. Take control of your finances and focus
              on what matters most.
            </p>
            <div className="flex flex-col gap-8 mt-12">
              <div className="flex gap-2 w-[150px] px-4 py-2 rounded-full bg-green-500/10 border border-blue-500/20">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-Purple-200 animate-focus-in">
                  Our Products
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Button className="h-full w-[250px] border-2 md:border-blue-600/20 bg-transparent border hover:bg-blue-200/20 transition-colors duration-200">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-6 ">
              <DashboardPic />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
