import { cn } from "@/lib/utils";
interface ActionButtonHeadingProps {
  className?: string;
}
export const ActionButtonHeading = ({
  className,
}: ActionButtonHeadingProps) => {
  return (
    <h2
      className={cn(
        "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight",
        className
      )}
    >
      Ready to simplify your financial transactions?
    </h2>
  );
};
