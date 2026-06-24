import { Link } from "react-router-dom";

type LogoProps = {
  /** Versión compacta (solo el monograma) para footer u otras zonas reducidas. */
  compact?: boolean;
};

export default function Logo({ compact = false }: LogoProps) {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <span className="w-9 h-9 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center shadow-primary group-hover:scale-105 transition-transform">
        S
      </span>
      {!compact && (
        <span className="text-lg font-bold tracking-tight text-cafe dark:text-cream">
          Sarah's<span className="text-primary">Kitchen</span>
        </span>
      )}
    </Link>
  );
}
