import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const SUBSCRIPTION_CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Technology", value: "Technology" },
  { label: "Streaming", value: "Streaming" },
  { label: "Shopping", value: "Shopping" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Utilities", value: "Utilities" },
  { label: "Other", value: "Other" },
];

export const CategoryFilter = ({
  activeFilter,
  onFilterChange,
}: CategoryFilterProps) => {
  return (
    <div className="mb-6 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 min-w-max pb-2">
        {SUBSCRIPTION_CATEGORIES.map((category) => (
          <Button
            key={category.value}
            variant={activeFilter === category.value ? "default" : "ghost"}
            className={`px-4 py-2 text-sm ${
              activeFilter === category.value
                ? "bg-primary text-white"
                : "text-gray-200 hover:bg-blue-600/10 hover:text-white"
            }`}
            onClick={() => onFilterChange(category.value)}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
