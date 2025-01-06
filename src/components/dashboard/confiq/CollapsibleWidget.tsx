import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CollapsibleWidgetProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export const CollapsibleWidget = ({
  title,
  children,
  defaultExpanded = true,
  className,
}: CollapsibleWidgetProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      className={cn(
        "bg-dashboard-card border border-gray-800 rounded-lg",
        className
      )}
    >
      <Button
        variant="ghost"
        className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-800/50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-medium">{title}</span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isExpanded ? "max-h-[2000px]" : "max-h-0"
        )}
      >
        <div className="p-4 pt-0">{children}</div>
      </div>
    </div>
  );
};
