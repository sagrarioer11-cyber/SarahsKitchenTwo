import { useState } from "react";
import { ImageOff } from "lucide-react";
import { CATEGORY_MAP } from "../../data/categories";
import type { Product } from "../../types";

type ProductImageProps = {
  product: Pick<Product, "slug" | "name" | "categoryId" | "image">;
  className?: string;
  /** Tamaño del emoji en el placeholder. */
  emojiSize?: string;
};

/**
 * Muestra la imagen real del producto si existe; si no, un placeholder
 * visual con el emoji de la categoría. El admin solo necesita colocar la
 * foto en public/images/products/<slug>.jpg para que se reemplace
 * automáticamente — sin tocar el código.
 *
 * El placeholder incluye la leyenda "Demo" para que el admin identifique
 * fácilmente qué platos aún no tienen foto real.
 */
export default function ProductImage({
  product,
  className = "",
  emojiSize = "text-6xl",
}: ProductImageProps) {
  const [error, setError] = useState(false);
  const src = product.image ?? `/images/products/${product.slug}.jpg`;
  const category = CATEGORY_MAP[product.categoryId];

  // Placeholder mientras no haya foto real.
  if (error || !product.image) {
    return (
      <div
        role="img"
        aria-label={`Foto de ${product.name}`}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-primary-light to-cream relative overflow-hidden ${className}`}
      >
        <span className={`${emojiSize} select-none`} aria-hidden="true">
          {category?.emoji ?? "🍽️"}
        </span>
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 bg-white/80 backdrop-blur px-2 py-0.5 rounded-full text-[10px] font-semibold text-warm">
          <ImageOff size={10} /> Demo
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={product.name}
      onError={() => setError(true)}
      loading="lazy"
      className={`object-cover ${className}`}
    />
  );
}
