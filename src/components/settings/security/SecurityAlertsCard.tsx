import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
export const SecurityAlertsCard = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const handleToggleAlerts = async (
    type: "email" | "sms",
    enabled: boolean
  ) => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");
      if (type === "email") {
        setEmailAlerts(enabled);
      } else {
        setSmsAlerts(enabled);
      }
      toast({
        title: "Alerts Updated",
        description: `${type.toUpperCase()} alerts have been ${
          enabled ? "enabled" : "disabled"
        }`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update alert settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Alerts</CardTitle>
        <CardDescription>
          Manage notifications for suspicious account activity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Email Alerts</p>
            <p className="text-sm text-muted-foreground">
              Receive alerts via email
            </p>
          </div>
          <Switch
            checked={emailAlerts}
            onCheckedChange={(checked) => handleToggleAlerts("email", checked)}
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">SMS Alerts</p>
            <p className="text-sm text-muted-foreground">
              Receive alerts via SMS
            </p>
          </div>
          <Switch
            checked={smsAlerts}
            onCheckedChange={(checked) => handleToggleAlerts("sms", checked)}
            disabled={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
};
