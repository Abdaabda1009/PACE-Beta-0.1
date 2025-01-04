import { EditBudgetDialog } from "@/components/budget/dialogs/EditBudgetDialog";
import { RemoveBudgetDialog } from "@/components/budget/dialogs/RemoveBudgetDialog";
import { BudgetCategory, BudgetCategoryForm } from "@/types/budget";

interface BudgetDialogsProps {
  selectedCategory: BudgetCategory | null;
  isEditDialogOpen: boolean;
  isRemoveDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  setIsRemoveDialogOpen: (open: boolean) => void;
  onEditSave: (updatedBudget: BudgetCategoryForm) => Promise<void>;
  onRemoveConfirm: () => Promise<void>;
}

export const BudgetDialogs = ({
  selectedCategory,
  isEditDialogOpen,
  isRemoveDialogOpen,
  setIsEditDialogOpen,
  setIsRemoveDialogOpen,
  onEditSave,
  onRemoveConfirm,
}: BudgetDialogsProps) => {
  if (!selectedCategory) return null;

  return (
    <>
      <EditBudgetDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        budget={{
          title: selectedCategory.title,
          assignedBudget: selectedCategory.assigned_budget,
          spentSoFar: selectedCategory.spent_so_far || 0,
          dailyAllowance: selectedCategory.daily_allowance || 0,
        }}
        onSave={onEditSave}
      />

      <RemoveBudgetDialog
        open={isRemoveDialogOpen}
        onOpenChange={setIsRemoveDialogOpen}
        title={selectedCategory.title}
        onConfirm={onRemoveConfirm}
      />
    </>
  );
};