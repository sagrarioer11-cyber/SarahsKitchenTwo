export type CategoryId =
  | "desayunos"
  | "platos-principales"
  | "sopas"
  | "acompanantes"
  | "postres"
  | "bebidas";

export type Category = {
  id: CategoryId;
  name: string;
  description: string;
  /** Emoji usado como fallback visual cuando no hay imagen real. */
  emoji: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number; // centavos (minor units)
  categoryId: CategoryId;
  /** Ruta local de la imagen real. Si no existe el archivo, se muestra placeholder. */
  image?: string;
  /** Etiquetas: vegetariano, picante, popular, nuevo, etc. */
  tags?: ProductTag[];
  rating?: number; // 0-5
  reviewCount?: number;
  serves?: string; // "1 persona", "2-3 personas"
  spicyLevel?: 0 | 1 | 2 | 3;
  /** Marcar como best-seller para destacarlo en la home. */
  bestseller?: boolean;
};

export type ProductTag =
  | "popular"
  | "nuevo"
  | "vegetariano"
  | "picante"
  | "sin-gluten"
  | "recomendado";

export type ProductTagName = Record<ProductTag, string>;

export const PRODUCT_TAG_LABELS: ProductTagName = {
  popular: "Popular",
  nuevo: "Nuevo",
  vegetariano: "Vegetariano",
  picante: "Picante",
  "sin-gluten": "Sin gluten",
  recomendado: "Recomendado",
};
