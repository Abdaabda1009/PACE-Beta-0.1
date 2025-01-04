interface Transaction {
  icon: React.ReactNode;
  name: string;
  amount: number;
  progress: number;
}

interface MoneyFlowTransactionsProps {
  transactions: Transaction[];
  formatAmount: (amount: number) => string;
}

export const MoneyFlowTransactions = ({
  transactions,
  formatAmount,
}: MoneyFlowTransactionsProps) => {
  return (
    <div className="space-y-4">
      {transactions.map((transaction, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 py-2 border-b border-gray-800 last:border-0"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#050524] flex items-center justify-center text-dashboard-success">
                {transaction.icon}
              </div>
              <span className="text-sm text-white">{transaction.name}</span>
            </div>
            <span className="text-sm text-white">
              {formatAmount(transaction.amount)}
            </span>
          </div>
          <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-dashboard-success rounded-full"
              style={{ width: `${transaction.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
