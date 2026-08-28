import { Phone, MapPin } from "lucide-react";
import restaurant from "../data/restaurant";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 bg-gradient-to-b from-ink via-ink to-primary/90 text-white text-center"
    >
      <p className="uppercase tracking-[0.3em] text-secondary text-xs sm:text-sm font-bold mb-4">
        Welcome to Lambasinghi
      </p>
      <h1 className="font-display font-extrabold text-4xl sm:text-6xl leading-tight mb-4">
        {restaurant.name}
      </h1>
      <p className="text-white/80 max-w-xl mx-auto mb-8 text-sm sm:text-base">
        {restaurant.tagline}. Fresh, hot & flavourful food for travellers and locals near
        Araku Valley.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="#menu"
          className="bg-secondary text-ink font-bold px-6 py-3 rounded-full hover:brightness-95 transition"
        >
          View Menu
        </a>
        <a
          href={`tel:${restaurant.phones[0]}`}
          className="flex items-center gap-2 border border-white/40 px-6 py-3 rounded-full font-bold hover:bg-white/10 transition"
        >
          <Phone size={18} /> {restaurant.phones[0]}
        </a>
      </div>
      <div className="flex items-center justify-center gap-2 text-white/70 text-xs sm:text-sm mt-8">
        <MapPin size={16} className="text-secondary shrink-0" />
        <span>{restaurant.address}</span>
      </div>
    </section>
  );
}
