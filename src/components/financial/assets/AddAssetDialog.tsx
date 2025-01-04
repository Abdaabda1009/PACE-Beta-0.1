import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAssets } from "@/hooks/useAssets";
const ASSET_TYPES = [
  { value: "crypto", label: "Cryptocurrency" },
  { value: "stocks", label: "Stocks" },
  { value: "savings", label: "Savings" },
  { value: "real_estate", label: "Real Estate" },
];
export const AddAssetDialog = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    symbol: "",
    quantity: "",
    current_value: "",
  });
  const { toast } = useToast();
  const { addAsset } = useAssets();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addAsset.mutateAsync({
        name: formData.name,
        type: formData.type,
        symbol: formData.symbol || null,
        quantity: Number(formData.quantity) || 0,
        current_value: Number(formData.current_value) || 0,
      });
      toast({
        title: "Success",
        description: "Asset added successfully",
      });
      setOpen(false);
      setFormData({
        name: "",
        type: "",
        symbol: "",
        quantity: "",
        current_value: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add asset",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gray-800">
          <Plus className="w-4 h-4 mr-2" />
          Add Asset
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Asset</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Asset name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, type: value }))
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {ASSET_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="symbol" className="text-sm font-medium">
              Symbol (Optional)
            </label>
            <Input
              id="symbol"
              value={formData.symbol}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, symbol: e.target.value }))
              }
              placeholder="Asset symbol"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantity
            </label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, quantity: e.target.value }))
              }
              placeholder="0.00"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="current_value" className="text-sm font-medium">
              Current Value
            </label>
            <Input
              id="current_value"
              type="number"
              value={formData.current_value}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  current_value: e.target.value,
                }))
              }
              placeholder="0.00"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Asset"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};