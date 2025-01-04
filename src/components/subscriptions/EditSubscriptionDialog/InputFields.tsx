import { Input } from "@/components/ui/input";
import { InputFieldsProps } from "../EditSubscriptionDialog/types";

export const InputFields = ({
  name,
  amount,
  date,
  onNameChange,
  onAmountChange,
  onDateChange,
}: InputFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Name</label>
        <Input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="bg-[#242837] border-gray-800 text-white"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Amount</label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="bg-[#242837] border-gray-800 text-white"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Next Payment Date</label>
        <Input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="bg-[#242837] border-gray-800 text-white"
        />
      </div>
    </>
  );
};
