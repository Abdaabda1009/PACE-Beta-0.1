import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";

interface SubscriptionDetailsProps {
  amount: number;
  date: string;
}

export const SubscriptionDetails = ({
  amount,
  date,
}: SubscriptionDetailsProps) => {
  const { formatAmount, convertAmount } = useCurrencyPreference();

  return (
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <span>{formatAmount(convertAmount(amount))}</span>
      <span>•</span>
      <span>Next payment: {new Date(date).toLocaleDateString()}</span>
    </div>
  );
};
