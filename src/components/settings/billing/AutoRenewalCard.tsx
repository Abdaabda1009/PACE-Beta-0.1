import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
export const AutoRenewalCard = () => {
  const { toast } = useToast();
  const handleToggle = () => {
    toast({
      title: "Coming Soon",
      description: "Auto-renewal settings will be available soon.",
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Auto-Renewal</CardTitle>
        <CardDescription>
          Manage subscription auto-renewal settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Switch id="auto-renewal" onCheckedChange={handleToggle} />
          <Label htmlFor="auto-renewal">
            Enable auto-renewal for subscriptions
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};
