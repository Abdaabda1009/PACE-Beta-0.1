import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { EditGoalDialog } from "./EditGoalDialog";
import { AddGoalDialog } from "./AddGoalDialog";
import { DeleteGoalDialog } from "./DeleteGoalDialog";
import { GoalHeader } from "./GoalHeader";
import { GoalProgress } from "./GoalProgress";
import { GoalStats } from "./GoalStats";
import { Goal } from "./types";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";

export const GoalsCard = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [deletingGoal, setDeletingGoal] = useState<Goal | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  const { currency } = useCurrencyPreference();

  const fetchGoals = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching goals:", error);
      return;
    }

    if (data) {
      const goalsWithCurrency = data.map((goal) => ({
        ...goal,
        currency: currency,
      }));
      setGoals(goalsWithCurrency);
    }
  };

  useEffect(() => {
    fetchGoals();

    const channel = supabase
      .channel("goals-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "goals",
        },
        () => {
          fetchGoals();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleEditClick = (goal: Goal) => {
    setEditingGoal(goal);
  };

  const handleAddClick = () => {
    setIsAddDialogOpen(true);
  };

  const handleDeleteClick = (goal: Goal) => {
    setDeletingGoal(goal);
  };

  const handleConfirmDelete = async () => {
    if (!deletingGoal) return;

    const { error } = await supabase
      .from("goals")
      .delete()
      .eq("id", deletingGoal.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete goal. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Goal deleted successfully.",
    });
    setDeletingGoal(null);
    await fetchGoals();
  };

  return (
    <div className="bg-dashboard-card p-6 rounded-xl border border-gray-800 h-full space-y-4">
      <GoalHeader
        onEditClick={() => goals.length > 0 && handleEditClick(goals[0])}
        onAddClick={handleAddClick}
        onDeleteClick={() => goals.length > 0 && handleDeleteClick(goals[0])}
        hasGoals={goals.length > 0}
      />

      <div className="space-y-8">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <div
              key={goal.id}
              className="p-8 bg-[#1A1F2C] rounded-lg space-y-4 relative"
            >
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteClick(goal)}
                  className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-transparent"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <GoalProgress goal={goal} />
              <GoalStats goal={goal} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">
            No goals yet. Click the Add button to create your first goal!
          </div>
        )}
      </div>

      {editingGoal && (
        <EditGoalDialog
          open={!!editingGoal}
          onOpenChange={(open) => !open && setEditingGoal(null)}
          goal={editingGoal}
          onSave={fetchGoals}
        />
      )}

      <AddGoalDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onGoalAdded={fetchGoals}
      />

      {deletingGoal && (
        <DeleteGoalDialog
          open={!!deletingGoal}
          onOpenChange={(open) => !open && setDeletingGoal(null)}
          onConfirm={handleConfirmDelete}
          goalName={deletingGoal.name}
        />
      )}
    </div>
  );
};
