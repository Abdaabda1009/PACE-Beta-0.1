import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { LogoSelector } from "./LogoSelector";
import { InputFields } from "./InputFields";
import { SaveButton } from "./SaveButton";
import { SUBSCRIPTION_LOGOS } from "./constants";
import { EditSubscriptionDialogProps } from "./types";

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

export const EditSubscriptionDialog = ({
  open,
  onOpenChange,
  subscription,
  onSubscriptionUpdated,
}: EditSubscriptionDialogProps) => {
  const [name, setName] = useState(subscription.name);
  const [amount, setAmount] = useState(subscription.amount.toString());
  const [frequency, setFrequency] = useState(
    subscription.frequency || "monthly"
  );
  const [category, setCategory] = useState(subscription.category || "other");
  const [selectedLogo, setSelectedLogo] = useState<
    keyof typeof SUBSCRIPTION_LOGOS
  >(
    (Object.entries(SUBSCRIPTION_LOGOS).find(
      ([_, url]) => url === subscription.image_url
    )?.[0] as keyof typeof SUBSCRIPTION_LOGOS) || "default"
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Oops! Something went wrong",
          description:
            "Please try again. If the issue persists, kindly report the problem to our support team. We're here to help!😊",
          variant: "destructive",
        });
        return;
      }

      if (
        !subscription.id.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        )
      ) {
        toast({
          title: "Error",
          description: "Invalid subscription ID format",
          variant: "destructive",
        });
        return;
      }

      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount)) {
        toast({
          title: "Error",
          description: "Please enter a valid amount",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("subscriptions")
        .update({
          name,
          amount: parsedAmount,
          frequency,
          category,
          image_url: SUBSCRIPTION_LOGOS[selectedLogo],
        })
        .eq("id", subscription.id)
        .eq("user_id", user.id)
        .select();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Subscription updated successfully",
      });

      onSubscriptionUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating subscription:", error);
      toast({
        title: "Error",
        description:
          "Failed to update subscription, Please try again. If the issue persists, kindly report the problem to our support team. We're here to help!😊",
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
          <DialogTitle className="text-white">Edit Subscription</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <InputFields
            name={name}
            amount={amount}
            onNameChange={setName}
            onAmountChange={setAmount}
          />
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
        <SaveButton
          isLoading={isLoading}
          disabled={!name || !amount}
          onCancel={() => onOpenChange(false)}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
};
