import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type Currency = "USD" | "EUR" | "SEK";

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  SEK: 10.45,
};

export const useCurrencyPreference = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: preference, isLoading } = useQuery({
    queryKey: ["currency-preference"],
    queryFn: async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
          .from("currency_preferences")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching currency preference:", error);
          return null;
        }

        // If no preference exists, create one with default USD
        if (!data) {
          const { data: newPreference, error: upsertError } = await supabase
            .from("currency_preferences")
            .upsert({
              user_id: user.id,
              currency: "USD",
            })
            .select()
            .single();

          if (upsertError) {
            console.error("Error creating currency preference:", upsertError);
            return "USD";
          }

          return newPreference?.currency || "USD";
        }

        return data?.currency || "USD";
      } catch (error) {
        console.error("Error in currency preference query:", error);
        return "USD";
      }
    },
  });

  const updatePreference = useMutation({
    mutationFn: async (newCurrency: Currency) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("currency_preferences").upsert(
        {
          user_id: user.id,
          currency: newCurrency,
        },
        {
          onConflict: "user_id",
        }
      );

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currency-preference"] });
      toast({
        title: "Success",
        description: "Currency preference updated",
      });
    },
    onError: (error) => {
      console.error("Error updating currency preference:", error);
      toast({
        title: "Error",
        description: "Failed to update currency preference",
        variant: "destructive",
      });
    },
  });

  const convertAmount = (
    amount: number,
    fromCurrency: Currency = "USD"
  ): number => {
    const toCurrency = (preference as Currency) || "USD";
    if (fromCurrency === toCurrency) return amount;

    const inUSD = amount / EXCHANGE_RATES[fromCurrency];
    return inUSD * EXCHANGE_RATES[toCurrency];
  };

  const formatAmount = (amount: number): string => {
    const currency = (preference as Currency) || "USD";
    const symbols: Record<Currency, string> = {
      USD: "$",
      EUR: "€",
      SEK: "kr",
    };

    return `${symbols[currency]}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return {
    currency: (preference as Currency) || "USD",
    isLoading,
    updatePreference,
    convertAmount,
    formatAmount,
  };
};
