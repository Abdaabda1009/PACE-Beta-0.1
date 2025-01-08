import { cn } from "@/lib/utils";

interface ActionButtonImageProps {
  className?: string;
}

export const ActionButtonImage = ({ className }: ActionButtonImageProps) => {
  return (
    <div className={cn("relative mt-8 lg:mt-0", className)}>
      <div className="w-full max-w-[280px] sm:max-w-md mx-auto transform rotate-6 hover:rotate-0 transition-transform duration-300">
        <img
          src="/lovable-uploads/59a1d742-7f24-4c97-99ae-842ed1ada00c.png"
          alt="Credit Card"
          className="w-full h-auto rounded-xl shadow-2xl"
          loading="lazy"
        />
      </div>
    </div>
  );
};