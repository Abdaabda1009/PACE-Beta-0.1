import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubMenuItem } from "./SubMenuItem";
import { MenuItem } from "@/components/dashboard/Sidebar/MenuItem"
import { menuItems } from "./MenuItemNav";

export const SidebarContent = () => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const location = useLocation();

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="w-16 md:w-64 flex flex-col items-center md:items-start py-4 gap-6 transition-all duration-300 ease-in-out h-full">
      <div className="p-3 flex flex-col items-center md:px-6 w-full">
       <img
       src="/assets/logo.png"
       alt="Logo"
       className="w-8 h-8 md:w-24 md:h-12"
       />
      </div>

      <div className="flex flex-col gap-2 w-full px-3">
        {menuItems.map((item, index) => {
          const isExpanded = expandedMenus.includes(item.label);
          const hasChildren = item.children && item.children.length > 0;
          const isActive =
            item.path === location.pathname ||
            (hasChildren &&
              item.children?.some((child) => child.path === location.pathname));

          return (
            <div key={index} className="w-full">
              <MenuItem
                icon={item.icon}
                label={item.label}
                path={!hasChildren ? item.path : undefined}
                isActive={isActive}
                onClick={hasChildren ? () => toggleMenu(item.label) : undefined}
              />

              {hasChildren && isExpanded && (
                <div className="ml-4 pl-4 border-l border-gray-700">
                  {item.children.map((child, childIndex) => (
                    <SubMenuItem
                      key={childIndex}
                      icon={child.icon}
                      label={child.label}
                      path={child.path || "#"}
                      isActive={child.path === location.pathname}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
