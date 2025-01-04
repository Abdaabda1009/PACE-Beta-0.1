import { ReactNode } from "react";

export interface Debt {
  id: string;
  title: string;
  totalDebt: string;
  monthlyPayment: string;
  remainingDebt: string;
  remainingTerm: string;
  dueDate: string;
  debtToIncome: string;
  interestRate: string;
  yearChange: string;
  icon: string;
  createdAt: string;
  strategyType?: string;
  projectedPayoffDate?: string;
  totalInterestSaved?: number;
  extraPayment?: number;
  priority?: number;
}

export interface DebtItemProps extends Debt {
  onEdit?: () => void;
  onRemove?: () => void;
}

export interface DebtSimulation {
  id: string;
  debt_id: string;
  strategy_type: string;
  monthly_payment: number;
  extra_payment?: number;
  projected_payoff_date?: string;
  total_interest?: number;
  total_interest_saved?: number;
  created_at: string;
}