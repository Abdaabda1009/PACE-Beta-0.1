import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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

const PAYMENT_METHODS = [
  { value: "credit_card", label: "Credit Card" },
  { value: "debit_card", label: "Debit Card" },
  { value: "paypal", label: "PayPal" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "other", label: "Other" },
];

const STATUSES = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
  { value: "cancelled", label: "Cancelled" },
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
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [status, setStatus] = useState("active");
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
        return addMonths(today, 1);
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
        next_payment_date: nextPaymentDate.toISOString().split("T")[0],
        payment_method: paymentMethod,
        status,
        last_paid_date: null,
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
      setPaymentMethod("credit_card");
      setStatus("active");
    } catch (error) {
      console.error("Error adding subscription:", error);
      toast({
        title: "Failed to add subscription",
        description:
          "Oops! Something went wrong. Please try again. If the issue persists, kindly report the problem to our support team. We're here to help!😊",
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
          <DialogDescription className="text-gray-400">
            Enter the details of your new subscription below.
          </DialogDescription>
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
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Payment Method</label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="bg-[#242837] border-gray-800 text-white">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-gray-800">
                {PAYMENT_METHODS.map((method) => (
                  <SelectItem
                    key={method.value}
                    value={method.value}
                    className="text-white hover:bg-[#242837] focus:bg-[#242837]"
                  >
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-[#242837] border-gray-800 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-gray-800">
                {STATUSES.map((statusOption) => (
                  <SelectItem
                    key={statusOption.value}
                    value={statusOption.value}
                    className="text-white hover:bg-[#242837] focus:bg-[#242837]"
                  >
                    {statusOption.label}
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
