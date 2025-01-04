import { useState } from "react";


export const useBudgetCategories = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchBudgetCategories = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return {
    budgetCategories: fetchBudgetCategories,
    isLoading,
    fetchBudgetCategories,
  };
};