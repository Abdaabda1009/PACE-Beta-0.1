import { DollarSign, CreditCard, PiggyBank, Coins, ShoppingCart, Receipt, ChartBar } from "lucide-react";

const iconMap: Record<string, React.ComponentType> = {
  dollar: DollarSign,
  card: CreditCard,
  piggy: PiggyBank,
  coins: Coins,
 ShoppingCart,
  receipt: Receipt,
  bar: ChartBar,
};

interface BudgetIconProps {
  icon: string;
}

export const BudgetIcon = ({ icon }: BudgetIconProps) => {
  const Icon = iconMap[icon] || DollarSign;
  
  return (
    <div className="bg-[#0C0C55] p-2 w-[28px] h-[28px] rounded-[8px] flex items-center justify-center">
      <Icon className="w-5 h-5 text-white" />
    </div>
  );
};