import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Plus, RefreshCw, Trophy, DollarSign } from 'lucide-react';
import { useDebts } from './DebtQueries';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from '@/hooks/use-toast';

export const DebtSnowballWidget = () => {
  const { data: debts = [], isLoading } = useDebts();

  // Sort debts by balance (smallest to largest)
  const sortedDebts = [...debts].sort((a, b) => 
    parseFloat(a.remainingDebt.replace(/[^0-9.-]+/g, "")) - 
    parseFloat(b.remainingDebt.replace(/[^0-9.-]+/g, ""))
  );

  // Calculate total debt and paid off percentage
  const totalDebt = debts.reduce((sum, debt) => 
    sum + parseFloat(debt.totalDebt.replace(/[^0-9.-]+/g, "")), 0
  );
  const remainingDebt = debts.reduce((sum, debt) => 
    sum + parseFloat(debt.remainingDebt.replace(/[^0-9.-]+/g, "")), 0
  );
  const paidOffPercentage = ((totalDebt - remainingDebt) / totalDebt) * 100 || 0;

  // Prepare data for bar chart
  const chartData = sortedDebts.map(debt => ({
    name: debt.title,
    amount: parseFloat(debt.remainingDebt.replace(/[^0-9.-]+/g, "")),
  }));

  const handleAddExtraPayment = () => {
    toast({
      title: "Extra Payment",
      description: "Feature coming soon! This will allow you to add extra payments to your smallest debt.",
    });
  };

  const handleReassessStrategy = () => {
    toast({
      title: "Reassess Strategy",
      description: "Feature coming soon! This will help you compare different debt repayment strategies.",
    });
  };

  if (isLoading) {
    return (
      <Card className="w-full bg-dashboard-card border-gray-800">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-dashboard-card border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-white">
          Debt Snowball Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Total Debt Progress</span>
            <span>{paidOffPercentage.toFixed(1)}% Paid Off</span>
          </div>
          <Progress value={paidOffPercentage} className="h-2" />
        </div>

        {/* Current Focus Debt */}
        {sortedDebts[0] && (
          <div className="bg-[#0C0C55] p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-dashboard-success" />
              <span className="text-white font-medium">Current Focus</span>
            </div>
            <div className="text-lg font-semibold text-white mb-1">
              {sortedDebts[0].title}
            </div>
            <div className="text-sm text-gray-400">
              Balance: {sortedDebts[0].remainingDebt} • Min Payment:{" "}
              {sortedDebts[0].monthlyPayment} • Rate:{" "}
              {sortedDebts[0].interestRate}
            </div>
          </div>
        )}

        {/* Debt Chart */}
        <div className="h-[200px] w-[100px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#F3F4F6",
                }}
                cursor={{ fill: "transparent" }}
              />
              <Bar
                dataKey="amount"
                fill="rgb(59 130 246 / 0.5)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Debt List */}
        <div className="space-y-3">
          {sortedDebts.map((debt, index) => (
            <div
              key={debt.id}
              className="flex items-center gap-3 p-3 bg-[#050524] rounded-lg"
            >
              {index === 0 ? (
                <div className="w-8 h-8 rounded-full bg-dashboard-success/20 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-dashboard-success" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-sm text-gray-400">{index + 1}</span>
                </div>
              )}
              <div className="flex-1">
                <div className="text-sm font-medium text-white">
                  {debt.title}
                </div>
                <div className="text-xs text-gray-400">Due: {debt.dueDate}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-white">
                  {debt.remainingDebt}
                </div>
                <div className="text-xs text-gray-400">
                  {debt.interestRate} APR
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <Button
            onClick={handleAddExtraPayment}
            className="felx-1 bg-[#050524] p-6 text-gray-100 gap-3 hover:bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Extra Payment
          </Button>
          <Button
            onClick={handleReassessStrategy}
            variant="outline"
            className="flex-1 bg-[#050524] p-6 text-gray-100 gap-3 hover:bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF]"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reassess Strategy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};