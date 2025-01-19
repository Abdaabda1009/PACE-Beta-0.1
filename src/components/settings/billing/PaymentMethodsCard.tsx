import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PaymentMethodsCard = () => {
  const { toast } = useToast();

  const handleAddPayment = () => {
    toast({
      title: "Payment method Coming Soon",
      description: "We are working on this feature, please check back later",
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage Your Payment Details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <p className="text-sm text-muted-foreground">
              No Payment methods added
            </p>
          </div>
          <Button
            className="flex items-center gap-2 text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
            onClick={handleAddPayment}
          >
            <CreditCard className="w-4 h-4" />
            Add Payment Method
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};