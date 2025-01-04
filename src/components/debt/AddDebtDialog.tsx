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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AddDebtDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDebtAdded: () => void;
}

export const AddDebtDialog = ({
  open,
  onOpenChange,
  onDebtAdded,
}: AddDebtDialogProps) => {
  const [title, setTitle] = useState("");
  const [totalDebt, setTotalDebt] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [remainingDebt, setRemainingDebt] = useState("");
  const [remainingTerm, setRemainingTerm] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [debtToIncome, setDebtToIncome] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [icon, setIcon] = useState("credit-card");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to add a debt",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("debts").insert({
        user_id: user.id,
        title,
        total_debt: parseFloat(totalDebt),
        monthly_payment: parseFloat(monthlyPayment),
        remaining_debt: parseFloat(remainingDebt),
        remaining_term: remainingTerm,
        due_date: dueDate,
        debt_to_income: parseFloat(debtToIncome),
        interest_rate: interestRate,
        icon,
        year_change: 0, // Default value for new debts
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Debt added successfully",
      });
      
      onDebtAdded();
      onOpenChange(false);
      // Reset form
      setTitle("");
      setTotalDebt("");
      setMonthlyPayment("");
      setRemainingDebt("");
      setRemainingTerm("");
      setDueDate("");
      setDebtToIncome("");
      setInterestRate("");
      setIcon("credit-card");
    } catch (error) {
      console.error("Error adding debt:", error);
      toast({
        title: "Error",
        description: "Failed to add debt",
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
          <DialogTitle className="text-white">Add New Debt</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Type</label>
            <Select value={icon} onValueChange={setIcon}>
              <SelectTrigger className="bg-[#242837] border-gray-800 text-white">
                <SelectValue placeholder="Select debt type" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-gray-800">
                <SelectItem value="graduation-cap" className="text-white">Student Loan</SelectItem>
                <SelectItem value="home" className="text-white">Mortgage</SelectItem>
                <SelectItem value="credit-card" className="text-white">Credit Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#242837] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Total Debt Amount</label>
            <Input
              type="number"
              value={totalDebt}
              onChange={(e) => setTotalDebt(e.target.value)}
              className="bg-[#242837] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Monthly Payment</label>
            <Input
              type="number"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(e.target.value)}
              className="bg-[#242837] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Remaining Debt</label>
            <Input
              type="number"
              value={remainingDebt}
              onChange={(e) => setRemainingDebt(e.target.value)}
              className="bg-[#242837] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Remaining Term</label>
            <Input
              value={remainingTerm}
              onChange={(e) => setRemainingTerm(e.target.value)}
              className="bg-[#242837] border-gray-800 text-white"
              placeholder="e.g., 24 months"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Due Date</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-[#242837] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Debt-to-Income Ratio (%)</label>
            <Input
              type="number"
              value={debtToIncome}
              onChange={(e) => setDebtToIncome(e.target.value)}
              className="bg-[#242837] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Interest Rate (%)</label>
            <Input
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
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
          <Button
            onClick={handleSave}
            disabled={!title || !totalDebt || !monthlyPayment || !remainingDebt || !remainingTerm || !dueDate || !debtToIncome || !interestRate || isLoading}
          >
            Add Debt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};