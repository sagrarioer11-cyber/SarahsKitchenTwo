import { useMemo } from "react";

/**
 * Retorna la fecha mínima para agendar entrega (mañana) como string "YYYY-MM-DD"
 * y un formateador legible para mostrar en español.
 */
export function useMinDeliveryDate() {
  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("es-DO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return { minDate, formatDate };
}
