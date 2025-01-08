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
        isMobile ? "py-8 px-4" : "py-12 lg:py-20 px-4 lg:px-0"
      )}
      style={{
        background:
          "linear-gradient(to right, hsla(227, 21%, 18%, 1), hsla(200, 67%, 25%, 1))",
      }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
