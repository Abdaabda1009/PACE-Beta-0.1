import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Currency, useCurrencyPreference } from "@/hooks/useCurrencyPreference";

export const CurrencySelector = () => {
  const { currency, updatePreference, isLoading } = useCurrencyPreference();

  const handleCurrencyChange = (newCurrency: string) => {
    updatePreference.mutate(newCurrency as Currency);
  };

  return (
    <Select
      value={currency}
      onValueChange={handleCurrencyChange}
      disabled={isLoading}
    >
      <SelectTrigger className="w-[100px] bg-dashboard-card border-gray-800">
        <SelectValue placeholder={isLoading ? "Loading..." : "Currency"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USD">USD</SelectItem>
        <SelectItem value="EUR">EUR</SelectItem>
        <SelectItem value="SEK">SEK</SelectItem>
      </SelectContent>
    </Select>
  );
};
