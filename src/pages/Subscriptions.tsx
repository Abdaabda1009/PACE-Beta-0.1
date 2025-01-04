import { useState } from "react";
import { SubscriptionOverview } from "@/components/dashboard/SubscriptionOverview";
import { EditSubscriptionDialog } from "@/components/subscriptions/EditSubscriptionDialog/EditSubscriptionDialog";
import { useSubscriptions } from "@/hooks/useSubscriptions";

export const Subscriptions = () => {
  const { subscriptions, isLoading, refetchSubscriptions } = useSubscriptions();
  const [editingSubscription, setEditingSubscription] = useState<any>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Subscriptions</h1>
      <SubscriptionOverview
        subscriptions={subscriptions}
        isLoading={isLoading}
        onEditSubscription={setEditingSubscription}
        onSubscriptionUpdated={refetchSubscriptions}
      />
      {editingSubscription && (
        <EditSubscriptionDialog
          open={!!editingSubscription}
          onOpenChange={(open) => !open && setEditingSubscription(null)}
          subscription={editingSubscription}
          onSubscriptionUpdated={refetchSubscriptions}
        />
      )}
    </div>
  );
};
