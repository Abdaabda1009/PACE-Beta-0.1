import React from "react";

interface DebtDetailProps {
  label: string;
  value: React.ReactNode;
}

const DebtDetail = ({ label, value }: DebtDetailProps) => (
  <div>
    <div className="text-xs text-gray-400 mb-1">{label}</div>
    <div className="text-sm font-medium text-white">{value}</div>
  </div>
);

interface DebtItemDetailsProps {
  totalDebt: string;
  monthlyPayment: string;
  remainingDebt: string;
  interestRate: string;
  yearChange: string;
  remainingTerm: string;
  dueDate: string;
  debtToIncome: string;
}

export const DebtItemDetails = ({
  totalDebt,
  monthlyPayment,
  remainingDebt,
  interestRate,
  yearChange,
  remainingTerm,
  dueDate,
  debtToIncome,
}: DebtItemDetailsProps) => {
  return (
    <>
      <div className="grid grid-cols-4 gap-x-8">
        <DebtDetail label="Total Debt Amount" value={totalDebt} />
        <DebtDetail label="Monthly Payment" value={monthlyPayment} />
        <DebtDetail label="Remaining Debt Amount" value={remainingDebt} />
        <DebtDetail
          label="Interest Rate"
          value={
            <>
              {interestRate}
              <span
                className={`ml-2 text-xs ${
                  parseFloat(yearChange) > 0
                    ? "text-dashboard-error"
                    : "text-dashboard-success"
                }`}
              >
                {yearChange}% vs last year
              </span>
            </>
          }
        />
      </div>
      <div className="mt-6 grid grid-cols-4 gap-x-8">
        <DebtDetail label="Remaining Term" value={remainingTerm} />
        <DebtDetail label="Due Date" value={dueDate} />
        <DebtDetail label="Debt-Income ratio" value={debtToIncome} />
        <DebtDetail
          label="Highest Interest Rate"
          value={<span className="text-dashboard-error">0%</span>}
        />
      </div>
    </>
  );
};
