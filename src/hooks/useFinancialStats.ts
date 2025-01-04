import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useToast } from "./use-toast";

export interface FinancialStat {
  title: string;
  value: number;
  created_at: string;
}

export const useFinancialStats = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["financial-stats"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("stats")
        .select("*")
        .eq("user_id", user.id)
        .in("title", ["Monthly Income", "Monthly Expenses"]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch financial stats",
          variant: "destructive",
        });
        throw error;
      }

      return data as FinancialStat[];
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("financial-stats-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "stats",
          filter: `title=in.(Monthly Income,Monthly Expenses)`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["financial-stats"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const monthlyIncome =
    stats?.find((stat) => stat.title === "Monthly Income")?.value || 0;
  const monthlyExpenses =
    stats?.find((stat) => stat.title === "Monthly Expenses")?.value || 0;

  return {
    monthlyIncome,
    monthlyExpenses,
    isLoading,
    stats,
  };
};
