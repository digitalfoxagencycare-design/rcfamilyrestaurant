import { useState } from "react";
import {
  ChefHat,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Utensils,
  Check,
  Printer,
} from "lucide-react";
import { printThermalKOT58mm } from "../../lib/thermalPrinter";

export default function Kitchen({ orders, onUpdateStatus }) {
  const [checkedItems, setCheckedItems] = useState({});

  const kitchenOrders = orders.filter(
    (o) => o.status === "Pending" || o.status === "Preparing" || o.status === "Ready"
  );

  const toggleItemCheck = (orderId, idx) => {
    const key = `${orderId}-${idx}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* KDS Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-orange-950/60 via-slate-900 to-slate-900 border border-orange-900/40 p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
            <ChefHat size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Kitchen Display System (KDS)
              </h2>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                Nova SaaS Kitchen Engine
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm">
              Live chef tickets for Biryani Counter, Fryer Station & Tiffin prep.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
            <Flame size={14} className="text-orange-400 animate-pulse" />
            {kitchenOrders.length} Active Tickets
          </span>
        </div>
      </div>

      {/* Kitchen Ticket Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {kitchenOrders.map((ord) => (
          <div
            key={ord.id}
            className={`border rounded-2xl p-5 flex flex-col justify-between transition ${
              ord.status === "Preparing"
                ? "bg-slate-900 border-amber-500/40 shadow-lg shadow-amber-500/5"
                : ord.status === "Ready"
                ? "bg-slate-950/80 border-purple-500/40"
                : "bg-slate-950/70 border-slate-800"
            }`}
          >
            <div>
              {/* Ticket Top */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-black text-amber-400">{ord.id}</span>
                    <button
                      onClick={() => printThermalKOT58mm(ord)}
                      className="p-1 bg-slate-900 hover:bg-slate-800 text-blue-400 border border-slate-700 rounded text-xs transition"
                      title="Print 58mm KOT"
                    >
                      <Printer size={12} />
                    </button>
                  </div>
                  <p className="text-xs text-white font-bold mt-0.5">{ord.type}</p>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-md font-bold uppercase ${
                      ord.status === "Preparing"
                        ? "bg-amber-500 text-slate-950"
                        : ord.status === "Ready"
                        ? "bg-purple-600 text-white"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {ord.status}
                  </span>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 justify-end mt-1">
                    <Clock size={11} /> {ord.time}
                  </p>
                </div>
              </div>

              {/* Items Checklist for Chefs */}
              <div className="space-y-2.5 my-4">
                {ord.items.map((item, idx) => {
                  const key = `${ord.id}-${idx}`;
                  const isChecked = !!checkedItems[key];
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleItemCheck(ord.id, idx)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                        isChecked
                          ? "bg-emerald-950/30 border-emerald-500/30 line-through text-slate-500"
                          : "bg-slate-950 border-slate-800 text-white hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center text-xs font-bold text-amber-400 shrink-0">
                          {item.qty}
                        </span>
                        <span className="text-xs font-bold truncate">{item.name}</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                          isChecked
                            ? "bg-emerald-500 border-emerald-500 text-slate-950"
                            : "border-slate-700"
                        }`}
                      >
                        {isChecked && <Check size={12} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stage Change Buttons */}
            <div className="pt-3 border-t border-slate-800 flex gap-2">
              {ord.status === "Pending" && (
                <button
                  onClick={() => onUpdateStatus(ord.id, "Preparing")}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-1.5"
                >
                  <Flame size={14} /> Start Cooking
                </button>
              )}

              {ord.status === "Preparing" && (
                <button
                  onClick={() => onUpdateStatus(ord.id, "Ready")}
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 size={14} /> Mark All Dishes Ready
                </button>
              )}

              {ord.status === "Ready" && (
                <button
                  onClick={() => onUpdateStatus(ord.id, "Completed")}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-1.5"
                >
                  <Check size={14} /> Pass to Server / Guest
                </button>
              )}
            </div>
          </div>
        ))}

        {kitchenOrders.length === 0 && (
          <div className="col-span-full text-center py-20 bg-slate-950/40 rounded-3xl border border-dashed border-slate-800">
            <ChefHat size={48} className="mx-auto text-slate-600 mb-3" />
            <p className="text-slate-300 font-bold text-lg">All Kitchen Orders Cleared!</p>
            <p className="text-slate-500 text-xs mt-1">No pending orders in the chef queue.</p>
          </div>
        )}
      </div>
    </div>
  );
}
