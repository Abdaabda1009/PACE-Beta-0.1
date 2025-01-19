import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
export const BankAccountsCard = () => {
  const { toast } = useToast();
  const handleLinkBank = () => {
    toast({
      title: "Coming Soon",
      description: "Bank account linking will be available soon.",
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bank Accounts</CardTitle>
        <CardDescription>Link and manage your bank accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <p className="text-sm text-muted-foreground">
              No bank accounts linked
            </p>
          </div>
          <Button
            onClick={handleLinkBank}
            className="flex items-center gap-2  text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
          >
            <Plus className="w-4 h-4 " />
            Link Bank Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
