import { cn } from "@/lib/utils";
import { ActionButtonHeading } from "./ActionButtonHeading";
import { ActionButtonDescription } from "./ActionButtonDescription";
import { ActionButtonCTA } from "./ActionButtonCTA";
import { ActionButtonImage } from "./ActionButtonImage";
import { useMediaQuery } from "@/hooks/use-media-query";

export const ActionButtonCard = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <section
      className={cn(
        "relative rounded-xl overflow-hidden transition-all duration-300",
        isMobile
          ? "py-6 flex flex-col items-center"
          : "py-12 lg:py-20 px-2 lg:px-0"
      )}
      style={{
        background: "linear-gradient(to right, rgba(32, 0, 121, 0), rgba(6, 44, 95, 0.3))",
      }}
    >
      <div className="container mx-auto flex flex-col items-center">
        <div
          className={cn(
            "grid gap-6 items-center",
            isMobile
              ? "grid-cols-1 text-center"
              : "grid-cols-1 lg:grid-cols-2 text-left"
          )}
        >
          <div className="space-y-4 lg:space-y-6">
            <ActionButtonHeading />
            <ActionButtonDescription />
            <ActionButtonCTA />
          </div>
          <ActionButtonImage />
        </div>
      </div>
    </section>
  );
};
