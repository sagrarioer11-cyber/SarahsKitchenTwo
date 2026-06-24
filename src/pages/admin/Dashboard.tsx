import { Link } from "react-router-dom";
import {
  ArrowRight,
  DollarSign,
  Package,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { useProducts } from "../../context/ProductsContext";
import { useOrders } from "../../context/OrderContext";
import { formatPrice } from "../../lib/format";
import { ORDER_STATUS_LABELS } from "../../types/order";

export default function AdminDashboard() {
  const { products } = useProducts();
  const { orders } = useOrders();

  // KPIs
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter(
    (o) => o.status !== "entregado",
  ).length;
  const recentOrders = orders.slice(0, 5);

  const stats = [
    {
      label: "Ingresos totales",
      value: formatPrice(totalRevenue),
      icon: DollarSign,
      color: "bg-accent-green/10 text-accent-green",
    },
    {
      label: "Pedidos",
      value: orders.length,
      icon: ShoppingBag,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Pendientes",
      value: pendingOrders,
      icon: TrendingUp,
      color: "bg-accent-yellow/10 text-accent-yellow",
    },
    {
      label: "Productos",
      value: products.length,
      icon: Package,
      color: "bg-blue-500/10 text-blue-500",
    },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-cafe">Dashboard</h1>
        <p className="text-warm text-sm mt-1">
          Resumen general del negocio
        </p>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl shadow-soft p-5"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}
            >
              <s.icon size={20} />
            </div>
            <div className="text-2xl font-bold text-cafe">{s.value}</div>
            <div className="text-xs text-warm mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pedidos recientes */}
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-cafe">Pedidos recientes</h2>
          <Link
            to="/admin/pedidos"
            className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3" aria-hidden="true">📦</div>
            <p className="text-warm text-sm">
              Aún no hay pedidos. Cuando los clientes compren, aparecerán aquí.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-cafe">
                      {order.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        order.status === "entregado"
                          ? "bg-accent-green/10 text-accent-green"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                  </div>
                  <p className="text-xs text-warm truncate mt-0.5">
                    {order.customerName} · {order.items.length} artículos
                  </p>
                </div>
                <span className="font-bold text-sm text-cafe">
                  {formatPrice(order.total)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Acceso rápido */}
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <Link
          to="/admin/productos"
          className="bg-white rounded-2xl shadow-soft p-5 flex items-center gap-4 hover:shadow-hover transition-all"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Package className="text-primary" size={22} />
          </div>
          <div className="flex-1">
            <div className="font-bold text-cafe">Gestionar productos</div>
            <div className="text-xs text-warm">
              {products.length} productos activos
            </div>
          </div>
          <ArrowRight className="text-warm" size={18} />
        </Link>

        <Link
          to="/admin/pedidos"
          className="bg-white rounded-2xl shadow-soft p-5 flex items-center gap-4 hover:shadow-hover transition-all"
        >
          <div className="w-12 h-12 bg-accent-green/10 rounded-xl flex items-center justify-center">
            <ShoppingBag className="text-accent-green" size={22} />
          </div>
          <div className="flex-1">
            <div className="font-bold text-cafe">Ver pedidos</div>
            <div className="text-xs text-warm">
              {pendingOrders} pendientes de entrega
            </div>
          </div>
          <ArrowRight className="text-warm" size={18} />
        </Link>
      </div>
    </div>
  );
}
