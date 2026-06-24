import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  ChefHat,
  Clock,
  Heart,
  Quote,
  Sparkles,
  Truck,
} from "lucide-react";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";
import ProductCard from "../../components/product/ProductCard";
import { useProducts } from "../../context/ProductsContext";
import { CATEGORIES } from "../../data/categories";

function useBestsellers() {
  const { products } = useProducts();
  return products.filter((p) => p.bestseller).slice(0, 4);
}

const HOW_IT_WORKS = [
  {
    icon: ChefHat,
    title: "1. Elige tu plato",
    text: "Explora nuestro menú de comida dominicana auténtica.",
  },
  {
    icon: Calendar,
    title: "2. Agenda tu entrega",
    text: "Selecciona la fecha y hora que mejor te convenga.",
  },
  {
    icon: Truck,
    title: "3. Recibe en casa",
    text: "Preparamos tu pedido fresco y te lo llevamos caliente.",
  },
  {
    icon: Heart,
    title: "4. Disfruta",
    text: "¡Solo queda sentarte a la mesa y disfrutar el sazón!",
  },
];

const STATS = [
  { value: "10K+", label: "Pedidos entregados" },
  { value: "4.9★", label: "Calificación promedio" },
  { value: "30 min", label: "Entrega promedio" },
  { value: "100%", label: "Hecho en casa" },
];

export default function Home() {
  const bestsellers = useBestsellers();
  return (
    <>
      {/* ════════════════ HERO ════════════════ */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl" />
        </div>

        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary font-semibold text-sm mb-6 border border-primary/20">
                <Sparkles size={14} /> El verdadero sabor del caribe
              </span>
              <h1 className="font-serif text-5xl lg:text-7xl font-bold leading-[1.05] mb-6 text-balance">
                Comida dominicana, <span className="text-primary block mt-2">hecha en casa.</span>
              </h1>
              <p className="text-lg text-warm mb-10 max-w-xl leading-relaxed">
                Mangú, sancocho y pasteles en hoja preparados con ingredientes
                frescos y la receta de la abuela. Directo a tu puerta, caliente
                y a tiempo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button to="/menu" size="lg">
                  Ver el menú <ArrowRight size={18} />
                </Button>
                <Button to="/nosotros" variant="secondary" size="lg">
                  Conócenos
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 pt-8 border-t border-primary/10">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="font-serif text-2xl lg:text-3xl font-bold text-primary">
                      {s.value}
                    </div>
                    <div className="text-xs text-warm mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual — placeholder mientras llegan fotos reales */}
            <div className="relative animate-fade-up">
              <div className="aspect-square rounded-[2.5rem] bg-gradient-to-br from-primary-light via-cream to-accent-yellow/20 shadow-soft flex items-center justify-center overflow-hidden">
                <span className="text-[12rem] select-none" aria-hidden="true">🍽️</span>
              </div>
              {/* Tarjeta flotante */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-hover p-4 flex items-center gap-3 max-w-[220px]">
                <div className="w-12 h-12 bg-accent-green/10 rounded-full flex items-center justify-center">
                  <Clock className="text-accent-green" size={22} />
                </div>
                <div>
                  <div className="font-bold text-sm">Entrega en 30 min</div>
                  <div className="text-xs text-warm">Promedio en Santo Domingo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ CATEGORÍAS ════════════════ */}
      <section className="py-20">
        <div className="container-page">
          <SectionTitle
            eyebrow="Explora"
            title={<>Elige por <span className="text-primary">categoría</span></>}
            subtitle="Desde el desayuno criollo hasta el postre, tenemos todo el sabor dominicano."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/menu?cat=${cat.id}`}
                className="card card-hover p-6 text-center group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform" aria-hidden="true">
                  {cat.emoji}
                </div>
                <div className="font-bold text-sm">{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ BEST SELLERS ════════════════ */}
      <section className="py-20 bg-primary/5 border-y border-primary/10">
        <div className="container-page">
          <SectionTitle
            eyebrow="Favoritos de la casa"
            title={<>Lo más <span className="text-primary">pedido</span></>}
            subtitle="Los platos que nuestros clientes no pueden dejar de pedir."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button to="/menu" variant="secondary" size="lg">
              Ver todo el menú <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* ════════════════ CÓMO FUNCIONA ════════════════ */}
      <section className="py-20">
        <div className="container-page">
          <SectionTitle
            eyebrow="Simple y rápido"
            title={<>Cómo <span className="text-primary">funciona</span></>}
            subtitle="En 4 pasos tendrás tu comida dominicana favorita en la mesa."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-light rounded-2xl flex items-center justify-center">
                  <step.icon className="text-primary" size={28} />
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-warm">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ TESTIMONIO ════════════════ */}
      <section className="py-20 bg-cafe text-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[20rem] text-white/5 leading-none select-none" aria-hidden="true">
          ”
        </div>
        <div className="container-page relative">
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="text-primary mx-auto mb-6" size={48} />
            <blockquote className="font-serif text-2xl lg:text-3xl leading-relaxed mb-8 text-balance">
              "Pedí el sancocho para una reunión familiar y fue un éxito. El
              sabor auténtico de mi abuela, pero sin tener que cocinar. ¡Ya soy
              cliente fiel!"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-white">
                M
              </div>
              <div className="text-left">
                <div className="font-bold">María Fernández</div>
                <div className="text-sm text-cream/60">Santo Domingo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ CTA FINAL ════════════════ */}
      <section className="py-20">
        <div className="container-page">
          <div className="bg-primary rounded-[2.5rem] p-10 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="font-serif text-3xl lg:text-5xl font-bold mb-4 text-balance">
                ¿Antojo de comida criolla?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                Haz tu pedido ahora y recíbelo caliente en casa.
              </p>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-cream hover:-translate-y-0.5 transition-all"
              >
                Pedir ahora <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
