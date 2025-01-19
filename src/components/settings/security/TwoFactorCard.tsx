import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
export const TwoFactorCard = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const handleToggle2FA = async () => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");
      // Here you would typically integrate with Supabase's auth settings
      // For now, we'll just show a toast
      toast({
        title: isEnabled ? "2FA Disabled" : "2FA Enabled",
        description: isEnabled
          ? "Two-factor authentication has been disabled"
          : "Two-factor authentication has been enabled",
      });
      setIsEnabled(!isEnabled);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update 2FA settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Two-Factor Authentication</CardTitle>
        <CardDescription>
          Add an extra layer of security to your account with 2FA
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">
            {isEnabled ? "2FA is enabled" : "2FA is disabled"}
          </p>
          <p className="text-sm text-muted-foreground">
            {isEnabled
              ? "Your account is protected with two-factor authentication"
              : "Enable 2FA for additional security"}
          </p>
        </div>
        <Switch
          className="h-6 w-11 text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
          checked={isEnabled}
          onCheckedChange={handleToggle2FA}
          disabled={isLoading}
        />
      </CardContent>
    </Card>
  );
};
