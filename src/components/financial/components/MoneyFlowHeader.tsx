import { Button } from "@/components/ui/button";
import { MoreVertical, Eye, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MoneyFlowHeaderProps {
  type: "in" | "out";
  onExport: () => void;
}

export const MoneyFlowHeader = ({ type, onExport }: MoneyFlowHeaderProps) => {
  const isMoneyIn = type === "in";

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Money {isMoneyIn ? "In" : "Out"}
        </h2>
        <p className="text-sm text-gray-400">
          Track your {isMoneyIn ? "income" : "expenses"}
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-[44px] h-[44px] p-[10px] text-gray-400 hover:text-white bg-[#050524]"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-[#1A1F2C] border-gray-800"
        >
          <DropdownMenuItem
            className="text-gray-400 hover:text-white focus:text-white cursor-pointer"
            onClick={onExport}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Export as PDF</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-gray-400 hover:text-white focus:text-white cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            <span>View All</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
