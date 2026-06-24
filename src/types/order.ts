export type OrderStatus =
  | "confirmado"
  | "preparando"
  | "en-camino"
  | "entregado";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  confirmado: "Pedido confirmado",
  preparando: "Preparando tu pedido",
  "en-camino": "En camino",
  entregado: "Entregado",
};

export const ORDER_STEPS: OrderStatus[] = [
  "confirmado",
  "preparando",
  "en-camino",
  "entregado",
];

export type OrderAddress = {
  street: string;
  city: string;
  neighborhood?: string;
  phone: string;
  instructions?: string;
};

export type Order = {
  id: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  address: OrderAddress;
  deliveryDate: string;
  deliveryTime: string;
  notes: string;
  status: OrderStatus;
  createdAt: string;
};

/** Genera un ID de orden corto y legible (ej: SK-7X4K). */
export function generateOrderId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `SK-${code}`;
}
