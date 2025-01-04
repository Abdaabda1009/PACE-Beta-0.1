
import { BudgetOverview } from "@/components/budget/BudgetOverview";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { GoalsCard } from "@/components/goals/GoalsCard";
import { DebtOverview } from "@/components/debt/DebtOverview";
import { SubscriptionOverview } from "@/components/dashboard/SubscriptionOverview";
import { Widget } from "../types";
export const createDefaultWidgets = (
  timeRange: "1Y" | "6M" | "3M" | "1M",
  setTimeRange: (range: "1Y" | "6M" | "3M" | "1M") => void,
  subscriptions: any[],
  isLoading: boolean,
  onEditSubscription: (subscription: any) => void,
  onSubscriptionUpdated: () => void
): Widget[] => [
  { id: "budget", component: <BudgetOverview />, title: "Budget Overview" },
  {
    id: "spending",
    component: (
      <SpendingChart timeRange={timeRange} onTimeRangeChange={setTimeRange} />
    ),
    title: "Spending Chart",
  },
  { id: "goals", component: <GoalsCard />, title: "Goals" },
  { id: "debt", component: <DebtOverview />, title: "Debt Overview" },
  {
    id: "subscriptions",
    component: (
      <SubscriptionOverview
        subscriptions={subscriptions}
        isLoading={isLoading}
        onEditSubscription={onEditSubscription}
        onSubscriptionUpdated={onSubscriptionUpdated}
      />
    ),
    title: "Subscriptions",
  },
];
