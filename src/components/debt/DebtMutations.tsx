import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Debt } from "./types";

export const useDeleteDebtMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (debtId: string) => {
      const { error } = await supabase
        .from('debts')
        .delete()
        .eq('id', debtId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      toast({
        title: "Debt Removed",
        description: "The debt has been removed successfully",
      });
    },
  });
};

export const useUpdateDebtStrategyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      debtId, 
      strategyType, 
      extraPayment 
    }: { 
      debtId: string; 
      strategyType: string; 
      extraPayment?: number;
    }) => {
      const { error } = await supabase
        .from('debts')
        .update({ 
          strategy_type: strategyType,
          extra_payment: extraPayment || 0
        })
        .eq('id', debtId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      toast({
        title: "Strategy Updated",
        description: "The debt repayment strategy has been updated",
      });
    },
  });
};

export const useCreateDebtSimulationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (simulation: {
      debt_id: string;
      strategy_type: string;
      monthly_payment: number;
      extra_payment?: number;
      projected_payoff_date?: string;
      total_interest?: number;
      total_interest_saved?: number;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('debt_simulations')
        .insert([{ ...simulation, user_id: user.id }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debt-simulations'] });
      toast({
        title: "Simulation Created",
        description: "A new debt repayment simulation has been created",
      });
    },
  });
};