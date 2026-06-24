import { Star } from "lucide-react";

type RatingProps = {
  value: number; // 0-5
  count?: number;
  size?: "sm" | "md";
  className?: string;
};

export default function Rating({ value, count, size = "sm", className = "" }: RatingProps) {
  const iconSize = size === "sm" ? 14 : 18;
  const textSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={iconSize}
            className={
              n <= Math.round(value)
                ? "fill-accent-yellow text-accent-yellow"
                : "fill-gray-200 text-gray-200"
            }
          />
        ))}
      </div>
      <span className={`${textSize} font-semibold text-cafe dark:text-cream ml-1`}>
        {value.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className={`${textSize} text-warm`}>({count})</span>
      )}
    </div>
  );
}
