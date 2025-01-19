import { SubscriptionPlanCard } from "../SubscriptionPlanCard";
import { PaymentMethodsCard } from "../PaymentMethodsCard";
import { BillingHistoryCard } from "../BillingHistoryCard";
import { AutoRenewalCard } from "../AutoRenewalCard";
export const BillingSettings = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <SubscriptionPlanCard />
        <PaymentMethodsCard />
        <BillingHistoryCard />
        <AutoRenewalCard />
      </div>
    </div>
  );
};
