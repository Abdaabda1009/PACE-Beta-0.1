import { useState } from "react";
import { EditBudgetDialog } from "./dialogs/EditBudgetDialog";
import { AddBudgetDialog } from "./dialogs/AddBudgetDialog";
import { RemoveBudgetDialog } from "./dialogs/RemoveBudgetDialog";
import { useToast } from "../ui/use-toast";
import { DashboardBudgetHeader } from "../dashboard/DashboardBudgetHeader";
import { BudgetCategory, BudgetCategoryForm } from "@/types/budget";
import { BudgetIcon } from "./BudgetIcon";
import { exportBudgetDataAsPDF } from "./utils";
import { supabase } from "@/integrations/supabase/client";
import { BudgetActions } from "./BudgetActions";
import { BudgetList } from "./list/BudgetList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";

export const BudgetOverview = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { formatAmount } = useCurrencyPreference();
  const [editingBudget, setEditingBudget] = useState<BudgetCategory | null>(
    null
  );
  const [isAddingBudget, setIsAddingBudget] = useState(false);
  const [removingBudget, setRemovingBudget] = useState<BudgetCategory | null>(
    null
  );

  const { data: budgetCategories, isLoading } = useQuery({
    queryKey: ["budget_categories"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("budget_categories")
        .select("*")
        .eq("user_id", user.id)
        .order("priority", { ascending: false });

      if (error) throw error;
      return data as BudgetCategory[];
    },
  });

  // Set up real-time subscription
  useState(() => {
    const channel = supabase
      .channel("budget-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "budget_categories",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["budget_categories"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, 
  );

  const handleSaveBudget = async (updatedBudget: BudgetCategoryForm) => {
    if (!editingBudget) return;

    try {
      const { error } = await supabase
        .from("budget_categories")
        .update({
          title: updatedBudget.title,
          assigned_budget: updatedBudget.assignedBudget,
          spent_so_far: updatedBudget.spentSoFar,
          daily_allowance: updatedBudget.dailyAllowance,
        })
        .eq("id", editingBudget.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Budget category updated successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["budget-categories"] });
      setEditingBudget(null);
    } catch (error) {
      console.error("Error updating budget category:", error);
      toast({
        title: "Error",
        description: "Failed to update budget category",
        variant: "destructive",
      });
    }
  };

  const handlePrioritize = async (category: BudgetCategory) => {
    try {
      const { error } = await supabase
        .from("budget_categories")
        .update({
          priority: (category.priority || 0) + 1,
        })
        .eq("id", category.id);

      if (error) throw error;

      toast({
        title: "Priority Updated",
        description: `${category.title} has been prioritized`,
      });

      queryClient.invalidateQueries({ queryKey: ["budget-categories"] });
    } catch (error) {
      console.error("Error updating priority:", error);
      toast({
        title: "Error",
        description:
          "Failed to update priority, Please let us know what the issue is!",
        variant: "destructive",
      });
    }
  };

  const handleConfirmRemove = async () => {
    if (!removingBudget) return;

    try {
      const { error } = await supabase
        .from("budget_categories")
        .delete()
        .eq("id", removingBudget.id);

      if (error) throw error;

      toast({
        title: "Budget Category Removed",
        description: `${removingBudget.title} has been removed from your budget categories`,
      });

      queryClient.invalidateQueries({ queryKey: ["budget-categories"] });
      setRemovingBudget(null);
    } catch (error) {
      console.error("Error removing budget category:", error);
      toast({
        title: "Error",
        description: "Failed to remove budget category, Please let us know what the issue is!",
        variant: "destructive",
      });
    }
  };

  const handleExportData = () => {
    if (!budgetCategories) return;
    exportBudgetDataAsPDF(budgetCategories, formatAmount);
    toast({
      title: "Export Successful",
      description: "Budget overview has been exported as PDF",
    });
  };

  if (isLoading) {
    return (
      <div className="col-span-8 bg-dashboard-card px-8 py-6 rounded-xl border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <DashboardBudgetHeader
            onExport={handleExportData}
            onAdd={() => setIsAddingBudget(true)}
          />
          <BudgetActions
            onExport={handleExportData}
            onAdd={() => setIsAddingBudget(true)}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="h-[200px] bg-[#1A1F2C] animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-8 bg-dashboard-card px-8 py-6 rounded-xl border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <DashboardBudgetHeader
          onExport={handleExportData}
          onAdd={() => setIsAddingBudget(true)}
        />
        <BudgetActions
          onExport={handleExportData}
          onAdd={() => setIsAddingBudget(true)}
        />
      </div>
      {budgetCategories && budgetCategories.length > 0 ? (
        <BudgetList
          categories={budgetCategories}
          onEdit={setEditingBudget}
          onPrioritize={handlePrioritize}
          onRemove={setRemovingBudget}
        />
      ) : (
        <div className="text-center text-gray-400">
          No data yet. Click the Add button to create your first entry!
        </div>
      )}
      {editingBudget && (
        <EditBudgetDialog
          open={!!editingBudget}
          onOpenChange={(open) => !open && setEditingBudget(null)}
          budget={{
            title: editingBudget.title,
            assignedBudget: editingBudget.assigned_budget,
            spentSoFar: editingBudget.spent_so_far || 0,
            dailyAllowance: editingBudget.daily_allowance || 0,
          }}
          onSave={handleSaveBudget}
        />
      )}
      <AddBudgetDialog
        open={isAddingBudget}
        onOpenChange={setIsAddingBudget}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["budget-categories"] });
          setIsAddingBudget(false);
        }}
      />
      {removingBudget && (
        <RemoveBudgetDialog
          open={!!removingBudget}
          onOpenChange={(open) => !open && setRemovingBudget(null)}
          onConfirm={handleConfirmRemove}
          title={removingBudget.title}
        />
      )}
    </div>
  );
};
