import React from "react";

export const DebtImprovementTips: React.FC = () => {
  return (
    <div className="bg-[#242837] p-6 rounded-xl w-full">
      <h3 className="text-xl font-semibold text-white mb-4">
        Improvement Tips
      </h3>
      <ul className="list-disc pl-4 text-gray-300 space-y-2">
        <li>Negotiate lower interest rates on credit card debts.</li>
        <li>Consolidate debts to simplify repayments and reduce costs.</li>
        <li>Track monthly spending to identify areas for savings.</li>
        <li>Set up automatic payments to avoid late fees.</li>
      </ul>
    </div>
  );
};
