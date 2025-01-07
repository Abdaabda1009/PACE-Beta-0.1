import { useState } from "react";
import { StockCard } from "@/components/Assets/StockCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddAssetModal } from "@/components/Assets/AddAssetModal";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const StockSection = () => {
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const { toast } = useToast();

  const { data: stocks = [], isLoading: isStocksLoading } = useQuery({
    queryKey: ["stocks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stocks")
        .select("*")
        .order("stock_name", { ascending: true });

      if (error) {
        console.error("Error fetching stocks:", error);
        throw error;
      }

      return data || [];
    },
  });

  const handleAddAsset = async (data: any) => {
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        toast({
          title: "Authentication Error",
          description: "Please sign in to add stocks",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("stocks").insert({
        user_id: userData.user.id,
        stock_name:
          data.symbol === "MSFT"
            ? "Microsoft Corp"
            : data.symbol === "AAPL"
            ? "Apple Inc"
            : "Tesla Inc",
        ticker: data.symbol,
        current_price: 439.33,
        quantity_owned: data.quantity,
        price_change_percentage: 0,
        open_price: 437.25,
        high_price: 441.5,
        low_price: 436.75,
        year_low: 245.61,
        year_high: 445.23,
        after_hours_price: 439.85,
        after_hours_change: 0.12,
        logo_url: `https://logo.clearbit.com/${data.symbol.toLowerCase()}.com`,
        currency: "USD",
      });

      if (error) {
        console.error("Error adding stock:", error);
        toast({
          title: "Error",
          description: "Failed to add stock. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Stock added successfully",
      });
      setIsAddStockModalOpen(false);
    } catch (error) {
      console.error("Error adding stock:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  if (isStocksLoading) {
    return null;
  }

  return (
    <section className="animate-fade-in bg-[#252732] p-6 px-8 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl mr-2 mt-2 font-bold">Track Your Stocks</h2>
        <Button
          onClick={() => setIsAddStockModalOpen(true)}
          className="w-[44px] h-[44px] bg-[#050524] text-gray-400 hover:bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF]"
        >
          <Plus className="w-5 h-5 gap-2 " />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stocks.map((stock) => (
          <StockCard
            key={stock.id}
            name={stock.stock_name}
            symbol={stock.ticker}
            price={stock.current_price}
            change={stock.price_change_percentage || 0}
            quantity={stock.quantity_owned}
            openPrice={stock.open_price}
            highPrice={stock.high_price}
            lowPrice={stock.low_price}
            yearLow={stock.year_low}
            yearHigh={stock.year_high}
            afterHoursPrice={stock.after_hours_price}
            afterHoursChange={stock.after_hours_change}
            logoUrl={stock.logo_url}
          />
        ))}
      </div>
      <AddAssetModal
        isOpen={isAddStockModalOpen}
        onClose={() => setIsAddStockModalOpen(false)}
        onSubmit={handleAddAsset}
        type="stock"
      />
    </section>
  );
};
