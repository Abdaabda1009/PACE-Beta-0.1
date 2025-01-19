import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const EmailNotificationsCard = () => {
  const { toast } = useToast();
  const [transactionUpdates, setTransactionUpdates] = useState(false);
  const [budgetInsights, setBudgetInsights] = useState(false);

  const handleToggle = (type: string, checked: boolean) => {
    if (type === "transactions") {
      setTransactionUpdates(checked);
    } else {
      setBudgetInsights(checked);
    }

    toast({
      title: "Notification settings updated",
      description: `${type} notifications have been ${
        checked ? "enabled" : "disabled"
      }.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="transaction-updates">Transaction Updates</Label>
          <Switch
            id="transaction-updates"
            checked={transactionUpdates}
            onCheckedChange={(checked) => handleToggle("transactions", checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="budget-insights">Budgeting Insights</Label>
          <Switch
            id="budget-insights"
            checked={budgetInsights}
            onCheckedChange={(checked) => handleToggle("insights", checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
