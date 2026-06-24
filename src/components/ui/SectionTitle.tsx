import type { ReactNode } from "react";

type SectionTitleProps = {
  /** Texto pequeño encima del título (eyebrow). */
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  center?: boolean;
  className?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = true,
  className = "",
}: SectionTitleProps) {
  return (
    <div
      className={`${center ? "text-center mx-auto" : ""} max-w-2xl mb-12 ${className}`}
    >
      {eyebrow && (
        <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-4xl lg:text-5xl font-bold leading-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-warm text-lg mt-4 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
