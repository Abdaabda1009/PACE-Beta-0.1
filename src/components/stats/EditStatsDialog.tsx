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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import "../../integrations/supabase/types";
import { BudgetSetup } from "@/types/budget";

interface EditStatsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const EditStatsDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: EditStatsDialogProps) => {
  const { toast } = useToast();
  const { currency } = useCurrencyPreference();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<BudgetSetup>>({
    monthly_income: 0,
    fixed_expenses: 0,
    variable_expenses: 0,
    monthly_savings: 0,
  });

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const { data: BetaBudget_setup, error: budgetError } = await supabase
        .from("budget_setup")
        .select("*")
        .single();

      if (budgetError && budgetError.code !== "PGRST116") {
        throw budgetError;
      }

      const operation = BetaBudget_setup
        ? supabase
            .from("budget_setup")
            .update({ ...formData, currency })
            .eq("id", BetaBudget_setup.id)
        : supabase.from("budget_setup").insert([
            {
              ...formData,
              currency,
              user_id: (await supabase.auth.getUser()).data.user?.id,
            },
          ]);

      const { error: operationError } = await operation;

      if (operationError) throw operationError;

      toast({
        title: "Success",
        description: "Budget statistics updated successfully",
      });

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating budget stats:", error);
      toast({
        title: "Error",
        description: "Failed to update budget statistics",
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
          <DialogTitle className="text-white">
            Edit Budget Statistics
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <BudgetInputField
            label="Monthly Income"
            value={formData.monthly_income}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                monthly_income: Number(value),
              }))
            }
            currency={currency}
            type="number"
          />
          <BudgetInputField
            label="Fixed Expenses"
            value={formData.fixed_expenses}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                fixed_expenses: Number(value),
              }))
            }
            currency={currency}
            type="number"
          />
          <BudgetInputField
            label="Variable Expenses"
            value={formData.variable_expenses}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                variable_expenses: Number(value),
              }))
            }
            currency={currency}
            type="number"
          />
          <BudgetInputField
            label="Monthly Savings"
            value={formData.monthly_savings}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                monthly_savings: Number(value),
              }))
            }
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
