import { BudgetOverview } from "@/components/budget/BudgetOverview";

export const BudgetPlanner = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Budget Planner</h1>
      </div>
      <BudgetOverview />
    </div>
  );
};