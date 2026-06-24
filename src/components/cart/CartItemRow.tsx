import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "../../context/CartContext";
import { formatPrice } from "../../lib/format";
import ProductImage from "../product/ProductImage";

type CartItemRowProps = {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export default function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemRowProps) {
  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
      {/* Imagen */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0">
        <ProductImage
          product={{ slug: item.name.toLowerCase().replace(/\s+/g, "-"), name: item.name, categoryId: "platos-principales", image: item.image }}
          className="w-full h-full"
          emojiSize="text-3xl"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-sm sm:text-base truncate">{item.name}</h3>
        <p className="text-sm text-warm">{formatPrice(item.price)} c/u</p>

        {/* Controles de cantidad */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-gray-200 rounded-full">
            <button
              onClick={onDecrease}
              disabled={item.quantity <= 1}
              aria-label="Reducir cantidad"
              className="w-8 h-8 flex items-center justify-center text-warm hover:text-primary disabled:opacity-30 transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-bold">
              {item.quantity}
            </span>
            <button
              onClick={onIncrease}
              aria-label="Aumentar cantidad"
              className="w-8 h-8 flex items-center justify-center text-warm hover:text-primary transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={onRemove}
            aria-label="Eliminar del carrito"
            className="ml-auto text-warm hover:text-primary transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Total línea */}
      <div className="text-right shrink-0">
        <span className="font-bold text-base sm:text-lg">
          {formatPrice(lineTotal)}
        </span>
      </div>
    </div>
  );
}
