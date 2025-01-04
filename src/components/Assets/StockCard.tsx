import { Card } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";

interface StockCardProps {
  name: string;
  symbol: string;
  price: number;
  change: number;
  quantity: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  yearLow?: number;
  yearHigh?: number;
  afterHoursPrice?: number;
  afterHoursChange?: number;
  logoUrl?: string;
}

export const StockCard = ({
  name,
  symbol,
  price,
  change,
  quantity,
  openPrice,
  highPrice,
  lowPrice,
  yearLow = 0,
  yearHigh = 0,
  afterHoursPrice,
  afterHoursChange,
  logoUrl,

  
}: StockCardProps) => {
  const totalValue = price * quantity;
  const isPositive = change >= 0;
  const isAfterHoursPositive = afterHoursChange && afterHoursChange >= 0;
  const { formatAmount } = useCurrencyPreference();


  return (
    <Card className="flex flex-col space-y-6 p-6 bg-slate-800 text-white hover:bg-slate-700 transition-colors">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${name} logo`}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
              {symbol.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-400">{symbol}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className={`text-sm ${isPositive ? "text-gain" : "text-loss"}`}>
            {isPositive ? "+" : ""}
            {change}% Today
          </div>
          {afterHoursPrice && (
            <div
              className={`text-xs mt-1 ${
                isAfterHoursPositive ? "text-gain" : "text-loss"
              }`}
            >
              After Hours: {isAfterHoursPositive ? "+" : ""}
              {afterHoursChange}%
            </div>
          )}
        </div>
      </div>

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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-400">Quantity Owned</div>
          <div className="font-semibold">{quantity.toLocaleString()}</div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-1">
              <div>
                <div className="text-sm text-gray-400">52-Week Range</div>
                <div className="font-semibold">
                  {formatAmount(yearLow)} - {formatAmount(yearHigh)}
                </div>
              </div>
              <Info className="w-4 h-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Lowest and highest prices in the last year</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <div className="text-gray-400">Open</div>
          <div>{formatAmount(openPrice)}</div>
        </div>
        <div>
          <div className="text-gray-400">High</div>
          <div>{formatAmount(highPrice)}</div>
        </div>
        <div>
          <div className="text-gray-400">Low</div>
          <div>{formatAmount(lowPrice)}</div>
        </div>
      </div>
    </Card>
  );
};
