import { Currency } from "./budget";

export interface FinancialHealth {
  score: number;
  assets: Record<string, number>;
  liabilities: Record<string, number>;
}

export interface FinancialMetric {
  label: string;
  value: number;
  trend?: number;
  trendLabel?: string;
}

export interface FinancialTip {
  tip: string;
  category: string;
}

export interface FinancialStats {
  netWorth: number;
  totalAssets: number;
  totalLiabilities: number;
  currency: Currency;
}
