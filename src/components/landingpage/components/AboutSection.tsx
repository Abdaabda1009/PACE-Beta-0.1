import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, LineChart, Wallet } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";

export const AboutSection = () => {
  return (
    <section id="company-section" className="py-12 mt-12 relative overflow-hidden ">
      <div className="container px-4 mx-auto">
        {/* Main content */}
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            {/* Left column - Text content */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Your Personal
                <span className="bg-gradient-to-r from-blue-400 to-purple-200 bg-clip-text text-transparent">
                  {" "}
                  Finance Assistant
                </span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Take control of your financial future with our comprehensive
                suite of tools. Track expenses, manage investments, and achieve
                your financial goals with ease.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="h-full bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF] hover:bg-clip-text hover:text-transparent transition-colors duration-200">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Right column - Features grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Feature 1 */}
              <SpotlightCard className="relative border-0 bg-transparent h-[100%]">
                <Shield className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Secure
                </h3>
                <p className="text-gray-400">
                  Bank-grade security for your financial data
                </p>
              </SpotlightCard>

              {/* Feature 2 */}
              <SpotlightCard className="relative border-0 bg-transparent h-[100%]">
                <LineChart className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Analytics
                </h3>
                <p className="text-gray-400">
                  Detailed insights into your spending habits
                </p>
              </SpotlightCard>

              {/* Feature 3 */}
              <SpotlightCard className="relative border-0 bg-transparent h-[100%]">
                <Wallet className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Budgeting
                </h3>
                <p className="text-gray-400">
                  Smart tools to help you save more
                </p>
              </SpotlightCard>

              {/* Feature 4 */}
              <SpotlightCard className="relative border-0 bg-transparent h-[100%]">
                <Shield className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Goals</h3>
                <p className="text-gray-400">
                  Track and achieve your financial targets
                </p>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};