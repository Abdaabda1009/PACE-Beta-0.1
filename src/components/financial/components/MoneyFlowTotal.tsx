interface MoneyFlowTotalProps {
  total: number;
  percentageChange: number;
  formatAmount: (amount: number) => string;
}

export const MoneyFlowTotal = ({
  total,
  percentageChange,
  formatAmount,
}: MoneyFlowTotalProps) => {
  const isPositive = percentageChange > 0;

  return (
    <div className="flex items-baseline gap-2 mb-6">
      <span className="text-2xl font-semibold text-white">
        {formatAmount(total)}
      </span>
      <div
        className={`flex items-center text-sm ${
          isPositive ? "text-dashboard-success" : "text-dashboard-error"
        }`}
      >
        <span>{Math.abs(percentageChange)}%</span>
      </div>
    </div>
  );
};
