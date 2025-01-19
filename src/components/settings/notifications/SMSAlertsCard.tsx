import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const SMSAlertsCard = () => {
  const { toast } = useToast();
  const [spendingAlerts, setSpendingAlerts] = useState(false);

  const handleToggle = (checked: boolean) => {
    setSpendingAlerts(checked);
    toast({
      title: "SMS alerts updated",
      description: `Spending threshold alerts have been ${
        checked ? "enabled" : "disabled"
      }.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SMS Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Label htmlFor="spending-alerts">Spending Alerts</Label>
          <Switch
            id="spending-alerts"
            checked={spendingAlerts}
            onCheckedChange={handleToggle}
          />
        </div>
      </CardContent>
    </Card>
  );
};
