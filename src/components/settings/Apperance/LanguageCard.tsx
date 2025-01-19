import { Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface LanguageCardProps {
  language: string;
  setLanguage: (language: string) => void;
}
export const LanguageCard = ({ language, setLanguage }: LanguageCardProps) => {
  return (
    <Card className="p-6 bg-dashboard-card border-gray-700">
      <h3 className="text-lg font-medium mb-4">Language & Region</h3>
      <div className="space-y-4">
        <div className="flex flex-col space-y-2 ">
          <Label htmlFor="language" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Display Language
          </Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="se">Swedish</SelectItem>
              <SelectItem value="d">Danish</SelectItem>
              <SelectItem value="nw">Norwegian</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};
