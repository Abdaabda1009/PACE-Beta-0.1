import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Sparkles } from "lucide-react";
import { DashboardPic } from "./DashboardPic";

export const AboutSection = () => {
  return (
    <section
      id="company-section"
      className="relative overflow-hidden md:mr-24 py-6 border-b md:border-blue-600/20"
    >
      <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="mx-auto mr-4">
          <div className="space-y-8 mb-12">
            {/* Text Content */}
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight transition-[font-size] duration-300">
                Streamline Your
                <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                  {" "}
                  Subscriptions
                </span>
              </h2>
              <p className="text-lg text-gray-300 mt-6 md:mt-8 leading-relaxed">
                Managing multiple subscriptions doesn’t have to be complicated.
                Our platform unifies all your recurring payments into one
                intuitive dashboard, providing detailed analytics, timely
                alerts, and effortless management.
              </p>
            </div>

            {/* Our Products Badge */}
            <div className="flex flex-col gap-8 mt-12">
              <div className="inline-flex items-center w-[150px] gap-2 px-4 py-2 transition-all duration-300 transform rounded-full bg-blue-500/10 hover:scale-105">
                <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-sm text-purple-200 animate-focus-in">
                  Our Products
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-wrap gap-4 items-center">
              <Button
                className="group h-full max-w-[250px] w-full border-2 md:border-blue-600/20 bg-transparent hover:bg-blue-200/20 transition-all duration-300 hover:scale-[1.02]"
                aria-label="Learn more about our platform"
              >
                <span className="flex items-center gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </div>

            {/* Dashboard Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-6">
              <DashboardPic />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
