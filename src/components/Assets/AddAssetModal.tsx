import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { symbol, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";


const formSchema = z.object({
  type: z.enum(["crypto", "stock"]),
  symbol: z.string().min(1, "Symbol is required"),
  quantity: z.number().min(0.000001, "Quantity must be greater than 0"),
});

type FormData = z.infer<typeof formSchema>;

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  type: "crypto" | "stock";
}

const cryptoOptions = [
  {
    value: "BTC",
    label: "Bitcoin (BTC)",
    logo: "/assets/AddAssetLogo/Bitcoin.png",
  },
  {
    value: "ETH",
    label: "Ethereum (ETH)",
    logo: "/assets/AddAssetLogo/Ethereum.png",
  },
  {
    value: "BNB",
    label: "Binance Coin (BNB)",
    logo: "/assets/AddAssetLogo/Binance.png",
  },
  {
    value: "USDT",
    label: "Tether (USDT)",
    logo: "/assets/AddAssetLogo/Tether.png",
  },
  {
    value: "ADA",
    label: "Cardano (ADA)",
    logo: "/assets/AddAssetLogo/cardano.png",
  },
  {
    value: "SOL",
    label: "Solana (SOL)",
    logo: "/assets/AddAssetLogo/Solana.png",
  },
  {
    value: "XRP",
    label: "XRP (XRP)",
    logo: "/assets/AddAssetLogo/Xrp.png",
  },
  {
    value: "DOT",
    label: "Polkadot (DOT)",
    logo: "/assets/AddAssetLogo//Polkadot.png",
  },
  {
    value: "DOGE",
    label: "Dogecoin (DOGE)",
    logo: "/assets/AddAssetLogo/dogecoin.png",
  },
  {
    value: "SHIB",
    label: "Shiba Inu (SHIB)",
    logo: "/assets/AddAssetLogo/Shiba.png",
  },
];

const stockOptions = [
  {
    value: "MSFT",
    label: "Microsoft (MSFT)",
    logo: "/assets/AddAssetLogo/MSFT.png",
  },
  {
    value: "AAPL",
    label: "Apple (AAPL)",
    logo: "/assets/AddAssetLogo/AAPL.png",
  },
  { value: "TSLA", label: "Tesla (TSLA)", logo: "/placeholder.svg" },
];

export const AddAssetModal = ({
  isOpen,
  onClose,
  onSubmit,
  type,
}: AddAssetModalProps) => {
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [totalValue, setTotalValue] = useState<number | null>(null);
  const { toast } = useToast();

  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type,
      symbol: "",
      quantity: 0,
    },
  });

  const { data: priceData } = useQuery({
    queryKey: ["price", selectedSymbol],
    queryFn: async () => {
      if (!selectedSymbol) return null;
      // Simulated API call - replace with actual price fetching
      const mockPrice = Math.random() * 50000;
      return mockPrice;
    },
    enabled: !!selectedSymbol,
  });

  useEffect(() => {
    if (priceData) {
      setCurrentPrice(priceData);
      const quantity = form.getValues("quantity");
      setTotalValue(priceData * quantity);
    }
  }, [priceData, form]);

  const handleSymbolChange = (value: string) => {
    setSelectedSymbol(value);
    form.setValue("symbol", value);
  };

  const handleQuantityChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      form.setValue("quantity", numValue);
      if (currentPrice) {
        setTotalValue(currentPrice * numValue);
      }
    }
  };

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
    toast({
      title: "Asset Added",
      description: `Successfully added ${data.quantity} ${data.symbol}`,
    });
  };

  const options = type === "crypto" ? cryptoOptions : stockOptions;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 text-white border-slate-700 max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Add New {type === "crypto" ? "Cryptocurrency" : "Stock"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6 mt-6"
          >
            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Select Asset</FormLabel>
                  <Select onValueChange={handleSymbolChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-12">
                        <SelectValue placeholder="Select an asset" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-slate-700 border-slate-600 text-white max-h-[300px]">
                      {options.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="hover:bg-slate-600 flex items-center gap-2 h-12"
                        >
                          <img
                            src={option.logo}
                            alt={option.label}
                            className="w-6 h-6 rounded-full"
                          />
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Quantity</FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      step="any"
                      className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white h-12"
                      placeholder="Enter quantity, e.g., 3.5"
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {currentPrice && (
              <div className="space-y-4">
                <div className="bg-slate-700 p-4 rounded-md">
                  <div className="text-sm text-slate-400">Current Price</div>
                  <div className="text-lg font-semibold">
                    $
                    {currentPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
                {totalValue && (
                  <div className="bg-slate-700 p-4 rounded-md">
                    <div className="text-sm text-slate-400">Total Value</div>
                    <div className="text-lg font-semibold">
                      $
                      {totalValue.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-white font-semibold"
            >
              Add Asset
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
