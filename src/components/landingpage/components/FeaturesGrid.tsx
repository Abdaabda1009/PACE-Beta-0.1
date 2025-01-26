import { Card, CardContent } from "@/components/ui/card";
import SpotlightCard from "@/components/ui/SpotlightCard";
import {
  BarChart3,
  PiggyBank,
  Target,
  CreditCard,
  TrendingUp,
  DollarSign,
  Bell,
  LineChart,
} from "lucide-react";

export const FeaturesGrid = () => {
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

  return (
    <div className="py-12">
      <div className="container px-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Everything you need to manage your finances
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our comprehensive suite of tools helps you take control of your
            financial life
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <SpotlightCard key={index} className="relative h-full">
              <Card className="transparency inline-flex ">
                {/* Content */}
                <CardContent className="relative z-10 pt-6">
                  <div className="rounded-lg p-2 w-12 h-12 bg-blue-100/10 flex items-center justify-center mb-6 ">
                    <feature.icon className="w-6 h-6 text-black-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  );
};
