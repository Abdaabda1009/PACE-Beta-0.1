import { BudgetCategory } from "@/types";

export const calculateRemainingBudget = (
  assignedBudget: number,
  spentSoFar: number
): number => {
  return assignedBudget - spentSoFar;
};

export const calculateDailyAllowance = (
  remainingBudget: number,
  daysInMonth: number = 30
): number => {
  return remainingBudget / daysInMonth;
};

export const calculateTrend = (
  currentSpent: number,
  previousSpent: number
): number => {
  if (previousSpent === 0) return 0;
  return ((currentSpent - previousSpent) / previousSpent) * 100;
};
