import { Phone, MapPin, ShieldCheck } from "lucide-react";
import restaurant from "../data/restaurant";

export default function Footer({ onOpenAdmin }) {
  return (
    <footer id="contact" className="bg-ink text-white/80 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-display font-extrabold text-lg text-secondary">{restaurant.name}</p>
          <p className="text-xs mt-1 flex items-center gap-2 justify-center sm:justify-start">
            <MapPin size={14} /> {restaurant.address}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 text-xs text-amber-400/90 hover:text-amber-300 font-semibold border border-amber-500/30 px-3.5 py-1.5 rounded-full hover:bg-white/5 transition"
          >
            <ShieldCheck size={14} /> Manager Login
          </button>
          {restaurant.phones.map((p) => (
            <a
              key={p}
              href={`tel:${p}`}
              className="flex items-center gap-2 border border-white/30 px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/10 transition"
            >
              <Phone size={14} /> {p}
            </a>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-white/40 mt-8">
        © {new Date().getFullYear()} {restaurant.name}. All rights reserved.
      </p>
    </footer>
  );
}
