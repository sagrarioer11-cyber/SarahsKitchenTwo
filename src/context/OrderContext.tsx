/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Order } from "../types/order";
import {
  generateOrderId,
  ORDER_STEPS,
  type OrderStatus,
} from "../types/order";

type OrderContextValue = {
  orders: Order[];
  getById: (id: string) => Order | undefined;
  createOrder: (data: Omit<Order, "id" | "status" | "createdAt">) => string;
  updateStatus: (id: string, status: OrderStatus) => void;
};

const STORAGE_KEY = "sk_orders_v1";

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Order[]) : [];
    } catch {
      return [];
    }
  });

  // Persistir en cada cambio.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const createOrder = useCallback(
    (data: Omit<Order, "id" | "status" | "createdAt">) => {
      const id = generateOrderId();
      const order: Order = {
        ...data,
        id,
        status: "confirmado",
        createdAt: new Date().toISOString(),
      };
      setOrders((prev) => [order, ...prev]);
      return id;
    },
    [],
  );

  const updateStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o)),
    );
  }, []);

  const value: OrderContextValue = {
    orders,
    getById: (id) =>
      orders.find((o) => o.id.toUpperCase() === id.toUpperCase()),
    createOrder,
    updateStatus,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders debe usarse dentro de <OrderProvider>");
  return ctx;
}

export { ORDER_STEPS };
