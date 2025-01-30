import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface MenuItemProps {
  icon: any;
  label: string;
  path?: string;
  isActive: boolean;
  onClick?: () => void;
}

export const MenuItem = ({
  icon: Icon,
  label,
  path,
  isActive,
  onClick,
}: MenuItemProps) => {
  const isMobile = useIsMobile();

  const ButtonContent = () => (
    <>
      <Icon
        className={cn(
          "flex-shrink-0",
          isMobile ? "w-5 h-5" : "w-5 h-5",
          isActive ? "text-white" : "text-gray-400"
        )}
      />
      <span
        className={cn(
          "hidden md:block whitespace-nowrap flex-grow text-left text-sm",
          isActive ? "text-white" : "text-gray-400"
        )}
      >
        {label}
      </span>

      <div className="absolute left-14 bg-[#1F1F1F] text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible md:hidden transition-all">
        {label}
      </div>
    </>
  );

  const className = cn(
    "flex items-center gap-3 p-2 rounded-lg transition-colors w-full",
    "hover:bg-[#1A1F2C] hover:text-white",
    isActive ? "bg-[#1A1F2C] text-white" : "text-gray-400",
    "group relative",
    isMobile ? "text-sm" : "text-sm"
  );

  return path ? (
    <Link to={path} className={className}>
      <ButtonContent />
    </Link>
  ) : (
    <button className={className} onClick={onClick}>
      <ButtonContent />
    </button>
  );
};
