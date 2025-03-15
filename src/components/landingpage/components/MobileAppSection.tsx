import React from "react";
import { Button } from "@/components/ui/button";

export const MobileAppSection = () => {
  return (
    <section className="py-12 md:py-24 mt-24 rounded-[12px] relative overflow-hidden border-b border-blue-600/10 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16 mb-20 md:mb-32">
          <div className="flex-1 space-y-6 md:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight md:leading-[1.2]">
              Comprehensive Subscription Overview
            </h1>
            <p className="text-gray-300/90 text-lg md:text-xl leading-relaxed max-w-2xl">
              Get a clear, detailed snapshot of all your active subscriptions in
              one place. Easily track billing cycles, monitor recurring
              payments, and gain valuable insights into your spending habits.
            </p>
            <Button
              className="w-full md:w-auto px-8 py-6 text-lg bg-transparent border-2 border-blue-600/50 rounded-xl hover:scale-105 hover:bg-blue-200/20 hover:shadow-xl"
              size="lg"
            >
              Learn more
            </Button>
          </div>

          <div className="flex-1 flex justify-center md:justify-end relative">
            <div className="w-[280px] h-[580px] md:w-[320px] md:h-[640px] relative overflow-hidden rounded-[40px] shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
              <img
                src="/LandingAssets/Mock1.png"
                alt="Subscription overview interface"
                className="w-full h-full object-cover absolute inset-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 lg:gap-16">
          <div className="flex-1 space-y-6 md:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight md:leading-[1.2]">
              Subscription Insights
            </h1>
            <p className="text-gray-300/90 text-lg md:text-xl leading-relaxed max-w-2xl">
              Dive into the specifics of each subscription. Discover detailed
              billing cycles, payment history, and plan features—all designed to
              give you complete control over your recurring services.
            </p>
            <Button
              className="w-full md:w-auto px-8 py-6 text-lg bg-transparent border-2 border-blue-600/50 rounded-xl hover:scale-105 hover:bg-blue-200/20 hover:shadow-xl"
              size="lg"
            >
              Learn more
            </Button>
          </div>

          <div className="flex-1 flex justify-center md:justify-start relative">
            <div className="w-[280px] h-[580px] md:w-[320px] md:h-[640px] relative overflow-hidden rounded-[40px] shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
              <img
                src="/LandingAssets/Mock2.png"
                alt="Subscription details interface"
                className="w-full h-full object-cover absolute inset-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[50vh] bg-gradient-to-t from-blue-600/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-4xl h-[100vh] bg-gradient-radial from-blue-600/10 to-transparent opacity-40 blur-3xl" />
      </div>
    </section>
  );
};