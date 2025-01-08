import { cn } from "@/lib/utils";

interface ActionButtonImageProps {
  className?: string;
}

export const ActionButtonImage = ({ className }: ActionButtonImageProps) => {
  return (
    <div className={cn("relative mt-8 lg:mt-0", className)}>
      <div className="w-full max-w-[280px] sm:max-w-md mx-auto transform rotate-6 hover:rotate-0 transition-transform duration-300">
        <img
          src="/assets/dashboard.png"
          alt="Dashboard"
          className="w-full h-auto rounded-xl shadow-2xl"
          loading="lazy"
        />
      </div>
    </div>
  );
};