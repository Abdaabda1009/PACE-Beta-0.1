import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

export const DashboardPic = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 w-full">
      {/* Card 1 - Renewal Reminders*/}
      <Card className="relative w-full md:w-[400px] border border-blue-600/10 overflow-hidden rounded-lg p-3 sm:p-4 bg-gradient-to-r from-[rgba(32,0,121,0)] to-[rgba(6,44,95,0.3)] h-full">
        {/* Image Placeholder */}
        <div className="h-36 sm:h-48 md:h-60 w-full rounded-lg flex items-center justify-center">
          <img
            className="w-full h-full object-fit border-b border-blue-600/50"
            src="\LandingAssets\Reminder-2.png"
          />
        </div>
        {/* Content */}
        <div className="mt-3 sm:mt-4">
          <h3 className="text-white font-semibold text-base sm:text-lg">
            Renewal Reminders
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm">
            Never miss a renewal with instant alerts and payment reminders
          </p>
        </div>
      </Card>

      {/* Card 2 - Subscription Overview */}
      <Card className="relative w-full md:w-[800px] md:ml-24 border border-blue-600/10 overflow-hidden rounded-lg p-3 sm:p-4 bg-gradient-to-b from-[rgba(32,0,121,0)] to-[rgba(6,44,95,0.3)] h-full">
        <div className="h-36 sm:h-48 md:h-60 w-full bg-transparent rounded-lg flex items-center justify-center relative">
          {/* Video placeholder with play button overlay */}
          <img
            className="w-full h-full object-fit border-b border-blue-600/50"
            src="\LandingAssets\Sub-view-1.png"
          />
        </div>
        <div className="mt-3 sm:mt-4">
          <h3 className="text-white font-semibold text-base sm:text-lg">
            Subscription Overview
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm">
            View all your active subscriptions in one convenient dashboard.
          </p>
        </div>
      </Card>

      {/* Card 3 - Plan Management - Only visible on larger screens and up */}
      <Card className="relative w-full md:w-[800px] border border-blue-600/10 overflow-hidden rounded-lg p-3 sm:p-4 bg-gradient-to-b from-[rgba(32,0,121,0)] to-[rgba(6,44,95,0.3)] h-full">
        <div className="h-36 sm:h-48 md:h-60 w-full rounded-lg flex items-center justify-center">
          <img
            className="w-full h-full object-fit border-b border-blue-600/50"
            src="\LandingAssets\Mang-2.png"
          />
        </div>
        <div className="mt-3 sm:mt-4">
          <h3 className="text-white font-semibold text-base sm:text-lg">
            Plan Management
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm">
            Easily manage your subscription plans, update details, and schedule
            renewals.
          </p>
        </div>
      </Card>

      {/* Card 4 - Billing History*/}
      <Card className="relative w-full md:w-[400px] md:ml-[500px] border border-blue-600/10 overflow-hidden rounded-lg p-3 sm:p-4 bg-gradient-to-r from-[rgba(32,0,121,0)] to-[rgba(6,44,95,0.3)] h-full">
        <div className="h-36 sm:h-48 md:h-60 w-full rounded-lg flex items-center justify-center">
          <img
            className="w-full h-full object-fit border-b border-blue-600/50"
            src="\LandingAssets\bliling-4.png"
          />
        </div>
        <div className="mt-3 sm:mt-4">
          <h3 className="text-white font-semibold text-base sm:text-lg">
            Billing History
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm">
            Review past billing statements and track recurring payments
            effortlessly.
          </p>
        </div>
      </Card>
    </div>
  );
};
