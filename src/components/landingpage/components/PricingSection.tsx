import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const PricingSection = () => {
  return (
    <div
      id="pricing-section"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 rounded-[12px]"
    >
      <div className="container px-4 mx-auto text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 transition-all duration-300 transform rounded-full bg-blue-500/10 hover:scale-105">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold text-blue-100">
              Unlock Premium Features
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="max-w-3xl mx-auto mb-12 space-y-6">
          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl bg-clip-text">
            Simple Pricing,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              Maximum Value
            </span>
          </h2>
          <p className="text-xl text-gray-300 sm:text-2xl">
            Start free. Upgrade anytime. No hidden fees.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="relative max-w-2xl mx-auto mb-12 overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
          <div className="p-8 sm:p-12">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
              <span className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                $0
              </span>
              <span className="text-lg text-gray-400">/month forever</span>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-4 mb-12 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Real-time budget tracking",
                "Smart savings goals",
                "Subscription management",
                "Debt reduction plans",
                "Financial analytics",
                "Cross-device sync",
                "Premium support",
                "Custom reports",
                "Data encryption",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start p-3 space-x-3 rounded-lg hover:bg-gray-700/20"
                >
                  <Sparkles className="flex-shrink-0 w-5 h-5 mt-1 text-purple-400" />
                  <span className="text-left text-gray-200">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button className="w-full py-6 text-lg font-semibold text-white transition-all duration-300 transform bg-transparent border-2 border-blue-600/50 rounded-xl hover:scale-105 hover:bg-blue-200/20 hover:shadow-xl">
              Get Started Free Today
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-sm text-gray-400">
          30-day premium trial available • Cancel anytime • SSL secured
        </p>

        {/* Background Effects */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] opacity-60 pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-600/50 to-purple-400/40 blur-2xl animate-pulse" />
        </div>
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-900 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>
    </div>
  );
};