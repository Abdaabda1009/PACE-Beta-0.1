import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const PushNotificationsCard = () => {
  const { toast } = useToast();
  const [goalUpdates, setGoalUpdates] = useState(false);
  const [budgetAlerts, setBudgetAlerts] = useState(false);
  const [subscriptionReminders, setSubscriptionReminders] = useState(false);

  const handleToggle = (type: string, checked: boolean) => {
    switch (type) {
      case "goals":
        setGoalUpdates(checked);
        break;
      case "budgets":
        setBudgetAlerts(checked);
        break;
      case "subscriptions":
        setSubscriptionReminders(checked);
        break;
    }

    toast({
      title: "Push notification settings updated",
      description: `${type} notifications have been ${
        checked ? "enabled" : "disabled"
      }.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Push Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="goal-updates">Goal Updates</Label>
          <Switch
            id="goal-updates"
            checked={goalUpdates}
            onCheckedChange={(checked) => handleToggle("goals", checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="budget-alerts">Budget Alerts</Label>
          <Switch
            id="budget-alerts"
            checked={budgetAlerts}
            onCheckedChange={(checked) => handleToggle("budgets", checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="subscription-reminders">Subscription Reminders</Label>
          <Switch
            id="subscription-reminders"
            checked={subscriptionReminders}
            onCheckedChange={(checked) =>
              handleToggle("subscriptions", checked)
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};
