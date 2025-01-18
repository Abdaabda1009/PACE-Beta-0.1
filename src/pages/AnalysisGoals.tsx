import { GoalsCard } from "@/components/goals/GoalsCard";
import { BudgetUtilization } from "@/components/financial/BudgetUtilization";
import {
  Wallet,
  TrendingUp,
  DollarSign,
  Briefcase,
  Home,
  Car,
  Heart,
  Music,
} from "lucide-react";

export const AnalysisGoals = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-white">Analysis & Goals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GoalsCard />
        <div className="space-y-6">
          <BudgetUtilization />
        </div>
      </div>
    </div>
  );
};
