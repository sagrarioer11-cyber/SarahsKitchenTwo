import { Link } from "react-router-dom";
import { CalendarDays, Clock, MessageSquare, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/format";
import { useMinDeliveryDate } from "../../hooks/useMinDeliveryDate";
import Button from "../../components/ui/Button";
import CartItemRow from "../../components/cart/CartItemRow";

const TIME_SLOTS = [
  "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00",
];

export default function Cart() {
  const {
    items,
    subtotal,
    deliveryFee,
    total,
    deliveryDate,
    deliveryTime,
    notes,
    setDeliveryDate,
    setDeliveryTime,
    setNotes,
    add,
    remove,
    setQty,
    clear,
  } = useCart();

  const { minDate, formatDate } = useMinDeliveryDate();

  const empty = items.length === 0;

  return (
    <>
      <section className="pt-12 pb-24">
        <div className="container-page max-w-5xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center">
              <ShoppingBag className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold">Tu carrito</h1>
              {!empty && (
                <p className="text-sm text-warm">{items.length} artículo{items.length > 1 ? "s" : ""}</p>
              )}
            </div>
          </div>

          {empty ? (
            /* ── Empty state ── */
            <div className="text-center py-20">
              <div className="text-6xl mb-4" aria-hidden="true">🛒</div>
              <h2 className="font-serif text-2xl font-bold mb-2">
                Tu carrito está vacío
              </h2>
              <p className="text-warm mb-8">
                Agrega platos del menú para empezar tu pedido.
              </p>
              <Button to="/menu" size="lg">
                Ver el menú
              </Button>
            </div>
          ) : (
            /* ── Contenido del carrito ── */
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Columna izquierda: items + agenda */}
              <div className="lg:col-span-2 space-y-6">
                {/* Lista de items */}
                <div className="bg-white rounded-2xl shadow-soft p-4 sm:p-6">
                  {items.map((item) => (
                    <CartItemRow
                      key={item.productId}
                      item={item}
                      onIncrease={() =>
                        add({ productId: item.productId, name: item.name, price: item.price, image: item.image })
                      }
                      onDecrease={() =>
                        setQty(item.productId, item.quantity - 1)
                      }
                      onRemove={() => remove(item.productId)}
                    />
                  ))}
                  <button
                    onClick={clear}
                    className="text-sm text-warm hover:text-primary transition-colors mt-2"
                  >
                    Vaciar carrito
                  </button>
                </div>

                {/* Agenda de entrega */}
                <div className="bg-white rounded-2xl shadow-soft p-6 space-y-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <CalendarDays size={18} className="text-primary" />
                    Programar entrega
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Fecha
                      </label>
                      <input
                        type="date"
                        min={minDate}
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
                      />
                      {deliveryDate && (
                        <p className="text-xs text-warm mt-1">
                          {formatDate(deliveryDate)}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        <Clock size={14} className="inline mr-1" />
                        Hora preferida
                      </label>
                      <select
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm bg-white"
                      >
                        {TIME_SLOTS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Notas */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5 flex items-center gap-1">
                      <MessageSquare size={14} className="text-primary" />
                      Notas del pedido (opcional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Sin cebolla, alérgico a maní, puerta azul..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Columna derecha: resumen */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-28">
                  <h3 className="font-bold text-lg mb-4">Resumen</h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-warm">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-warm">Envío</span>
                      <span className="font-medium">{formatPrice(deliveryFee)}</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between text-base">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-primary text-lg">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    className="btn-primary w-full mt-6 text-center"
                  >
                    Proceder al pago
                  </Link>

                  <Link
                    to="/menu"
                    className="btn-ghost w-full mt-3 text-center text-sm"
                  >
                    Seguir pidiendo
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
