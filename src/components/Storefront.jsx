import { useState, useMemo, useEffect } from "react";
import {
  ShoppingBag,
  Plus,
  Minus,
  Search,
  Truck,
  Sparkles,
  Clock,
  X,
  Phone,
  MapPin,
  Flame,
  Star,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Utensils,
  Share2,
  HelpCircle,
  Coffee,
  Heart,
} from "lucide-react";
import restaurant from "../data/restaurant";

const HERO_SLIDES = [
  {
    id: 1,
    image: "/hero_slides/slide1_bamboo_chicken.jpg",
    badge: "🔥 Lambasinghi Special",
    heading: "Firewood Roasted Bamboo Chicken & Tribal Cuisine",
    subheading: "Authentic country chicken slow-roasted in fresh hill bamboo stalks over firewood embers amidst misty pine hills.",
  },
  {
    id: 2,
    image: "/hero_slides/slide2_dum_biryani.jpg",
    badge: "👑 Royal Dum Handi",
    heading: "Authentic Flavourful Biryanis & Hot Andhra Delicacies",
    subheading: "From royal France Prawns Biryani to Mutton Dum Handi — prepared fresh daily for tourists and food connoisseurs.",
  },
  {
    id: 3,
    image: "/hero_slides/slide3_starters_patio.jpg",
    badge: "🌿 Mountain Mist Dining",
    heading: "Sizzling Andhra Starters on Fresh Banana Leaf",
    subheading: "Crispy Chicken 65, Chicken Lollipops, and Chilli Paneer served hot in our scenic garden gazebo dining area.",
  },
  {
    id: 4,
    image: "/hero_slides/slide4_morning_tiffins.jpg",
    badge: "☕ Araku Sunrise Breakfast",
    heading: "Steaming Ghee Dosa & Fresh Filter Coffee",
    subheading: "Start your Lambasinghi morning with crispy Ghee Karam Dosa, soft Idlis, hot Sambar Vadas and fresh filter coffee.",
  },
];

