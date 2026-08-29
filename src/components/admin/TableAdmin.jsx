import { useState } from "react";
import {
  UtensilsCrossed,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  Phone,
  QrCode,
  Sparkles,
} from "lucide-react";

export default function TableAdmin({ bookings, onUpdateBooking }) {
  const [tables, setTables] = useState([
    { id: "T-1", name: "Table 1", section: "Main Hall", capacity: 4, status: "occupied", guests: 3, bill: "₹840" },
    { id: "T-2", name: "Table 2", section: "Main Hall", capacity: 4, status: "vacant", guests: 0, bill: "₹0" },
    { id: "T-3", name: "Table 3", section: "Window View", capacity: 6, status: "occupied", guests: 5, bill: "₹1,450" },
    { id: "T-4", name: "Table 4", section: "Family Corner", capacity: 8, status: "reserved", guests: 6, bill: "₹0" },
    { id: "T-5", name: "Gazebo 1", section: "Garden Outdoor", capacity: 6, status: "occupied", guests: 4, bill: "₹980" },
    { id: "T-6", name: "Gazebo 2", section: "Garden Outdoor", capacity: 10, status: "vacant", guests: 0, bill: "₹0" },
    { id: "T-7", name: "AC Cabin 1", section: "VIP AC Lounge", capacity: 8, status: "reserved", guests: 8, bill: "₹0" },
    { id: "T-8", name: "AC Cabin 2", section: "VIP AC Lounge", capacity: 12, status: "vacant", guests: 0, bill: "₹0" },
  ]);

  const toggleTableStatus = (id) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextStatus =
          t.status === "vacant" ? "occupied" : t.status === "occupied" ? "reserved" : "vacant";
        return {
          ...t,
          status: nextStatus,
          bill: nextStatus === "occupied" ? "₹650" : "₹0",
          guests: nextStatus === "occupied" ? t.capacity : 0,
        };
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Table & Floor Management
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Monitor live table occupancy across Main Hall, Garden Gazebos, and VIP AC Cabins.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-xl font-medium">
            Total Tables: {tables.length}
          </span>
        </div>
      </div>

      {/* Legend & Stats */}
      <div className="grid grid-cols-3 gap-3 bg-slate-950/70 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm"></span>
          <div>
            <p className="text-xs font-bold text-white">
              {tables.filter((t) => t.status === "vacant").length} Vacant
            </p>
            <p className="text-[10px] text-slate-400">Available for walk-in</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-sm"></span>
          <div>
            <p className="text-xs font-bold text-white">
              {tables.filter((t) => t.status === "occupied").length} Occupied
            </p>
            <p className="text-[10px] text-slate-400">Guests dining now</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-sm"></span>
          <div>
            <p className="text-xs font-bold text-white">
              {tables.filter((t) => t.status === "reserved").length} Reserved
            </p>
            <p className="text-[10px] text-slate-400">Booked for evening</p>
          </div>
        </div>
      </div>

      {/* Floor Plan Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tables.map((tbl) => (
          <div
            key={tbl.id}
            onClick={() => toggleTableStatus(tbl.id)}
            className={`border rounded-2xl p-5 cursor-pointer transition flex flex-col justify-between hover:scale-[1.02] ${
              tbl.status === "vacant"
                ? "bg-slate-950/70 border-emerald-500/30 hover:border-emerald-500"
                : tbl.status === "occupied"
                ? "bg-slate-950/90 border-red-500/30 hover:border-red-500"
                : "bg-slate-950/90 border-amber-500/30 hover:border-amber-500"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {tbl.section}
                </span>
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    tbl.status === "vacant"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : tbl.status === "occupied"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {tbl.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-white mb-1">{tbl.name}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Users size={13} /> Capacity: {tbl.capacity} Seats
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Current Bill:</span>
              <span className="font-mono font-bold text-amber-400">{tbl.bill}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tourist Reservations List */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="font-display font-bold text-base text-white">Upcoming Tourist Group Bookings</h3>
        <div className="divide-y divide-slate-800">
          {bookings.map((bk) => (
            <div key={bk.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-amber-400 font-bold">{bk.id}</span>
                  <span className="font-bold text-white text-sm">{bk.name}</span>
                </div>
                <p className="text-slate-400 mt-0.5">
                  Party: <span className="text-white font-semibold">{bk.guests} Guests</span> • Slot: <span className="text-amber-400 font-semibold">{bk.date}</span> • {bk.type}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${bk.phone}`}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1 font-semibold"
                >
                  <Phone size={12} className="text-emerald-400" /> Call
                </a>
                <span
                  className={`px-2.5 py-1 rounded-lg font-bold ${
                    bk.status === "Confirmed"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {bk.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
