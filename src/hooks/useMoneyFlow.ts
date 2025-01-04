import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useMoneyFlow = (type: "in" | "out") => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["money-flow", type],
    queryFn: async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
          .from("stats")
          .select("value, created_at")
          .eq("user_id", user.id)
          .eq("title", type === "in" ? "Monthly Income" : "Monthly Expenses")
          .order("created_at", { ascending: false })
          .limit(2);

        if (error) {
          console.error("Error fetching flow data:", error);
          return { value: 0, percentageChange: 0 };
        }

        if (!data || data.length === 0) {
          return { value: 0, percentageChange: 0 };
        }

        const currentValue = data[0].value;
        const previousValue = data.length > 1 ? data[1].value : currentValue;
        const percentageChange =
          previousValue === 0
            ? 0
            : ((currentValue - previousValue) / previousValue) * 100;

        return {
          value: currentValue,
          percentageChange: Math.round(percentageChange * 100) / 100,
        };
      } catch (error) {
        console.error("Error in flow data query:", error);
        return { value: 0, percentageChange: 0 };
      }
    },
  });
};
