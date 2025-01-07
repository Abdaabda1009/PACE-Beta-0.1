import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { BudgetCategory } from "@/types";
import { supabase } from "@/integrations/supabase/client";

export const useCategories = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["budget-categories"],
    queryFn: async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error("Not authenticated");

        const { data, error } = await supabase
          .from("budget_categories")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;
        return data as BudgetCategory[];
      } catch (error) {
        console.error("Error in categories query:", error);
        toast({
          title: "Error",
          description: "Failed to fetch categories",
          variant: "destructive",
        });
        return [];
      }
    },
  });
};