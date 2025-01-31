import { DebtOverview } from "@/components/debt/DebtOverview";
import { DebtSnowballWidget } from "@/components/debt/DebtSnowballWidget";

export const DebtManagement = () => {
  return (
    <div className="space-y-6  mx-auto ">
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
