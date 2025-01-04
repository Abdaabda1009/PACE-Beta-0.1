import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";
import { BudgetInputField } from "../form/BudgetInputField";
import { BudgetCategoryForm } from "@/types/budget";
import { useToast } from "@/hooks/use-toast";

interface EditBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  budget: BudgetCategoryForm;
  onSave: (updatedBudget: BudgetCategoryForm) => void;
}

export const EditBudgetDialog = ({
  open,
  onOpenChange,
  budget,
  onSave,
}: EditBudgetDialogProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(budget.title);
  const [assignedBudget, setAssignedBudget] = useState(budget.assignedBudget);
  const [spentSoFar, setSpentSoFar] = useState(budget.spentSoFar);
  const [dailyAllowance, setDailyAllowance] = useState(budget.dailyAllowance);
  const { currency } = useCurrencyPreference();

  const handleSave = async () => {
    try {
      const updatedBudget = {
        title,
        assignedBudget: Number(assignedBudget),
        spentSoFar: Number(spentSoFar),
        dailyAllowance: Number(dailyAllowance),
      };

      await onSave(updatedBudget);
      onOpenChange(false);
      toast({
        title: "Success",
        description: "Budget category updated successfully",
      });
    } catch (error) {
      console.error("Error updating budget:", error);
      toast({
        title: "Error",
        description: "Failed to update budget category",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Budget Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <BudgetInputField
            label="Title"
            value={title}
            onChange={(value) => setTitle(value.toString())}
            type="text"
          />
          <BudgetInputField
            label="Assigned Budget"
            value={assignedBudget}
            onChange={(value) => setAssignedBudget(Number(value))}
            currency={currency}
            type="number"
          />
          <BudgetInputField
            label="Spent So Far"
            value={spentSoFar}
            onChange={(value) => setSpentSoFar(Number(value))}
            currency={currency}
            type="number"
          />
          <BudgetInputField
            label="Daily Allowance"
            value={dailyAllowance}
            onChange={(value) => setDailyAllowance(Number(value))}
            currency={currency}
            type="number"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
