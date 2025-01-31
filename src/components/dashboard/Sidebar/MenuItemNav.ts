import {
  LayoutDashboard,
  PiggyBank,
  BarChart2,
  CreditCard,
  List,
  User,
  Settings,
  HelpCircle,
  CalendarDays,
  FileText,
  DollarSign,
  ChevronDown,
  ChevronRight,
  Wallet,
  TargetIcon,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";

interface MenuItem {
  icon: any;
  label: string;
  path?: string;
  children?: MenuItem[];
  category?: "Dashboard" | "Help" | "Financial Tools" | "System" | "Report & Analysis";
}

export const menuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    category: "Dashboard",
  },

  {
    icon: PiggyBank,
    label: "Budget Planner",
    path: ROUTES.BUDGET_PLANNER,
    category: "Financial Tools",
  },

  {
    icon: TargetIcon,
    label: "Goals",
    path: ROUTES.GOALS,
    category: "Financial Tools",
  },

  {
    icon: CreditCard,
    label: "Debt Management",
    path: ROUTES.DEBT_MANAGEMENT,
    category: "Financial Tools",
  },

  {
    icon: CalendarDays,
    label: "Subscription Tracker",
    path: ROUTES.SUBSCRIPTIONS,
    category: "Financial Tools",
  },

  {
    icon: BarChart2,
    label: "Financial Analysis",
    path: ROUTES.FINANCIAL_ANALYSIS,
    category: "Report & Analysis",
  },

  {
    icon: List,
    label: "Transactions",
    path: ROUTES.TRANSACTIONS,
    category: "Financial Tools",
  },

  {
    icon: Settings,
    label: " Settings",
    path: ROUTES.SETTINGS,
    category: "System",
  },

  {
    icon: HelpCircle,
    label: "Support",
    path: ROUTES.SUPPORT,
    category: "Help",
  },
];
