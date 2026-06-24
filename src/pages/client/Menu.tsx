import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import SectionTitle from "../../components/ui/SectionTitle";
import ProductCard from "../../components/product/ProductCard";
import { useProducts } from "../../context/ProductsContext";
import { CATEGORIES } from "../../data/categories";
import type { CategoryId } from "../../types";

type SortOption = "relevancia" | "precio-asc" | "precio-desc" | "rating";

export default function Menu() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filtro de categoría desde la URL (permite llegar desde /menu?cat=desayunos).
  const activeCat = (searchParams.get("cat") as CategoryId) || null;

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("relevancia");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    // Filtrar por categoría.
    if (activeCat) {
      list = list.filter((p) => p.categoryId === activeCat);
    }

    // Filtrar por búsqueda.
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    // Ordenar.
    switch (sort) {
      case "precio-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "precio-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        // relevancia: bestsellers primero, luego rating.
        list.sort(
          (a, b) =>
            (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0) ||
            (b.rating ?? 0) - (a.rating ?? 0),
        );
    }

    return list;
  }, [activeCat, products, search, sort]);

  // Agrupar por categoría (solo si no hay filtro activo).
  const grouped = useMemo(() => {
    if (activeCat) return null; // no agrupar cuando se filtra por categoría.
    const map = new Map<CategoryId, typeof filtered>();
    for (const p of filtered) {
      const existing = map.get(p.categoryId) ?? [];
      existing.push(p);
      map.set(p.categoryId, existing);
    }
    return map;
  }, [filtered, activeCat]);

  const setCat = (cat: CategoryId | null) => {
    const next = new URLSearchParams(searchParams);
    if (cat) next.set("cat", cat);
    else next.delete("cat");
    setSearchParams(next);
  };

  const activeCategoryName =
    activeCat && CATEGORIES.find((c) => c.id === activeCat)?.name;

  return (
    <>
      {/* ════════════════ HEADER ════════════════ */}
      <section className="pt-12 pb-8">
        <div className="container-page">
          <SectionTitle
            eyebrow="Nuestro menú"
            title={
              activeCategoryName ?? (
                <>Todo el <span className="text-primary">sabor criollo</span></>
              )
            }
            subtitle={
              activeCategoryName
                ? undefined
                : "Platos auténticos de la República Dominicana, preparados con amor."
            }
          />

          {/* Barra de búsqueda + orden */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8">
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-warm"
              />
              <input
                type="text"
                placeholder="Buscar plato..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm hover:text-primary"
                  aria-label="Limpiar búsqueda"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`btn px-4 py-3 text-sm gap-2 ${showFilters ? "bg-primary text-white" : "bg-white text-cafe border border-gray-200"}`}
            >
              <SlidersHorizontal size={16} /> Ordenar
            </button>
          </div>

          {/* Panel de ordenamiento (acordeón) */}
          {showFilters && (
            <div className="max-w-2xl mx-auto mb-8 bg-white rounded-2xl shadow-soft p-4 animate-fade-up">
              <label className="block text-sm font-medium mb-2">Ordenar por</label>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["relevancia", "Relevancia"],
                    ["precio-asc", "Precio: menor a mayor"],
                    ["precio-desc", "Precio: mayor a menor"],
                    ["rating", "Mejor calificación"],
                  ] as [SortOption, string][]
                ).map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setSort(val)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      sort === val
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-warm hover:bg-gray-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════ PILLS DE CATEGORÍA ════════════════ */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4">
            <button
              onClick={() => setCat(null)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                !activeCat
                  ? "bg-primary text-white shadow-primary"
                  : "bg-white text-warm border border-gray-200 hover:border-primary/30"
              }`}
            >
              Todos
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCat(cat.id)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  activeCat === cat.id
                    ? "bg-primary text-white shadow-primary"
                    : "bg-white text-warm border border-gray-200 hover:border-primary/30"
                }`}
              >
                <span aria-hidden="true">{cat.emoji}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ GRID DE PRODUCTOS ════════════════ */}
      <section className="pb-24">
        <div className="container-page">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4" aria-hidden="true">🔍</div>
              <h3 className="font-serif text-2xl font-bold mb-2">
                No encontramos resultados
              </h3>
              <p className="text-warm mb-6">
                Intenta con otra búsqueda o cambia la categoría.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCat(null);
                }}
                className="btn-primary px-6 py-3 rounded-full text-sm"
              >
                Ver todo el menú
              </button>
            </div>
          ) : grouped ? (
            // Vista agrupada por categoría.
            <div className="space-y-16">
              {[...grouped.entries()].map(([catId, products]) => {
                const cat = CATEGORIES.find((c) => c.id === catId);
                return (
                  <div key={catId}>
                    <div className="flex items-center gap-3 mb-8">
                      <span className="text-2xl" aria-hidden="true">
                        {cat?.emoji}
                      </span>
                      <h3 className="font-serif text-2xl font-bold">{cat?.name}</h3>
                      <span className="text-sm text-warm">
                        ({products.length})
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Vista filtrada por una sola categoría.
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
