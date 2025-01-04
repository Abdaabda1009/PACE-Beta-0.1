

interface DashboardBudgetHeaderProps {
  onExport: () => void;
  onAdd: () => void;
}

export const DashboardBudgetHeader = ({ onExport }: DashboardBudgetHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-[30px] font-semibold text-white">Budget Overview</h2>
        <p className="text-[16px] text-gray-400">Track your budget performance</p>
      </div>
    </div>
  );
};