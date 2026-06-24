import type { Category } from "../types";

export const CATEGORIES: Category[] = [
  {
    id: "desayunos",
    name: "Desayunos",
    description: "Despierta con el sabor criollo: mangú, huevos rancheros y más.",
    emoji: "🍳",
  },
  {
    id: "platos-principales",
    name: "Platos principales",
    description: "La banda Criolla: chofán, locrio, pollo guisado y sancocho.",
    emoji: "🍗",
  },
  {
    id: "sopas",
    name: "Sopas y caldos",
    description: "Caldo caliente y reconfortante para el alma.",
    emoji: "🥣",
  },
  {
    id: "acompanantes",
    name: "Acompañantes",
    description: "Tostones, moros, ensalada rusa y mucho más.",
    emoji: "🍟",
  },
  {
    id: "postres",
    name: "Postres",
    description: "Dulces criollos: habichuelas con dulce, majarete y más.",
    emoji: "🍮",
  },
  {
    id: "bebidas",
    name: "Bebidas",
    description: "Jugos naturales, morir soñando y café caribeño.",
    emoji: "🥤",
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<string, Category>;
