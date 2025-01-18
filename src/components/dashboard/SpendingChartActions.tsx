import { MoreVertical, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SpendingChartActionsProps {
  timeRange: '1Y' | '6M' | '3M' | '1M';
  onTimeRangeChange: (range: '1Y' | '6M' | '3M' | '1M') => void;
}

export const SpendingChartActions = ({
  timeRange,
  onTimeRangeChange,
}: SpendingChartActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2">
        <Button
          variant={timeRange === "1Y" ? "default" : "outline"}
          onClick={() => onTimeRangeChange("1Y")}
          className="w-[44px] h-[44px] p-[10px] text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
        >
          1Y
        </Button>
        <Button
          variant={timeRange === "6M" ? "default" : "outline"}
          onClick={() => onTimeRangeChange("6M")}
          className="w-[44px] h-[44px] p-[10px] text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
        >
          6M
        </Button>
        <Button
          variant={timeRange === "3M" ? "default" : "outline"}
          onClick={() => onTimeRangeChange("3M")}
          className="w-[44px] h-[44px] p-[10px] text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
        >
          3M
        </Button>
        <Button
          variant={timeRange === "1M" ? "default" : "outline"}
          onClick={() => onTimeRangeChange("1M")}
          className="w-[44px] h-[44px] p-[10px] text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
        >
          1M
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-[44px] h-[44px] p-[10px] text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
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
            onClick={() => navigate("/analysis-goals")}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>View All</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-gray-400 hover:text-white focus:text-white cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            <span>Export as PDF</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};