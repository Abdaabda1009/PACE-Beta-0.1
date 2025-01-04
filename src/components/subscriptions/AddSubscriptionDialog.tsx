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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { LogoSelector } from "./EditSubscriptionDialog/LogoSelector";
import { SUBSCRIPTION_LOGOS } from "./EditSubscriptionDialog/constants";

interface AddSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubscriptionAdded: () => void;
}

export const AddSubscriptionDialog = ({
  open,
  onOpenChange,
  onSubscriptionAdded,
}: AddSubscriptionDialogProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [selectedLogo, setSelectedLogo] =
    useState<keyof typeof SUBSCRIPTION_LOGOS>("default");
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
          description: "You must be logged in to add a subscription",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("subscriptions").insert({
        user_id: user.id,
        name,
        amount: parseFloat(amount),
        next_payment_date: date,
        image_url: SUBSCRIPTION_LOGOS[selectedLogo],
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
      setDate("");
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
            <label className="text-sm text-gray-400">Next Payment Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-[#242837] border-gray-800 text-white"
            />
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
          <Button
            onClick={handleSave}
            disabled={!name || !amount || !date || isLoading}
          >
            Add Subscription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
