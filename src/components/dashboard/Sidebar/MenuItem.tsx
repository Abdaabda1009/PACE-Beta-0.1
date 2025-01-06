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
      <Icon className={cn("flex-shrink-0", isMobile ? "w-5 h-5" : "w-6 h-6")} />
      <span
        className={cn(
          "hidden md:block whitespace-nowrap flex-grow text-left",
          isMobile ? "text-sm" : "text-base"
        )}
      >
        {label}
      </span>

      <div className="absolute left-14 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible md:hidden transition-all">
        {label}
      </div>
    </>
  );
  const className = cn(
    "flex items-center gap-3 p-3 rounded-xl transition-colors w-full",
    "hover:bg-blue-600/10 hover:text-white",
    isActive ? "bg-blue-600 text-white" : "text-gray-400",
    "group relative",
    isMobile ? "text-sm" : "text-base"
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
