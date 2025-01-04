import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";
import { supabase } from "@/integrations/supabase/client";

interface SpendingCategory {
  category: string;
  amount: number;
  percentage: number;
}

export const BudgetUtilization = () => {
  const { formatAmount } = useCurrencyPreference();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["budget-utilization"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data: budgetCategories, error } = await supabase
        .from("budget_categories")
        .select("*")
        .eq("user_id", user.id)
        .order("spent_so_far", { ascending: false })
        .limit(5);

      if (error) throw error;

      // Calculate total spent for percentage calculations
      const totalSpent = budgetCategories.reduce(
        (sum, cat) => sum + (cat.spent_so_far || 0),
        0
      );

      return budgetCategories.map((category) => ({
        category: category.title,
        amount: category.spent_so_far || 0,
        percentage:
          totalSpent > 0
            ? ((category.spent_so_far || 0) / totalSpent) * 100
            : 0,
      }));
    },
  });

  if (isLoading) {
    return (
      <Card className="bg-dashboard-card border-gray-800">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-dashboard-card border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Budget Utilization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories?.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-200">{category.category}</span>
                <span className="text-gray-400">
                  {formatAmount(category.amount)} (
                  {Math.round(category.percentage)}%)
                </span>
              </div>
              <Progress
                value={category.percentage}
                className="h-2"
                indicatorClassName="bg-[#4ADE80]"
              />
            </div>
          ))}
          {!categories?.length && (
            <div className="text-center text-gray-400">
              No spending data available yet.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
