import {
  LayoutDashboard,
  PiggyBank,
  BarChart2,
  CreditCard,
  List,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  CalendarDays,
  FileText,
  DollarSign,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/lib/constants";

interface MenuItem {
  icon: any;
  label: string;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
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
    icon: User,
    label: "Profile & Settings",
    children: [
      { icon: User, label: "Profile", path: ROUTES.PROFILE },
      { icon: Settings, label: "Settings", path: ROUTES.SETTINGS },
    ],
  },
  {
    icon: HelpCircle,
    label: "Support",
    path: ROUTES.SUPPORT,
  },
];

export const DashboardSidebar = () => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const location = useLocation();

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    const isExpanded = expandedMenus.includes(item.label);
    const hasChildren = item.children && item.children.length > 0;
    const isActive =
      item.path === location.pathname ||
      (hasChildren &&
        item.children?.some((child) => child.path === location.pathname));

    const ButtonContent = () => (
      <>
        <item.icon className="w-6 h-6 flex-shrink-0" />
        <span className="hidden md:block whitespace-nowrap flex-grow text-left">
          {item.label}
        </span>
        {hasChildren && (
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform hidden md:block",
              isExpanded && "transform rotate-180"
            )}
          />
        )}

        {/* Tooltip for mobile/collapsed view */}
        <div className="absolute left-14 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible md:hidden transition-all">
          {item.label}
        </div>
      </>
    );

    return (
      <div key={index} className="w-full">
        {hasChildren ? (
          <button
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl transition-colors w-full",
              "hover:bg-blue-600/10 hover:text-white",
              isActive ? "bg-blue-600 text-white" : "text-gray-400",
              "group relative"
            )}
            onClick={() => toggleMenu(item.label)}
          >
            <ButtonContent />
          </button>
        ) : (
          <Link
            to={item.path || "#"}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl transition-colors w-full",
              "hover:bg-blue-600/10 hover:text-white",
              isActive ? "bg-blue-600 text-white" : "text-gray-400",
              "group relative"
            )}
          >
            <ButtonContent />
          </Link>
        )}

        {/* Submenu items */}
        {hasChildren && isExpanded && (
          <div className="ml-4 pl-4 border-l border-gray-700">
            {item.children.map((child, childIndex) => {
              const isChildActive = child.path === location.pathname;

              return (
                <Link
                  key={childIndex}
                  to={child.path || "#"}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-colors w-full",
                    "hover:bg-blue-600/10 hover:text-white",
                    isChildActive ? "bg-blue-600 text-white" : "text-gray-400",
                    "group relative"
                  )}
                >
                  <child.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="hidden md:block whitespace-nowrap">
                    {child.label}
                  </span>

                  {/* Tooltip for mobile/collapsed view */}
                  <div className="absolute left-14 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible md:hidden transition-all">
                    {child.label}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="hidden md:block">
      <div className="p-12  flex flex-col items-centermd:px-6 w-full">
        <img
          src="assets/logo.png"
          alt="Logo.png"
          className="w-32 h-full hidden md:block"
        />
      </div>

      <div className="flex flex-col gap-2 w-full px-1">
        {menuItems.map((item, index) => renderMenuItem(item, index))}
      </div>
    </div>
  );
}
