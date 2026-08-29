import { useState } from "react";
import {
  Users,
  Search,
  MessageSquare,
  Phone,
  Calendar,
  ShoppingBag,
  ExternalLink,
  Award,
} from "lucide-react";

export default function CustomerAdmin({ orders, bookings }) {
  const [searchQuery, setSearchQuery] = useState("");

  const customers = [
    {
      id: "CUST-1",
      name: "Suresh Kumar (Tourist)",
      phone: "9440123456",
      city: "Visakhapatnam",
      ordersCount: 4,
      totalSpent: 3850,
      lastVisited: "Today, 1:15 PM",
      favoriteDish: "France Biryani (Prawns)",
    },
    {
      id: "CUST-2",
      name: "Ananya Sharma (Araku Group)",
      phone: "9885011223",
      city: "Hyderabad",
      ordersCount: 3,
      totalSpent: 2600,
      lastVisited: "Today, 12:40 PM",
      favoriteDish: "Mushroom Biryani & Paneer 65",
    },
    {
      id: "CUST-3",
      name: "Dr. Vikram Reddy",
      phone: "9849055443",
      city: "Rajahmundry",
      ordersCount: 6,
      totalSpent: 6200,
      lastVisited: "Yesterday, 8:30 PM",
      favoriteDish: "Mutton Biryani & Bamboo Chicken",
    },
    {
      id: "CUST-4",
      name: "Kiran Varma",
      phone: "9000188776",
      city: "Kakinada",
      ordersCount: 2,
      totalSpent: 1450,
      lastVisited: "2 days ago",
      favoriteDish: "Chicken 65 & Masala Dosa",
    },
  ];

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openWhatsApp = (phone, name) => {
    const text = encodeURIComponent(
      `Namaste ${name}! 🌿\nGreetings from *RC Family Restaurant, Lambasinghi*.\nThank you for dining with us! How was your food and experience?\n\nFor table bookings or pre-orders near Araku Valley, call 9346749665.`
    );
    window.open(`https://wa.me/91${phone}?text=${text}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
            <Users className="text-amber-400" /> Customer Directory & WhatsApp CRM
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Manage tourist guest profiles, past orders, loyalty insights, and send direct WhatsApp greeting messages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-xl font-medium">
            {customers.length} Registered Guests
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3">
        <Search size={16} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search by customer name, phone number, or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs text-white focus:outline-none placeholder-slate-500"
        />
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCustomers.map((c) => (
          <div
            key={c.id}
            className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">{c.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Phone size={12} className="text-emerald-400" /> +91 {c.phone} • {c.city}
                  </p>
                </div>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Award size={10} /> {c.ordersCount} Orders
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 bg-slate-900/90 rounded-xl p-3 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block">Total Spent</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">₹{c.totalSpent}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Last Visited</span>
                  <span className="font-bold text-slate-200">{c.lastVisited}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-800">
                  <span className="text-slate-400 text-[11px] block">Favorite Lambasinghi Dish</span>
                  <span className="font-semibold text-amber-400">{c.favoriteDish}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex gap-2">
              <a
                href={`tel:${c.phone}`}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <Phone size={13} className="text-emerald-400" /> Call Guest
              </a>
              <button
                onClick={() => openWhatsApp(c.phone, c.name)}
                className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow"
              >
                <MessageSquare size={13} /> Chat on WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
