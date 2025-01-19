import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
export const ConnectedAppsCard = () => {
  const { toast } = useToast();
  const handleManagePermissions = () => {
    toast({
      title: "Coming Soon",
      description: "App permissions management will be available soon.",
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Apps</CardTitle>
        <CardDescription>Manage third-party app permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <p className="text-sm text-muted-foreground">No connected apps</p>
          </div>
          <Button
            onClick={handleManagePermissions}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Manage Permissions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
