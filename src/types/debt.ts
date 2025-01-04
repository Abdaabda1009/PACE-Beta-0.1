export interface Debt {
  id: string;
  user_id: string;
  title: string;
  total_debt: number;
  monthly_payment: number;
  remaining_debt: number;
  remaining_term: string;
  due_date: string;
  debt_to_income: number;
  interest_rate: number;
  year_change?: number;
  icon?: string;
  created_at?: string;
}
