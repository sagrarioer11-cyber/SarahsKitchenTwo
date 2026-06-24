import { useMemo, useState } from "react";
import { ChevronDown, MapPin, Phone, Search } from "lucide-react";
import { useOrders } from "../../context/OrderContext";
import { formatPrice } from "../../lib/format";
import {
  ORDER_STEPS,
  ORDER_STATUS_LABELS,
  type OrderStatus,
} from "../../types/order";

type Filter = "todos" | OrderStatus;

const FILTERS: Filter[] = [
  "todos",
  "confirmado",
  "preparando",
  "en-camino",
  "entregado",
];

export default function AdminOrders() {
  const { orders, updateStatus } = useOrders();
  const [filter, setFilter] = useState<Filter>("todos");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...orders];
    if (filter !== "todos") {
      list = list.filter((o) => o.status === filter);
    }
    if (search.trim()) {
      const q = search.toUpperCase();
      list = list.filter(
        (o) =>
          o.id.toUpperCase().includes(q) ||
          o.customerName.toUpperCase().includes(q),
      );
    }
    return list;
  }, [orders, filter, search]);

  return (
    <div>
      <header className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-cafe">Pedidos</h1>
        <p className="text-warm text-sm mt-1">
          {orders.length} pedidos en total
        </p>
      </header>

      {/* Filtros por estado */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-3 mb-4">
        {FILTERS.map((f) => {
          const count =
            f === "todos"
              ? orders.length
              : orders.filter((o) => o.status === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f
                  ? "bg-primary text-white shadow-primary"
                  : "bg-white text-warm border border-gray-200 hover:border-primary/30"
              }`}
            >
              {f === "todos" ? "Todos" : ORDER_STATUS_LABELS[f as OrderStatus]}
              <span className="ml-1.5 opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Buscador */}
      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-warm"
        />
        <input
          type="text"
          placeholder="Buscar por ID o nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
        />
      </div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-soft">
          <div className="text-5xl mb-3" aria-hidden="true">📦</div>
          <h3 className="font-bold mb-1">Sin pedidos</h3>
          <p className="text-warm text-sm">
            {filter === "todos"
              ? "Aún no hay pedidos registrados."
              : "No hay pedidos en este estado."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const isOpen = expanded === order.id;
            const currentStepIdx = ORDER_STEPS.indexOf(order.status);

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-soft overflow-hidden"
              >
                {/* Fila principal */}
                <button
                  onClick={() => setExpanded(isOpen ? null : order.id)}
                  className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-sm text-cafe">
                        {order.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          order.status === "entregado"
                            ? "bg-accent-green/10 text-accent-green"
                            : order.status === "en-camino"
                              ? "bg-blue-500/10 text-blue-500"
                              : "bg-primary/10 text-primary"
                        }`}
                      >
                        {ORDER_STATUS_LABELS[order.status]}
                      </span>
                    </div>
                    <p className="text-xs text-warm truncate mt-1">
                      {order.customerName} · {order.items.length} artículos ·{" "}
                      {order.deliveryDate} {order.deliveryTime}
                    </p>
                  </div>
                  <span className="font-bold text-sm text-cafe">
                    {formatPrice(order.total)}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-warm transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Detalle expandido */}
                {isOpen && (
                  <div className="border-t border-gray-100 p-4 space-y-4 animate-fade-up">
                    {/* Items */}
                    <div className="space-y-1">
                      {order.items.map((item) => (
                        <div
                          key={item.productId}
                          className="flex justify-between text-sm py-1"
                        >
                          <span className="text-warm">
                            {item.quantity}× {item.name}
                          </span>
                          <span className="font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Cliente */}
                    <div className="bg-gray-50 rounded-xl p-3 space-y-1 text-xs">
                      <p className="font-bold text-cafe mb-1">
                        Información de entrega
                      </p>
                      <p className="flex items-start gap-1.5 text-warm">
                        <MapPin size={12} className="mt-0.5 shrink-0" />
                        {order.address.street}, {order.address.city}
                        {order.address.neighborhood &&
                          ` — ${order.address.neighborhood}`}
                      </p>
                      <p className="flex items-center gap-1.5 text-warm">
                        <Phone size={12} />
                        {order.address.phone}
                      </p>
                      {order.address.instructions && (
                        <p className="text-warm italic">
                          📝 {order.address.instructions}
                        </p>
                      )}
                      {order.notes && (
                        <p className="text-warm italic">
                          📝 Notas: {order.notes}
                        </p>
                      )}
                    </div>

                    {/* Cambio de estado */}
                    <div>
                      <p className="text-xs font-bold text-cafe mb-2">
                        Cambiar estado
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {ORDER_STEPS.map((step, idx) => (
                          <button
                            key={step}
                            onClick={() => updateStatus(order.id, step)}
                            disabled={idx > currentStepIdx + 1}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                              order.status === step
                                ? "bg-primary text-white"
                                : idx <= currentStepIdx
                                  ? "bg-accent-green/10 text-accent-green"
                                  : "bg-gray-100 text-warm hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
                            }`}
                          >
                            {ORDER_STATUS_LABELS[step]}
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] text-warm mt-1">
                        Solo puedes avanzar al siguiente estado.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
