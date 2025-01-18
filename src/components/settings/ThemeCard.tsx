import { Moon, Sun, Monitor } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
interface ThemeCardProps {
  theme: string;
  setTheme: (theme: string) => void;
}
export const ThemeCard = ({ theme, setTheme }: ThemeCardProps) => {
  return (
    <Card className="p-6 bg-dashboard-card border-gray-700">
      <h3 className="text-lg font-medium mb-4">Theme Preferences</h3>
      <RadioGroup value={theme} onValueChange={setTheme} className="grid gap-4">
        <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
          <RadioGroupItem value="light" id="light" />
          <Label
            htmlFor="light"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Sun className="w-4 h-4" />
            Light Mode
          </Label>
        </div>
        <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
          <RadioGroupItem value="dark" id="dark" />
          <Label
            htmlFor="dark"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Moon className="w-4 h-4" />
            Dark Mode
          </Label>
        </div>
        <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
          <RadioGroupItem value="system" id="system" />
          <Label
            htmlFor="system"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Monitor className="w-4 h-4" />
            System Default
          </Label>
        </div>
      </RadioGroup>
    </Card>
  );
};
