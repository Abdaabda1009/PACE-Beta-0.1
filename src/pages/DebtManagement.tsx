import { DebtOverview } from "@/components/debt/DebtOverview";
import { DebtSnowballWidget } from "@/components/debt/DebtSnowballWidget";

export const DebtManagement = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Debt Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DebtSnowballWidget />
        <DebtOverview />
      </div>
    </div>
  );
};