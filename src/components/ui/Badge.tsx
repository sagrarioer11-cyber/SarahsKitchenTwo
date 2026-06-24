import type { ProductTag } from "../../types";
import { PRODUCT_TAG_LABELS } from "../../types";

type BadgeProps = {
  variant?: ProductTag;
  children?: React.ReactNode;
  className?: string;
};

const TAG_STYLES: Partial<Record<ProductTag, string>> = {
  popular: "bg-primary text-white",
  nuevo: "bg-accent-green text-white",
  recomendado: "bg-primary-light text-primary",
  vegetariano: "bg-green-100 text-green-800",
  picante: "bg-red-100 text-red-700",
  "sin-gluten": "bg-amber-100 text-amber-800",
};

export default function Badge({ variant, children, className = "" }: BadgeProps) {
  const label = variant ? PRODUCT_TAG_LABELS[variant] : children;
  const style = variant ? TAG_STYLES[variant] : "bg-gray-100 text-gray-700";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${style} ${className}`}
    >
      {label}
    </span>
  );
}
