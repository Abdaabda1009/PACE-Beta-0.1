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
  Wallet,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";

interface MenuItem {
  icon: any;
  label: string;
  path?: string;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
  },
  {
    icon: DollarSign,
    label: "Budgeting",
    children: [
      { icon: FileText, label: "Budget Planner", path: ROUTES.BUDGET_PLANNER },
      {
        icon: BarChart2,
        label: "Analysis & Goals",
        path: ROUTES.ANALYSIS_GOALS,
      },
    ],
  },
  {
    icon: CreditCard,
    label: "Financial Tools",
    children: [
      {
        icon: PiggyBank,
        label: "Debt Management",
        path: ROUTES.DEBT_MANAGEMENT,
      },
      {
        icon: CalendarDays,
        label: "Subscription Tracker",
        path: ROUTES.SUBSCRIPTIONS,
      },
      {
        icon: Wallet,
        label: "Assets Management",
        path: ROUTES.ASSETS_MANAGEMENT,
      },
    ],
  },
  {
    icon: List,
    label: "Transactions",
    path: ROUTES.TRANSACTIONS,
  },
  {
    icon: Settings,
    label: " Settings",
    path: ROUTES.SETTINGS,
  
  },
  {
    icon: HelpCircle,
    label: "Support",
    path: ROUTES.SUPPORT,
  },
];
