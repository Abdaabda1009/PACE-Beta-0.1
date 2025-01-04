import { useState } from "react";
import { StatsCard } from "../stats/StatsCard";
import { EditStatsDialog } from "@/components/stats/EditStatsDialog";
import { useFinancialStats } from "@/hooks/useFinancialStats";
import { useStatsSync } from "@/hooks/useStatsSync";

interface StatsOverviewProps {
  stats: any[];
  onStatsUpdated: () => void;
}

export const StatsOverview = ({
  stats,
  onStatsUpdated,
}: StatsOverviewProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { monthlyIncome, monthlyExpenses } = useFinancialStats();
  const { stats: syncedStats } = useStatsSync();

  const statsData = [
    {
      id: "1",
      title: "Debt-Income Ratio",
      value:
        syncedStats?.find((stat) => stat.title === "Debt-Income Ratio")
          ?.value || 35,
      trend: 2.1,
      trend_label: "vs last month",
    },
    {
      id: "2",
      title: "Monthly Expenses",
      value: monthlyExpenses,
      trend: -4.5,
      trend_label: "vs last month",
    },
    {
      id: "3",
      title: "Monthly Income",
      value: monthlyIncome,
      trend: 5.2,
      trend_label: "vs last month",
    },
    {
      id: "4",
      title: "Total Budget",
      value: stats.find((stat) => stat.title === "Total Budget")?.value || 0,
      trend: -1.5,
      trend_label: "vs last month",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {statsData.map((stat) => (
        <StatsCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          trend={stat.trend}
          trendLabel={stat.trend_label}
          onEdit={() => setIsEditDialogOpen(true)}
        />
      ))}
      <EditStatsDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSuccess={onStatsUpdated}
      />
    </div>
  );
};
