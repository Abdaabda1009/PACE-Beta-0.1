import React from "react";
import { DebtBreakdown } from "./DebtBreakdown";
import { DebtPaymentPlan } from "./DebtPaymentPlan";
import { DebtImprovementTips } from "./DebtImprovementTips";

export const DebtWidget: React.FC = () => {
  return (
    <div className="p- gap-6 rounded-xl w-full min-h-[350px] flex flex-col justify-between items-center shadow-lg ">
      <DebtBreakdown />
      <DebtPaymentPlan />
      <DebtImprovementTips />
    </div>
  );
};
