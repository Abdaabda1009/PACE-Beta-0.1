import { Progress } from "@/components/ui/progress";
import { Goal } from "./types";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";

interface GoalProgressProps {
  goal: Goal;
}

export const GoalProgress = ({ goal }: GoalProgressProps) => {
  const { formatAmount } = useCurrencyPreference();
  const progress = (goal.saved_amount / goal.target_amount) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-white font-medium">{goal.name}</span>
        <span className="text-gray-400">
          {formatAmount(goal.saved_amount)} / {formatAmount(goal.target_amount)}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between text-xs text-gray-400">
        <span>Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  );
};
