import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SpendingChartContentProps {
  data: any[];
}

export const SpendingChartContent = ({ data }: SpendingChartContentProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dashboard-card rounded-lg shadow-lg p-3 border border-gray-800">
          <p className="text-sm font-medium text-white mb-1">
            Income: {payload[0].value.toLocaleString()} Kr
          </p>
          <p className="text-sm font-medium text-white">
            Expenses: {payload[1].value.toLocaleString()} Kr
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF5555" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#FF5555" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "#6C7293" }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "#6C7293" }}
          tickFormatter={(value) => `${value.toLocaleString()} Kr`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="income"
          stroke="#4ADE80"
          strokeWidth={2}
          fill="url(#colorIncome)"
          dot={false}
          activeDot={{
            r: 4,
            fill: "#4ADE80",
            stroke: "#fff",
            strokeWidth: 2,
          }}
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stroke="#FF5555"
          strokeWidth={2}
          fill="url(#colorExpenses)"
          dot={false}
          activeDot={{
            r: 4,
            fill: "#FF5555",
            stroke: "#fff",
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
