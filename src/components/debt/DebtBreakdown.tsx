import React from "react";

interface Debt {
  id: number;
  name: string;
  type: string;
  amount: number;
  interestRate: number;
  dueDate: string;
  progress: number; // Percentage of repayment progress (0-100)
}

const mockDebts: Debt[] = [
  {
    id: 1,
    name: "Car Loan",
    type: "Loan",
    amount: 100000,
    interestRate: 4.5,
    dueDate: "2024-08-01",
    progress: 20,
  },
  {
    id: 2,
    name: "Credit Card",
    type: "Credit Card",
    amount: 15000,
    interestRate: 18.9,
    dueDate: "2024-07-01",
    progress: 50,
  },
  {
    id: 3,
    name: "Mortgage",
    type: "Mortgage",
    amount: 2000000,
    interestRate: 3.2,
    dueDate: "2024-12-01",
    progress: 10,
  },
];

export const DebtBreakdown: React.FC = () => {
  return (
    <div className="bg-[#242837] p-6 rounded-xl w-full space-y-4">
      <h3 className="text-xl font-semibold text-white">Debt Breakdown</h3>
      {mockDebts.map((debt) => (
        <div
          key={debt.id}
          className="flex justify-between items-center p-4 bg-gray-800 rounded-lg"
        >
          <div>
            <p className="text-lg text-white font-medium">
              {debt.name} ({debt.type})
            </p>
            <small className="text-gray-400">
              Due: {debt.dueDate} • Interest: {debt.interestRate}%
            </small>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-blue-400">
              {debt.amount.toLocaleString()} Kr
            </p>
            <div className="w-32 mt-2 h-2 bg-gray-600 rounded">
              <div
                className="h-2 bg-blue-500 rounded"
                style={{ width: `${debt.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
