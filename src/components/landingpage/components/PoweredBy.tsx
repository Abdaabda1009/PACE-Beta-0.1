import { useMediaQuery } from "@/hooks/use-media-query";
import { useEffect, useRef, useState } from "react";

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
  const [displayIcons, setDisplayIcons] = useState([...icons]);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (isMobile && scrollRef.current) {
      // Double the icons for seamless looping
      setDisplayIcons([...icons, ...icons]);

      const container = scrollRef.current;
      let scrollPosition = 0;
      const speed = 1.5; // Pixels per frame

      const animate = () => {
        if (!container) return;

        scrollPosition += speed;

        // Reset scroll position when halfway through cloned icons
        if (scrollPosition >= container.scrollWidth / 2) {
          scrollPosition = 0;
          container.scrollLeft = 0;
        } else {
          container.scrollLeft = scrollPosition;
        }

        animationFrameId.current = requestAnimationFrame(animate);
      };

      animate();
      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      };
    }
  }, [isMobile]);

  return (
    <div className="border-b border-blue-500/30 py-8 lg:py-12 px-4 lg:px-0">
      <div className="text-center mb-8 lg:mb-12">
        <h3 className="text-white text-lg lg:text-xl font-medium">
          Powered By Leading Technologies
        </h3>
      </div>

      <div className="relative max-w-[1440px] mx-auto ">
        {/* Gradient overlays for better visual indication */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-900 to-transparent z-10 rounded-[12px]" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-900 to-transparent z-10 rounded-[12px]" />

        <div
          ref={scrollRef}
          className={`flex items-center ${
            isMobile
              ? "gap-24 overflow-x-hidden no-scrollbar"
              : "gap-12 lg:gap-24 flex-wrap justify-center"
          }`}
          aria-label="Technology partners list"
        >
          {displayIcons.map((icon, index) => (
            <div
              key={`${icon}-${index}`}
              className="flex-shrink-0 p-2 lg:p-3 transition-transform duration-300 hover:scale-110"
              role="img"
              aria-label={icon.replace(".png", "")}
            >
              <img
                src={`/assets/${icon}`}
                alt={icon.replace(".png", "")}
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain rounded-full opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};