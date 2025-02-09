import { useState } from "react";
import { StatsOverview } from "./StatsOverview";
import { EditSubscriptionDialog } from "@/components/subscriptions/EditSubscriptionDialog/EditSubscriptionDialog";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { DashboardCustomizeButton } from "./DashboardCustomizeButton";
import { Loader2 } from "lucide-react";
import { createDefaultWidgets } from "@/components/dashboard/confiq/defaultWidgets";
import { useDashboardPreferences } from "@/hooks/useDashboardPreferences";
import { CollapsibleWidget } from "@/components/dashboard/confiq/CollapsibleWidget";
import { useMediaQuery } from "@/hooks/use-media-query";

export const MainDashboard = () => {
  const [stats, setStats] = useState([]);
  const [timeRange, setTimeRange] = useState<"1Y" | "6M" | "3M" | "1M">("1Y");
  const { subscriptions, isLoading, refetchSubscriptions } = useSubscriptions();
  const [editingSubscription, setEditingSubscription] = useState<any>(null);
  const isMobile = useMediaQuery("(max-width: 208px)");

  const defaultWidgets = createDefaultWidgets(
    timeRange,
    setTimeRange,
    subscriptions,
    isLoading,
    setEditingSubscription,
    refetchSubscriptions
  );

  const {
    dashboardPreferences,
    isLoadingPreferences,
    widgets,
    handleWidgetReorder,
    fetchDashboardPreferences,
  } = useDashboardPreferences(defaultWidgets);

  const handleStatsUpdate = () => {
    // Implementation can be added here if needed
  };

  if (isLoadingPreferences) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const renderWidget = (widget: any, index: number) => {
    const colSpanClass =
      dashboardPreferences?.layout_type === "grid"
        ? widget.id === "spending"
          ? "col-span-1 md:col-span-12 lg:col-span-8"
          : widget.id === "goals"
          ? "col-span-1 md:col-span-12 lg:col-span-4"
          : "col-span-1 md:col-span-12"
        : "col-span-1";

    if (isMobile) {
      return (
        <CollapsibleWidget
          key={widget.id}
          title={widget.title}
          defaultExpanded={index === 0}
          className="mb-3 last:mb-0"
        >
          {widget.component}
        </CollapsibleWidget>
      );
    }

    return (
      <div
        key={widget.id}
        className={colSpanClass}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", index.toString());
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          const startIndex = parseInt(e.dataTransfer.getData("text/plain"));
          handleWidgetReorder(startIndex, index);
        }}
      >
        {widget.component}
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-6 max-w-[1920px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4">
        <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
        <DashboardCustomizeButton
          preferences={dashboardPreferences}
          onPreferencesUpdate={fetchDashboardPreferences}
        />
      </div>

      <div className="mb-4 sm:mb-6">
        <StatsOverview stats={stats} onStatsUpdated={handleStatsUpdate} />
      </div>

      <div
        className={`${
          !isMobile && dashboardPreferences?.layout_type === "grid"
            ? "grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-12"
            : "space-y-3"
        }`}
      >
        {widgets.map((widget, index) => renderWidget(widget, index))}
      </div>

      {editingSubscription && (
        <EditSubscriptionDialog
          open={!!editingSubscription}
          onOpenChange={(open) => !open && setEditingSubscription(null)}
          subscription={editingSubscription}
          onSubscriptionUpdated={refetchSubscriptions}
        />
      )}
    </div>
  );
};
