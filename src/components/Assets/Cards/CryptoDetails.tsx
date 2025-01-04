import { LineChart, Line, ResponsiveContainer } from "recharts";

interface CryptoDetailsProps {
  quantity: number;
  symbol: string;
  totalValue: number;
  chartData: { value: number }[];
  isPositive: boolean;
}

export const CryptoDetails = ({
  quantity,
  symbol,
  totalValue,
  chartData,
  isPositive,
}: CryptoDetailsProps) => {
  return (
    <>
      <div className="h-20 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#10B981" : "#EF4444"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-sm text-gray-400 space-y-2">
        <div className="flex justify-between items-center p-2 bg-slate-700/50 rounded">
          <span>Quantity:</span>
          <span title={`${quantity} ${symbol}`}>
            {quantity} {symbol}
          </span>
        </div>
        <div className="flex justify-between items-center p-2 bg-slate-700/50 rounded">
          <span>Total Value:</span>
          <span title={`${totalValue}`}>{totalValue}</span>
        </div>
      </div>
    </>
  );
};
