import { useState } from "react";
import { SpendingChartContent } from "./SpendingChartContent";
import { SpendingChartActions } from "./SpendingChartActions";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useStatsSync } from "@/hooks/useStatsSync";

interface SpendingChartProps {
  timeRange: "1Y" | "6M" | "3M" | "1M";
  onTimeRangeChange: (range: "1Y" | "6M" | "3M" | "1M") => void;
}

export const SpendingChart = ({
  timeRange,
  onTimeRangeChange,
}: SpendingChartProps) => {
  const [loading, setLoading] = useState(false);
  const { formatAmount } = useCurrencyPreference();
  const { stats } = useStatsSync();

  const { data: chartData } = useQuery({
    queryKey: ["monthly-expenses-and-income"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      // Fetch monthly expenses
      const { data: expensesData, error: expensesError } = await supabase
        .from("stats")
        .select("value, created_at")
        .eq("user_id", user.id)
        .eq("title", "Monthly Expenses")
        .order("created_at", { ascending: true })
        .limit(6);

      if (expensesError) {
        console.error("Error fetching monthly expenses:", expensesError);
        return [];
      }

      // Fetch monthly income
      const { data: incomeData, error: incomeError } = await supabase
        .from("stats")
        .select("value, created_at")
        .eq("user_id", user.id)
        .eq("title", "Monthly Income")
        .order("created_at", { ascending: true })
        .limit(6);

      if (incomeError) {
        console.error("Error fetching monthly income:", incomeError);
        return [];
      }

      // Combine expenses and income data
      return expensesData.map((expense, index) => ({
        month: new Date(expense.created_at).toLocaleString("default", {
          month: "short",
        }),
        expenses: expense.value || 0,
        income: incomeData[index]?.value || 0,
      }));
    },
  });

  const monthlyExpenses =
    stats?.find((stat) => stat.title === "Monthly Expenses")?.value || 0;
  const previousMonthExpenses =
    chartData?.[chartData.length - 2]?.expenses || 0;
  const spendingPercentage = previousMonthExpenses
    ? ((monthlyExpenses - previousMonthExpenses) / previousMonthExpenses) * 100
    : 0;

  return (
    <div className="bg-dashboard-card px-8 py-6 rounded-xl border border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Spending</h2>
          <p className="text-gray-400">Track your monthly spending</p>
        </div>
        <SpendingChartActions
          timeRange={timeRange}
          onTimeRangeChange={onTimeRangeChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#050524] rounded-lg p-4">
          <p className="text-gray-400 mb-1">Average Spending</p>
          <p className="text-2xl font-semibold text-white">
            {formatAmount(monthlyExpenses)}
          </p>
        </div>
        <div className="bg-[#050524] rounded-lg p-4">
          <p className="text-gray-400 mb-1">vs Last Month</p>
          <p
            className={`text-2xl font-semibold ${
              spendingPercentage > 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {spendingPercentage > 0 ? "+" : ""}
            {spendingPercentage.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="h-[300px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Loading...</p>
          </div>
        ) : (
          <SpendingChartContent data={chartData || []} />
        )}
      </div>
    </div>
  );
};
