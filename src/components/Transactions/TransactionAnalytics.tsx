import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Transaction {
  type: "in" | "out";
  amount: number;
  category: string;
}

interface TransactionAnalyticsProps {
  transactions: Transaction[];
}

export const TransactionAnalytics = ({
  transactions,
}: TransactionAnalyticsProps) => {
  const { formatAmount } = useCurrencyPreference();

  const totalIncome = transactions
    .filter((t) => t.type === "in")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "out")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const categoryTotals = transactions
    .filter((t) => t.type === "out")
    .reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] || 0) + (t.amount || 0);
      return acc;
    }, {});

  const topCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const maxCategoryAmount = Math.max(...Object.values(categoryTotals));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4 bg-dashboard-card space-y-4 ">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-gray-400">Income</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{formatAmount(totalIncome)}</span>
              <ArrowUpRight className="w-4 h-4 text-dashboard-success" />
            </div>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-gray-400">Expenses</span>
            <div className="flex items-center gap-2 justify-end">
              <span className="font-medium">{formatAmount(totalExpenses)}</span>
              <ArrowDownRight className="w-4 h-4 text-dashboard-error" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Balance</span>
            <span className="font-medium">
              {formatAmount(totalIncome - totalExpenses)}
            </span>
          </div>
          <Progress
            value={totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0}
            className="h-2"
          />
        </div>
      </Card>

      <Card className=" bg-dashboard-card border-gray-800 p-4 space-y-4">
        <h3 className="font-medium">Top Categories</h3>
        <div className="space-y-4">
          {topCategories.map(([category, amount]) => (
            <div key={category} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">{category}</span>
                <span className="font-medium">{formatAmount(amount)}</span>
              </div>
              <Progress
                value={
                  maxCategoryAmount > 0 ? (amount / maxCategoryAmount) * 100 : 0
                }
                className="h-2"
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
