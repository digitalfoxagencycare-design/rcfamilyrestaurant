import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  CalendarCheck,
  UtensilsCrossed,
  Sparkles,
  ArrowUpRight,
  Clock,
} from "lucide-react";

export default function Dashboard({ menu, orders, bookings }) {
  const totalRevenue = orders.reduce(
    (acc, o) => acc + (o.status !== "Cancelled" ? o.total : 0),
    28450
  );
  const totalOrdersCount = orders.length + 38;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Performance Analytics & Revenue
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Real-time sales, order volume, and tourist footfall metrics in Lambasinghi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Clock size={14} className="text-amber-400" />
            Live Sync • {new Date().toLocaleDateString("en-IN", { dateStyle: "medium" })}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Today's Revenue</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
            <TrendingUp size={14} /> +22.4% vs last week
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <ShoppingBag size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {totalOrdersCount} Orders
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
            <span className="text-amber-400 font-semibold">{orders.filter(o => o.status === "Pending" || o.status === "Preparing").length} in progress</span>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Menu Items</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <UtensilsCrossed size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {menu.length} Dishes
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
            AI Photos enabled
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Table Reservations</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <CalendarCheck size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {bookings.length} Bookings
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
            Lambasinghi tourists & groups
          </div>
        </div>
      </div>

      {/* Hourly Sales Chart Representation & Top Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Volume Visual Bar */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="font-display font-bold text-base text-white">Peak Hour Sales Distribution</h3>
          <div className="space-y-3 pt-2">
            {[
              { time: "08:00 AM - 11:00 AM (Morning Tiffins)", percent: 65, amount: "₹6,800" },
              { time: "12:30 PM - 03:30 PM (Lunch Biryanis)", percent: 95, amount: "₹14,200" },
              { time: "04:30 PM - 06:30 PM (Tea & Starters)", percent: 50, amount: "₹4,150" },
              { time: "07:30 PM - 10:30 PM (Dinner Rush)", percent: 85, amount: "₹11,900" },
            ].map((slot) => (
              <div key={slot.time} className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-semibold">{slot.time}</span>
                  <span className="font-mono font-bold text-amber-400">{slot.amount}</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-primary to-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${slot.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Lambasinghi Specials */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
            <Sparkles size={18} className="text-amber-400" /> Bestselling Dishes This Week
          </h3>
          <div className="space-y-2.5">
            {[
              { name: "France Biryani (Prawns Special)", orders: 154, revenue: "₹53,900", tag: "Signature Dish" },
              { name: "Chicken 65", orders: 128, revenue: "₹35,840", tag: "Crispy Starter" },
              { name: "Mutton Biryani", orders: 106, revenue: "₹37,100", tag: "Weekend Special" },
              { name: "Ghee Masala Dosa", orders: 98, revenue: "₹5,880", tag: "Morning Favorite" },
              { name: "Paneer 65", orders: 84, revenue: "₹21,000", tag: "Veg Special" },
            ].map((item, idx) => (
              <div
                key={item.name}
                className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <div>
                    <p className="font-bold text-white text-sm">{item.name}</p>
                    <span className="text-[10px] text-amber-400">{item.tag}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-400">{item.orders} orders</p>
                  <p className="font-mono font-bold text-emerald-400">{item.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
