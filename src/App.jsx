import { useState, useEffect } from "react";
import { Globe, SlidersHorizontal, Sparkles } from "lucide-react";
import Storefront from "./components/Storefront";
import AdminDashboard from "./components/admin/AdminDashboard";
import {
  getSavedMenu,
  saveMenu,
  getSavedOrders,
  saveOrders,
  getSavedBookings,
  saveBookings,
  getSavedSettings,
  saveSettings,
} from "./lib/storage";

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === "#admin" ? "admin" : "website";
  });

  // Persistent State across page reloads (via localStorage & Cloud Engine)
  const [menu, setMenuState] = useState(() => getSavedMenu());
  const [cart, setCart] = useState([]);
  const [orders, setOrdersState] = useState(() => getSavedOrders());
  const [bookings, setBookingsState] = useState(() => getSavedBookings());
  const [restaurantInfo, setRestaurantInfoState] = useState(() => getSavedSettings());

  // Wrappers to update state & persist immediately
  const setMenu = (newMenu) => {
    setMenuState(newMenu);
    saveMenu(newMenu);
  };

  const setOrders = (newOrders) => {
    setOrdersState(newOrders);
    saveOrders(newOrders);
  };

  const setBookings = (newBookings) => {
    setBookingsState(newBookings);
    saveBookings(newBookings);
  };

  const setRestaurantInfo = (newInfo) => {
    setRestaurantInfoState(newInfo);
    saveSettings(newInfo);
  };

  // Listen to hash changes in URL (e.g. localhost:5180/#admin)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#admin") {
        setCurrentView("admin");
      } else if (
        window.location.hash === "#website" ||
        window.location.hash === "#home" ||
        window.location.hash === ""
      ) {
        setCurrentView("website");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const switchToAdmin = () => {
    setCurrentView("admin");
    window.location.hash = "admin";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const switchToWebsite = () => {
    setCurrentView("website");
    window.location.hash = "home";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cart operations
  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handleUpdateCartQty = (id, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: newQty } : i)));
    }
  };

  const handlePlaceOrder = (newOrder) => {
    const updated = [newOrder, ...orders];
    setOrders(updated);
    setCart([]);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
  };

  const handleUpdateBooking = (bookingId, newStatus) => {
    const updated = bookings.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b));
    setBookings(updated);
  };

  return (
    <div className="min-h-screen relative font-body text-ink">
      {/* Floating Preview Switcher Toolbar with Nova SaaS branding */}
      <div className="fixed bottom-5 left-5 z-50 bg-slate-950/95 text-white backdrop-blur border border-slate-700/80 rounded-full shadow-2xl p-1.5 flex items-center gap-1.5">
        <button
          onClick={switchToWebsite}
          className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full transition ${
            currentView === "website"
              ? "bg-primary text-white shadow-sm"
              : "text-slate-300 hover:text-white"
          }`}
        >
          <Globe size={14} /> Website View
        </button>
        <button
          onClick={switchToAdmin}
          className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full transition ${
            currentView === "admin"
              ? "bg-amber-500 text-slate-950 shadow-sm"
              : "text-slate-300 hover:text-white"
          }`}
        >
          <SlidersHorizontal size={14} /> Nova POS & Admin
        </button>
        <span className="hidden sm:inline-block border-l border-slate-700 pl-2 pr-1 text-[10px] text-amber-400 font-bold">
          Nova SaaS OS
        </span>
      </div>

      {currentView === "admin" ? (
        <AdminDashboard
          menu={menu}
          onUpdateMenu={setMenu}
          orders={orders}
          onPlaceOrder={handlePlaceOrder}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          bookings={bookings}
          onUpdateBooking={handleUpdateBooking}
          restaurantInfo={restaurantInfo}
          onUpdateRestaurantInfo={setRestaurantInfo}
          onSwitchToWebsite={switchToWebsite}
        />
      ) : (
        <Storefront
          menu={menu}
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateQty={handleUpdateCartQty}
          onOpenAdmin={switchToAdmin}
          onPlaceOrder={handlePlaceOrder}
        />
      )}
    </div>
  );
}
