import { formatDate } from "@/lib/utils/date";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Wallet,
  Building2,
  Star,
  Flag,
  MoreVertical,
  RefreshCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "in" | "out";
  category: string;
  payment_method?: string;
  merchant?: string;
  transaction_date: string;
  is_recurring?: boolean;
  is_starred?: boolean;
  is_flagged?: boolean;
}

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export const TransactionList = ({
  transactions,
  isLoading,
}: TransactionListProps) => {
  const { formatAmount } = useCurrencyPreference();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  const groupedTransactions = transactions.reduce(
    (groups: Record<string, Transaction[]>, transaction) => {
      const date = transaction.transaction_date
        ? new Date(transaction.transaction_date).toDateString()
        : "Invalid Date";
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {}
  );

  const getPaymentIcon = (method: string = "card") => {
    switch (method) {
      case "card":
        return <CreditCard className="w-4 h-4" />;
      case "cash":
        return <Wallet className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
        <div key={date} className="space-y-3">
          <h3 className="text-sm font-medium text-gray-400">
            {date !== "Invalid Date" ? formatDate(date) : "Unknown Date"}
          </h3>
          <div className="space-y-3 ">
            {dayTransactions.map((transaction) => (
              <Card
                key={transaction.id}
                className="p-4 hover:bg-dashboard-background/50 transition-colors duration-200"
              >
                <div className="flex items-start  justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-dashboard-background flex items-center justify-center">
                      {getPaymentIcon(transaction.payment_method)}
                    </div>
                    <div>
                      <h4 className="font-medium">{transaction.title}</h4>
                      <p className="text-sm text-gray-400">
                        {transaction.merchant || transaction.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-medium ${
                        transaction.type === "in"
                          ? "text-dashboard-success"
                          : "text-dashboard-error"
                      }`}
                    >
                      {transaction.type === "in" ? "+" : "-"}
                      {formatAmount(transaction.amount)}
                    </span>
                    <div className="flex items-center gap-1">
                      {transaction.is_recurring && (
                        <Badge variant="outline" className="gap-1">
                          <RefreshCw className="w-3 h-3" />
                          Recurring
                        </Badge>
                      )}
                      {transaction.is_starred && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                      {transaction.is_flagged && (
                        <Flag className="w-4 h-4 text-red-500" />
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 hover:bg-dashboard-background rounded-full">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                          <DropdownMenuItem>Flag</DropdownMenuItem>
                          <DropdownMenuItem>Star</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
