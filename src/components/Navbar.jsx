import { useState } from "react";
import { Menu as MenuIcon, X, Phone } from "lucide-react";
import restaurant from "../data/restaurant";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ink/95 backdrop-blur text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="#home" className="font-display font-extrabold text-lg sm:text-xl tracking-wide text-secondary">
          {restaurant.name}
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-secondary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={`tel:${restaurant.phones[0]}`}
          className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90 px-4 py-2 rounded-full text-sm font-bold transition-colors"
        >
          <Phone size={16} /> Call Now
        </a>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={26} /> : <MenuIcon size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-ink border-t border-white/10 px-4 py-4 flex flex-col gap-4 text-sm font-semibold">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:text-secondary">
              {l.label}
            </a>
          ))}
          <a
            href={`tel:${restaurant.phones[0]}`}
            className="flex items-center justify-center gap-2 bg-primary px-4 py-2 rounded-full font-bold"
          >
            <Phone size={16} /> Call Now
          </a>
        </div>
      )}
    </header>
  );
}
