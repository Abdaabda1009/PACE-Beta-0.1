import { useState } from "react";
import { BudgetOverview } from "../../components/budget/BudgetOverview";
import { BudgetSetupDialog } from "../../components/budget/BudgetSetupDialog";
import React from "react";

export const BudgetPlanner = () => {
  const [isSetupOpen, setIsSetupOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Budget Planner</h1>
        <button
          onClick={() => setIsSetupOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500"
        >
          Setup Budget
        </button>
      </div>
      <div className="w-full">
        <BudgetOverview />
      </div>
      <BudgetSetupDialog 
        open={isSetupOpen}
        onOpenChange={setIsSetupOpen}
      />
    </div>
  );
};