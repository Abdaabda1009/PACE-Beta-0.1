// Move content from src/components/budget/AddBudgetDialog.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Home, Car, ShoppingCart, Lightbulb, Tv } from "lucide-react";

interface AddBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const BUDGET_CATEGORIES = [
  { id: "home", label: "Housing", icon: <Home className="w-4 h-4" /> },
  { id: "car", label: "Transportation", icon: <Car className="w-4 h-4" /> },
  { id: "cart", label: "Groceries", icon: <ShoppingCart className="w-4 h-4" /> },
  { id: "utilities", label: "Utilities", icon: <Lightbulb className="w-4 h-4" /> },
  { id: "entertainment", label: "Entertainment", icon: <Tv className="w-4 h-4" /> },
];

export const AddBudgetDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: AddBudgetDialogProps) => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [assignedBudget, setAssignedBudget] = useState(0);
  const [spentSoFar, setSpentSoFar] = useState(0);
  const [dailyAllowance, setDailyAllowance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to add a budget category",
          variant: "destructive",
        });
        return;
      }

      const selectedCategoryData = BUDGET_CATEGORIES.find(cat => cat.id === selectedCategory);
      
      if (!selectedCategoryData) {
        toast({
          title: "Error",
          description: "Please select a category",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("budget_categories").insert({
        title: selectedCategoryData.label,
        icon: selectedCategoryData.id,
        assigned_budget: assignedBudget,
        spent_so_far: spentSoFar,
        daily_allowance: dailyAllowance,
        user_id: user.id,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Budget category added successfully",
      });

      onSuccess();
      onOpenChange(false);
      // Reset form
      setSelectedCategory("");
      setAssignedBudget(0);
      setSpentSoFar(0);
      setDailyAllowance(0);
    } catch (error) {
      console.error("Error adding budget category:", error);
      toast({
        title: "Error",
        description: "Failed to add budget category",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Add Budget Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Category</label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="bg-[#242837] border-gray-800 text-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-gray-800">
                {BUDGET_CATEGORIES.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="text-gray-400 hover:text-white focus:text-white cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <span>{category.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Assigned Budget</label>
            <Input
              type="number"
              value={assignedBudget}
              onChange={(e) => setAssignedBudget(Number(e.target.value))}
              className="bg-[#242837] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Spent So Far</label>
            <Input
              type="number"
              value={spentSoFar}
              onChange={(e) => setSpentSoFar(Number(e.target.value))}
              className="bg-[#242837] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Daily Allowance</label>
            <Input
              type="number"
              value={dailyAllowance}
              onChange={(e) => setDailyAllowance(Number(e.target.value))}
              className="bg-[#242837] border-gray-800 text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button variant="default" 
          onClick={handleAdd} 
          disabled={isLoading}
          >
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
