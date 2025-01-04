import { Input } from "@/components/ui/input";

interface BudgetInputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  currency?: string;
  type?: "text" | "number";
}

export const BudgetInputField = ({ 
  label, 
  value, 
  onChange, 
  currency, 
  type = "text" 
}: BudgetInputFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">
        {label} {currency && `(${currency})`}
      </label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(type === "number" ? Number(e.target.value) : parseFloat(e.target.value))}
        className="bg-[#242837] border-gray-800 text-white"
      />
    </div>
  );
};
