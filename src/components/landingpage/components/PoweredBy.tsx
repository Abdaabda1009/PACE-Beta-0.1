import { useMediaQuery } from "@/hooks/use-media-query";
import { useEffect, useRef } from "react";

export const PoweredBy = () => {
  const icons = [
    "chatgbt.png",
    "klarna.png",
    "microsoft.png",
    "replicate.png",
    "replicate1.png",
    "stripe.png",
  ];

  const isMobile = useMediaQuery("(max-width: 768px)");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile && scrollRef.current) {
      let speed = 0.5; // Adjust speed as needed
      let scrollAmount = 2000;

      const scroll = () => {
        if (scrollRef.current) {
          scrollAmount += speed;
          if (scrollAmount >= scrollRef.current.scrollWidth) {
            scrollAmount = 0;
          }
          scrollRef.current.scrollLeft = scrollAmount;
        }
        requestAnimationFrame(scroll);
      };
      scroll();
    }
  }, [isMobile]);

  return (
    <div className="lg:mt-2 border-b border-blue-500/20 py-8 lg:mx-0">
      <div className="text-center justify-between mb-8 ">
        <h3 className="text-white text-lg">Powered By Leading Technologies</h3>
      </div>
      <div
        ref={scrollRef}
        className={
          isMobile
            ? "flex items-center gap-12 sm:gap-48 overflow-hidden whitespace-nowrap no-scrollbar"
            : "flex items-center justify-center gap-12 sm:gap-48"
        }
      >
        {icons.map((icon, index) => (
          <div
            key={index}
            className="w-16 h-16 flex items-center justify-center flex-shrink-0"
            aria-label={`Technology Partner ${index + 1}`}
          >
            <img
              src={`/assets/${icon}`}
              alt={`Technology Partner ${index + 1}`}
              className="w-16 h-16 rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
