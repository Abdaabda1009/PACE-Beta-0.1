export type Currency = "USD" | "EUR" | "SEK";

export interface BudgetCategory {
  id: string;
  user_id: string;
  title: string;
  icon: string | null;
  assigned_budget: number;
  spent_so_far: number | null;
  daily_allowance: number | null;
  priority: number | null;
  created_at: string;
}

export interface BudgetSetup {
  id: string;
  user_id: string;
  monthly_income: number | null;
  fixed_expenses: number | null;
  variable_expenses: number | null;
  monthly_savings: number | null;
  created_at: string;
  currency?: string;
}

export interface BudgetCategoryForm {
  title: string;
  assignedBudget: number;
  spentSoFar: number;
  dailyAllowance: number;
}
