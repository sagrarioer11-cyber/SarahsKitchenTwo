import type { Product } from "../types";

/**
 * Catálogo semilla de productos dominicanos.
 *
 * IMÁGENES: el campo `image` apunta a /images/products/<slug>.jpg.
 * Mientras el admin no suba la foto real, ProductImage muestra un
 * placeholder visual con el emoji de la categoría. Esto permite que
 * el sitio funcione desde el día 1 sin imágenes reales.
 */
export const PRODUCTS: Product[] = [
  // ─── Desayunos ──────────────────────────────────────────────────────
  {
    id: "p-mangu-los-tres-golpes",
    slug: "mangu-los-tres-golpes",
    name: "Mangú de los Tres Golpes",
    description: "Mangú de plátano verde con salami, queso frito y huevo.",
    longDescription:
      "El desayuno dominicano por excelencia: puré de plátano verde con manteca y cebolla salteada, acompañado de salami frito, queso de hoja frito, huevo revuelto y cebolla en vinagre. Servido con arepita de maíz.",
    price: 1199,
    categoryId: "desayunos",
    tags: ["popular"],
    rating: 4.9,
    reviewCount: 287,
    serves: "1 persona",
    bestseller: true,
  },
  {
    id: "p-huevos-rancheros",
    slug: "huevos-rancheros",
    name: "Huevos Rancheros Criollos",
    description: "Tortillas de huevos en salsa de tomate con cebolla y cilantro.",
    longDescription:
      "Huevos fritos bañados en una salsa de tomate fresca con cebolla, ají cubanela y cilantro. Servidos con pan de agua tostado y aguacate.",
    price: 999,
    categoryId: "desayunos",
    rating: 4.7,
    reviewCount: 142,
    serves: "1 persona",
  },
  {
    id: "p-avena-dominicana",
    slug: "avena-dominicana",
    name: "Avena Dominicana",
    description: "Avena cremosa con leche de coco, canela y azúcar.",
    longDescription:
      "Avena cocinada con leche evaporada, leche de coco, canela en rama y un toque de vainilla. Servida tibia con canela espolvoreada.",
    price: 749,
    categoryId: "desayunos",
    tags: ["vegetariano"],
    rating: 4.6,
    reviewCount: 78,
    serves: "1 persona",
  },

  // ─── Platos principales ─────────────────────────────────────────────
  {
    id: "p-sancocho-siete-carnes",
    slug: "sancocho-siete-carnes",
    name: "Sancocho de Siete Carnes",
    description: "El plato nacional dominicano, reconfortante y sustancioso.",
    longDescription:
      "Sancocho preparado con siete tipos de carne (res, cerdo, pollo, chivo, tocino, longaniza y hueso carnoso), plátano, yautía, ñame, yuca y maíz. Cocido a fuego lento durante horas. Servido con arroz blanco y aguacate.",
    price: 1899,
    categoryId: "platos-principales",
    tags: ["popular", "recomendado"],
    rating: 5.0,
    reviewCount: 412,
    serves: "2-3 personas",
    bestseller: true,
  },
  {
    id: "p-locrio-de-pollo",
    slug: "locrio-de-pollo",
    name: "Locrio de Pollo",
    description: "Arroz amarillo con pollo, sazón criolla y cilantro.",
    longDescription:
      "Arroz cocinado con pollo deshuesado, adobado con orégano, ajo y achiote. Servido con habichuelas guisadas y ensalada.",
    price: 1399,
    categoryId: "platos-principales",
    rating: 4.8,
    reviewCount: 198,
    serves: "1-2 personas",
  },
  {
    id: "p-chofan-de-pollo",
    slug: "chofan-de-pollo",
    name: "Chofán de Pollo",
    description: "Arroz frito dominicano con pollo, vegetales y huevo.",
    longDescription:
      "Arroz frito al estilo dominicano con pollo desmenuzado, zanahoria, guisantes, cebollín, huevo revuelto y un toque de sillao. Servido con tostones.",
    price: 1499,
    categoryId: "platos-principales",
    rating: 4.7,
    reviewCount: 167,
    serves: "1-2 personas",
  },
  {
    id: "p-pescado-coco",
    slug: "pescado-coco",
    name: "Pescado en Salsa de Coco",
    description: "Filete de pescado fresco en salsa cremosa de coco y cilantro.",
    longDescription:
      "Filete de chillo o carite (según disponibilidad) bañado en una salsa cremosa de leche de coco, ajo, cebolla y cilantro fresco. Servido con moro de guandules y tostones.",
    price: 1799,
    categoryId: "platos-principales",
    tags: ["nuevo"],
    rating: 4.9,
    reviewCount: 54,
    serves: "1 persona",
  },

  // ─── Sopas ──────────────────────────────────────────────────────────
  {
    id: "p-sopa-pescado",
    slug: "sopa-de-pescado",
    name: "Sopa de Pescado Criolla",
    description: "Caldo sustancioso con pescado fresco y vegetales.",
    longDescription:
      "Sopa clara de pescado con yuca, zanahoria, mazorca de maíz, cilantro y un toque de limón. Reconfortante y ligera.",
    price: 999,
    categoryId: "sopas",
    rating: 4.6,
    reviewCount: 89,
    serves: "1 persona",
  },
  {
    id: "p-crema-zanahoria",
    slug: "crema-de-zanahoria",
    name: "Crema de Zanahoria",
    description: "Crema suave de zanahoria con jengibre y nata.",
    longDescription:
      "Crema sedosa de zanahoria asada con un toque de jengibre fresco y crema de leche. Servida con crutones de pan.",
    price: 849,
    categoryId: "sopas",
    tags: ["vegetariano"],
    rating: 4.5,
    reviewCount: 43,
    serves: "1 persona",
  },

  // ─── Acompañantes ───────────────────────────────────────────────────
  {
    id: "p-tostones",
    slug: "tostones",
    name: "Tostones",
    description: "Plátano verde frito, aplastado y refrito. Crujientes.",
    longDescription:
      "Tostones de plátano verde, doblemente fritos y sazonados con sal y ajo. Servidos con alioli de cilantro.",
    price: 549,
    categoryId: "acompanantes",
    tags: ["vegetariano", "sin-gluten"],
    rating: 4.8,
    reviewCount: 234,
    serves: "2 personas",
    bestseller: true,
  },
  {
    id: "p-moro-guandules",
    slug: "moro-de-guandules",
    name: "Moro de Guandules",
    description: "Arroz con guandules, leche de coco y sofrito criollo.",
    longDescription:
      "Arroz cocinado con guandules verdes, leche de coco y sofrito de cebolla, ajo y ají cubanela. Un acompañante dominicano clásico.",
    price: 599,
    categoryId: "acompanantes",
    tags: ["vegetariano", "sin-gluten"],
    rating: 4.7,
    reviewCount: 156,
    serves: "2-3 personas",
  },
  {
    id: "p-ensalada-rusa",
    slug: "ensalada-rusa",
    name: "Ensalada Rusa",
    description: "Papa, zanahoria, huevos y mayonesa. Clásica y cremosa.",
    longDescription:
      "Papas y zanahorias cocidas con guisantes, huevos y mayonesa. Servida fría, perfecta para acompañar cualquier plato.",
    price: 499,
    categoryId: "acompanantes",
    tags: ["vegetariano"],
    rating: 4.4,
    reviewCount: 67,
    serves: "2 personas",
  },

  // ─── Postres ────────────────────────────────────────────────────────
  {
    id: "p-habichuelas-dulce",
    slug: "habichuelas-con-dulce",
    name: "Habichuelas con Dulce",
    description: "Postre tradicional de Semana Santa, único en el mundo.",
    longDescription:
      "Postre dominicano único hecho con habichuelas rojas, leche de coco, leche evaporada, batata, pasas, canela y clavos dulces. Servido frío con galletas de leche.",
    price: 699,
    categoryId: "postres",
    tags: ["vegetariano"],
    rating: 4.6,
    reviewCount: 92,
    serves: "1 persona",
  },
  {
    id: "p-majarete",
    slug: "majarete",
    name: "Majarete",
    description: "Pudín de maíz fresco con canela y vainilla.",
    longDescription:
      "Pudín suave de maíz fresco rallado, leche de coco, canela y vainilla. Servido frío espolvoreado con canela en polvo.",
    price: 649,
    categoryId: "postres",
    tags: ["vegetariano"],
    rating: 4.7,
    reviewCount: 81,
    serves: "1 persona",
  },
  {
    id: "p-flan-queso",
    slug: "flan-de-queso",
    name: "Flan de Queso",
    description: "Flan cremoso de queso crema con caramelo.",
    longDescription:
      "Flan sedoso de queso crema bañado en caramelo dorado. Servido frío.",
    price: 749,
    categoryId: "postres",
    tags: ["vegetariano", "sin-gluten"],
    rating: 4.9,
    reviewCount: 143,
    serves: "1 persona",
    bestseller: true,
  },

  // ─── Bebidas ────────────────────────────────────────────────────────
  {
    "id": "p-morir-sonando",
    "slug": "morir-sonando",
    name: "Morir Soñando",
    description: "Jugo de naranja con leche helada. Refrescante y único.",
    longDescription:
      "Bebida dominicana icónica hecha con jugo de naranja natural, leche evaporada, azúcar y hielo. Servida bien fría.",
    price: 499,
    categoryId: "bebidas",
    tags: ["vegetariano", "sin-gluten"],
    rating: 4.8,
    reviewCount: 187,
    serves: "1 vaso (12 oz)",
    bestseller: true,
  } as Product,
  {
    id: "p-jugo-papaya",
    slug: "jugo-de-papaya",
    name: "Jugo de Papaya",
    description: "Jugo natural de papaya fresca. Sin azúcar añadida.",
    longDescription: "Papaya fresca licuada con agua y un toque de limón. Sin azúcar añadida.",
    price: 449,
    categoryId: "bebidas",
    tags: ["vegetariano", "sin-gluten"],
    rating: 4.5,
    reviewCount: 64,
    serves: "1 vaso (12 oz)",
  },
  {
    id: "p-cafe-caribeno",
    slug: "cafe-caribeno",
    name: "Café Caribeño",
    description: "Café dominicano recién hecho con leche evaporada.",
    longDescription: "Café dominicano de altura servido con leche evaporada caliente y azúcar al gusto.",
    price: 399,
    categoryId: "bebidas",
    tags: ["vegetariano", "sin-gluten"],
    rating: 4.7,
    reviewCount: 98,
    serves: "1 taza (8 oz)",
  },
];
