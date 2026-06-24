import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useProducts } from "../../context/ProductsContext";
import { CATEGORIES } from "../../data/categories";
import { formatPrice } from "../../lib/format";
import ImageUploader from "../../components/admin/ImageUploader";
import type { CategoryId, Product, ProductTag } from "../../types";

const ALL_TAGS: ProductTag[] = [
  "popular",
  "nuevo",
  "vegetariano",
  "picante",
  "sin-gluten",
  "recomendado",
];

const TAG_LABELS: Record<ProductTag, string> = {
  popular: "Popular",
  nuevo: "Nuevo",
  vegetariano: "Vegetariano",
  picante: "Picante",
  "sin-gluten": "Sin gluten",
  recomendado: "Recomendado",
};

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { getById, create, update } = useProducts();

  const existing = id ? getById(id) : undefined;

  const [form, setForm] = useState({
    name: existing?.name ?? "",
    description: existing?.description ?? "",
    longDescription: existing?.longDescription ?? "",
    price: existing ? existing.price / 100 : 0, // mostrar en dólares
    categoryId: existing?.categoryId ?? ("desayunos" as CategoryId),
    image: existing?.image,
    tags: existing?.tags ?? ([] as ProductTag[]),
    rating: existing?.rating ?? 0,
    reviewCount: existing?.reviewCount ?? 0,
    serves: existing?.serves ?? "",
    bestseller: existing?.bestseller ?? false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const update2 = (field: keyof typeof form, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const toggleTag = (tag: ProductTag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Ingresa el nombre";
    if (!form.description.trim()) e.description = "Ingresa una descripción";
    if (form.price <= 0) e.price = "El precio debe ser mayor a 0";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    await new Promise((r) => setTimeout(r, 600)); // simular guardado

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      longDescription: form.longDescription.trim() || undefined,
      price: Math.round(form.price * 100), // volver a centavos
      categoryId: form.categoryId,
      image: form.image,
      tags: form.tags,
      rating: form.rating,
      reviewCount: form.reviewCount,
      serves: form.serves.trim() || undefined,
      bestseller: form.bestseller,
    };

    if (isEdit && id) {
      update(id, payload);
    } else {
      create(payload as Omit<Product, "id" | "slug">);
    }

    navigate("/admin/productos");
  };

  return (
    <div>
      {/* Header */}
      <header className="mb-6">
        <button
          onClick={() => navigate("/admin/productos")}
          className="btn-ghost text-sm mb-3 inline-flex"
        >
          <ArrowLeft size={16} /> Volver a productos
        </button>
        <h1 className="font-serif text-3xl font-bold text-cafe">
          {isEdit ? "Editar producto" : "Nuevo producto"}
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Columna izquierda: campos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Básico */}
          <div className="bg-white rounded-2xl shadow-soft p-6 space-y-4">
            <h3 className="font-bold text-cafe">Información básica</h3>

            <FormField
              label="Nombre"
              value={form.name}
              error={errors.name}
              onChange={(v) => update2("name", v)}
              placeholder="Mangú de los Tres Golpes"
            />

            <FormField
              label="Descripción corta"
              value={form.description}
              error={errors.description}
              onChange={(v) => update2("description", v)}
              placeholder="Mangú con salami, queso frito y huevo."
              textarea
            />

            <FormField
              label="Descripción larga (opcional)"
              value={form.longDescription}
              onChange={(v) => update2("longDescription", v)}
              placeholder="Detalle completo del plato..."
              textarea
              rows={3}
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Precio (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warm font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price || ""}
                    onChange={(e) => update2("price", Number(e.target.value))}
                    placeholder="11.99"
                    className={`w-full pl-8 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.price
                        ? "border-red-400 focus:ring-red-400/40"
                        : "border-gray-200 focus:ring-primary/40 focus:border-primary"
                    }`}
                  />
                </div>
                {errors.price && (
                  <p className="text-xs text-red-500 mt-1">{errors.price}</p>
                )}
                {form.price > 0 && (
                  <p className="text-xs text-warm mt-1">
                    = {formatPrice(Math.round(form.price * 100))}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Porción
                </label>
                <input
                  type="text"
                  value={form.serves}
                  onChange={(e) => update2("serves", e.target.value)}
                  placeholder="1 persona"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Categoría
              </label>
              <select
                value={form.categoryId}
                onChange={(e) => update2("categoryId", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Etiquetas */}
          <div className="bg-white rounded-2xl shadow-soft p-6 space-y-3">
            <h3 className="font-bold text-cafe">Etiquetas</h3>
            <p className="text-xs text-warm -mt-1">
              Selecciona las que apliquen.
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    form.tags.includes(tag)
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-warm hover:bg-gray-200"
                  }`}
                >
                  {TAG_LABELS[tag]}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={form.bestseller}
                onChange={(e) => update2("bestseller", e.target.checked)}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm font-medium">
                Marcar como bestseller (destacado en la home)
              </span>
            </label>
          </div>
        </div>

        {/* Columna derecha: imagen + acciones */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <ImageUploader
              slug={existing?.slug ?? form.name}
              currentImage={form.image}
              onChange={(img) => update2("image", img)}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary w-full"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Guardando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save size={16} /> {isEdit ? "Guardar cambios" : "Crear producto"}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/productos")}
            className="btn-ghost w-full"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

/* ── Campo reutilizable ── */
type FormFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  textarea?: boolean;
  rows?: number;
};

function FormField({
  label,
  value,
  onChange,
  error,
  placeholder,
  textarea,
  rows = 2,
}: FormFieldProps) {
  const cls = `w-full px-4 py-3 rounded-xl border ${
    error
      ? "border-red-400 focus:ring-red-400/40"
      : "border-gray-200 focus:ring-primary/40 focus:border-primary"
  } focus:outline-none focus:ring-2 transition-all text-sm`;

  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          type="text"
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
