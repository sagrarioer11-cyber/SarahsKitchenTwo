import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  children?: ReactNode;
};

/**
 * Página placeholder mientras se construyen las pantallas completas en fases posteriores.
 */
export default function PagePlaceholder({ title, description, children }: Props) {
  return (
    <section className="py-24">
      <div className="container-page text-center max-w-xl mx-auto">
        <h1 className="font-serif text-4xl font-bold mb-4">{title}</h1>
        {description && <p className="text-warm text-lg">{description}</p>}
        {children}
      </div>
    </section>
  );
}
