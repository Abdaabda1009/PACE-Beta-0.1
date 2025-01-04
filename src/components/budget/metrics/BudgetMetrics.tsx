import { BudgetCategory } from "@/types/budget";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";

interface BudgetMetricsProps {
  category: BudgetCategory;
}

export const BudgetMetrics = ({ category }: BudgetMetricsProps) => {
  const { formatAmount } = useCurrencyPreference();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-xs text-gray-400 mb-1">Assigned Budget</div>
        <div className="text-sm font-medium text-white">
          {formatAmount(category.assigned_budget)}
        </div>
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-1">Spent So Far</div>
        <div className="text-sm font-medium text-white">
          {formatAmount(category.spent_so_far || 0)}
        </div>
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-1">Remaining Budget</div>
        <div className="text-sm font-medium text-white">
          {formatAmount(
            category.assigned_budget - (category.spent_so_far || 0)
          )}
        </div>
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-1">Daily Allowance</div>
        <div className="text-sm font-medium text-white">
          {formatAmount(category.daily_allowance || 0)}
        </div>
      </div>
    </div>
  );
};
