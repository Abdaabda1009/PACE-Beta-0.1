import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useToast } from "./use-toast";
import { BudgetCategory } from "@/types/budget";

export const useBudgetCategories = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: budgetCategories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["budget-categories"],
    queryFn: async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching budget categories:", error);
        return [];
      }
    },
  });

  // Set up real-time subscription
  useEffect(() => {
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
          queryClient.invalidateQueries({ queryKey: ["budget-categories"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return {
    budgetCategories: budgetCategories || [],
    isLoading,
    error,
  };
};
