import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import type { ComponentType } from "react";
import Logo from "./Logo";

/* Lucide retiró los íconos de marca de redes sociales, así que los
   definimos como SVG inline (mismo enfoque que ya usamos en WhatsAppButton). */

type IconProps = { size?: number; className?: string };

const Instagram: ComponentType<IconProps> = ({ size = 18, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.12 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.12.66.66 1.33 1.07 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.12-1.38 5.86 5.86 0 0 0 1.38-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.12A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.4-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z" />
  </svg>
);

const Facebook: ComponentType<IconProps> = ({ size = 18, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.25h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07Z" />
  </svg>
);

const Twitter: ComponentType<IconProps> = ({ size = 18, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.9 1.5h3.68l-8.04 9.19L24 22.5h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.5h7.59l5.24 6.93L18.9 1.5Zm-1.29 18.8h2.04L6.48 3.6H4.3L17.61 20.3Z" />
  </svg>
);

const SOCIALS = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-cafe-light pt-16 pb-8 border-t border-gray-100 dark:border-cafe">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Marca */}
          <div className="md:col-span-1">
            <Logo />
            <p className="text-sm text-warm mt-5 mb-6 leading-relaxed">
              Llevando el sabor criollo de la República Dominicana a tu mesa,
              con amor y tradición.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-bold mb-4">Empresa</h4>
            <ul className="space-y-2.5 text-sm text-warm">
              <li><Link to="/nosotros" className="hover:text-primary transition-colors">Sobre Nosotros</Link></li>
              <li><Link to="/menu" className="hover:text-primary transition-colors">Nuestro Menú</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Carreras</a></li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="font-bold mb-4">Soporte</h4>
            <ul className="space-y-2.5 text-sm text-warm">
              <li><Link to="/faq" className="hover:text-primary transition-colors">Centro de Ayuda</Link></li>
              <li><Link to="/rastrear" className="hover:text-primary transition-colors">Rastrear Pedido</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-2.5 text-sm text-warm">
              <li className="flex items-center gap-2"><Mail size={16} className="text-primary" /> hola@sarahskitchen.com</li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-primary" /> +1 (809) 555-0123</li>
              <li className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> Santo Domingo, RD</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-cafe pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-warm text-center md:text-left">
            © {new Date().getFullYear()} Sarah's Kitchen. Todos los derechos reservados.
          </p>
          <div className="flex gap-2">
            {["VISA", "MC", "AMEX"].map((m) => (
              <span
                key={m}
                className="h-6 px-2 bg-gray-100 dark:bg-cafe rounded flex items-center justify-center text-[10px] font-bold text-warm"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
