import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  ChevronLeft,
  LayoutDashboard,
  LogOut,
  Menu as MenuIcon,
  Package,
  ShoppingBag,
  X,
} from "lucide-react";
import Logo from "../layout/Logo";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/productos", label: "Productos", icon: Package, end: false },
  { to: "/admin/pedidos", label: "Pedidos", icon: ShoppingBag, end: false },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-cafe text-cream flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header del sidebar */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-cream/70 hover:text-cream"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 mb-2">
          <span className="text-xs uppercase tracking-widest text-cream/40 font-semibold">
            Administración
          </span>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-3 space-y-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-cream/70 hover:bg-white/5 hover:text-cream"
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer del sidebar */}
        <div className="p-3 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-cream/70 hover:bg-white/5 hover:text-cream transition-colors"
          >
            <ChevronLeft size={18} />
            Volver al sitio
          </Link>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-cream/70 hover:bg-white/5 hover:text-cream transition-colors w-full">
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Overlay móvil */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Contenido principal */}
      <div className="flex-1 min-w-0">
        {/* Top bar móvil */}
        <header className="lg:hidden sticky top-0 z-30 bg-cafe text-cream px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="p-1.5"
          >
            <MenuIcon size={22} />
          </button>
          <span className="font-bold text-sm">Panel Admin</span>
          <div className="w-9" />
        </header>

        <main className="p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
