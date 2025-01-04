import { ArrowUpRight, ArrowDownRight, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";
import { useStatsSync } from "@/hooks/useStatsSync";

interface StatsCardProps {
  title: string;
  value: string | number;
  trend: number;
  trendLabel: string;
  onEdit?: () => void;
}

export const StatsCard = ({
  title,
  value,
  trend,
  trendLabel,
  onEdit,
}: StatsCardProps) => {
  const { formatAmount, convertAmount } = useCurrencyPreference();
  const { stats } = useStatsSync();
  const isPositive = trend > 0;

  // Get the synced value from stats if available
  const syncedValue = stats?.find((s) => s.title === title)?.value;

  // Use synced value if available, otherwise use the provided value
  const displayValue = syncedValue !== undefined ? syncedValue : value;

  // Format the value based on its type and whether it's a percentage
  const formattedValue =
    typeof displayValue === "number"
      ? title.includes("Ratio") || title.includes("Rate")
        ? `${displayValue}%`
        : formatAmount(convertAmount(displayValue))
      : displayValue;

  return (
    <div className="bg-dashboard-card p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">{title}</span>
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex items-center text-xs",
              isPositive ? "text-dashboard-success" : "text-dashboard-error"
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            <span>{Math.abs(trend)}%</span>
          </div>
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              className="w-[32px] h-[32px] p-[6px] text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="text-xl font-semibold text-white">{formattedValue}</div>
      <div className="text-xs text-gray-400 mt-1">{trendLabel}</div>
      {onEdit && (
        <div className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          Click the edit icon to update this value
        </div>
      )}
    </div>
  );
};
