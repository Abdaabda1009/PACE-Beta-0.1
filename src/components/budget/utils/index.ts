import jsPDF from "jspdf";
import { budget_categories } from "@/integrations/supabase/types";

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

export const exportBudgetDataAsPDF = (
  categories: budget_categories[],
  formatAmount: (amount: number) => string
) => {
  const doc = new jsPDF();
  doc.text("Budget Overview", 20, 20);

  let yPosition = 40;
  categories.forEach((category) => {
    doc.text(`Category: ${category.title}`, 20, yPosition);
    doc.text(
      `Budget: ${formatAmount(category.assigned_budget)}`,
      20,
      yPosition + 10
    );
    doc.text(
      `Spent: ${formatAmount(category.spent_so_far || 0)}`,
      20,
      yPosition + 20
    );
    yPosition += 40;
  });

  doc.save("budget-overview.pdf");
};