
import { BudgetUtilization } from "@/components/financial/BudgetUtilization";

export const FinancialAnalysis = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold text-white">Financial Analysis</h1>
            <BudgetUtilization />
        </div>
    )
}