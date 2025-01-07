import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Search, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { TransactionList } from "@/components/Transactions/TransactionList";
import { TransactionAnalytics } from "@/components/Transactions/TransactionAnalytics";
import { AddTransactionDialog } from "@/components/Transactions/Dialogs/AddTransactionDialog";
import { TransactionFilters } from "@/components/Transactions/TransactionFilters";
import { useToast } from "@/hooks/use-toast";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";

export const Transactions = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const { toast } = useToast();
  const { formatAmount } = useCurrencyPreference();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("financial_transactions")
        .select("*")
        .order("transaction_date", { ascending: false });

      if (error) {
        toast({
          title: "Error fetching transactions",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data || [];
    },
  });

  const filteredTransactions = transactions?.filter((transaction) => {
    const matchesSearch =
      searchQuery === "" ||
      transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.merchant?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.includes(transaction.category);

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="space-y-4 max-w-7x2 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="w-[44px] h-[44px] bg-[#050524] text-gray-400 hover:bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF]"
        >
          <Plus className="w-6 h-6 gap-2" />
        </Button>
      </div>

      <TransactionAnalytics transactions={transactions || []} />

      <Card className="p-4 sticky top-0 z-20 bg-dashboard-card/80 backdrop-blur-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-dashboard-background"
            />
          </div>
          <div className="flex gap-2">
            <TransactionFilters
              selectedFilters={selectedFilters}
              onFilterChange={setSelectedFilters}
            />
            <Button variant="outline" size="icon">
              <Calendar className="w-4 h-4 " />
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <TransactionList
        transactions={filteredTransactions || []}
        isLoading={isLoading}
      />

      <AddTransactionDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
};
