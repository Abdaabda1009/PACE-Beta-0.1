import { useState } from "react";
import {
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
              className="w-[44px] h-[44px] p-[10px] text-gray-400 hover:text-white bg-[#050524]"
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
