import { cn } from "@/lib/utils";
import { ActionButtonHeading } from "./ActionButtonHeading";
import { ActionButtonDescription } from "./ActionButtonDescription";
import { ActionButtonCTA } from "./ActionButtonCTA";
import { ActionButtonImage } from "./ActionButtonImage";

export const ActionButtonCard = () => {
  return (
    <section
      className={cn(
        "relative rounded-xl overflow-hidden",
        "transition-all duration-300 hover:shadow-xl",
        "mx-4 sm:mx-6 lg:mx-auto", // Responsive horizontal margins
        "py-8 md:py-12 lg:py-16 xl:py-20", // Responsive vertical padding
        "max-w-7xl" // Limit maximum width for ultra-wide screens
      )}
      style={{
        background: `
          linear-gradient(
            to right,
            rgba(32, 0, 121, 0),
            rgba(6, 44, 95, 0.3)
          )
        `,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        {/* Responsive container padding */}
        <div className="grid gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center grid-cols-1 lg:grid-cols-2">
          {/* Content Section */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8">
            <ActionButtonHeading className="text-left" />
            <ActionButtonDescription className="text-left max-w-[600px] lg:max-w-none" />
            <ActionButtonCTA className="w-full sm:w-auto" />
          </div>

          {/* Image Section */}
          <div className="relative order-first lg:order-last">
            {" "}
            {/* Mobile-first image ordering */}
            <ActionButtonImage
              className={cn(
                "w-full h-auto",
                "transition-transform duration-300 hover:scale-105",
                "max-w-[500px] lg:max-w-none mx-auto" // Constrain image size
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
