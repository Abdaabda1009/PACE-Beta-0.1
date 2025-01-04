import { Widget } from "@/components/dashboard/types";

export interface DashboardPreferences {
  id: string;
  user_id: string;
  theme: "dark" | "light";
  layout_type: "grid" | "stack";
  widget_order: string[];
  created_at: string;
  updated_at: string;
}

export type WidgetOrder = string[];
