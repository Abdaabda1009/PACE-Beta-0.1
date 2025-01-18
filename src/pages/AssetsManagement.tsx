import { PortfolioChart } from "@/components/financial/assets/PortfolioChart";
import { CommunityPanel } from "@/components/financial/assets/CommunityPanel";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";
import { CryptoSection } from "@/components/Assets/Sections/CryptoSection";
import { StockSection } from "@/components/Assets/Sections/StockSection";
import { LoadingState } from "@/components/Assets/Sections/LoadingState";

export const AssetsManagement = () => {
  const { isLoading: isCurrencyLoading } = useCurrencyPreference();

  if (isCurrencyLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <LoadingState />
        </div>
      </div>
    );
  }

  return (
    <div className="text-white ">
      <div className="max-w-12xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <h1 className="text-3xl font-semibold text-white">
            Assets Management
          </h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="rounded-lg"></div>
            <StockSection />

            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-lg">
                <CryptoSection />
              </div>
              <PortfolioChart />
              <div className="rounded-lg"></div>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <CommunityPanel />
          </div>
        </div>
      </div>
    </div>
  );
};
