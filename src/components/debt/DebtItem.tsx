import React from "react";
import { DebtItemDetails } from "./DebtItemDetails";
import { Button } from "../ui/button";
import { Edit, MoreVertical, Trash2, LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

interface DebtItemProps {
  id: string;
  icon: LucideIcon;
  title: string;
  totalDebt: string;
  monthlyPayment: string;
  remainingDebt: string;
  remainingTerm: string;
  dueDate: string;
  debtToIncome: string;
  interestRate: string;
  yearChange: string;
  onEdit?: () => void;
  onRemove?: () => void;
}

export const DebtItem = ({
  icon: Icon,
  title,
  onEdit,
  onRemove,
  ...debtDetails
}: DebtItemProps) => (
  <div className="bg-dashboard-background p-4 rounded-lg">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3 flex-1">
        <div className="bg-[#0C0C55] p-1.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-white" strokeWidth={2} />
        </div>
        <span className="text-sm font-medium text-white truncate">{title}</span>
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
        <DropdownMenuContent
          align="end"
          className="bg-dashboard-background border-gray-800"
        >
          {onEdit && (
            <DropdownMenuItem
              className="text-gray-400 hover:text-white focus:text-white cursor-pointer"
              onClick={onEdit}
            >
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
          )}
          {onRemove && (
            <>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem
                className="text-red-500 hover:text-red-400 focus:text-red-400 cursor-pointer"
                onClick={onRemove}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Remove</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <DebtItemDetails {...debtDetails} />
  </div>
);
