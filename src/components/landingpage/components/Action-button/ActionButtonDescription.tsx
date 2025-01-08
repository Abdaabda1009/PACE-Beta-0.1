import { cn } from "@/lib/utils";
interface ActionButtonDescriptionProps {
  className?: string;
}
export const ActionButtonDescription = ({
  className,
}: ActionButtonDescriptionProps) => {
  return (
    <p className={cn("text-base sm:text-lg text-dashboard-muted", className)}>
      Join thousands of satisfied users and experience the difference.
    </p>
  );
};
