import { Card } from "@/components/ui/card";
import { BudgetCategory } from "@/types/budget";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";
import { Button } from "@/components/ui/button";
import { Edit, Star, Trash } from "lucide-react";

interface BudgetCategoryCardProps {
  category: BudgetCategory;
  onEdit?: (category: BudgetCategory) => void;
  onRemove?: (category: BudgetCategory) => void;
  onPrioritize?: (category: BudgetCategory) => void;
}

export const BudgetCategoryCard = ({
  category,
  onEdit,
  onRemove,
  onPrioritize,
}: BudgetCategoryCardProps) => {
  const { formatAmount } = useCurrencyPreference();

  return (
    <Card className="p-6 bg-[#1A1F2C] border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white">{category.title}</h3>
        <div className="flex gap-2">
          {onPrioritize && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onPrioritize(category)}
              className="h-8 w-8 text-yellow-500 hover:text-yellow-400"
            >
              <Star className="h-4 w-4" />
            </Button>
          )}
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(category)}
              className="h-8 w-8 text-gray-400 hover:text-white"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onRemove && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(category)}
              className="h-8 w-8 text-red-500 hover:text-red-400"
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Assigned Budget</span>
          <span className="text-white">{formatAmount(category.assigned_budget)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Spent So Far</span>
          <span className="text-white">{formatAmount(category.spent_so_far || 0)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Daily Allowance</span>
          <span className="text-white">{formatAmount(category.daily_allowance || 0)}</span>
        </div>
      </div>
    </Card>
  );
};