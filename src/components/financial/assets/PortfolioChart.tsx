import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const timeframes = ["1H", "1D", "3D", "1M", "1Y"] as const;

export const PortfolioChart = () => {
  const [selectedTimeframe, setSelectedTimeframe] =
    useState<(typeof timeframes)[number]>("1M");
  const [selectedToken, setSelectedToken] = useState("ETH");
  const { formatAmount, convertAmount } = useCurrencyPreference();

  const { data: chartData = [] } = useQuery({
    queryKey: ["portfolio-history", selectedTimeframe],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_history")
        .select("value, date")
        .order("date", { ascending: true });

      if (error) throw error;

      return data.map((item) => ({
        date: format(new Date(item.date), "dd MMM"),
        value: item.value,
      }));
    },
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dashboard-card rounded-lg shadow-lg p-3 border border-gray-800">
          <p className="text-sm font-medium text-white">
            {formatAmount(convertAmount(payload[0].value, "USD"))}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-dashboard-card border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Select value={selectedToken} onValueChange={setSelectedToken}>
            <SelectTrigger className="bg-[#050524] text-gray-100 gap-3 hover:bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF]">
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent className="bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF] border-gray-800">
              <SelectItem value="ETH">ETH</SelectItem>
              <SelectItem value="BTC">BTC</SelectItem>
              <SelectItem value="SOL">SOL</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          {timeframes.map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? "default" : "outline"}
              onClick={() => setSelectedTimeframe(timeframe)}
              className="bg-[#050524] text-gray-100 gap-3 hover:bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF]"
            >
              {timeframe}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6C7293", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6C7293", fontSize: 12 }}
              tickFormatter={(value) =>
                formatAmount(convertAmount(value, "USD"))
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8B5CF6"
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
