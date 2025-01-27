import { Card, CardContent } from "@/components/ui/card";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import {
  BarChart3,
  PiggyBank,
  Target,
  CreditCard,
  TrendingUp,
  DollarSign,
  Bell,
  LineChart,
  Sparkles,
} from "lucide-react";

export const FeaturesGrid = () => {
  const isMobile = useMediaQuery("(max-width: 700px)");
  const [activeIndex, setActiveIndex] = useState(0);
  const features = [
    {
      title: "Budget Tracking",
      description: "Track your spending and stay within budget",
      icon: BarChart3,
    },
    {
      title: "Savings Goals",
      description: "Set and achieve your savings targets",
      icon: PiggyBank,
    },
    {
      title: "Subscription Tracking",
      description: "Plan and monitor your Subscriptions",
      icon: Target,
    },
    {
      title: "Debt Management",
      description: "Manage and reduce your debts effectively",
      icon: CreditCard,
    },
    {
      title: "Financial Analytics",
      description: "Analyze your financial patterns",
      icon: TrendingUp,
    },
    {
      title: "Expense Tracking",
      description: "Track all your expenses in one place",
      icon: DollarSign,
    },
    {
      title: "Bill Reminders",
      description: "Never miss a payment with reminders",
      icon: Bell,
    },
    {
      title: "Performance Metrics",
      description: "Monitor your financial performance",
      icon: LineChart,
    },
  ];

  // Auto-swap feature every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % features.length);
    }, 60000); // 1 minute interval

    return () => clearInterval(interval);
  }, [features.length]);

  const FeatureCard = ({ feature, index, className = "" }) => (
    <SpotlightCard key={index} className="relative border-0 bg-transparent h-[90%]">
      <Card className="border-0 border-blue-600 h-full">
        <CardContent className="pt-6">
          <div className="rounded-lg p-2 w-12 h-12 bg-purple-600/10 flex items-center justify-center mb-4">
            <feature.icon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg text-white mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-400 text-sm">{feature.description}</p>
        </CardContent>
      </Card>
    </SpotlightCard>
  );
  return (
    <div id="features-grid" className="py-24">
      <div className="flex flex-col items-center gap-8 mt-12">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-blue-500/20">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-Purple-200">Our product</span>
        </div>
      </div>
      <div className="container px-4 mx-auto">
        {isMobile ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
              startIndex: activeIndex,
            }}
            className="w-full"
          >
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <FeatureCard feature={feature} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};