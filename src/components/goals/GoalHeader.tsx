import { Button } from "@/components/ui/button";
import { Plus, Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GoalHeaderProps {
  onEditClick: () => void;
  onAddClick: () => void;
  onDeleteClick: () => void;
  hasGoals: boolean;
}

export const GoalHeader = ({ onEditClick, onAddClick, onDeleteClick, hasGoals }: GoalHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-white">Goals</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-[#050524] text-white border-gray-800 hover:bg-gray-800"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#1A1F2C] border-gray-800">
          <DropdownMenuItem 
            className="text-gray-400 hover:text-white focus:text-white cursor-pointer"
            onClick={() => navigate('/analysis-goals')}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>View All</span>
          </DropdownMenuItem>
          {hasGoals && (
            <>
              <DropdownMenuItem 
                className="text-gray-400 hover:text-white focus:text-white cursor-pointer"
                onClick={onEditClick}
              >
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-400 hover:text-red-300 focus:text-red-300 cursor-pointer"
                onClick={onDeleteClick}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Remove</span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem 
            className="text-gray-400 hover:text-white focus:text-white cursor-pointer"
            onClick={onAddClick}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>Add New</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};