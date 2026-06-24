import { Plus } from "lucide-react";
import type { Product } from "../../types";
import { formatPrice } from "../../lib/format";
import { useCart } from "../../context/CartContext";
import Badge from "../ui/Badge";
import Rating from "../ui/Rating";
import ProductImage from "./ProductImage";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { add } = useCart();

  // Mostrar el primer tag relevante (popular > nuevo > recomendado).
  const topTag = product.tags?.find((t) =>
    ["popular", "nuevo", "recomendado"].includes(t),
  );

  return (
    <article className="card card-hover group overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProductImage
          product={product}
          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {topTag && (
          <div className="absolute top-3 left-3">
            <Badge variant={topTag} />
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
        </div>

        {product.rating && (
          <Rating
            value={product.rating}
            count={product.reviewCount}
            className="mb-3"
          />
        )}

        <p className="text-sm text-warm line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-3 mt-auto">
          <div>
            <span className="text-xl font-bold text-cafe dark:text-cream">
              {formatPrice(product.price)}
            </span>
            {product.serves && (
              <span className="block text-xs text-warm">{product.serves}</span>
            )}
          </div>

          <button
            onClick={() =>
              add({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
            aria-label={`Añadir ${product.name} al carrito`}
            className="w-11 h-11 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary-dark hover:scale-110 active:scale-95 transition-all shadow-primary"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}
