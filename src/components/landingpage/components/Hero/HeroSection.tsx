import React, { useState, useEffect } from "react";
import { HeroTitle } from "./HeroTitle";
import { HeroDescription } from "./HeroDescription";
import { HeroActions } from "./HeroActions";
import { Card, CardContent } from "@/components/ui/card";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Target, TrendingUp, DollarSign, Bell, Shield } from "lucide-react";

// Create a separate FeatureCard component
const FeatureCard = ({ feature, index }) => (
  <SpotlightCard key={index} className="relative h-full bg-transparent md:border-blue-600/10">
    <Card className="border-0 h-full flex flex-col items-center">
      <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full w-full">
        <div className="rounded-full p-3 bg-blue-600/10 flex items-center justify-center mb-4">
          <feature.icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="font-semibold text-lg text-white mb-2">
          {feature.title}
        </h3>
        <p className="text-gray-400 text-sm max-w-xs mx-auto">
          {feature.description}
        </p>
      </CardContent>
    </Card>
  </SpotlightCard>
);

// Features component to be used inside HeroSection
const Features = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      title: "Subscription Tracking",
      description: "Plan and monitor your Subscriptions",
      icon: Target,
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
      title: "Secure",
      description:
        "Your data is safe with us, bank-grade security for your financial data",
      icon: Shield,
    },
  ];

  // Auto-swap feature every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % features.length);
    }, 60000); // 1 minute interval

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div id="features-grid" className="w-full py-6">
      <div className="container mx-auto px-4 md:px-6">
        {isMobile ? (
          <Carousel
            opts={{
              align: "center",
              loop: true,
              startIndex: activeIndex,
            }}
            className="w-full"
          >
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div className="px-1">
                    <FeatureCard feature={feature} index={index} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : isTablet ? (
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-full max-w-sm">
                  <FeatureCard feature={feature} index={index} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex justify-center">
                <FeatureCard feature={feature} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const HeroSection = () => {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center text-center gap-12 py-16 md:py-14 px-2 border-b md:border-b md:border-blue-600/30">
      <div className="w-full max-w-4xl mx-auto space-y-10 md:space-y-6">
        <div className="space-y-6">
          <HeroTitle />
          <HeroDescription />
        </div>
        <HeroActions />
      </div>
      <Features />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4/2 w-[80px] max-w-xs md:max-w-sm h-[120vh] opacity-100 pointer-events-none">
        <div className="absolute inset-0  bg-gradient-to-b from-blue-400/60 to-blue-800/30 blur-3xl">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[5vh] opacity-100 pointer-events-none animate-splashSpread">
            <div className="absolute inset-0  bg-gradient-to-b from-blue-400/60" />
          </div>
        </div>
      </div>
    </main>
  );
};
