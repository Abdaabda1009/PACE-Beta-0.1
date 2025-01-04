import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditDebtDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  debt: {
    title: string;
    totalDebt: string;
    monthlyPayment: string;
    remainingDebt: string;
    remainingTerm: string;
    dueDate: string;
    debtToIncome: string;
    interestRate: string;
  };
  onSave: (debt: Omit<EditDebtDialogProps["debt"], "icon" | "yearChange">) => void;
}

export const EditDebtDialog = ({
  open,
  onOpenChange,
  debt,
  onSave,
}: EditDebtDialogProps) => {
  const [formData, setFormData] = React.useState(debt);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  const debtOptions = [
    "Student Loan",
    "Mortgage Loan",
    "Credit Card Loan",
    "Personal Loan",
    "Auto Loan",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Edit Debt Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Debt Type</label>
            <Select
              value={formData.title}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, title: value }))
              }
            >
              <SelectTrigger className="w-full bg-[#050524] border-gray-800">
                <SelectValue placeholder="Select debt type" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-gray-800">
                {debtOptions.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="text-white hover:bg-[#050524] focus:bg-[#050524] focus:text-white"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm">Total Debt Amount</label>
            <Input
              value={formData.totalDebt}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, totalDebt: e.target.value }))
              }
              className="bg-[#050524] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Monthly Payment</label>
            <Input
              value={formData.monthlyPayment}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  monthlyPayment: e.target.value,
                }))
              }
              className="bg-[#050524] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Remaining Debt Amount</label>
            <Input
              value={formData.remainingDebt}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  remainingDebt: e.target.value,
                }))
              }
              className="bg-[#050524] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Remaining Term</label>
            <Input
              value={formData.remainingTerm}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  remainingTerm: e.target.value,
                }))
              }
              className="bg-[#050524] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Due Date</label>
            <Input
              value={formData.dueDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
              }
              className="bg-[#050524] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Debt-to-Income</label>
            <Input
              value={formData.debtToIncome}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  debtToIncome: e.target.value,
                }))
              }
              className="bg-[#050524] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Interest Rate</label>
            <Input
              value={formData.interestRate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  interestRate: e.target.value,
                }))
              }
              className="bg-[#050524] border-gray-800 text-white"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-transparent border-gray-800 text-white hover:bg-[#050524] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};