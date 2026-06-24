import { Link } from "react-router-dom";
import { Heart, Leaf, Sparkles, UtensilsCrossed } from "lucide-react";
import SectionTitle from "../../components/ui/SectionTitle";

const VALUES = [
  {
    icon: Leaf,
    title: "Ingredientes frescos",
    text: "Compramos en mercados locales cada mañana para garantizar frescura.",
  },
  {
    icon: Heart,
    title: "Recetas de la abuela",
    text: "Cada plato lleva la receta tradicional que pasa de generación en generación.",
  },
  {
    icon: UtensilsCrossed,
    title: "Hecho en casa",
    text: "Nada de comida procesada. Todo se cocina al momento, como en casa.",
  },
  {
    icon: Sparkles,
    title: "Servicio con cariño",
    text: "Atendemos cada pedido como si fuera para nuestra propia familia.",
  },
];

const TIMELINE = [
  { year: "2019", title: "El primer mangú", text: "Sarah empezó vendiendo desayunos a vecinos desde su cocina." },
  { year: "2021", title: "Cocina propia", text: "Abrimos nuestro primer local en Santo Domingo." },
  { year: "2023", title: "Delivery premium", text: "Lanzamos el servicio de entrega a domicilio." },
  { year: "2026", title: "Hoy", text: "Miles de dominicanos disfrutan nuestro sazón cada mes." },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary font-semibold text-sm mb-6 border border-primary/20">
              <Heart size={14} /> Nuestra historia
            </span>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-6 text-balance">
              El sabor dominicano, <span className="text-primary">hecho con amor</span>
            </h1>
            <p className="text-lg text-warm leading-relaxed">
              Sarah's Kitchen nació en la cocina de una abuela dominicana que
              creía que la comida es la forma más pura de cariño. Hoy seguimos
              su legado: preparar cada plato como si fuera para nuestra propia
              familia.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-primary/5 border-y border-primary/10">
        <div className="container-page">
          <SectionTitle
            eyebrow="Lo que nos mueve"
            title={<>Nuestros <span className="text-primary">valores</span></>}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl shadow-soft p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-primary-light rounded-2xl flex items-center justify-center">
                  <v.icon className="text-primary" size={26} />
                </div>
                <h3 className="font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-warm">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container-page">
          <SectionTitle
            eyebrow="Nuestra trayectoria"
            title={<>Cómo <span className="text-primary">crecimos</span></>}
          />
          <div className="relative max-w-2xl mx-auto">
            {/* Línea vertical */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 sm:-translate-x-1/2" />
            <div className="space-y-12">
              {TIMELINE.map((item, idx) => (
                <div
                  key={item.year}
                  className={`relative pl-12 sm:pl-0 sm:flex sm:items-center sm:gap-8 ${
                    idx % 2 === 0 ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Punto */}
                  <div className="absolute left-4 sm:left-1/2 top-2 w-3 h-3 rounded-full bg-primary ring-4 ring-cream sm:-translate-x-1/2" />
                  <div className="sm:w-1/2" />
                  <div className={`sm:w-1/2 ${idx % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
                    <div className="font-serif text-2xl font-bold text-primary mb-1">
                      {item.year}
                    </div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-warm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-page">
          <div className="bg-cafe rounded-[2.5rem] p-10 lg:p-16 text-center text-cream">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              ¿Listo para probar?
            </h2>
            <p className="text-cream/80 text-lg mb-8 max-w-xl mx-auto">
              Descubre por qué miles de dominicanos eligen Sarah's Kitchen.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all"
            >
              Ver el menú
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
