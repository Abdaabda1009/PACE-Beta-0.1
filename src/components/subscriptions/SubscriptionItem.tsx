import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Pencil, Trash2 } from "lucide-react";
import { DeleteSubscriptionDialog } from "../subscriptions/DeleteSubscriptionDialog";

interface SubscriptionItemProps {
  id: string;
  name: string;
  amount: number;
  date: string;
  image?: string;
  onEdit: () => void;
  onSubscriptionDeleted: () => void;
}

export const SubscriptionItem = ({
  id,
  name,
  amount,
  date,
  image,
  onEdit,
  onSubscriptionDeleted,
}: SubscriptionItemProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
    <div className="py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-10 h-10 rounded-lg object-cover"
          />
        )}
        <div>
          <h3 className="text-white font-medium">{name}</h3>
          <p className="text-sm text-gray-400">Next payment: {date}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-white font-medium mr-4">${amount}</p>
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
