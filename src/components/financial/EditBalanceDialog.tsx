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
import { BudgetInputField } from "@/components/budget/form/BudgetInputField";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface EditBalanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditBalanceDialog = ({
  open,
  onOpenChange,
}: EditBalanceDialogProps) => {
  const { toast } = useToast();
  const { currency } = useCurrencyPreference();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update mock data
      mockStats[0].value = monthlyIncome;
      mockStats[0].created_at = new Date().toISOString();

      toast({
        title: "Success",
        description: "Monthly income updated successfully",
      });

      queryClient.invalidateQueries({ queryKey: ['monthly-income-stat'] });
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating monthly income:', error);
      toast({
        title: "Error",
        description: "Failed to update monthly income",
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
          <DialogTitle className="text-white">Edit Monthly Income</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <BudgetInputField
            label="Monthly Income"
            value={monthlyIncome}
            onChange={(value) => setMonthlyIncome(Number(value))}
            currency={currency}
            type="number"
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};