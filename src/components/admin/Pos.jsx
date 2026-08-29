import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Printer,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  UtensilsCrossed,
  ShoppingBag,
  Truck,
  User,
  Phone,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { printThermalReceipt58mm, printThermalKOT58mm } from "../../lib/thermalPrinter";

export default function Pos({ menu, onPlaceOrder, activeOrders }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderType, setOrderType] = useState("dine-in"); // 'dine-in', 'parcel', 'delivery'
  const [selectedTable, setSelectedTable] = useState("Table 1");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [posCart, setPosCart] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [settledSuccess, setSettledSuccess] = useState(null);

  const tables = [
    "Table 1",
    "Table 2",
    "Table 3",
    "Table 4",
    "Table 5",
    "Table 6",
    "Gazebo 1",
    "Gazebo 2",
    "Family Hall 1",
    "AC Cabin 1",
  ];

  const categories = useMemo(() => {
    const set = new Set(menu.map((i) => i.category));
    return ["All", ...Array.from(set)];
  }, [menu]);

  const filteredMenu = useMemo(() => {
    return menu.filter((item) => {
      const matchCat = selectedCategory === "All" || item.category === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch && item.available;
    });
  }, [menu, selectedCategory, searchQuery]);

  const addToPosCart = (item) => {
    setPosCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updatePosQty = (id, newQty) => {
    if (newQty <= 0) {
      setPosCart((prev) => prev.filter((i) => i.id !== id));
    } else {
      setPosCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: newQty } : i)));
    }
  };

  const subtotal = posCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const gstAmount = Math.round((subtotal - discountAmount) * 0.05);
  const grandTotal = Math.max(0, subtotal - discountAmount + gstAmount);

  const handleSettleOrder = (status = "Preparing", autoPrint = true) => {
    if (posCart.length === 0) {
      alert("Please add items to create a bill.");
      return;
    }

    const orderId = "POS-" + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: orderId,
      customer: customerName || (orderType === "dine-in" ? `Guest (${selectedTable})` : "Walk-in Customer"),
      phone: customerPhone || "Counter POS",
      type: orderType === "dine-in" ? `Dine-In (${selectedTable})` : orderType === "delivery" ? "Delivery" : "Takeaway / Parcel",
      items: [...posCart],
      total: grandTotal,
      subtotal,
      discount: discountAmount,
      gst: gstAmount,
      status: status,
      paymentStatus: `Paid (${paymentMethod})`,
      time: "Just now",
    };

    onPlaceOrder && onPlaceOrder(newOrder);
    setSettledSuccess(newOrder);

    // Trigger 58mm Thermal Print
    if (autoPrint) {
      if (status === "Preparing") {
        printThermalKOT58mm(newOrder);
      } else {
        printThermalReceipt58mm(newOrder);
      }
    }

    setPosCart([]);
    setCustomerName("");
    setCustomerPhone("");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[600px]">
      {/* Left Menu Selection Section */}
      <div className="flex-1 flex flex-col bg-slate-950/70 border border-slate-800 rounded-2xl p-4 overflow-hidden">
        {/* Order Type & Table Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setOrderType("dine-in")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                orderType === "dine-in" ? "bg-primary text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <UtensilsCrossed size={14} /> Dine-In
            </button>
            <button
              onClick={() => setOrderType("parcel")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                orderType === "parcel" ? "bg-primary text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <ShoppingBag size={14} /> Parcel
            </button>
            <button
              onClick={() => setOrderType("delivery")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                orderType === "delivery" ? "bg-primary text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <Truck size={14} /> Delivery
            </button>
          </div>

          {orderType === "dine-in" && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Table:</span>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-amber-400 font-bold text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                {tables.map((tbl) => (
                  <option key={tbl} value={tbl}>
                    {tbl}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Search & Categories */}
        <div className="py-3 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search POS items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-slate-800 text-amber-400 border border-amber-500/40"
                    : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid for Fast POS Tapping */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pr-1">
          {filteredMenu.map((item) => (
            <button
              key={item.id}
              onClick={() => addToPosCart(item)}
              className="bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-primary/60 rounded-xl p-2.5 text-left transition flex flex-col justify-between group active:scale-95"
            >
              <div className="flex items-start justify-between gap-1 mb-1">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 mt-1 ${
                    item.veg ? "bg-emerald-400" : "bg-red-400"
                  }`}
                ></span>
                <span className="font-mono text-xs font-bold text-amber-400">₹{item.price}</span>
              </div>
              <p className="text-xs font-bold text-white group-hover:text-amber-400 transition line-clamp-2">
                {item.name}
              </p>
              <span className="text-[10px] text-slate-500 mt-1">{item.category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right POS Billing Panel */}
      <div className="w-full lg:w-96 bg-slate-950/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-sm text-white">Current Order Bill</h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded font-bold">
                  58mm Thermal
                </span>
              </div>
              <p className="text-xs text-amber-400 font-semibold mt-0.5">
                {orderType === "dine-in" ? selectedTable : orderType.toUpperCase()}
              </p>
            </div>
            {posCart.length > 0 && (
              <button
                onClick={() => setPosCart([])}
                className="text-xs text-slate-500 hover:text-red-400 flex items-center gap-1"
              >
                <RotateCcw size={12} /> Clear
              </button>
            )}
          </div>

          {/* Customer info inputs */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <input
              type="text"
              placeholder="Guest Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Guest Phone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          {/* Running Items List */}
          <div className="max-h-60 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-800/50">
            {posCart.map((item) => (
              <div key={item.id} className="pt-2 flex items-center justify-between text-xs">
                <div className="flex-1 min-w-0 pr-2">
                  <p className="font-bold text-white truncate">{item.name}</p>
                  <p className="text-[11px] text-slate-400">₹{item.price} each</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updatePosQty(item.id, item.qty - 1)}
                    className="w-5 h-5 rounded bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700"
                  >
                    <Minus size={10} />
                  </button>
                  <span className="font-bold text-xs text-amber-400 w-4 text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updatePosQty(item.id, item.qty + 1)}
                    className="w-5 h-5 rounded bg-primary text-white flex items-center justify-center hover:bg-primary/90"
                  >
                    <Plus size={10} />
                  </button>
                  <span className="font-mono font-bold text-slate-200 ml-2 w-12 text-right">
                    ₹{item.price * item.qty}
                  </span>
                </div>
              </div>
            ))}

            {posCart.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-xs">
                No items added yet. Tap items from the left to build the ticket.
              </div>
            )}
          </div>
        </div>

        {/* Calculation and Action Buttons */}
        <div className="border-t border-slate-800 pt-3 mt-3 space-y-3">
          <div className="bg-slate-900/90 rounded-xl p-3 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-400">
              <span>Item Subtotal</span>
              <span className="font-mono">₹{subtotal}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Discount (%):</span>
              <select
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="bg-slate-950 border border-slate-800 text-xs text-white rounded px-2 py-0.5"
              >
                <option value={0}>0%</option>
                <option value={5}>5%</option>
                <option value={10}>10% Special</option>
                <option value={15}>15% VIP</option>
              </select>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>GST (5%)</span>
              <span className="font-mono">₹{gstAmount}</span>
            </div>
            <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-sm text-white">
              <span>Grand Total</span>
              <span className="text-emerald-400 font-mono text-base">₹{grandTotal}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-3 gap-2">
            {["UPI", "Cash", "Card"].map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setPaymentMethod(method)}
                className={`py-1.5 rounded-lg text-xs font-bold border transition flex items-center justify-center gap-1 ${
                  paymentMethod === method
                    ? "bg-amber-500/20 text-amber-300 border-amber-500"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                {method === "UPI" && <Smartphone size={12} />}
                {method === "Cash" && <Banknote size={12} />}
                {method === "Card" && <CreditCard size={12} />}
                {method}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSettleOrder("Preparing", true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1 shadow-md"
            >
              <Printer size={14} /> 58mm KOT
            </button>
            <button
              onClick={() => handleSettleOrder("Completed", true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1 shadow-md"
            >
              <CheckCircle2 size={14} /> Paid & 58mm Bill
            </button>
          </div>

          {/* Nova SaaS Agency Footer */}
          <p className="text-[10px] text-center text-slate-500 font-medium pt-1">
            Powered by <span className="text-amber-400 font-bold">Nova SaaS POS Engine</span>
          </p>
        </div>
      </div>

      {/* Settle Success Modal */}
      {settledSuccess && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
            <CheckCircle2 size={36} className="text-emerald-400 mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg text-white">Bill Generated</h3>
            <p className="text-xs text-slate-400 mt-1">
              Ticket: <span className="font-mono text-amber-400 font-bold">{settledSuccess.id}</span>
            </p>
            <p className="text-xs text-slate-300 mt-2">
              Total Amount of <span className="font-bold text-emerald-400">₹{settledSuccess.total}</span> received via {settledSuccess.paymentStatus}.
            </p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => printThermalReceipt58mm(settledSuccess)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1"
              >
                <Printer size={13} /> Print 58mm Bill
              </button>
              <button
                onClick={() => printThermalKOT58mm(settledSuccess)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1"
              >
                <Printer size={13} /> Print KOT
              </button>
            </div>

            <button
              onClick={() => setSettledSuccess(null)}
              className="mt-3 w-full bg-primary hover:bg-primary/90 text-white font-bold text-xs py-2.5 rounded-xl transition"
            >
              Next Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
