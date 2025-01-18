import { BudgetCategory } from "@/types/budget";
import { MoreVertical, Edit, ArrowUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { BudgetIcon } from "../BudgetIcon";

interface BudgetListProps {
  categories: BudgetCategory[];
  onEdit: (budget: BudgetCategory) => void;
  onPrioritize: (budget: BudgetCategory) => void;
  onRemove: (budget: BudgetCategory) => void;
}

export const BudgetList = ({ 
  categories, 
  onEdit, 
  onPrioritize, 
  onRemove 
}: BudgetListProps) => {
  const { formatAmount } = useCurrencyPreference();

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
      {categories.map((category) => (
        <div key={category.id} className="bg-[#1A1F2C] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#0C0C55] p-2 w-[28px] h-[28px] rounded-[8px] flex items-center justify-center">
                <span className="text-white">{category.icon}</span>
              </div>
              <span className="text-sm font-medium text-white">{category.title}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-[32px] h-[32px] p-[6px] text-gray-400 hover:text-white"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#1A1F2C] border-gray-800">
                <DropdownMenuItem
                  className="text-gray-400 hover:text-white focus:text-white cursor-pointer"
                  onClick={() => onEdit(category)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-gray-400 hover:text-white focus:text-white cursor-pointer"
                  onClick={() => onPrioritize(category)}
                >
                  <ArrowUp className="mr-2 h-4 w-4" />
                  <span>Prioritize</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem
                  className="text-red-500 hover:text-red-400 focus:text-red-400 cursor-pointer"
                  onClick={() => onRemove(category)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Remove</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
                {formatAmount(category.assigned_budget - (category.spent_so_far || 0))}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Daily Allowance</div>
              <div className="text-sm font-medium text-white">
                {formatAmount(category.daily_allowance || 0)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};