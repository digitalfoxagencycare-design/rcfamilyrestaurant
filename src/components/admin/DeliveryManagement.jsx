import { useState } from "react";
import {
  Truck,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  User,
  MapPin,
  Send,
  AlertCircle,
} from "lucide-react";

export default function DeliveryManagement({ orders, onUpdateStatus }) {
  const [riders, setRiders] = useState([
    { id: "R-1", name: "Ramesh (Lambasinghi Central)", phone: "9440123456", activeOrders: 1, status: "Available" },
    { id: "R-2", name: "Suresh (Chintapalli Route)", phone: "9885011223", activeOrders: 1, status: "On Delivery" },
    { id: "R-3", name: "Kalyan (Araku Highway)", phone: "9000188776", activeOrders: 0, status: "Available" },
  ]);

  const [assignedRiders, setAssignedRiders] = useState({});

  const deliveryOrders = orders.filter(
    (o) => o.type.toLowerCase().includes("delivery") || o.type.toLowerCase().includes("parcel")
  );

  const handleAssignRider = (orderId, riderName) => {
    setAssignedRiders((prev) => ({ ...prev, [orderId]: riderName }));
  };

  const sendWhatsAppUpdate = (order) => {
    const assigned = assignedRiders[order.id] || "RC Delivery Partner";
    const text = encodeURIComponent(
      `Namaste ${order.customer}! 🌿\nYour delicious order from *RC Family Restaurant (Lambasinghi)* (${order.id}) is ${order.status}.\n\nItems: ${order.items
        .map((i) => `${i.qty}x ${i.name}`)
        .join(", ")}\nTotal: ₹${order.total}\nAssigned Rider: ${assigned}\n\nThank you for choosing RC Family Restaurant! Contact: 9346749665.`
    );
    const cleanPhone = order.phone.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/91${cleanPhone.slice(-10)}?text=${text}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
            <Truck className="text-primary" /> Delivery & Dispatch Management
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Assign delivery riders, track parcel dispatch, and send instant WhatsApp status updates to customers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-900 border border-slate-800 text-amber-400 px-3 py-1.5 rounded-xl font-bold">
            {deliveryOrders.length} Delivery / Parcel Orders
          </span>
        </div>
      </div>

      {/* Active Riders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {riders.map((r) => (
          <div key={r.id} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400 font-bold">
                <User size={18} />
              </div>
              <div>
                <p className="font-bold text-sm text-white">{r.name}</p>
                <p className="text-xs text-slate-400">Ph: {r.phone}</p>
              </div>
            </div>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                r.status === "Available"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              }`}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>

      {/* Delivery Orders Queue */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deliveryOrders.map((ord) => (
          <div
            key={ord.id}
            className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-amber-400">{ord.id}</span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                      {ord.type}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <Clock size={12} /> {ord.time}
                  </span>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                    ord.status === "Completed"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : ord.status === "Ready"
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  }`}
                >
                  {ord.status}
                </span>
              </div>

              {/* Customer & Items */}
              <div className="mt-3">
                <p className="font-bold text-sm text-white">{ord.customer}</p>
                <p className="text-xs text-slate-400">Phone: {ord.phone}</p>
                <div className="mt-2 bg-slate-900/90 rounded-xl p-3 text-xs space-y-1">
                  {ord.items.map((i, idx) => (
                    <div key={idx} className="flex justify-between text-slate-300">
                      <span>
                        <span className="font-bold text-amber-400">{i.qty}x</span> {i.name}
                      </span>
                      <span className="font-mono">₹{i.price * i.qty}</span>
                    </div>
                  ))}
                  <div className="border-t border-slate-800 pt-1.5 flex justify-between font-bold text-white">
                    <span>Total Amount</span>
                    <span className="text-emerald-400 font-mono">₹{ord.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rider Assignment & WhatsApp Trigger */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Assign Rider:</span>
                <select
                  value={assignedRiders[ord.id] || "Ramesh (Lambasinghi Central)"}
                  onChange={(e) => handleAssignRider(ord.id, e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none"
                >
                  {riders.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => sendWhatsAppUpdate(ord)}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow"
                >
                  <MessageSquare size={14} /> Send WhatsApp Alert
                </button>

                {ord.status !== "Completed" && (
                  <button
                    onClick={() => onUpdateStatus(ord.id, "Completed")}
                    className="bg-primary hover:bg-primary/90 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1 shadow"
                  >
                    <CheckCircle2 size={14} /> Mark Delivered
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {deliveryOrders.length === 0 && (
        <div className="text-center py-16 bg-slate-950/40 rounded-2xl border border-dashed border-slate-800">
          <Truck size={40} className="mx-auto text-slate-600 mb-2" />
          <p className="text-slate-400 text-sm font-semibold">No pending delivery orders.</p>
        </div>
      )}
    </div>
  );
}
