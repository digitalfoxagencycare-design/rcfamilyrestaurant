import { useState } from "react";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  CalendarCheck,
  Settings,
  ChefHat,
  MonitorCheck,
  Eye,
  Sparkles,
  Truck,
  FileSpreadsheet,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";
import Pos from "./Pos";
import LiveOrders from "./LiveOrders";
import Kitchen from "./Kitchen";
import DeliveryManagement from "./DeliveryManagement";
import MenuAdmin from "./MenuAdmin";
import TableAdmin from "./TableAdmin";
import ReportsAdmin from "./ReportsAdmin";
import CustomerAdmin from "./CustomerAdmin";
import Dashboard from "./Dashboard";
import StoreSettings from "./StoreSettings";

export default function AdminDashboard({
  menu,
  onUpdateMenu,
  orders,
  onPlaceOrder,
  onUpdateOrderStatus,
  bookings,
  onUpdateBooking,
  restaurantInfo,
  onUpdateRestaurantInfo,
  onSwitchToWebsite,
}) {
  const [activeTab, setActiveTab] = useState("pos");

  const activeOrdersCount = orders.filter(
    (o) => o.status === "Pending" || o.status === "Preparing"
  ).length;

  const deliveryOrdersCount = orders.filter(
    (o) =>
      (o.type.toLowerCase().includes("delivery") || o.type.toLowerCase().includes("parcel")) &&
      o.status !== "Completed"
  ).length;

  const navItems = [
    { id: "pos", label: "Point of Sale (POS)", icon: MonitorCheck, badge: null },
    { id: "orders", label: "Live Orders Dispatch", icon: ShoppingBag, badge: activeOrdersCount || null, badgeColor: "bg-amber-500 text-slate-950" },
    { id: "kitchen", label: "Kitchen Display (KDS)", icon: ChefHat, badge: null },
    { id: "delivery", label: "Delivery & WhatsApp", icon: Truck, badge: deliveryOrdersCount || null, badgeColor: "bg-blue-500 text-white" },
    { id: "menu", label: "Menu & AI Photo Studio", icon: UtensilsCrossed, isAi: true },
    { id: "tables", label: "Tables & Reservations", icon: CalendarCheck, badge: bookings.length, badgeColor: "bg-slate-800 text-slate-300" },
    { id: "reports", label: "GST & Daily Reports", icon: FileSpreadsheet, badge: null },
    { id: "customers", label: "Customer CRM", icon: Users, badge: null },
    { id: "analytics", label: "Sales Analytics", icon: LayoutDashboard, badge: null },
    { id: "settings", label: "Store & GST Settings", icon: Settings, badge: null },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-body selection:bg-primary selection:text-white">
      {/* Top Admin Header */}
      <header className="bg-slate-950/95 backdrop-blur border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-orange-600 to-amber-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-primary/20">
            RC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-base sm:text-lg text-white leading-tight">
                RC Restaurant Executive Portal
              </h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Hyderabadi Irani Architecture
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Lambasinghi Central Cloud POS & Kitchen Terminal</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSwitchToWebsite}
            className="flex items-center gap-2 bg-gradient-to-r from-secondary to-amber-500 hover:brightness-105 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition shadow-md"
          >
            <Eye size={15} />
            <span className="hidden sm:inline">Preview Customer Website</span>
            <span className="sm:hidden">Website</span>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 p-3 shrink-0 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>

                {item.isAi && (
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                    <Sparkles size={10} /> AI
                  </span>
                )}

                {item.badge && !item.isAi && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${item.badgeColor || "bg-slate-800 text-slate-300"}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* System Terminal Info Card */}
          <div className="mt-auto hidden md:block pt-4 border-t border-slate-800/80">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white">Lambasinghi Terminal</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <p className="text-slate-400 text-[11px]">Syncing with Cloudflare Pages</p>
              <div className="mt-2 flex items-center justify-between text-slate-400 text-[11px] pt-2 border-t border-slate-800">
                <span>Fog Weather:</span>
                <span className="text-amber-400 font-bold">14°C (Misty)</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic Main Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl">
          {activeTab === "pos" && (
            <Pos menu={menu} onPlaceOrder={onPlaceOrder} activeOrders={orders} />
          )}

          {activeTab === "orders" && (
            <LiveOrders orders={orders} onUpdateStatus={onUpdateOrderStatus} />
          )}

          {activeTab === "kitchen" && (
            <Kitchen orders={orders} onUpdateStatus={onUpdateOrderStatus} />
          )}

          {activeTab === "delivery" && (
            <DeliveryManagement orders={orders} onUpdateStatus={onUpdateOrderStatus} />
          )}

          {activeTab === "menu" && (
            <MenuAdmin menu={menu} onUpdateMenu={onUpdateMenu} />
          )}

          {activeTab === "tables" && (
            <TableAdmin bookings={bookings} onUpdateBooking={onUpdateBooking} />
          )}

          {activeTab === "reports" && (
            <ReportsAdmin orders={orders} />
          )}

          {activeTab === "customers" && (
            <CustomerAdmin orders={orders} bookings={bookings} />
          )}

          {activeTab === "analytics" && (
            <Dashboard menu={menu} orders={orders} bookings={bookings} />
          )}

          {activeTab === "settings" && (
            <StoreSettings
              restaurantInfo={restaurantInfo}
              onUpdateRestaurantInfo={onUpdateRestaurantInfo}
            />
          )}
        </main>
      </div>
    </div>
  );
}
