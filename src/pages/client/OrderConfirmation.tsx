import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  MapPin,
  Phone,
  Share2,
} from "lucide-react";
import { useOrders } from "../../context/OrderContext";
import { formatPrice } from "../../lib/format";
import Button from "../../components/ui/Button";
import { useMinDeliveryDate } from "../../hooks/useMinDeliveryDate";

export default function OrderConfirmation() {
  const [params] = useSearchParams();
  const orderId = params.get("orden") ?? "";
  const { orders } = useOrders();
  const { formatDate } = useMinDeliveryDate();
  const [copied, setCopied] = useState(false);

  const order = orders.find((o) => o.id === orderId);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!order) {
    return (
      <section className="py-24">
        <div className="container-page text-center max-w-md mx-auto">
          <h1 className="font-serif text-3xl font-bold mb-4">¿Pedido?</h1>
          <p className="text-warm mb-6">
            No encontramos una orden con ese ID. Quizás fue procesada en otro navegador.
          </p>
          <Button to="/menu">Ver el menú</Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-12 pb-24">
        <div className="container-page max-w-2xl">
          {/* Animación de éxito */}
          <div className="text-center mb-10 animate-fade-up">
            <div className="w-20 h-20 mx-auto mb-6 bg-accent-green/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="text-accent-green" size={48} />
            </div>
            <h1 className="font-serif text-4xl font-bold mb-3">
              ¡Pedido confirmado!
            </h1>
            <p className="text-warm text-lg">
              Hemos recibido tu pedido exitosamente.
            </p>
          </div>

          {/* Número de orden */}
          <div className="bg-white rounded-2xl shadow-soft p-6 text-center mb-6">
            <p className="text-sm text-warm mb-1">Número de orden</p>
            <p className="text-3xl font-bold font-serif text-primary tracking-wider">
              {order.id}
            </p>
            <div className="flex justify-center gap-2 mt-3">
              <button
                onClick={handleCopy}
                className="btn-ghost text-sm flex items-center gap-1"
              >
                <Copy size={14} /> {copied ? "¡Copiado!" : "Copiar"}
              </button>
              <button
                onClick={() =>
                  navigator.share?.({
                    title: `Pedido ${order.id}`,
                    text: `Mi pedido en Sarah's Kitchen: ${order.id}`,
                  })
                }
                className="btn-ghost text-sm flex items-center gap-1"
              >
                <Share2 size={14} /> Compartir
              </button>
            </div>
          </div>

          {/* Detalle del pedido */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
            <h3 className="font-bold mb-4">Detalle</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between text-sm py-2 border-b border-gray-50 last:border-0"
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
            <div className="border-t border-gray-100 mt-4 pt-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-warm">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm">Envío</span>
                <span>{formatPrice(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-1">
                <span>Total</span>
                <span className="text-primary">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Info de entrega */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
            <h3 className="font-bold mb-4">Entrega</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-warm">
                <MapPin size={14} className="text-primary" />
                {order.address.street}, {order.address.city}
                {order.address.neighborhood && ` — ${order.address.neighborhood}`}
              </p>
              <p className="flex items-center gap-2 text-warm">
                <Phone size={14} className="text-primary" />
                {order.address.phone}
              </p>
              <p className="text-warm">
                📅 {formatDate(order.deliveryDate)} a las {order.deliveryTime}
              </p>
              {order.notes && (
                <p className="text-warm italic">📝 {order.notes}</p>
              )}
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button to={`/rastrear?orden=${order.id}`} size="lg" className="flex-1">
              Rastrear pedido <ArrowRight size={18} />
            </Button>
            <Button to="/menu" variant="secondary" size="lg">
              Hacer otro pedido
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
