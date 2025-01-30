import { DebtOverview } from "@/components/debt/DebtOverview";
import { DebtSnowballWidget } from "@/components/debt/DebtSnowballWidget";

export const DebtManagement = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-semibold text-white text-center sm:text-left">
        Debt Management
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <DebtOverview />
        <DebtSnowballWidget />
      </div>
    </div>
  );
};
