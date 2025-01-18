import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Pencil, Trash2, Mail, Calendar, Tag } from "lucide-react";
import { DeleteSubscriptionDialog } from "../subscriptions/DeleteSubscriptionDialog";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";
import { SubscriptionDetails } from "../subscriptions/SubscriptionDetails";

interface SubscriptionItemProps {
  id: string;
  name: string;
  amount: number;
  date: string;
  email?: string;
  image?: string;
  frequency?: string;
  category?: string;
  onEdit: () => void;
  onSubscriptionDeleted: () => void;
}

export const SubscriptionItem = ({
  id,
  name,
  amount,
  date,
  email,
  image,
  frequency = "monthly",
  category = "other",
  onEdit,
  onSubscriptionDeleted,
}: SubscriptionItemProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { formatAmount, convertAmount } = useCurrencyPreference();

  // Set up real-time subscription for updates
  useEffect(() => {
    const channel = supabase
      .channel("subscription_updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "subscriptions",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          console.log("Subscription updated:", payload);
          // Refresh the subscription data
          if (payload.eventType === "DELETE") {
            onSubscriptionDeleted();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, onSubscriptionDeleted]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      // Validate UUID format
      if (
        !id.match(
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

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to delete a subscription",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("subscriptions")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Subscription deleted successfully",
      });

      onSubscriptionDeleted();
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting subscription:", error);
      toast({
        title: "Error",
        description: "Failed to delete subscription",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-fit"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-white font-medium">{name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              {email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" aria-label={`Email: ${email}`} />
                  <span className="hidden sm:inline">{email}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" aria-label="Frequency" />
                <span className="hidden sm:inline">{frequency}</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" aria-label="Category" />
                <span className="hidden sm:inline">{category}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-400">Next payment: {date}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <p className="text-white font-medium mr-4">
          {formatAmount(convertAmount(amount))}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-gray-400 hover:text-white"
          onClick={onEdit}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-gray-400 hover:text-white"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <DeleteSubscriptionDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};
