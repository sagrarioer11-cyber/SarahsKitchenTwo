/**
 * Formatea un monto en centavos (minor units) a string de moneda USD.
 * Ej: 1899 -> "$18.99"
 */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
