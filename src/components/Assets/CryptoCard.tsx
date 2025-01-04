import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CardHeader } from "@/components/Assets/Cards/CardHeader";
import { PriceDisplay } from "@/components/Assets/Cards/PriceDisplay";
import { CryptoDetails } from "@/components/Assets/Cards/CryptoDetails";

interface CryptoCardProps {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  quantity: number;
  chartData: { value: number }[];
  onDelete: (id: string) => void;
}

export const CryptoCard = ({
  id,
  name,
  symbol,
  price,
  change,
  quantity,
  chartData,
  onDelete,
}: CryptoCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const totalValue = price * quantity;
  const isPositive = change >= 0;

  const getLogo = (symbol: string) => {
    return `/placeholder.svg`;
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    toast({
      title: "Edit Mode",
      description: `Editing ${name} holdings`,
    });
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const { error } = await supabase.from("assets").delete().eq("id", id);

      if (error) throw error;

      onDelete(id);
      toast({
        title: "Asset Deleted",
        description: `Successfully removed ${name} from your portfolio`,
      });
    } catch (error) {
      console.error("Error deleting asset:", error);
      toast({
        title: "Error",
        description: "Failed to delete asset. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="p-6 bg-slate-800 text-white hover:bg-slate-700 transition-colors">
      <CardHeader
        name={name}
        symbol={symbol}
        logoUrl={getLogo(symbol)}
        change={change}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />

      <PriceDisplay price={price} totalValue={totalValue} />

      <CryptoDetails
        quantity={quantity}
        symbol={symbol}
        totalValue={totalValue}
        chartData={chartData}
        isPositive={isPositive}
      />
    </Card>
  );
};
