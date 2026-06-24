import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import SectionTitle from "../../components/ui/SectionTitle";

type QA = { q: string; a: string };

const FAQ_SECTIONS: { title: string; items: QA[] }[] = [
  {
    title: "Pedidos y entrega",
    items: [
      {
        q: "¿Cuánto tarda la entrega?",
        a: "Nuestro tiempo promedio de entrega es de 30 a 45 minutos dentro de Santo Domingo. Para pedidos grandes o eventos, te recomendamos agendar con anticipación.",
      },
      {
        q: "¿Puedo programar mi pedido para otro día?",
        a: "Sí, puedes agendar tu entrega desde el carrito. Selecciona la fecha y hora que más te convenga (mínimo 24 horas antes).",
      },
      {
        q: "¿Cuál es el costo de envío?",
        a: "El envío tiene un costo fijo de $2.50 USD dentro de nuestra zona de cobertura en Santo Domingo.",
      },
      {
        q: "¿Hacen entregas fuera de Santo Domingo?",
        a: "Por ahora solo cubrimos Santo Domingo y zonas aledañas. Próximamente expandiremos a otras ciudades.",
      },
    ],
  },
  {
    title: "Pagos",
    items: [
      {
        q: "¿Qué métodos de pago aceptan?",
        a: "Aceptamos efectivo contra entrega, tarjetas de crédito/débito (Visa, Mastercard, Amex) y PayPal.",
      },
      {
        q: "¿Es seguro pagar con tarjeta?",
        a: "Sí, todos los pagos con tarjeta se procesan a través de una pasarela encriptada y segura. No almacenamos tus datos de pago.",
      },
      {
        q: "¿Puedo cancelar mi pedido?",
        a: "Puedes cancelar gratis si lo haces dentro de los primeros 5 minutos. Después de ese tiempo, el pedido ya estará en preparación.",
      },
    ],
  },
  {
    title: "Comida y alérgenos",
    items: [
      {
        q: "¿Tienen opciones vegetarianas?",
        a: "Sí, muchos de nuestros platos son vegetarianos. Búscalos con la etiqueta 'Vegetariano' en el menú.",
      },
      {
        q: "¿Puedo pedir sin algún ingrediente?",
        a: "Claro. Usa el campo de 'Notas del pedido' en el carrito para indicar cualquier ajuste (sin cebolla, sin picante, etc.).",
      },
      {
        q: "¿Manejan alérgenos como maní o gluten?",
        a: "Algunos platos contienen gluten o frutos secos. Revisa las etiquetas de cada producto o contáctanos por WhatsApp si tienes una alergia específica.",
      },
    ],
  },
  {
    title: "Eventos y catering",
    items: [
      {
        q: "¿Hacen catering para eventos?",
        a: "Sí, ofrecemos servicio de catering para eventos desde 10 personas. Escríbenos por WhatsApp para una cotización personalizada.",
      },
      {
        q: "¿Con cuánta anticipación debo pedir catering?",
        a: "Para eventos, te recomendamos un mínimo de 48 horas de anticipación para garantizar disponibilidad y mejor servicio.",
      },
    ],
  },
];

function FAQItem({ qa }: { qa: QA }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-cafe">{qa.q}</span>
        <ChevronDown
          size={20}
          className={`text-primary shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="text-warm text-sm pb-4 leading-relaxed animate-fade-up">
          {qa.a}
        </p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <>
      <section className="pt-12 pb-12">
        <div className="container-page max-w-3xl">
          <SectionTitle
            eyebrow="Centro de ayuda"
            title={<>Preguntas <span className="text-primary">frecuentes</span></>}
            subtitle="Todo lo que necesitas saber sobre nuestros pedidos, pagos y comida."
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page max-w-3xl space-y-10">
          {FAQ_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2">
                <HelpCircle className="text-primary" size={22} />
                {section.title}
              </h3>
              <div className="bg-white rounded-2xl shadow-soft px-6">
                {section.items.map((qa) => (
                  <FAQItem key={qa.q} qa={qa} />
                ))}
              </div>
            </div>
          ))}

          {/* CTA contacto */}
          <div className="bg-primary rounded-2xl p-8 text-center text-white">
            <h3 className="font-serif text-2xl font-bold mb-2">
              ¿No encuentras tu respuesta?
            </h3>
            <p className="text-white/90 mb-6">
              Escríbenos por WhatsApp y te respondemos enseguida.
            </p>
            <a
              href="https://wa.me/18095550123"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-bold rounded-full hover:bg-cream transition-colors"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
