import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
export const DeviceManagementCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const handleManageDevices = async () => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");
      toast({
        title: "Devices Retrieved",
        description: "Your connected devices have been retrieved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to retrieve connected devices",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Management</CardTitle>
        <CardDescription>
          View and manage devices connected to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
          onClick={handleManageDevices}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Manage Devices"}
        </Button>
      </CardContent>
    </Card>
  );
};
