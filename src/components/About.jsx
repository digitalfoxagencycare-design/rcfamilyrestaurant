import { UtensilsCrossed, Leaf, Flame } from "lucide-react";
import restaurant from "../data/restaurant";

const points = [
  { icon: UtensilsCrossed, title: "Multi-Cuisine", desc: "Andhra, Chinese & Tandoor specialities under one roof." },
  { icon: Flame, title: "Freshly Cooked", desc: "Hot, made-to-order biryanis, curries & starters." },
  { icon: Leaf, title: "Veg & Non-Veg", desc: "Wide choice for every traveller and family." },
];

export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
      <div className="text-center mb-12">
        <p className="uppercase tracking-[0.3em] text-primary text-xs font-bold mb-2">About Us</p>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink">
          A Family Restaurant on the Lambasinghi Highway
        </h2>
        <p className="text-ink/70 max-w-2xl mx-auto mt-4 text-sm sm:text-base">
          Run by {restaurant.ownerName}, {restaurant.name} serves travellers heading to Araku
          Valley and Chintapalli with authentic Andhra flavours alongside Chinese and Tandoor
          favourites — made fresh, every time.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {points.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="border border-ink/10 rounded-xl p-6 text-center hover:shadow-lg transition-shadow bg-white"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="text-primary" size={22} />
            </div>
            <h3 className="font-display font-bold text-lg mb-1">{title}</h3>
            <p className="text-ink/60 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
