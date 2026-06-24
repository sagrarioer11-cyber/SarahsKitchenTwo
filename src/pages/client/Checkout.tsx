import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";
import { formatPrice } from "../../lib/format";

type FormData = {
  name: string;
  phone: string;
  street: string;
  city: string;
  neighborhood: string;
  instructions: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, deliveryFee, total, deliveryDate, deliveryTime, notes, clear } = useCart();
  const { createOrder } = useOrders();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    street: "",
    city: "Santo Domingo",
    neighborhood: "",
    instructions: "",
  });

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Ingresa tu nombre";
    if (!form.phone.trim()) e.phone = "Ingresa tu teléfono";
    if (!form.street.trim()) e.street = "Ingresa la dirección";
    if (!form.city.trim()) e.city = "Ingresa la ciudad";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    // Simulamos un delay de procesamiento (en producción: llamar API real).
    await new Promise((r) => setTimeout(r, 1500));

    const orderId = createOrder({
      items: items.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      })),
      subtotal,
      deliveryFee,
      total,
      customerName: form.name,
      address: {
        street: form.street,
        city: form.city,
        neighborhood: form.neighborhood || undefined,
        phone: form.phone,
        instructions: form.instructions || undefined,
      },
      deliveryDate,
      deliveryTime,
      notes,
    });

    clear();
    navigate(`/confirmacion?orden=${orderId}`);
  };

  // Si carrito vacío, redirigir.
  if (items.length === 0) {
    return (
      <section className="py-24">
        <div className="container-page text-center max-w-md mx-auto">
          <div className="text-6xl mb-4" aria-hidden="true">🛒</div>
          <h2 className="font-serif text-2xl font-bold mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-warm mb-6">
            Agrega platos antes de proceder al pago.
          </p>
          <Link to="/menu" className="btn-primary">
            Ver el menú
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Progreso */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-page py-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-accent-green font-medium">
              <ShieldCheck size={16} /> Carrito
            </span>
            <span className="w-8 h-0.5 bg-gray-200" />
            <span className="flex items-center gap-2 text-primary font-bold">
              <CreditCard size={16} /> Pago
            </span>
            <span className="w-8 h-0.5 bg-gray-200" />
            <span className="text-warm">Confirmación</span>
          </div>
        </div>
      </div>

      <section className="pt-10 pb-24">
        <div className="container-page max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/carrito"
              className="btn-ghost text-sm mb-4 inline-flex"
            >
              <ArrowLeft size={16} /> Volver al carrito
            </Link>
            <h1 className="font-serif text-3xl font-bold">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
            {/* Columna izquierda: formulario */}
            <div className="lg:col-span-2 space-y-6">
              {/* Datos personales */}
              <div className="bg-white rounded-2xl shadow-soft p-6 space-y-4">
                <h3 className="font-bold flex items-center gap-2">
                  <User size={18} className="text-primary" />
                  Datos personales
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="Nombre completo"
                    icon={<User size={16} />}
                    value={form.name}
                    error={errors.name}
                    onChange={(v) => update("name", v)}
                    placeholder="María Fernández"
                  />
                  <Field
                    label="Teléfono"
                    icon={<Phone size={16} />}
                    value={form.phone}
                    error={errors.phone}
                    onChange={(v) => update("phone", v)}
                    placeholder="+1 (809) 555-0123"
                    type="tel"
                  />
                </div>
              </div>

              {/* Dirección de entrega */}
              <div className="bg-white rounded-2xl shadow-soft p-6 space-y-4">
                <h3 className="font-bold flex items-center gap-2">
                  <Truck size={18} className="text-primary" />
                  Dirección de entrega
                </h3>
                <Field
                  label="Calle / Avenida"
                  icon={<MapPin size={16} />}
                  value={form.street}
                  error={errors.street}
                  onChange={(v) => update("street", v)}
                  placeholder="Av. Winston Churchill #45"
                  full
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="Ciudad"
                    value={form.city}
                    error={errors.city}
                    onChange={(v) => update("city", v)}
                    placeholder="Santo Domingo"
                  />
                  <Field
                    label="Sector / Barrio (opcional)"
                    value={form.neighborhood}
                    onChange={(v) => update("neighborhood", v)}
                    placeholder="Mirador Sur"
                  />
                </div>
                <Field
                  label="Instrucciones de entrega (opcional)"
                  value={form.instructions}
                  onChange={(v) => update("instructions", v)}
                  placeholder="Apartamento 3B, portón negro..."
                  full
                  textarea
                />
              </div>

              {/* Pago */}
              <div className="bg-white rounded-2xl shadow-soft p-6 space-y-4">
                <h3 className="font-bold flex items-center gap-2">
                  <CreditCard size={18} className="text-primary" />
                  Método de pago
                </h3>

                <div className="flex gap-3">
                  {["Efectivo", "Tarjeta", "PayPal"].map((method, i) => (
                    <label
                      key={method}
                      className={`flex-1 cursor-pointer border rounded-xl p-4 text-center text-sm font-medium transition-all ${
                        i === 0
                          ? "border-primary bg-primary-light text-primary"
                          : "border-gray-200 text-warm hover:border-primary/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        defaultChecked={i === 0}
                        className="sr-only"
                      />
                      {method}
                    </label>
                  ))}
                </div>

                <p className="text-xs text-warm flex items-center gap-1">
                  <Lock size={12} /> Tus datos de pago están protegidos y encriptados.
                </p>
              </div>
            </div>

            {/* Columna derecha: resumen */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-28">
                <h3 className="font-bold text-lg mb-4">Resumen del pedido</h3>

                {/* Items */}
                <div className="space-y-2 mb-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-warm truncate mr-2">
                        {item.quantity}× {item.name}
                      </span>
                      <span className="shrink-0 font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-warm">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm">Envío</span>
                    <span className="font-medium">{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm">Entrega</span>
                    <span className="font-medium">{deliveryDate} {deliveryTime}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between text-base">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary text-lg">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full mt-6"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Procesando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock size={16} /> Confirmar pedido
                    </span>
                  )}
                </button>

                <p className="text-xs text-warm text-center mt-4">
                  Al confirmar, aceptas nuestros términos de servicio.
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

/* ── Campo reutilizable ── */
type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  full?: boolean;
  textarea?: boolean;
};

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  icon,
  full,
  textarea,
}: FieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  const cls = `w-full px-4 py-3 rounded-xl border ${
    error
      ? "border-red-400 focus:ring-red-400/40 focus:border-red-400"
      : "border-gray-200 focus:ring-primary/40 focus:border-primary"
  } focus:outline-none focus:ring-2 transition-all text-sm ${full ? "" : ""}`;

  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5">
        {icon && <span className="inline mr-1 text-primary">{icon}</span>}
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
