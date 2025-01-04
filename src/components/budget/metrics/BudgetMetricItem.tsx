import { ReactNode } from "react";

interface BudgetMetricItemProps {
  label: string;
  value: ReactNode;
  subValue?: ReactNode;
}

export const BudgetMetricItem = ({ label, value, subValue }: BudgetMetricItemProps) => {
  return (
    <div>
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-sm font-medium text-white">{value}</div>
      {subValue && <div className="text-[10px] text-dashboard-error">{subValue}</div>}
    </div>
  );
};