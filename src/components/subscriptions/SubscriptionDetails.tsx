import { CalendarDays } from "lucide-react";

interface SubscriptionDetailsProps {
  amount: string;
  date: string;
}

export const SubscriptionDetails = ({ amount, date }: SubscriptionDetailsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-gray-400">
        <span>{amount}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        <CalendarDays className="w-4 h-4" />
        <span>{date}</span>
      </div>
    </div>
  );
};