import React from "react";
import { Button } from "@/components/ui/button";

export const MobileAppSection = () => {
  return (
    <section className="py-6 items-center md:mr-[300px] justify-center relative border-b md:border-blue-600/10">
      <div className="container mx-auto px-6 ">
        {/* Top section: Text left, Phone right */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center  ml-0 md:ml-36">
          <div className="max-w-lg">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Comprehensive Subscription Overview
              </h1>
              <p className="text-gray-400 text-lg">
                Get a clear, detailed snapshot of all your active subscriptions
                in one place. Easily track billing cycles, monitor recurring
                payments, and gain valuable insights into your spending habits.
                Our dashboard is designed to help you stay in control of your
                finances, ensuring that you never miss a renewal or overpay for
                services.
              </p>
              <div className="mt-8">
                <Button
                  className="h-full w-full md:w-[250px] border-2 md:border-blue-600/20 bg-transparent border hover:bg-blue-200/20 transition-colors duration-200"
                  size="lg"
                >
                  Learn more
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-[280px] h-[550px] overflow-hidden rounded-[40px] shadow-lg">
              <img
                src="\LandingAssets\Mock1.png"
                alt="Mobile app subscription overview"
                className="w-full h-full object-cover hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Bottom section: Phone left, Text right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <div className="relative w-[280px] h-[550px] overflow-hidden rounded-[40px] shadow-lg ml-0 md:ml-36">
              <img
                src="\LandingAssets\Mock2.png"
                alt="Mobile app subscription details"
                className="w-full h-full object-cover hover:scale-105"
              />
            </div>
          </div>

          <div className="max-w-lg ml-auto order-1 md:order-2">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Subscription Insights
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              into the specifics of each subscription. Discover detailed billing
              cycles, payment history, and plan features—all designed to give
              you a complete understanding of your recurring services. This
              comprehensive view enables you to manage your expenses effectively
              and optimize your subscription strategy.
            </p>
            <div className="mt-8">
              <Button
                className="h-full w-full sm:w-auto sm:px-8 md:w-[250px] border-2 md:border-blue-600/20 bg-transparent border hover:bg-blue-200/20 transition-colors duration-200"
                size="lg"
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 translate-y-4/2 w-[80px] max-w-xs md:max-w-sm h-[50vh] opacity-40 pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-400/80 to-blue-800/50 blur-3xl" />
      </div>
    </section>
  );
};
