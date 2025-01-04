export interface User {
  id: string;
  email?: string;
  full_name?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error?: string;
}

export interface Debt {
  id: string;
  userId: string;
  title: string;
  totalDebt: number;
  monthlyPayment: number;
  remainingDebt: number;
  remainingTerm: string;
  dueDate: string;
  debtToIncome: number;
  interestRate: string;
  yearChange: number;
  icon: string;
  createdAt: string;
  strategyType?: string;
  projectedPayoffDate?: string;
  totalInterestSaved?: number;
  extraPayment?: number;
  priority?: number;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  nextPaymentDate: string;
  imageUrl?: string;
  date: string;
}
