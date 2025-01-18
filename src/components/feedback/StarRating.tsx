import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
  error?: boolean;
}

export const StarRating = ({ rating, onChange, error }: StarRatingProps) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          type="button"
          variant="ghost"
          className={`p-2 hover:bg-transparent cursor-pointer ${
            star <= (hoveredStar || rating)
              ? "text-primary"
              : "text-dashboard-muted"
          } ${error ? "ring-2 ring-dashboard-error" : ""}`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(0)}
        >
          <Star
            className={`h-6 w-6 ${
              star <= (hoveredStar || rating) ? "fill-current" : ""
            }`}
          />
        </Button>
      ))}
    </div>
  );
};
