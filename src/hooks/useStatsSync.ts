import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export const useStatsSync = () => {
  const queryClient = useQueryClient();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("stats")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      return data;
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("stats-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "stats",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["stats"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return { stats, isLoading };
};
