import { LineChart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
interface ChartStyleCardProps {
  chartStyle: string;
  setChartStyle: (style: string) => void;
}
export const ChartStyleCard = ({
  chartStyle,
  setChartStyle,
}: ChartStyleCardProps) => {
  const styles = [
    { id: "default", label: "Default", description: "Standard visualization" },
    { id: "simplified", label: "Simplified", description: "Minimal design" },
    { id: "custom", label: "Custom", description: "Advanced customization" },
  ];
  return (
    <Card className="p-6 bg-dashboard-card border-gray-700">
      <h3 className="text-lg font-medium mb-4">Dashboard Charts</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {styles.map((style) => (
          <div
            key={style.id}
            className={`p-4 border rounded-xl cursor-pointer transition-all ${
              chartStyle === style.id
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-700 hover:border-blue-500"
            }`}
            onClick={() => setChartStyle(style.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <LineChart className="w-5 h-5" />
              {chartStyle === style.id && (
                <Check className="w-5 h-5 text-blue-500" />
              )}
            </div>
            <h4 className="font-medium">{style.label}</h4>
            <p className="text-sm text-gray-400 mt-1">{style.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
