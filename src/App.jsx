import { useState, useEffect } from "react";
import { Globe, SlidersHorizontal } from "lucide-react";
import Storefront from "./components/Storefront";
import AdminDashboard from "./components/admin/AdminDashboard";
import initialMenu from "./data/menu";
import initialRestaurant from "./data/restaurant";

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === "#admin" ? "admin" : "website";
  });

  // Central State for Menu, Cart, Orders, Bookings, Restaurant Info
  const [menu, setMenu] = useState(initialMenu);
  const [cart, setCart] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState({
    ...initialRestaurant,
    isOpen: true,
    announcement: "Fresh Lambasinghi Country Specials & Dum Biryanis Hot All Day! Free Delivery on orders above ₹499.",
    taxRate: 5,
    deliveryFee: 40,
    freeDeliveryAbove: 499,
  });

  // Mock live orders
  const [orders, setOrders] = useState([
    {
      id: "ORD-1048",
      customer: "Suresh Kumar (Tourist)",
      phone: "+91 94401 23456",
      type: "Dine-In (Table 4)",
      time: "10 mins ago",
      items: [
        { id: "nb-1", name: "France Biryani (Prawns Special)", qty: 2, price: 350 },
        { id: "st-1", name: "Chicken 65", qty: 1, price: 280 },
      ],
      total: 1029,
      status: "Preparing",
      paymentStatus: "Paid (UPI)",
    },
    {
      id: "ORD-1047",
      customer: "Ananya Sharma (Araku Group)",
      phone: "+91 98850 11223",
      type: "Takeaway / Parcel",
      time: "25 mins ago",
      items: [
        { id: "vb-2", name: "Mushroom Biryani", qty: 2, price: 200 },
        { id: "vd-2", name: "Paneer 65", qty: 1, price: 250 },
      ],
      total: 682,
      status: "Ready",
      paymentStatus: "Paid (Cash)",
    },
    {
      id: "ORD-1046",
      customer: "Kiran Varma",
      phone: "+91 90001 88776",
      type: "Dine-In (Table 2)",
      time: "45 mins ago",
      items: [
        { id: "nb-2", name: "Mutton Biryani", qty: 1, price: 350 },
        { id: "st-5", name: "Garlic Chicken", qty: 1, price: 250 },
      ],
      total: 630,
      status: "Completed",
      paymentStatus: "Paid (Card)",
    },
  ]);

  // Mock Bookings
  const [bookings, setBookings] = useState([
    {
      id: "BK-301",
      name: "Dr. Vikram Reddy",
      phone: "+91 98490 55443",
      guests: 6,
      date: "Today, 8:30 PM",
      type: "Family Dinner",
      status: "Confirmed",
    },
    {
      id: "BK-302",
      name: "Pooja Hegde (Araku Group)",
      phone: "+91 97000 12349",
      guests: 12,
      date: "Tomorrow, 1:00 PM",
      type: "Tour Group Lunch",
      status: "Pending",
    },
    {
      id: "BK-303",
      name: "Chandra Sekhar",
      phone: "+91 99887 66554",
      guests: 4,
      date: "Tomorrow, 8:00 PM",
      type: "Dine-In Table",
      status: "Confirmed",
    },
  ]);

  // Listen to hash changes in URL
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#admin") {
        setCurrentView("admin");
      } else if (window.location.hash === "#website" || window.location.hash === "#home" || window.location.hash === "") {
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
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleUpdateBooking = (bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  return (
    <div className="min-h-screen relative font-body text-ink">
      {/* Floating Preview Switcher Toolbar for Localhost testing */}
      <div className="fixed bottom-5 left-5 z-50 bg-slate-950/90 text-white backdrop-blur border border-slate-700/80 rounded-full shadow-2xl p-1.5 flex items-center gap-1">
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
          <SlidersHorizontal size={14} /> Admin Dashboard
        </button>
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
