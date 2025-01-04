import { Goal } from "./types";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";

interface GoalStatsProps {
  goal: Goal;
}

export const GoalStats = ({ goal }: GoalStatsProps) => {
  const { formatAmount } = useCurrencyPreference();
  const progress = (goal.saved_amount / goal.target_amount) * 100;
  const remaining = goal.target_amount - goal.saved_amount;

  return (
    <div className="grid grid-cols-4 gap-20">
      <div>
        <p className="text-sm text-gray-400">Target Amount</p>
        <p className="text-lg font-semibold text-white">
          {formatAmount(goal.target_amount)}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Saved Amount</p>
        <p className="text-lg font-semibold text-white">
          {formatAmount(goal.saved_amount)}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Remaining</p>
        <p className="text-lg font-semibold text-white">
          {formatAmount(remaining)}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Progress</p>
        <p className="text-lg font-semibold text-white">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};
