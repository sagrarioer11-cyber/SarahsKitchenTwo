import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";
import Logo from "./Logo";
import { useCart } from "../../context/CartContext";

const NAV_LINKS = [
  { to: "/", label: "Inicio", end: true },
  { to: "/menu", label: "Menú" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 dark:bg-cafe/90 backdrop-blur-md border-b border-primary/10">
      <div className="container-page">
        <div className="flex justify-between items-center h-20">
          <Logo />

          {/* Menú desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-cafe/70 dark:text-cream/70 hover:text-primary"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            <Link
              to="/carrito"
              aria-label={`Carrito con ${count} artículos`}
              className="relative p-2.5 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors shadow-primary"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-primary text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-primary">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>

            {/* Botón hamburguesa (móvil) */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              className="md:hidden p-2.5 text-cafe dark:text-cream hover:text-primary transition-colors"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {open && (
        <div className="md:hidden border-t border-primary/10 bg-cream dark:bg-cafe animate-fade-up">
          <div className="container-page py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-3 rounded-xl font-medium transition-colors ${
                    isActive
                      ? "bg-primary-light text-primary"
                      : "text-cafe/80 dark:text-cream/80 hover:bg-primary-light/50"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
