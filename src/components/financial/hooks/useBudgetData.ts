import { useQuery } from "@tanstack/react-query";

export const useBudgetData = () => {
  return useQuery({
    queryKey: ['budget-setup'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockBudgetSetup;
    },
  });
};