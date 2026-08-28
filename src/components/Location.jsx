import { MapPin, Phone, Clock } from "lucide-react";
import restaurant from "../data/restaurant";

export default function Location() {
  return (
    <section id="location" className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
      <div className="text-center mb-10">
        <p className="uppercase tracking-[0.3em] text-primary text-xs font-bold mb-2">Find Us</p>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink">
          Visit Us in Lambasinghi
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        <div className="rounded-xl overflow-hidden border border-ink/10 min-h-[320px]">
          <iframe
            title="RC Family Restaurant Location"
            src={restaurant.mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 320 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="bg-white border border-ink/10 rounded-xl p-8 flex flex-col justify-center gap-6">
          <div className="flex items-start gap-3">
            <MapPin className="text-primary shrink-0 mt-1" size={20} />
            <div>
              <p className="font-bold text-ink">Address</p>
              <p className="text-ink/70 text-sm">{restaurant.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="text-primary shrink-0 mt-1" size={20} />
            <div>
              <p className="font-bold text-ink">Call Us</p>
              {restaurant.phones.map((p) => (
                <a key={p} href={`tel:${p}`} className="block text-ink/70 text-sm hover:text-primary">
                  {p}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="text-primary shrink-0 mt-1" size={20} />
            <div>
              <p className="font-bold text-ink">Open Daily</p>
              <p className="text-ink/70 text-sm">Breakfast, Lunch & Dinner</p>
            </div>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              restaurant.mapsQuery
            )}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-5 py-3 rounded-full hover:bg-primary/90 transition"
          >
            <MapPin size={18} /> Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
