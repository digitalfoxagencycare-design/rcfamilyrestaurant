import { useState } from "react";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Phone,
  Printer,
  X,
  Search,
  Filter,
  Check,
} from "lucide-react";

export default function LiveOrders({ orders, onUpdateStatus }) {
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter((o) => {
    const matchStatus = filterStatus === "All" || o.status === filterStatus;
    const matchSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.phone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
            Live Orders Dispatch Queue
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Track and progress orders across Kitchen, POS Billing, and Takeaway/Delivery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Live Kitchen Sync
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/70 border border-slate-800 p-3.5 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Order ID, Guest name, Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["All", "Pending", "Preparing", "Ready", "Completed"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                filterStatus === st
                  ? "bg-primary text-white shadow-sm"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              {st} ({st === "All" ? orders.length : orders.filter((o) => o.status === st).length})
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((ord) => (
          <div
            key={ord.id}
            className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-amber-400">{ord.id}</span>
                    <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                      {ord.type}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                    <Clock size={11} /> {ord.time}
                  </span>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                    ord.status === "Pending"
                      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      : ord.status === "Preparing"
                      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                      : ord.status === "Ready"
                      ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                      : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  }`}
                >
                  {ord.status}
                </span>
              </div>

              {/* Customer Info */}
              <div className="mb-3">
                <p className="text-sm font-bold text-white">{ord.customer}</p>
                <a
                  href={`tel:${ord.phone}`}
                  className="text-xs text-slate-400 hover:text-amber-400 transition flex items-center gap-1 mt-0.5"
                >
                  <Phone size={12} className="text-emerald-400" /> {ord.phone}
                </a>
              </div>

              {/* Items List */}
              <div className="bg-slate-900/90 rounded-xl p-3 mb-4 space-y-2">
                {ord.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-slate-200 font-medium">
                      <span className="font-bold text-amber-400">{item.qty}x</span> {item.name}
                    </span>
                    <span className="font-mono text-slate-300">₹{item.price * item.qty}</span>
                  </div>
                ))}

                <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-xs text-white">
                  <span>Grand Total</span>
                  <span className="text-emerald-400 font-mono text-sm">₹{ord.total}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 gap-2">
              <span className="text-[11px] text-slate-400 font-medium truncate">
                {ord.paymentStatus}
              </span>

              <div className="flex items-center gap-1.5">
                {ord.status === "Pending" && (
                  <button
                    onClick={() => onUpdateStatus(ord.id, "Preparing")}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition"
                  >
                    Send to Kitchen
                  </button>
                )}

                {ord.status === "Preparing" && (
                  <button
                    onClick={() => onUpdateStatus(ord.id, "Ready")}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition"
                  >
                    Mark Ready
                  </button>
                )}

                {ord.status === "Ready" && (
                  <button
                    onClick={() => onUpdateStatus(ord.id, "Completed")}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                  >
                    <Check size={13} /> Complete
                  </button>
                )}

                {ord.status === "Completed" && (
                  <span className="text-emerald-400 font-bold text-xs flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                    <CheckCircle2 size={13} /> Delivered
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-16 bg-slate-950/40 rounded-2xl border border-dashed border-slate-800">
          <ShoppingBag size={36} className="mx-auto text-slate-600 mb-2" />
          <p className="text-slate-400 text-sm font-semibold">No orders in this queue.</p>
        </div>
      )}
    </div>
  );
}
