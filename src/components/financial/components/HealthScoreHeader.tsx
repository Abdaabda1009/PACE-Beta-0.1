import { TrendingUp } from "lucide-react";

interface HealthScoreHeaderProps {
  score: number;
}

export const HealthScoreHeader = ({ score }: HealthScoreHeaderProps) => (
  <div>
    <div className="flex items-center gap-3">
      <TrendingUp className="w-5 h-5 text-blue-400" />
      <div>
        <span className="text-3xl font-bold text-red-500">{score}</span>
        <span className="text-gray-400 text-sm ml-1">/100</span>
      </div>
    </div>
    <div className="text-gray-400 text-sm">Financial Health Score</div>
  </div>
);
