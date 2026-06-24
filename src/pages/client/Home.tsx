import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  ChefHat,
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
    text: "Explora nuestro menu de comida dominicana autentica.",
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
    text: "Solo queda sentarte a la mesa y disfrutar el sazon.",
  },
];

const STATS = [
  { value: "10K+", label: "Pedidos entregados" },
  { value: "4.9", label: "Calificacion promedio" },
  { value: "30 min", label: "Entrega promedio" },
  { value: "100%", label: "Hecho en casa" },
];

export default function Home() {
  const bestsellers = useBestsellers();

  return (
    <>
      <section className="relative min-h-[640px] overflow-hidden bg-cafe text-white sm:min-h-[calc(100svh-6rem)]">
        <img
          src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=85&w=1800"
          alt="Mesa servida con comida casera caribena"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-cafe/55" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-cafe via-cafe/70 to-cafe/10"
          aria-hidden="true"
        />

        <div className="container-page relative flex min-h-[640px] items-center py-8 sm:min-h-[calc(100svh-6rem)] sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white shadow-soft backdrop-blur sm:mb-6 sm:text-sm">
              <Sparkles size={14} /> Sazon dominicano de alta cocina
            </span>
            <h1 className="mb-5 max-w-4xl font-serif text-4xl font-bold leading-[1.02] text-white text-balance drop-shadow-[0_3px_18px_rgba(0,0,0,0.55)] sm:mb-6 sm:text-6xl lg:text-7xl">
              El alma de <span className="text-primary-light">Quisqueya</span>{" "}
              en tu mesa.
            </h1>
            <p className="mb-7 max-w-2xl text-base leading-relaxed text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:mb-9 sm:text-xl">
              Mangu, sancocho y pasteles en hoja preparados con ingredientes
              frescos, receta de familia y entrega puntual para tu casa,
              oficina o evento.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button to="/menu" size="md" className="w-full sm:w-auto">
                Ver el menu <ArrowRight size={18} />
              </Button>
              <Button
                to="/nosotros"
                variant="secondary"
                size="md"
                className="w-full sm:w-auto"
              >
                Conocenos
              </Button>
            </div>

            <div className="mt-12 hidden grid-cols-4 gap-4 border-t border-white/15 pt-6 sm:grid">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-2xl font-bold text-white lg:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-white/65">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <SectionTitle
            eyebrow="Explora"
            title={
              <>
                Elige por <span className="text-primary">categoria</span>
              </>
            }
            subtitle="Desde el desayuno criollo hasta el postre, tenemos todo el sabor dominicano."
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/menu?cat=${cat.id}`}
                className="card card-hover p-6 text-center group"
              >
                <div
                  className="mb-3 text-4xl transition-transform group-hover:scale-110"
                  aria-hidden="true"
                >
                  {cat.emoji}
                </div>
                <div className="text-sm font-bold">{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-primary/10 bg-primary/5 py-20">
        <div className="container-page">
          <SectionTitle
            eyebrow="Favoritos de la casa"
            title={
              <>
                Lo mas <span className="text-primary">pedido</span>
              </>
            }
            subtitle="Los platos que nuestros clientes no pueden dejar de pedir."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button to="/menu" variant="secondary" size="lg">
              Ver todo el menu <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <SectionTitle
            eyebrow="Simple y rapido"
            title={
              <>
                Como <span className="text-primary">funciona</span>
              </>
            }
            subtitle="En cuatro pasos tendras tu comida dominicana favorita en la mesa."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light">
                  <step.icon className="text-primary" size={28} />
                </div>
                <h3 className="mb-2 font-bold">{step.title}</h3>
                <p className="text-sm text-warm">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cafe py-20 text-cream">
        <div
          className="absolute right-0 top-0 select-none text-[20rem] leading-none text-white/5"
          aria-hidden="true"
        >
          "
        </div>
        <div className="container-page relative">
          <div className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto mb-6 text-primary" size={48} />
            <blockquote className="mb-8 font-serif text-2xl leading-relaxed text-balance lg:text-3xl">
              "Pedi el sancocho para una reunion familiar y fue un exito. El
              sabor autentico de mi abuela, pero sin tener que cocinar. Ya soy
              cliente fiel."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-white">
                M
              </div>
              <div className="text-left">
                <div className="font-bold">Maria Fernandez</div>
                <div className="text-sm text-cream/60">Santo Domingo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-primary p-10 text-center text-white lg:p-16">
            <div className="relative">
              <h2 className="mb-4 font-serif text-3xl font-bold text-balance lg:text-5xl">
                Antojo de comida criolla?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg text-white/90">
                Haz tu pedido ahora y recibelo caliente en casa.
              </p>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-primary transition-all hover:-translate-y-0.5 hover:bg-cream"
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
