import { useState } from "react";
import { Menu as MenuIcon, X, Phone, ShieldCheck } from "lucide-react";
import restaurant from "../data/restaurant";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onOpenAdmin }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ink/95 backdrop-blur text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="#home" className="flex items-center gap-3 group">
          <img
            src="/branding/rc_logo.jpg"
            alt="RC Family Restaurant Logo"
            className="w-11 h-11 rounded-full object-cover border-2 border-amber-400/80 shadow-md shadow-amber-500/20 group-hover:scale-105 transition"
          />
          <div>
            <span className="font-display font-extrabold text-base sm:text-lg tracking-wide text-white group-hover:text-amber-400 transition block leading-tight">
              {restaurant.name}
            </span>
            <span className="text-[10px] text-amber-400 font-semibold block">Lambasinghi Hill Station</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-secondary transition-colors">
              {l.label}
            </a>
          ))}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 text-xs bg-slate-800/80 hover:bg-slate-700 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-full font-bold transition shadow-sm"
            title="Open Admin Dashboard"
          >
            <ShieldCheck size={14} /> Admin Portal
          </button>
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
          <button
            onClick={() => {
              setOpen(false);
              onOpenAdmin && onOpenAdmin();
            }}
            className="flex items-center justify-center gap-2 bg-slate-800 text-amber-400 border border-amber-500/30 px-4 py-2 rounded-full font-bold text-xs"
          >
            <ShieldCheck size={16} /> Admin Portal
          </button>
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
