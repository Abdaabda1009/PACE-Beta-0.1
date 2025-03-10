import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const NavLinks = () => {
  const navigate = useNavigate();
};

export const PricingSection = () => {
  return (
    <div id="pricing-section" className=" mt-12 relative overflow-hidden">
      <div className="container px-4 sm:px-4 mx-auto text-center items-center">
        <div className="flex flex-col items-center gap-6 mb-4">
          <div className="flex items-center gap-2 px-4 py-2 mb-2 rounded-full bg-green-500/10 border border-blue-500/20">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-purple-200">Get access</span>
          </div>
        </div>
        {/* Heading */}
        <div className="max-w-lg sm:max-w-1xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-2xl md:text-5xl font-medium text-white mb-4">
            We like keeping things simple
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl text-white/90">
            One plan, one price.
          </p>
        </div>
        {/* Pricing */}
        <div className="mb-10">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl sm:text-6xl bg-gradient-to-r from-blue-400 to-purple-200 bg-clip-text text-transparent">
              $0
            </span>
            <div className="text-white/60 flex flex-col items-start">
              <span>/month (billed annually)</span>
            </div>
          </div>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
          {[
            "Track your spending and stay within budget",
            "Set and achieve your savings targets",
            "Plan and monitor your subscriptions",
            "Manage and reduce your debts effectively",
            "Analyze your financial patterns",
            "Track all your expenses in one place",
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-white">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        {/* CTA Button */}
        <Button className="h-full w-[30%] py-3 bg-transparent border md:border-blue-600/50 hover:bg-blue-200/20 transition-colors duration-200 mt-16">
          Start your Free Trial
        </Button>
      </div>
      <span className="text-xs sm:text-sm text-dashboard-muted ml-[745px] "></span>
      {/* Background Gradient */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 translate-y-1/2 w-[300px] h-[500px] opacity-40 pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-500/30 to-blue-600/30 blur-3xl" />
      </div>
    </div>
  );
};
