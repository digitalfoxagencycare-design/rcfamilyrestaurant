import { useState } from "react";
import {
  Settings,
  Store,
  Phone,
  MapPin,
  Clock,
  Printer,
  CheckCircle2,
  Bell,
  Sparkles,
} from "lucide-react";
import initialRestaurant from "../../data/restaurant";

export default function StoreSettings({ restaurantInfo, onUpdateRestaurantInfo }) {
  const [info, setInfo] = useState(restaurantInfo || {
    ...initialRestaurant,
    isOpen: true,
    announcement: "Fresh Lambasinghi Country Specials & Dum Biryanis Hot All Day! Free Delivery on orders above ₹499.",
    taxRate: 5,
    deliveryFee: 40,
    freeDeliveryAbove: 499,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateRestaurantInfo && onUpdateRestaurantInfo(info);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
          Store & Operational Settings
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          Configure restaurant status, Lambasinghi tourist announcements, tax rates, and contact details.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 space-y-6">
        {/* Open / Closed Switch */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <h3 className="font-bold text-white text-base">Store Status (Online & Dine-In)</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Turn off when the kitchen is closed or during heavy morning mist/maintenance.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setInfo({ ...info, isOpen: !info.isOpen })}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              info.isOpen ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            {info.isOpen ? "Store is OPEN" : "Store is CLOSED"}
          </button>
        </div>

        {/* Tourist Announcement Banner */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-400" /> Website Announcement Banner
          </label>
          <input
            type="text"
            value={info.announcement}
            onChange={(e) => setInfo({ ...info, announcement: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
          />
          <p className="text-[11px] text-slate-500">
            This banner displays on the top bar of the customer storefront.
          </p>
        </div>

        {/* Tax and Delivery thresholds */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">GST Tax Rate (%)</label>
            <input
              type="number"
              value={info.taxRate || 5}
              onChange={(e) => setInfo({ ...info, taxRate: Number(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Standard Delivery Fee (₹)</label>
            <input
              type="number"
              value={info.deliveryFee || 40}
              onChange={(e) => setInfo({ ...info, deliveryFee: Number(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Free Delivery Above (₹)</label>
            <input
              type="number"
              value={info.freeDeliveryAbove || 499}
              onChange={(e) => setInfo({ ...info, freeDeliveryAbove: Number(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Phone numbers */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Store Contact Numbers
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {info.phones.map((phone, idx) => (
              <input
                key={idx}
                type="text"
                defaultValue={phone}
                className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary"
              />
            ))}
          </div>
        </div>

        {/* Location Address */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Restaurant Location & Address
          </label>
          <textarea
            rows={2}
            defaultValue={info.address}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary"
          />
        </div>

        {/* Save button */}
        <div className="flex items-center gap-3 pt-3">
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-primary/20 transition"
          >
            Save Store Settings
          </button>
          {savedSuccess && (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 size={14} /> Settings updated successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
