import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";

interface PriceDisplayProps {
  price: number;
  totalValue: number;
}

export const PriceDisplay = ({ price, totalValue }: PriceDisplayProps) => {
  const { formatAmount } = useCurrencyPreference();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-2xl font-bold">{formatAmount(price)}</div>
        <div className="text-sm text-gray-400">Current Price</div>
      </div>
      <div>
        <div className="text-2xl font-bold">{formatAmount(totalValue)}</div>
        <div className="text-sm text-gray-400">Total Value</div>
      </div>
    </div>
  );
};
