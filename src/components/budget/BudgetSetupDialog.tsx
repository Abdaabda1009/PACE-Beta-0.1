import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface BudgetSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const BudgetSetupDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: BudgetSetupDialogProps) => {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [fixedExpenses, setFixedExpenses] = useState(0);
  const [variableExpenses, setVariableExpenses] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to set up your budget",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("budget_setup")
        .upsert({
          user_id: user.id,
          monthly_income: monthlyIncome,
          fixed_expenses: fixedExpenses,
          variable_expenses: variableExpenses,
          monthly_savings: monthlySavings,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Budget setup saved successfully",
      });
      
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving budget setup:", error);
      toast({
        title: "Error",
        description: "Failed to save budget setup",
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
          <DialogTitle className="text-white">Budget Setup</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Monthly Income</label>
            <Input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="bg-[#242837] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Fixed Expenses</label>
            <Input
              type="number"
              value={fixedExpenses}
              onChange={(e) => setFixedExpenses(Number(e.target.value))}
              className="bg-[#242837] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Variable Expenses</label>
            <Input
              type="number"
              value={variableExpenses}
              onChange={(e) => setVariableExpenses(Number(e.target.value))}
              className="bg-[#242837] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Monthly Savings</label>
            <Input
              type="number"
              value={monthlySavings}
              onChange={(e) => setMonthlySavings(Number(e.target.value))}
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
          <Button onClick={handleSave} disabled={isLoading}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};