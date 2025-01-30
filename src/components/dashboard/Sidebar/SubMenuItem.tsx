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
        "flex items-center gap-3 p-2 rounded-lg transition-colors w-full",
        "hover:bg-[#1F1F1F] hover:text-white",
        isActive ? "bg-[#1F1F1F] text-white" : "text-gray-400",
        "group relative",
        "text-sm"
      )}
    >
      <Icon
        className={cn(
          "flex-shrink-0 w-4 h-4",
          isActive ? "text-white" : "text-gray-400"
        )}
      />
      <span className="hidden md:block whitespace-nowrap">{label}</span>

      <div className="absolute left-14 bg-[#1F1F1F] text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible md:hidden transition-all">
        {label}
      </div>
    </Link>
  );
};
