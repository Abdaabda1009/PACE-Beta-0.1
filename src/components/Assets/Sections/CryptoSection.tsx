import { useState } from "react";
import { CryptoCard } from "@/components/Assets/CryptoCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddAssetModal } from "@/components/Assets/AddAssetModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const CryptoSection = () => {
  const [isAddCryptoModalOpen, setIsAddCryptoModalOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cryptoAssets = [], isLoading: isCryptoLoading } = useQuery({
    queryKey: ["crypto-assets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assets")
        .select("*")
        .eq("type", "crypto")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching crypto assets:", error);
        throw error;
      }

      return data || [];
    },
  });

  const handleDelete = (id: string) => {
    queryClient.setQueryData(["crypto-assets"], (oldData: any) =>
      oldData.filter((asset: any) => asset.id !== id)
    );
  };

  const handleAddAsset = async (data: any) => {
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        toast({
          title: "Authentication Error",
          description: "Please sign in to add crypto assets",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("assets").insert({
        user_id: userData.user.id,
        name: data.symbol === "BTC" ? "Bitcoin" : "Ethereum",
        type: "crypto",
        symbol: data.symbol,
        quantity: data.quantity,
        current_value:
          data.symbol === "BTC"
            ? 96688.98 * data.quantity
            : 125.45 * data.quantity,
      });

      if (error) {
        console.error("Error adding crypto asset:", error);
        toast({
          title: "Error",
          description: "Failed to add crypto asset. Please try again.",
          variant: "destructive",
        });
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["crypto-assets"] });
      toast({
        title: "Success",
        description: "Crypto asset added successfully",
      });
      setIsAddCryptoModalOpen(false);
    } catch (error) {
      console.error("Error adding crypto asset:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  if (isCryptoLoading) {
    return null;
  }

  return (
    <section className="animate-fade-in bg-[#252732] p-6 px-8 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl mr-2 mt-2 font-bold">Track Your Crypto</h2>
        <Button
          onClick={() => setIsAddCryptoModalOpen(true)}
          className="w-[44px] h-[44px] text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
        >
          <Plus className="w-6 h-6 gap-2" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {cryptoAssets.map((crypto) => (
          <CryptoCard
            key={crypto.id}
            id={crypto.id}
            name={crypto.name}
            symbol={crypto.symbol}
            price={crypto.current_value / crypto.quantity}
            change={0}
            quantity={crypto.quantity}
            chartData={Array.from({ length: 30 }, (_, i) => ({
              value:
                crypto.symbol === "BTC"
                  ? 90000 + Math.random() * 10000
                  : 100 + Math.random() * 50,
            }))}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <AddAssetModal
        isOpen={isAddCryptoModalOpen}
        onClose={() => setIsAddCryptoModalOpen(false)}
        onSubmit={handleAddAsset}
        type="crypto"
      />
    </section>
  );
};
