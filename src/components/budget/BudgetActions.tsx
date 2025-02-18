import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical, Plus, Eye, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BudgetActionsProps {
  onExport: () => void;
  onAdd: () => void;
}

export const BudgetActions = ({ onExport, onAdd }: BudgetActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className=" w-[44px] h-[44px] text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#1A1F2C] border-gray-800">
        <DropdownMenuItem
          className="text-gray-400 hover:text-white focus:text-white cursor-pointer"
          onClick={onAdd}
        >
          <Plus className="mr-2 h-4 w-4" />
          <span>Add</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-gray-400 hover:text-white focus:text-white cursor-pointer"
          onClick={onExport}
        >
          <FileText className="mr-2 h-4 w-4" />
          <span>Export as PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-gray-400 hover:text-white focus:text-white cursor-pointer"
          onClick={() => navigate("/budget-planner")}
        >
          <Eye className="mr-2 h-4 w-4" />
          <span>View All</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};