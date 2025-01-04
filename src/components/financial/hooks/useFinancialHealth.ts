import { useState, useEffect } from "react";
import { FinancialHealth, FinancialTip } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { mockFinancialHealth, mockImprovementTips } from "@/mocks/databaseMocks";

export const useFinancialHealth = () => {
  const [health, setHealth] = useState<FinancialHealth | null>(null);
  const [tips, setTips] = useState<FinancialTip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFinancialHealth = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setHealth(mockFinancialHealth);
        setTips(mockImprovementTips);
      } catch (error) {
        console.error("Error fetching financial health:", error);
        toast({
          title: "Error",
          description: "Failed to fetch financial health data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFinancialHealth();
  }, [toast]);

  return { health, tips, isLoading };
};