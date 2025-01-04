import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Debt } from "./types";

const formatDebtData = (debt: any): Debt => ({
  id: debt.id,
  icon: debt.icon,
  title: debt.title,
  totalDebt: `${debt.total_debt} Kr`,
  monthlyPayment: `${debt.monthly_payment} Kr`,
  remainingDebt: `${debt.remaining_debt} Kr`,
  remainingTerm: debt.remaining_term,
  dueDate: new Date(debt.due_date).toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }),
  debtToIncome: `${debt.debt_to_income}%`,
  interestRate: debt.interest_rate,
  yearChange: debt.year_change.toString(),
  strategy_type: debt.strategy_type,
  projected_payoff_date: debt.projected_payoff_date,
  total_interest_saved: debt.total_interest_saved,
  extra_payment: debt.extra_payment,
  priority: debt.priority
});

export const useDebts = () => {
  return useQuery({
    queryKey: ['debts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('debts')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data?.map(formatDebtData) || [];
    },
  });
};

export const useDebtSimulations = (debtId?: string) => {
  return useQuery({
    queryKey: ['debt-simulations', debtId],
    queryFn: async () => {
      const query = supabase
        .from('debt_simulations')
        .select('*')
        .order('created_at', { ascending: false });

      if (debtId) {
        query.eq('debt_id', debtId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!debtId,
  });
};