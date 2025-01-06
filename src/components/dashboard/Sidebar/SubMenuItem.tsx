import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface SubMenuItemProps {
  icon: any;
  label: string;
  path: string;
  isActive: boolean;
}

export const SubMenuItem = ({
  icon: Icon,
  label,
  path,
  isActive,
}: SubMenuItemProps) => {
  const isMobile = useIsMobile();

  return (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl transition-colors w-full",
        "hover:bg-blue-600/10 hover:text-white",
        isActive ? "bg-blue-600 text-white" : "text-gray-400",
        "group relative",
        isMobile ? "text-xs" : "text-sm"
      )}
    >
      <Icon className={cn("flex-shrink-0", isMobile ? "w-4 h-4" : "w-5 h-5")} />
      <span className="hidden md:block whitespace-nowrap">{label}</span>

      <div className="absolute left-14 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible md:hidden transition-all">
        {label}
      </div>
    </Link>
  );
};
