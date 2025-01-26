import { useState } from "react";
import {
  Bell,
  AlertCircle,
  MoreVertical,
  Edit,
  Eye,
  Home,
  CreditCard,
  Wallet,
  Building2,
  PiggyBank,
  DollarSign,
  Plus,
} from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { DebtItem } from "./DebtItem";
import { EditDebtDialog } from "./EditDebtDialog";
import { AddDebtDialog } from "./AddDebtDialog";
import { RemoveBudgetDialog } from "../budget/dialogs/RemoveBudgetDialog";
import { useDebts } from "../debt/DebtQueries";
import { useDeleteDebtMutation } from "../debt/DebtMutations";
import { Debt } from "../debt/types";
import { useNavigate } from "react-router-dom";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const debtIcons = {
  home: Home,
  credit: CreditCard,
  personal: Wallet,
  business: Building2,
  savings: PiggyBank,
  other: DollarSign,
} as const;

export const DebtOverview = () => {
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [removingDebt, setRemovingDebt] = useState<Debt | null>(null);
  const navigate = useNavigate();
  const { formatAmount, currency } = useCurrencyPreference();

  const { data: debts = [], isLoading } = useDebts();
  const deleteDebtMutation = useDeleteDebtMutation();

  const handleAddDebt = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditDebt = (debt: Debt) => {
    setEditingDebt(debt);
  };

  const handleRemoveDebt = (debt: Debt) => {
    setRemovingDebt(debt);
  };

  const handleRemoveConfirm = async () => {
    if (removingDebt) {
      await deleteDebtMutation.mutateAsync(removingDebt.id);
      setRemovingDebt(null);
    }
  };

  const calculateTotalDebt = () => {
    if (!debts) return 0;
    return debts.reduce((sum, debt) => sum + debt.total_debt, 0);
  };
  const calculatePaidAmount = () => {
    if (!debts) return 0;
    return debts.reduce(
      (sum, debt) => sum + (debt.total_debt - debt.remaining_debt),
      0
    );
  };
  const getProgressPercentage = () => {
    const totalDebt = calculateTotalDebt();
    if (totalDebt === 0) return 0;
    return (calculatePaidAmount() / totalDebt) * 100;
  };
  const getNextPaymentDue = () => {
    if (!debts || debts.length === 0) return null;
    const now = new Date();
    return debts.reduce((earliest, debt) => {
      const dueDate = new Date(debt.due_date);

      return !earliest || dueDate < new Date(earliest.due_date)
      ? debt
      : earliest;
    }, debts [0]);
  };


  if (isLoading) {
    return (
      <div className="bg-dashboard-card px-8 py-6 rounded-xl border border-gray-800">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  const nextPayment = getNextPaymentDue();

  const formattedDebts = debts.map((debt) => ({
    ...debt,
    totalDebt: formatAmount(
      parseFloat(debt.totalDebt.replace(/[^0-9.-]+/g, ""))
    ),
    monthlyPayment: formatAmount(
      parseFloat(debt.monthlyPayment.replace(/[^0-9.-]+/g, ""))
    ),
    remainingDebt: formatAmount(
      parseFloat(debt.remainingDebt.replace(/[^0-9.-]+/g, ""))
    ),
  }));

  return (
    <div className="bg-dashboard-card px-8 py-6 rounded-xl border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[30px] font-semibold text-white">
            Debt Overview
          </h2>
          <p className="text-[16px] text-gray-400">
            Track repayment of existing debts.
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-[44px] h-[44px] text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[#1A1F2C] border-gray-800"
          >
            <DropdownMenuItem
              className="text-gray-400 hover:text-white focus:text-white cursor-pointer"
              onClick={handleAddDebt}
            >
              <Plus className="mr-2 h-4 w-4" />
              <span>Add</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-gray-400 hover:text-white focus:text-white cursor-pointer"
              onClick={() =>
                formattedDebts[0] && handleEditDebt(formattedDebts[0])
              }
            >
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-gray-400 hover:text-white focus:text-white cursor-pointer"
              onClick={() => navigate("/debt-management")}
            >
              <Eye className="mr-2 h-4 w-4" />
              <span>View All</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#1A1F2C] p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-400">Total Debt</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {formatAmount(calculateTotalDebt())}
          </p>
        </div>

        <div className="bg-[#1A1F2C] p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-400">Next Payment Due</span>
          </div>
          <p className="text-2x1 font-bold text-white">
            No payments due
          </p>
        </div>
      </div>
      {/* Progress Section */}
      <div className="bg-[#1A1F2C] p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Payment Progress</span>
          <span className="text-sm text-white">
            {getProgressPercentage().toFixed(1)}%
          </span>
        </div>
        <Progress
          value={getProgressPercentage()}
          className="h-2 bg-gray-700"
          indicatorClassName="bg-primary"
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400">
            Paid: {formatAmount(calculatePaidAmount())}
          </span>
          <span className="text-xs text-gray-400">
            Total: {formatAmount(calculateTotalDebt())}
          </span>
        </div>
      </div>
      {formattedDebts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {formattedDebts.map((debt) => {
            const IconComponent =
              debtIcons[debt.icon as keyof typeof debtIcons] || DollarSign;

            return (
              <DebtItem
                key={debt.id}
                {...debt}
                icon={IconComponent}
                onEdit={() => handleEditDebt(debt)}
                onRemove={() => handleRemoveDebt(debt)}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-400">
          No data yet. Click the Add button to create your first entry!
        </div>
      )}
      {editingDebt && (
        <EditDebtDialog
          open={!!editingDebt}
          onOpenChange={(open) => !open && setEditingDebt(null)}
          debt={editingDebt}
          onSave={() => setEditingDebt(null)}
        />
      )}
      <AddDebtDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onDebtAdded={() => setIsAddDialogOpen(false)}
      />
      <RemoveBudgetDialog
        open={!!removingDebt}
        onOpenChange={(open) => !open && setRemovingDebt(null)}
        title={removingDebt?.title || ""}
        onConfirm={handleRemoveConfirm}
      />
    </div>
  );
};
export { useDebts };
