import React from "react";

interface Debt {
  id: number;
  name: string;
  type: string;
  interestRate: number;
}

const debts: Debt[] = [
  { id: 1, name: "Credit Card", type: "Credit Card", interestRate: 18.9 },
  { id: 2, name: "Personal Loan", type: "Loan", interestRate: 6.0 },
];

export const DebtPaymentPlan: React.FC = () => {
  return (
    <div className="bg-[#242837] p-6 rounded-xl w-full">
      <h3 className="text-xl font-semibold text-white mb-4">
        Debt Payment Plan
      </h3>
      <ul className="list-disc pl-4 text-gray-300 space-y-2">
        {debts.map((debt) => (
          <li key={debt.id}>
            Pay off{" "}
            <span className="font-semibold text-blue-400">{debt.name}</span> (
            {debt.type}) first as it has an interest rate of {debt.interestRate}
            %.
          </li>
        ))}
        <li>Focus on clearing smaller debts quickly for faster wins.</li>
        <li>
          Allocate extra funds monthly to reduce overall interest payments.
        </li>
      </ul>
    </div>
  );
};