export default function Storefront({
  menu,
  cart,
  onAddToCart,
  onUpdateQty,
  onOpenAdmin,
  onPlaceOrder,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dietFilter, setDietFilter] = useState("all"); // 'all', 'veg', 'nonveg', 'bestseller'
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [orderType, setOrderType] = useState("dine-in"); // 'dine-in', 'takeaway', 'delivery'
  const [selectedTable, setSelectedTable] = useState("Table 1");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Auto-advance hero slides every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(menu.map((i) => i.category));
    return ["All", ...Array.from(set)];
  }, [menu]);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return menu.filter((item) => {
      const matchCat = selectedCategory === "All" || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDiet =
        dietFilter === "all"
          ? true
          : dietFilter === "veg"
          ? item.veg
          : dietFilter === "nonveg"
          ? !item.veg
          : item.is_bestseller;
      return matchCat && matchSearch && matchDiet;
    });
  }, [menu, selectedCategory, searchQuery, dietFilter]);

  // Cart calculations
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gstAmount = Math.round(cartSubtotal * 0.05);
  const deliveryCharge = orderType === "delivery" ? (cartSubtotal >= 499 ? 0 : 40) : 0;
  const grandTotal = cartSubtotal + gstAmount + deliveryCharge;

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!customerName || !customerPhone) {
      alert("Please provide your name and contact phone number.");
      return;
    }

    const newOrder = {
      id: "RC-" + Math.floor(1000 + Math.random() * 9000),
      customer: customerName,
      phone: customerPhone,
      type: orderType === "dine-in" ? `Dine-In (${selectedTable})` : orderType === "delivery" ? "Home Delivery" : "Takeaway / Parcel",
      items: [...cart],
      total: grandTotal,
      subtotal: cartSubtotal,
      gst: gstAmount,
      status: "Pending",
      paymentStatus: "Pending",
      time: "Just now",
    };

    onPlaceOrder && onPlaceOrder(newOrder);
    setOrderSuccess(newOrder);
    setCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-body selection:bg-primary selection:text-white">
      {/* Top Lambasinghi Tourist Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-primary to-orange-600 text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2 shadow-inner">
        <Sparkles size={14} className="animate-spin" />
        <span>Fresh Lambasinghi Country Specials & Dum Biryanis Hot All Day! Free Delivery on orders above ₹499.</span>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur border-b border-slate-800/80 px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src="/branding/rc_logo.jpg"
              alt="RC Family Restaurant"
              className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-md shadow-amber-500/25 group-hover:scale-105 transition"
            />
            <div>
              <span className="font-display font-extrabold text-base sm:text-lg text-white tracking-wide group-hover:text-amber-400 transition block leading-tight">
                {restaurant.name}
              </span>
              <p className="text-[11px] text-amber-400 font-medium flex items-center gap-1">
                <MapPin size={11} /> Lambasinghi, ASR District
              </p>
            </div>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAdmin}
            className="hidden sm:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold transition shadow-sm"
          >
            <ShieldCheck size={15} /> Admin Portal
          </button>

          <a
            href={`tel:${restaurant.phones[0]}`}
            className="hidden md:flex items-center gap-1.5 bg-slate-900 border border-slate-700 text-slate-200 hover:text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition"
          >
            <Phone size={14} className="text-emerald-400" /> {restaurant.phones[0]}
          </a>

          {/* Cart Icon Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-gradient-to-r from-primary to-orange-600 hover:brightness-110 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/25 transition active:scale-95"
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">My Tray</span>
            {cartItemCount > 0 && (
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full shadow-sm animate-bounce">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 4K Hero Carousel Slider Section */}
      <section className="relative overflow-hidden min-h-[540px] sm:min-h-[600px] flex items-center justify-center border-b border-slate-800">
        {/* Background Image Slides with Ken-Burns Zoom Transition */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100 z-0" : "opacity-0 scale-105 pointer-events-none -z-10"
            }`}
            style={{ transitionProperty: "opacity, transform" }}
          >
            <img
              src={slide.image}
              alt={slide.heading}
              className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.08]"
            />
          </div>
        ))}

        {/* Dark Vignette & Gradient Overlays for High Contrast Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40 z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)] z-10"></div>

        {/* Left / Right Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/60 hover:bg-slate-900 border border-slate-700/80 text-white backdrop-blur-md flex items-center justify-center transition shadow-xl hover:scale-105 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/60 hover:bg-slate-900 border border-slate-700/80 text-white backdrop-blur-md flex items-center justify-center transition shadow-xl hover:scale-105 active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Hero Content Overlay */}
        <div className="max-w-5xl mx-auto text-center relative z-20 px-4 py-12 sm:py-16">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-4 shadow-lg shadow-amber-500/10 animate-fade-in">
            <Flame size={15} className="text-amber-400" />
            {HERO_SLIDES[currentSlide].badge}
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-2xl">
            {HERO_SLIDES[currentSlide].heading}
          </h1>

          <p className="text-slate-200 max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-relaxed drop-shadow-md font-medium">
            {HERO_SLIDES[currentSlide].subheading}
          </p>

          {/* Order Type Toggle in Hero */}
          <div className="mt-8 inline-flex p-1.5 bg-slate-950/90 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl">
            <button
              onClick={() => setOrderType("dine-in")}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                orderType === "dine-in"
                  ? "bg-primary text-white shadow-md shadow-primary/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              🍽️ Dine-In (Table Order)
            </button>
            <button
              onClick={() => setOrderType("takeaway")}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                orderType === "takeaway"
                  ? "bg-primary text-white shadow-md shadow-primary/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              🛍️ Takeaway / Parcel
            </button>
            <button
              onClick={() => setOrderType("delivery")}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                orderType === "delivery"
                  ? "bg-primary text-white shadow-md shadow-primary/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              🛵 Local Delivery
            </button>
          </div>

          {orderType === "dine-in" && (
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-300">
              <span className="font-semibold">Ordering at Table:</span>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="bg-slate-900/90 border border-slate-700 text-amber-400 font-bold text-xs rounded-lg px-3 py-1 focus:outline-none"
              >
                {[
                  "Table 1 (Front Hall)",
                  "Table 2 (Window View)",
                  "Table 3 (Family Section)",
                  "Table 4 (Garden Gazebo)",
                  "Table 5 (Misty Veranda)",
                  "Table 6 (Pine View Cabin)",
                  "Gazebo 1 (VIP Open Air)",
                  "Gazebo 2 (VIP Open Air)",
                ].map((tbl) => (
                  <option key={tbl} value={tbl}>
                    {tbl}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Slider Dot Indicators */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "w-8 bg-amber-400 shadow-md shadow-amber-400/50"
                    : "w-2.5 bg-slate-600/80 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Menu Ordering Area */}
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* Search and Dietary Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-sm">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Biryani, 65, Paneer)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Diet Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              onClick={() => setDietFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                dietFilter === "all"
                  ? "bg-slate-700 text-white"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              All Items ({menu.length})
            </button>
            <button
              onClick={() => setDietFilter("veg")}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                dietFilter === "veg"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-950 text-emerald-400 hover:bg-emerald-950/40 border border-emerald-500/30"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Pure Veg
            </button>
            <button
              onClick={() => setDietFilter("nonveg")}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                dietFilter === "nonveg"
                  ? "bg-red-600 text-white"
                  : "bg-slate-950 text-red-400 hover:bg-red-950/40 border border-red-500/30"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500"></span> Non-Veg
            </button>
            <button
              onClick={() => setDietFilter("bestseller")}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                dietFilter === "bestseller"
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-950 text-amber-400 hover:bg-amber-950/40 border border-amber-500/30"
              }`}
            >
              <Star size={12} className="fill-amber-400" /> Bestsellers
            </button>
          </div>
        </div>

        {/* Category Filter Chips Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const count = cat === "All" ? menu.length : menu.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
                  selectedCategory === cat
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                    : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700"
                }`}
              >
                {cat} <span className="opacity-60 text-[11px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Food Dish Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const inCart = cart.find((i) => i.id === item.id);
            return (
              <div
                key={item.id}
                className="bg-slate-900/70 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col group"
              >
                {/* Food Image with Veg/Non-Veg & Bestseller badge */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {item.veg ? (
                      <span className="bg-slate-950/80 backdrop-blur text-emerald-400 border border-emerald-500/40 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> VEG
                      </span>
                    ) : (
                      <span className="bg-slate-950/80 backdrop-blur text-red-400 border border-red-500/40 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> NON-VEG
                      </span>
                    )}

                    {item.is_bestseller && (
                      <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                        <Flame size={10} /> BESTSELLER
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur px-3 py-1 rounded-lg border border-slate-800 text-white font-mono font-bold text-sm shadow">
                    ₹{item.price}
                  </div>
                </div>

                {/* Dish Info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-display font-bold text-base text-white group-hover:text-amber-400 transition">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Add to Cart Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <span className="text-xs text-slate-400 font-medium">
                      Category: <span className="text-slate-200">{item.category}</span>
                    </span>

                    {inCart ? (
                      <div className="flex items-center gap-2 bg-slate-950 border border-primary/50 rounded-xl p-1 shadow-inner">
                        <button
                          onClick={() => onUpdateQty(item.id, inCart.qty - 1)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold text-xs text-amber-400 w-4 text-center">
                          {inCart.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, inCart.qty + 1)}
                          className="w-7 h-7 rounded-lg bg-primary hover:bg-primary/90 text-white flex items-center justify-center transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToCart(item)}
                        className="flex items-center gap-1.5 bg-slate-800 hover:bg-primary text-slate-200 hover:text-white text-xs font-bold px-3.5 py-1.5 rounded-xl border border-slate-700 hover:border-primary transition shadow-sm active:scale-95"
                      >
                        <Plus size={14} /> ADD
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800">
            <Utensils size={40} className="mx-auto text-slate-600 mb-3" />
            <p className="text-slate-300 font-bold text-lg">No dishes found</p>
            <p className="text-slate-500 text-xs mt-1">Try changing your search query or selected category.</p>
          </div>
        )}
      </main>

      {/* Tourist FAQ & Location Section */}
      <section className="bg-slate-900/60 border-t border-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
              <HelpCircle size={16} /> Frequently Asked Questions
            </div>
            <h2 className="text-2xl font-bold font-display text-white mb-6">
              Dining in Lambasinghi
            </h2>

            <div className="space-y-3 text-sm">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <p className="font-bold text-white mb-1">What is France Biryani?</p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  France Biryani is our specialty Lambasinghi recipe prepared with succulent coastal prawns cooked in rich spicy dum masala.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <p className="font-bold text-white mb-1">Do you cater to tourist tour buses and large families?</p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Yes! We have spacious family seating and garden gazebos. You can book a table in advance or order bulk parcels.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <p className="font-bold text-white mb-1">What are your operating hours?</p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  We open early at 7:00 AM for steaming hot Andhra Tiffins (Dosa, Idli, Puri) and serve till 10:30 PM for dinner.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
              <MapPin size={16} /> Reach Us
            </div>
            <h2 className="text-2xl font-bold font-display text-white mb-6">
              Visit RC Family Restaurant
            </h2>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Location Address</p>
                <p className="text-sm font-semibold text-white mt-1">
                  {restaurant.address}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Direct Phone Lines</p>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {restaurant.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="text-xs bg-slate-900 border border-slate-700 hover:border-amber-400 px-3 py-1.5 rounded-lg text-amber-400 font-bold transition flex items-center gap-1.5"
                    >
                      <Phone size={13} /> {phone}
                    </a>
                  ))}
                </div>
              </div>

              <a
                href={restaurant.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-md shadow-primary/20"
              >
                <MapPin size={16} /> Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Powered by Nova SaaS Footer Branding */}
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} {restaurant.name}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <span className="bg-slate-900 border border-amber-500/30 text-amber-400 px-2.5 py-0.5 rounded-full font-bold text-[11px] shadow-sm">
              Nova SaaS Restaurant Tech
            </span>
          </div>
        </div>
      </section>

      {/* Slide-Out Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="bg-slate-950 border-l border-slate-800 w-full max-w-md h-full flex flex-col p-6 shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-primary" size={20} />
                <h3 className="font-display font-bold text-lg text-white">Your Food Tray</h3>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                  {cartItemCount} items
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between gap-3"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover bg-slate-950 shrink-0"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{item.name}</p>
                    <p className="text-xs text-slate-400">₹{item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1">
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty - 1)}
                      className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="font-bold text-xs text-amber-400 w-3 text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                      className="w-6 h-6 rounded-lg bg-primary hover:bg-primary/90 text-white flex items-center justify-center"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))}

              {cart.length === 0 && (
                <div className="text-center py-16 text-slate-500">
                  <ShoppingBag size={48} className="mx-auto mb-2 opacity-40" />
                  <p className="font-bold text-sm">Your tray is empty</p>
                  <p className="text-xs mt-1">Add some hot biryanis or starters from the menu!</p>
                </div>
              )}
            </div>

            {/* Checkout Form & Billing Summary */}
            {cart.length > 0 && (
              <form onSubmit={handleCheckout} className="border-t border-slate-800 pt-4 mt-4 space-y-4">
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name (e.g. Rajesh Kumar)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (e.g. 98480 12345)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="bg-slate-900/80 rounded-xl p-3 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Item Subtotal</span>
                    <span className="font-mono">₹{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>GST (5%)</span>
                    <span className="font-mono">₹{gstAmount}</span>
                  </div>
                  {orderType === "delivery" && (
                    <div className="flex justify-between text-slate-400">
                      <span>Delivery Fee</span>
                      <span className="font-mono">{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span>
                    </div>
                  )}
                  <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-sm text-white">
                    <span>Grand Total</span>
                    <span className="text-emerald-400 font-mono">₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-orange-600 hover:brightness-105 text-white font-bold text-sm py-3 rounded-xl shadow-xl shadow-primary/25 transition"
                >
                  Confirm & Place Order (₹{grandTotal})
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 text-center shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-display font-bold text-xl text-white">Order Received!</h3>
            <p className="text-xs text-slate-400 mt-1">
              Order ID: <span className="font-mono font-bold text-amber-400">{orderSuccess.id}</span>
            </p>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Thank you <span className="font-bold text-white">{orderSuccess.customer}</span>! Your order has been dispatched to our kitchen and is being freshly prepared for {orderSuccess.type}.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setOrderSuccess(null)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-xl transition"
              >
                Back to Menu
              </button>
              <button
                onClick={() => {
                  setOrderSuccess(null);
                  onOpenAdmin && onOpenAdmin();
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold text-xs py-2.5 rounded-xl transition shadow-md"
              >
                View in Admin POS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
