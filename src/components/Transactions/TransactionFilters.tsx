import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TransactionFiltersProps {
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

const QUICK_FILTERS = [
  { label: "Large Transactions", value: "large" },
  { label: "Recurring", value: "recurring" },
  { label: "Starred", value: "starred" },
  { label: "Flagged", value: "flagged" },
];

export const TransactionFilters = ({
  selectedFilters,
  onFilterChange,
}: TransactionFiltersProps) => {
  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      onFilterChange(selectedFilters.filter((f) => f !== filter));
    } else {
      onFilterChange([...selectedFilters, filter]);
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {QUICK_FILTERS.map((filter) => (
        <Badge
          key={filter.value}
          variant={
            selectedFilters.includes(filter.value) ? "default" : "outline"
          }
          className="cursor-pointer"
          onClick={() => toggleFilter(filter.value)}
        >
          {filter.label}
        </Badge>
      ))}
    </div>
  );
};
