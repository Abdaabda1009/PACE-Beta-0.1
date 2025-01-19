import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";


export const BillingHistoryCard = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle> Billing History </CardTitle>
          <CardDescription>
            View your past invoices and receipts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg border">
              <p className="text-sm text muted-foreground">
                No billing history available
              </p>
            </div>
            <Button className="flex items-center gap-2 text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white ">
              <Receipt className="w-4 h-4" />
              Download All Receipts
            </Button>
          </div>
        </CardContent>
      </Card>
    );
};