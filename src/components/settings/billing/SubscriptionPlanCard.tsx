import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
export const SubscriptionPlanCard = () => {
  const { toast } = useToast();
  const handleUpgrade = () => {
    toast({
      title: "Coming Soon",
      description: "Plan upgrade functionality will be available soon.",
    });
  };
  const handleDowngrade = () => {
    toast({
      title: "Coming Soon",
      description: "Plan downgrade functionality will be available soon.",
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          View and manage your subscription plan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-card border">
          <h3 className="font-semibold mb-2">Current Plan: Free</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Access basic features and functionality
          </p>
          <div className="flex gap-4">
            <Button
              onClick={handleUpgrade}
              className=" w-full flex items-center gap-2 border text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
            >
              <ArrowUp className="w-4 h-4" />
              Upgrade Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
