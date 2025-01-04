import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { LogoSelector } from "../EditSubscriptionDialog/LogoSelector";
import { InputFields } from "../EditSubscriptionDialog/InputFields";
import { SaveButton } from "../EditSubscriptionDialog/SaveButton";
import { SUBSCRIPTION_LOGOS } from "../EditSubscriptionDialog/constants";
import { EditSubscriptionDialogProps } from "../EditSubscriptionDialog/types";

export const EditSubscriptionDialog = ({
  open,
  onOpenChange,
  subscription,
  onSubscriptionUpdated,
}: EditSubscriptionDialogProps) => {
  const [name, setName] = useState(subscription.name);
  const [amount, setAmount] = useState(subscription.amount.toString());
  const [date, setDate] = useState(subscription.date);
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
          title: "Error",
          description: "You must be logged in to update a subscription",
          variant: "destructive",
        });
        return;
      }

      // Validate UUID format
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
          next_payment_date: date,
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
        description: "Failed to update subscription",
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
            date={date}
            onNameChange={setName}
            onAmountChange={setAmount}
            onDateChange={setDate}
          />
          <LogoSelector
            selectedLogo={selectedLogo}
            onLogoChange={setSelectedLogo}
          />
        </div>
        <SaveButton
          isLoading={isLoading}
          disabled={!name || !amount || !date}
          onCancel={() => onOpenChange(false)}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
};
