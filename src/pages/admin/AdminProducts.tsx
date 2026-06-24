import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Plus, Search, Trash2 } from "lucide-react";
import { useProducts } from "../../context/ProductsContext";
import { formatPrice } from "../../lib/format";
import { CATEGORY_MAP } from "../../data/categories";
import ProductImage from "../../components/product/ProductImage";
import type { Product } from "../../types";

export default function AdminProducts() {
  const { products, remove } = useProducts();
  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }, [products, search]);

  const handleDelete = (product: Product) => {
    remove(product.id);
    setConfirmId(null);
  };

  return (
    <div>
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-cafe">Productos</h1>
          <p className="text-warm text-sm mt-1">
            {products.length} productos en el catálogo
          </p>
        </div>
        <Link
          to="/admin/productos/nuevo"
          className="btn-primary text-sm self-start sm:self-auto"
        >
          <Plus size={16} /> Nuevo producto
        </Link>
      </header>

      {/* Buscador */}
      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-warm"
        />
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
        />
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-soft overflow-hidden group"
          >
            <div className="relative aspect-[4/3]">
              <ProductImage
                product={product}
                className="w-full h-full"
                emojiSize="text-4xl"
              />
              {/* Acciones flotantes */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to={`/admin/productos/${product.id}`}
                  className="w-9 h-9 bg-white rounded-lg shadow flex items-center justify-center text-cafe hover:bg-cream transition-colors"
                  aria-label="Editar"
                >
                  <Edit2 size={16} />
                </Link>
                <button
                  onClick={() => setConfirmId(product.id)}
                  className="w-9 h-9 bg-white rounded-lg shadow flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                  aria-label="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-warm">
                  {CATEGORY_MAP[product.categoryId]?.emoji}
                </span>
                <span className="text-xs text-warm">
                  {CATEGORY_MAP[product.categoryId]?.name}
                </span>
              </div>
              <h3 className="font-bold text-sm text-cafe truncate">
                {product.name}
              </h3>
              <p className="text-xs text-warm line-clamp-2 mt-1">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-cafe">
                  {formatPrice(product.price)}
                </span>
                {product.bestseller && (
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                    BESTSELLER
                  </span>
                )}
              </div>
            </div>

            {/* Confirmación de borrado */}
            {confirmId === product.id && (
              <div className="absolute inset-0 bg-cafe/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-5 max-w-xs w-full text-center">
                  <div className="text-3xl mb-2" aria-hidden="true">⚠️</div>
                  <h4 className="font-bold text-sm mb-1">
                    ¿Eliminar producto?
                  </h4>
                  <p className="text-xs text-warm mb-4">
                    Esta acción no se puede deshacer.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirmId(null)}
                      className="flex-1 px-3 py-2 text-sm bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-3" aria-hidden="true">🔍</div>
          <h3 className="font-bold mb-1">Sin resultados</h3>
          <p className="text-warm text-sm">
            No encontramos productos con esa búsqueda.
          </p>
        </div>
      )}
    </div>
  );
}
