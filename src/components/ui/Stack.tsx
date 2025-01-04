import { useState, useCallback } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import {
  TrendingUp,
  DollarSign,
  PieChart,
  LineChart,
  BarChart2,
  CreditCard,
} from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cards = [
  {
    Icon: DollarSign,
    title: "Revenue Growth",
    description: "Quarterly earnings report",
    color: "bg-green-500",
    image: "/assets/", // Replace with your actual image path
    imageAlt: "Revenue growth chart",
  },
  {
    Icon: PieChart,
    title: "Asset Allocation",
    description: "Portfolio distribution",
    color: "bg-blue-500",
    image: "/api/placeholder/500/300", // Replace with your actual image path
    imageAlt: "Asset allocation pie chart",
  },
  {
    Icon: LineChart,
    title: "Market Analysis",
    description: "Technical indicators",
    color: "bg-purple-500",
    image: "/api/placeholder/500/300", // Replace with your actual image path
    imageAlt: "Market analysis chart",
  },
  {
    Icon: BarChart2,
    title: "Financial Metrics",
    description: "Key performance indicators",
    color: "bg-yellow-500",
    image: "/api/placeholder/500/300", // Replace with your actual image path
    imageAlt: "Financial metrics chart",
  },
  {
    Icon: CreditCard,
    title: "Transaction Summary",
    description: "Payment analytics",
    color: "bg-indigo-500",
    image: "/api/placeholder/500/300", // Replace with your actual image path
    imageAlt: "Transaction summary chart",
  },
  {
    Icon: TrendingUp,
    title: "Stock Performance",
    description: "Market trends and analysis",
    color: "bg-red-500",
    image: "/LandingAssets/StockPerformance.png",
    imageAlt: "Stock performance chart",
  },
];

const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});

const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const FinanceStack = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gone] = useState(() => new Set());

  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) {
        gone.add(index);
        setCurrentIndex((prev) => (prev + 1) % cards.length);
      }
      api.start((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(() => {
          gone.clear();
          api.start((i) => to(i));
        }, 600);
    }
  );

  const handleButtonClick = useCallback(
    (direction) => {
      const dir = direction === "left" ? -1 : 1;
      const index = currentIndex;

      gone.add(index);
      setCurrentIndex((prev) => (prev + 1) % cards.length);

      api.start((i) => {
        if (index !== i) return;
        const x = (200 + window.innerWidth) * dir;
        const rot = dir * 10 * 0.5;
        return {
          x,
          rot,
          scale: 1,
          delay: undefined,
          config: { friction: 50, tension: 500 },
        };
      });

      if (gone.size === cards.length) {
        setTimeout(() => {
          gone.clear();
          api.start((i) => to(i));
        }, 600);
      }
    },
    [currentIndex, api, gone]
  );

  return (
    <div className="relative h-screen w-full flex items-start justify-center pt-24">
      <button
        onClick={() => handleButtonClick("left")}
        className="absolute left-8 top-1/3 z-10 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors"
      >
        <ChevronLeft size={52} />
      </button>

      {props.map(({ x, y, rot, scale }, i) => {
        const { Icon, title, description, color, image, imageAlt } = cards[i];
        return (
          <animated.div
            key={i}
            className="absolute w-[500px] h-[500px]"
            style={{
              x,
              y,
            }}
          >
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
              }}
              className={`touch-none cursor-grab ${color} w-full h-full rounded-xl p-12 shadow-xl flex flex-col justify-between`}
            >
              <div className="flex justify-between items-start">
                <div className="text-white">
                  <h2 className="text-4xl font-bold mb-4">{title}</h2>
                  <p className="text-xl opacity-80">{description}</p>
                </div>
                <Icon className="text-white" size={48} />
              </div>

              <div className="mt-8">
                <img
                  src={image}
                  alt={imageAlt}
                  className="relative w-full h-[300px] object-fill rounded-lg"
                />
              </div>
            </animated.div>
          </animated.div>
        );
      })}

      <button
        onClick={() => handleButtonClick("right")}
        className="absolute right-8 top-1/3 z-10 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors"
      >
        <ChevronRight size={52} />
      </button>
    </div>
  );
};

export default FinanceStack;
