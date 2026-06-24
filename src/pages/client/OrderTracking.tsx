import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChefHat,
  Clock,
  Package,
  Search,
  Truck,
} from "lucide-react";
import { useOrders } from "../../context/OrderContext";
import { formatPrice } from "../../lib/format";
import {
  ORDER_STEPS,
  ORDER_STATUS_LABELS,
  type OrderStatus,
} from "../../types/order";
import Button from "../../components/ui/Button";

const STEP_ICONS: Record<OrderStatus, typeof CheckCircle2> = {
  confirmado: CheckCircle2,
  preparando: ChefHat,
  "en-camino": Truck,
  entregado: Package,
};

export default function OrderTracking() {
  const [params] = useSearchParams();
  const { orders } = useOrders();
  const [searchId, setSearchId] = useState(params.get("orden") ?? "");
  const [lookedUp, setLookedUp] = useState(false);

  // Buscar la orden por ID.
  const order = searchId.trim()
    ? orders.find((o) => o.id.toUpperCase() === searchId.trim().toUpperCase())
    : null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLookedUp(true);
  };

  // Índice del paso actual (para la barra de progreso).
  const currentStepIndex = order
    ? ORDER_STEPS.indexOf(order.status)
    : -1;

  return (
    <>
      <section className="pt-12 pb-24">
        <div className="container-page max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl font-bold mb-3">
              Rastrear pedido
            </h1>
            <p className="text-warm">
              Ingresa tu número de orden para ver el estado.
            </p>
          </div>

          {/* Buscador */}
          <form
            onSubmit={handleSearch}
            className="flex gap-3 max-w-md mx-auto mb-12"
          >
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-warm"
              />
              <input
                type="text"
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value);
                  setLookedUp(false);
                }}
                placeholder="SK-7X4K"
                className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm font-mono uppercase"
              />
            </div>
            <button type="submit" className="btn-primary px-6">
              Buscar
            </button>
          </form>

          {/* Resultado */}
          {lookedUp && !order && (
            <div className="text-center py-12 bg-white rounded-2xl shadow-soft">
              <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
              <h3 className="font-serif text-xl font-bold mb-2">
                No encontramos esa orden
              </h3>
              <p className="text-warm text-sm mb-6">
                Verifica el número e intenta de nuevo. Si recién hiciste el
                pedido, la orden aparece aquí de inmediato.
              </p>
              <Button to="/menu" variant="secondary" size="sm">
                Hacer un pedido
              </Button>
            </div>
          )}

          {order && (
            <div className="space-y-6 animate-fade-up">
              {/* Barra de progreso con pasos */}
              <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8">
                <h3 className="font-bold text-lg mb-8">
                  Estado: <span className="text-primary">{ORDER_STATUS_LABELS[order.status]}</span>
                </h3>

                {/* Timeline vertical */}
                <div className="space-y-0">
                  {ORDER_STEPS.map((step, idx) => {
                    const isDone = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;
                    const StepIcon = STEP_ICONS[step];

                    return (
                      <div key={step} className="flex gap-4">
                        {/* Línea + círculo */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                              isDone
                                ? "bg-primary text-white shadow-primary"
                                : "bg-gray-100 text-warm"
                            } ${isCurrent ? "ring-4 ring-primary/20 scale-110" : ""}`}
                          >
                            <StepIcon size={20} />
                          </div>
                          {idx < ORDER_STEPS.length - 1 && (
                            <div
                              className={`w-0.5 h-12 transition-colors ${
                                idx < currentStepIndex
                                  ? "bg-primary"
                                  : "bg-gray-200"
                              }`}
                            />
                          )}
                        </div>

                        {/* Texto del paso */}
                        <div className="pt-1.5 pb-8">
                          <p
                            className={`font-bold text-sm ${
                              isDone ? "text-cafe dark:text-cream" : "text-warm"
                            }`}
                          >
                            {ORDER_STATUS_LABELS[step]}
                          </p>
                          {isCurrent && (
                            <p className="text-xs text-primary mt-1 flex items-center gap-1">
                              <Clock size={12} /> En progreso
                            </p>
                          )}
                          {isDone && !isCurrent && (
                            <p className="text-xs text-accent-green mt-1">
                              ✓ Completado
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Resumen de la orden */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="font-bold mb-4">Resumen</h3>
                <div className="space-y-2 text-sm">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between py-1"
                    >
                      <span className="text-warm">
                        {item.quantity}× {item.name}
                      </span>
                      <span className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-gray-100 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-4">
                <Button to="/menu" size="lg" className="flex-1">
                  Hacer otro pedido <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
