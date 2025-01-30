import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const NavLinks = () => {
    const navigate = useNavigate();
}

export const PricingSection = () => {
  return (
    <div id="pricing-section" className="py-12 mt-12 relative overflow-hidden">
      <div className="container px-4 mx-auto text-center items-center relative z-10">
        <div className="flex flex-col items-center gap-8 mt-12">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-blue-500/20">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-Purple-200">Get access</span>
          </div>
        </div>
        {/* Heading */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-medium text-white mb-4">
            We like keeping things simple
          </h2>
          <p className="text-3xl sm:text-4xl text-white/90">
            One plan one price.
          </p>
        </div>
        {/* Pricing */}
        <div className="mb-12">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-6xl bg-gradient-to-r from-blue-400 to-purple-200 bg-clip-text text-transparent">
              $0
            </span>
            <div className="text-white/60 flex flex-col items-start">
              <span>/month (billed annually)</span>
            </div>
          </div>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-5">
          <div className="flex items-center gap-2 text-white">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
            <span>Track your spending and stay within budget</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
            <span>Set and achieve your savings targets</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
            <span>Plan and monitor your Subscriptions</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
            <span>Manage and reduce your debts effectively</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
            <span>Analyze your financial patterns</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
            <span>Track all your expenses in one place</span>
          </div>
        </div>
        {/* CTA Button */}
        <Button
          className="w-[300px] mt-8 bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF] hover:bg-clip-text hover:text-transparent transition-colors duration-200 rounded-full"
        >
          Start your Free-Trial
        </Button>
      </div>
      {/* Background Gradient */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 translate-y-1/2 w-[300px] h-[500px] opacity-40 pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-500/30 to-purple-600/30 blur-3xl" />
      </div>
    </div>
  );
};
