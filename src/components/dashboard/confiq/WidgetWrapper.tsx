import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WidgetWrapperProps {
  children: ReactNode;
  className?: string;
  colSpan?: string;
}

export const WidgetWrapper = ({
  children,
  className,
  colSpan,
}: WidgetWrapperProps) => {
  return (
    <Card
      className={cn(
        "bg-dashboard-card border-gray-800 p-4 sm:p-6",
        colSpan,
        className
      )}
    >
      {children}
    </Card>
  );
};
