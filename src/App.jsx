import { Phone } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import MenuSection from "./components/MenuSection";
import Location from "./components/Location";
import Footer from "./components/Footer";
import restaurant from "./data/restaurant";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <MenuSection />
      <Location />
      <Footer />

      <a
        href={`tel:${restaurant.phones[0]}`}
        className="md:hidden fixed bottom-5 right-5 z-50 bg-primary text-white rounded-full p-4 shadow-lg"
        aria-label="Call restaurant"
      >
        <Phone size={22} />
      </a>
    </div>
  );
}
