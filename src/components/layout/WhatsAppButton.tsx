import { MessageCircle } from "lucide-react";

/**
 * Botón flotante de WhatsApp para contacto rápido.
 * El número se centraliza aquí para facilitar el cambio.
 */
const WHATSAPP_NUMBER = "18095550123"; // formato internacional sin "+"
const DEFAULT_MSG = "¡Hola! Quiero hacer un pedido de Sarah's Kitchen.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MSG)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir por WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20bd5a] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
    >
      <MessageCircle size={26} />
    </a>
  );
}
