import { useState } from "react";
import menu from "../data/menu";

export default function MenuSection() {
  const [active, setActive] = useState(menu[0].category);
  const activeGroup = menu.find((g) => g.category === active);

  return (
    <section id="menu" className="bg-ink/5 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.3em] text-primary text-xs font-bold mb-2">Our Menu</p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink">
            What We Serve
          </h2>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {menu.map((g) => (
            <button
              key={g.category}
              onClick={() => setActive(g.category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-colors ${
                active === g.category
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-ink/70 border-ink/10 hover:border-primary"
              }`}
            >
              {g.category}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3 max-w-4xl mx-auto">
          {activeGroup.items.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between border-b border-dashed border-ink/15 py-2"
            >
              <span className="font-medium text-sm sm:text-base text-ink">{item.name}</span>
              <span className="font-display font-bold text-primary text-sm sm:text-base whitespace-nowrap ml-4">
                {item.price ? `₹${item.price}` : "N/A"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
