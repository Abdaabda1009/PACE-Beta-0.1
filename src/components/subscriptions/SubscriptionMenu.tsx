import { Button } from "@/components/ui/button";
import { Edit2, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SubscriptionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const SubscriptionMenu = ({ onEdit, onDelete }: SubscriptionMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-white"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#1A1F2C] border-gray-800">
        <DropdownMenuItem 
          className="text-gray-400 hover:text-white focus:text-white cursor-pointer"
          onClick={onEdit}
        >
          <Edit2 className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-red-400 hover:text-red-300 focus:text-red-300 cursor-pointer"
          onClick={onDelete}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Remove</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  };