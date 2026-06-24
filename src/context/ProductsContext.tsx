/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS } from "../data/products.seed";
import type { Product } from "../types";

const STORAGE_KEY = "sk_products_v1";

type ProductsContextValue = {
  products: Product[];
  getById: (id: string) => Product | undefined;
  getBySlug: (slug: string) => Product | undefined;
  create: (data: Omit<Product, "id" | "slug">) => string;
  update: (id: string, data: Partial<Omit<Product, "id">>) => void;
  remove: (id: string) => void;
  resetToSeed: () => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

/** Genera un slug URL-safe a partir de un nombre. */
function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Product[]) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Persistir en cada cambio.
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products]);

  const value = useMemo<ProductsContextValue>(
    () => ({
      products,
      getById: (id) => products.find((p) => p.id === id),
      getBySlug: (slug) => products.find((p) => p.slug === slug),
      create: (data) => {
        const id = `p-${crypto.randomUUID().slice(0, 8)}`;
        const slug = slugify(data.name);
        setProducts((prev) => [{ ...data, id, slug }, ...prev]);
        return id;
      },
      update: (id, data) => {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === id
              ? {
                  ...p,
                  ...data,
                  slug: data.name ? slugify(data.name) : p.slug,
                }
              : p,
          ),
        );
      },
      remove: (id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      },
      resetToSeed: () => {
        setProducts(PRODUCTS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(PRODUCTS));
      },
    }),
    [products],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts debe usarse dentro de <ProductsProvider>");
  return ctx;
}
