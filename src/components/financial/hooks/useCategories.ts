import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { BudgetCategory } from "@/types";
import { mockBudgetCategories } from "@/mocks/budgetData";

export const useCategories = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['budget-categories'],
    queryFn: async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return mockBudgetCategories;
      } catch (error) {
        console.error('Error in categories query:', error);
        toast({
          title: "Error",
          description: "Failed to fetch categories",
          variant: "destructive",
        });
        return null;
      }
    },
  });
};