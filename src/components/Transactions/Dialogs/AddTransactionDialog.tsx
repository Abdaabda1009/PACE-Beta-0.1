import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Minus, ChevronDown } from "lucide-react";
import { useCategories } from "@/components/financial/hooks/useCategories";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddTransactionDialog = ({
  open,
  onOpenChange,
}: AddTransactionDialogProps) => {
  const [transactionType, setTransactionType] = useState<"in" | "out">("out");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const { toast } = useToast();
  const { data: categories } = useCategories();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("financial_transactions").insert({
        user_id: user.id,
        title,
        amount: Number(amount),
        type: transactionType,
        category,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Transaction added successfully",
      });

      // Reset form
      setTitle("");
      setAmount("");
      setCategory("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast({
        title: "Error",
        description: "Failed to add transaction",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-dashboard-card text-white">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={transactionType === "out" ? "default" : "outline"}
              onClick={() => setTransactionType("out")}
              className="flex-1"
            >
              <Minus className="w-4 h-4 mr-2" />
              Expense
            </Button>
            <Button
              type="button"
              variant={transactionType === "in" ? "default" : "outline"}
              onClick={() => setTransactionType("in")}
              className="flex-1"
            >
              <Plus className="w-4 h-4 mr-2" />
              Income
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-dashboard-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-dashboard-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-dashboard-background"
                    >
                      {category || "Select category"}
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full min-w-[200px] bg-dashboard-card">
                    {categories?.map((cat) => (
                      <DropdownMenuItem
                        key={cat.id}
                        onClick={() => setCategory(cat.title)}
                        className="cursor-pointer hover:bg-dashboard-background"
                      >
                        {cat.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Input
                  placeholder="Or enter new category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-dashboard-background"
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Add Transaction
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
