// Local Storage Persistence Layer for RC Family Restaurant (Nova SaaS Engine)
import initialMenu from "../data/menu";
import initialRestaurant from "../data/restaurant";

const STORAGE_KEYS = {
  MENU: "rc_restaurant_menu",
  ORDERS: "rc_restaurant_orders",
  BOOKINGS: "rc_restaurant_bookings",
  SETTINGS: "rc_restaurant_settings",
};

// Initial default orders if none exist in localStorage
const DEFAULT_ORDERS = [
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
    subtotal: 980,
    gst: 49,
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
    subtotal: 650,
    gst: 32,
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
    subtotal: 600,
    gst: 30,
    status: "Completed",
    paymentStatus: "Paid (Card)",
  },
];

const DEFAULT_BOOKINGS = [
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
];

export function getSavedMenu() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.MENU);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn("Error reading saved menu:", e);
  }
  return initialMenu;
}

export function saveMenu(menu) {
  try {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menu));
  } catch (e) {
    console.error("Error saving menu:", e);
  }
}

export function getSavedOrders() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn("Error reading saved orders:", e);
  }
  return DEFAULT_ORDERS;
}

export function saveOrders(orders) {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch (e) {
    console.error("Error saving orders:", e);
  }
}

export function getSavedBookings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn("Error reading saved bookings:", e);
  }
  return DEFAULT_BOOKINGS;
}

export function saveBookings(bookings) {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  } catch (e) {
    console.error("Error saving bookings:", e);
  }
}

export function getSavedSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn("Error reading saved settings:", e);
  }
  return {
    ...initialRestaurant,
    isOpen: true,
    announcement: "Fresh Lambasinghi Country Specials & Dum Biryanis Hot All Day! Free Delivery on orders above ₹499.",
    taxRate: 5,
    deliveryFee: 40,
    freeDeliveryAbove: 499,
    gstin: "37AAECR1234F1Z5",
  };
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error("Error saving settings:", e);
  }
}
