import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUBSCRIPTION_LOGOS } from "./constants";
import { LogoSelectorProps } from "../EditSubscriptionDialog/types";

export const LogoSelector = ({
  selectedLogo,
  onLogoChange,
}: LogoSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">Logo</label>
      <Select
        value={selectedLogo}
        onValueChange={(value) =>
          onLogoChange(value as keyof typeof SUBSCRIPTION_LOGOS)
        }
      >
        <SelectTrigger className="bg-[#242837] border-gray-800 text-white">
          <SelectValue>
            <div className="flex items-center gap-2">
              <img
                src={SUBSCRIPTION_LOGOS[selectedLogo]}
                alt={selectedLogo}
                className="w-6 h-6 rounded-md object-fill"
              />
              <span className="capitalize">{selectedLogo}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#242837] border-gray-800">
          {Object.entries(SUBSCRIPTION_LOGOS).map(([key, url]) => (
            <SelectItem
              key={key}
              value={key}
              className="text-white hover:bg-gray-700 focus:bg-gray-700"
            >
              <div className="flex items-center gap-2">
                <img
                  src={url}
                  alt={key}
                  className="w-6 h-6 rounded-md object-cover"
                />
                <span className="capitalize">{key}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
