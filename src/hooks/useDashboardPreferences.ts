import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardPreferences } from "@/types/Dashboard";
import { useToast } from "@/hooks/use-toast";
import { Widget } from "@/components/dashboard/types";

export const useDashboardPreferences = (defaultWidgets: Widget[]) => {
  const [dashboardPreferences, setDashboardPreferences] =
    useState<DashboardPreferences | null>(null);
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(true);
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const { toast } = useToast();

  const fetchDashboardPreferences = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("dashboard_preferences")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        const typedData = data as DashboardPreferences;
        setDashboardPreferences(typedData);

        if (
          Array.isArray(typedData.widget_order) &&
          typedData.widget_order.length > 0
        ) {
          const orderedWidgets = typedData.widget_order
            .map((id) => defaultWidgets.find((w) => w.id === id))
            .filter((w): w is Widget => w !== undefined);

          const remainingWidgets = defaultWidgets.filter(
            (w) => !typedData.widget_order.includes(w.id)
          );
          setWidgets([...orderedWidgets, ...remainingWidgets]);
        } else {
          setWidgets(defaultWidgets);
        }
      } else {
        // Create default preferences if none exist
        const { data: newPrefs, error: createError } = await supabase
          .from("dashboard_preferences")
          .insert([
            {
              user_id: user.id,
              theme: "dark" as const,
              layout_type: "grid" as const,
              widget_order: defaultWidgets.map((w) => w.id),
            },
          ])
          .select()
          .single();

        if (createError) throw createError;
        setDashboardPreferences(newPrefs as DashboardPreferences);
        setWidgets(defaultWidgets);
      }
    } catch (error) {
      console.error("Error fetching dashboard preferences:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard preferences",
        variant: "destructive",
      });
    } finally {
      setIsLoadingPreferences(false);
    }
  };

  const handleWidgetReorder = async (startIndex: number, endIndex: number) => {
    const newWidgets = [...widgets];
    const [removed] = newWidgets.splice(startIndex, 1);
    newWidgets.splice(endIndex, 0, removed);
    setWidgets(newWidgets);

    try {
      const { error } = await supabase
        .from("dashboard_preferences")
        .update({
          widget_order: newWidgets.map((w) => w.id),
          updated_at: new Date().toISOString(),
        })
        .eq("id", dashboardPreferences?.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating widget order:", error);
      toast({
        title: "Error",
        description: "Failed to save widget order",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDashboardPreferences();

    const channel = supabase
      .channel("dashboard-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "dashboard_preferences",
        },
        (payload) => {
          if (payload.new) {
            setDashboardPreferences(payload.new as DashboardPreferences);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    dashboardPreferences,
    isLoadingPreferences,
    widgets,
    handleWidgetReorder,
    fetchDashboardPreferences,
  };
};
