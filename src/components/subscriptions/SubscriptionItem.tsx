import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Pencil, Trash2 } from "lucide-react";
import { DeleteSubscriptionDialog } from "../subscriptions/DeleteSubscriptionDialog";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";
import { TableRow, TableCell } from "@/components/ui/table";

interface SubscriptionItemProps {
  id: string;
  name: string;
  amount: number;
  date: string;
  email?: string;
  image?: string;
  frequency?: string;
  category?: string;
  status?: string;
  paymentMethod?: string;
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
  status = "active",
  paymentMethod = "credit_card",
  onEdit,
  onSubscriptionDeleted,
}: SubscriptionItemProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { formatAmount, convertAmount } = useCurrencyPreference();

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
        title: "Failed to delete subscription",
        description: "Oops! Something went wrong. Please try again. If the issue persists, kindly report the problem to our support team. We're here to help!😊",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500/10 text-green-500";
      case "inactive":
        return "bg-gray-500/10 text-gray-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "cancelled":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const formatPaymentMethod = (method: string) => {
    return method
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <TableRow className="border-gray-800">
      <TableCell>
        <div className="flex items-center gap-2">
          {image && (
            <img
              src={image}
              alt={name}
              className="w-8 h-8 rounded-lg object-cover"
            />
          )}
          <span className="text-white">{name}</span>
        </div>
      </TableCell>
      <TableCell className="text-gray-400">{category}</TableCell>
      <TableCell className="text-white font-medium">
        {formatAmount(convertAmount(amount))}
      </TableCell>
      <TableCell className="text-gray-400">
        {formatPaymentMethod(paymentMethod)}
      </TableCell>
      <TableCell className="text-gray-400">{date}</TableCell>
      <TableCell className="text-gray-400">
        <span className={`px-2 py-1 rounded-full ${getStatusColor(status)}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </TableCell>
      <TableCell className="text-gray-400">{frequency}</TableCell>
      <TableCell className="text-gray-400">{date}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
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
      </TableCell>
      <DeleteSubscriptionDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </TableRow>
  );
};
