import { Pencil, Trash2 } from "lucide-react";

interface CardHeaderProps {
  name: string;
  symbol: string;
  logoUrl?: string;
  change: number;
  onEdit?: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export const CardHeader = ({
  name,
  symbol,
  logoUrl,
  change,
  onEdit,
  onDelete,
  isDeleting,
}: CardHeaderProps) => {
  const isPositive = change >= 0;

  return (
    <div className="flex justify-between items-start gap-4">
      <div className="flex items-center gap-3">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${name} logo`}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
            {symbol.charAt(0)}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-400">{symbol}</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <div className={`text-sm ${isPositive ? "text-gain" : "text-loss"}`}>
          {isPositive ? "+" : ""}
          {change}% Today
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-2 hover:bg-slate-600 rounded-full transition-colors"
              title="Edit holdings"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onDelete}
            className="p-2 hover:bg-slate-600 rounded-full transition-colors text-red-400 hover:text-red-300"
            title="Delete asset"
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
