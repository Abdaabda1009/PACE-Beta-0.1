import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { LogoSelector } from "./EditSubscriptionDialog/LogoSelector";
import { SUBSCRIPTION_LOGOS } from "./EditSubscriptionDialog/constants";
import { addDays, addMonths, addYears } from "date-fns";

interface AddSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubscriptionAdded: () => void;
}

const FREQUENCIES = [
  { value: "daily", label: "Daily" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const CATEGORIES = [
  { value: "shopping", label: "Shopping" },
  { value: "technology", label: "Technology" },
  { value: "streaming", label: "Streaming" },
  { value: "entertainment", label: "Entertainment" },
  { value: "utilities", label: "Utilities" },
  { value: "other", label: "Other" },
];

export const AddSubscriptionDialog = ({
  open,
  onOpenChange,
  onSubscriptionAdded,
}: AddSubscriptionDialogProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [category, setCategory] = useState("other");
  const [email, setEmail] = useState("");
  const [selectedLogo, setSelectedLogo] =
    useState<keyof typeof SUBSCRIPTION_LOGOS>("default");
  const [isLoading, setIsLoading] = useState(false);

  const calculateNextPaymentDate = (frequency: string) => {
    const today = new Date();
    switch (frequency) {
      case "daily":
        return addDays(today, 1);
      case "monthly":
        return addMonths(today, 1);
      case "yearly":
        return addYears(today, 1);
      default:
        return addMonths(today, 1); // Default to monthly
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to add a subscription",
          variant: "destructive",
        });
        return;
      }

      const nextPaymentDate = calculateNextPaymentDate(frequency);

      const { error } = await supabase.from("subscriptions").insert({
        user_id: user.id,
        name,
        amount: parseFloat(amount),
        frequency,
        category,
        email,
        image_url: SUBSCRIPTION_LOGOS[selectedLogo],
        next_payment_date: nextPaymentDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Subscription added successfully",
      });

      onSubscriptionAdded();
      onOpenChange(false);
      setName("");
      setAmount("");
      setFrequency("monthly");
      setCategory("other");
      setEmail("");
      setSelectedLogo("default");
    } catch (error) {
      console.error("Error adding subscription:", error);
      toast({
        title: "Error",
        description: "Failed to add subscription",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Subscription</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#242837] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-[#242837] border-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#242837] border-gray-800 text-white"
              placeholder="Associated email (optional)"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Frequency</label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger className="bg-[#242837] border-gray-800 text-white">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-gray-800">
                {FREQUENCIES.map((freq) => (
                  <SelectItem
                    key={freq.value}
                    value={freq.value}
                    className="text-white hover:bg-[#242837] focus:bg-[#242837]"
                  >
                    {freq.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-[#242837] border-gray-800 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-gray-800">
                {CATEGORIES.map((cat) => (
                  <SelectItem
                    key={cat.value}
                    value={cat.value}
                    className="text-white hover:bg-[#242837] focus:bg-[#242837]"
                  >
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <LogoSelector
            selectedLogo={selectedLogo}
            onLogoChange={setSelectedLogo}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name || !amount || isLoading}>
            Add Subscription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
