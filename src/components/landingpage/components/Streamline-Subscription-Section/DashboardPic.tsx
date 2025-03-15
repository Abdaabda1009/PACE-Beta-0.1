import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

export const DashboardPic = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 w-full">
      {/* Card 1 - Renewal Reminders */}
      <Card className="relative w-full md:w-[400px] border-2 border-blue-500/20 overflow-hidden rounded-xl p-3 sm:p-4 bg-gradient-to-r from-[rgba(32,0,121,0)] to-[rgba(6,44,95,0.3)] backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 group h-full">
        <div className="h-36 sm:h-48 md:h-60 w-full rounded-xl flex items-center justify-center overflow-hidden">
          <img
            className="w-full h-full object-cover border-b border-blue-500/30 group-hover:border-blue-500/50 transition-all"
            src="\LandingAssets\Reminder-2.png"
            alt="Renewal reminders interface"
          />
        </div>
        <div className="mt-3 sm:mt-4 space-y-2">
          <h3 className="text-white font-semibold text-lg sm:text-xl tracking-tight">
            Renewal Reminders
          </h3>
          <p className="text-gray-300/90 text-sm sm:text-base leading-snug">
            Never miss a renewal with instant alerts and payment reminders
          </p>
        </div>
      </Card>

      {/* Card 2 - Subscription Overview */}
      <Card className="relative w-full md:w-[800px] md:ml-24 border-2 border-blue-500/20 overflow-hidden rounded-xl p-3 sm:p-4 bg-gradient-to-b from-[rgba(32,0,121,0)] to-[rgba(6,44,95,0.3)] backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 group h-full">
        <div className="h-36 sm:h-48 md:h-60 w-full rounded-xl flex items-center justify-center overflow-hidden relative">
          <img
            className="w-full h-full object-cover border-b border-blue-500/30 group-hover:border-blue-500/50 transition-all"
            src="\LandingAssets\Sub-view-1.png"
            alt="Subscription overview dashboard"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
              <Play className="w-8 h-8 text-white stroke-[1.5]" />
            </button>
          </div>
        </div>
        <div className="mt-3 sm:mt-4 space-y-2">
          <h3 className="text-white font-semibold text-lg sm:text-xl tracking-tight">
            Subscription Overview
          </h3>
          <p className="text-gray-300/90 text-sm sm:text-base leading-snug">
            View all your active subscriptions in one convenient dashboard
          </p>
        </div>
      </Card>

      {/* Card 3 - Plan Management */}
      <Card className="relative w-full md:w-[800px] border-2 border-blue-500/20 overflow-hidden rounded-xl p-3 sm:p-4 bg-gradient-to-b from-[rgba(32,0,121,0)] to-[rgba(6,44,95,0.3)] backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 group h-full">
        <div className="h-36 sm:h-48 md:h-60 w-full rounded-xl flex items-center justify-center overflow-hidden">
          <img
            className="w-full h-full object-cover border-b border-blue-500/30 group-hover:border-blue-500/50 transition-all"
            src="\LandingAssets\Mang-2.png"
            alt="Plan management interface"
          />
        </div>
        <div className="mt-3 sm:mt-4 space-y-2">
          <h3 className="text-white font-semibold text-lg sm:text-xl tracking-tight">
            Plan Management
          </h3>
          <p className="text-gray-300/90 text-sm sm:text-base leading-snug">
            Easily manage your subscription plans, update details, and schedule
            renewals
          </p>
        </div>
      </Card>

      {/* Card 4 - Billing History */}
      <Card className="relative w-full md:w-[400px] md:ml-[500px] border-2 border-blue-500/20 overflow-hidden rounded-xl p-3 sm:p-4 bg-gradient-to-r from-[rgba(32,0,121,0)] to-[rgba(6,44,95,0.3)] backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 group h-full">
        <div className="h-36 sm:h-48 md:h-60 w-full rounded-xl flex items-center justify-center overflow-hidden">
          <img
            className="w-full h-full object-cover border-b border-blue-500/30 group-hover:border-blue-500/50 transition-all"
            src="\LandingAssets\bliling-4.png"
            alt="Billing history dashboard"
          />
        </div>
        <div className="mt-3 sm:mt-4 space-y-2">
          <h3 className="text-white font-semibold text-lg sm:text-xl tracking-tight">
            Billing History
          </h3>
          <p className="text-gray-300/90 text-sm sm:text-base leading-snug">
            Review past billing statements and track recurring payments
            effortlessly
          </p>
        </div>
      </Card>
    </div>
  );
};
