import { useState, useMemo } from "react";
import {
  Sparkles,
  Search,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Upload,
  Image as ImageIcon,
  Flame,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Eye,
  Wand2,
  AlertCircle,
} from "lucide-react";

export default function MenuAdmin({ menu, onUpdateMenu }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [aiStudioItem, setAiStudioItem] = useState(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiStyle, setAiStyle] = useState("Authentic Clay Pot Plating");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPreviewUrl, setGeneratedPreviewUrl] = useState(null);

  // New Item State
  const [newItem, setNewItem] = useState({
    name: "",
    category: menu[0]?.category || "Non-Veg Biryani",
    price: "",
    veg: false,
    description: "",
    image_url: "/menu_images/062_chicken_65.webp",
    is_bestseller: false,
  });

  const categories = useMemo(() => {
    const set = new Set(menu.map((i) => i.category));
    return ["All", ...Array.from(set)];
  }, [menu]);

  const filteredMenu = useMemo(() => {
    return menu.filter((item) => {
      const matchCat = selectedCategory === "All" || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [menu, selectedCategory, searchQuery]);

  // Handle price update
  const handlePriceChange = (id, newPrice) => {
    const updated = menu.map((item) =>
      item.id === id ? { ...item, price: Number(newPrice) || item.price } : item
    );
    onUpdateMenu(updated);
  };

  // Handle availability toggle
  const handleToggleAvailable = (id) => {
    const updated = menu.map((item) =>
      item.id === id ? { ...item, available: !item.available } : item
    );
    onUpdateMenu(updated);
  };

  // Handle bestseller toggle
  const handleToggleBestseller = (id) => {
    const updated = menu.map((item) =>
      item.id === id ? { ...item, is_bestseller: !item.is_bestseller } : item
    );
    onUpdateMenu(updated);
  };

  // Handle delete item
  const handleDeleteItem = (id, name) => {
    if (confirm(`Remove "${name}" from the menu?`)) {
      const updated = menu.filter((item) => item.id !== id);
      onUpdateMenu(updated);
    }
  };

  // Handle add item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name.trim() || !newItem.price) return;

    const itemToAdd = {
      id: "item-" + Date.now(),
      name: newItem.name.trim(),
      category: newItem.category,
      price: Number(newItem.price),
      veg: newItem.veg,
      description: newItem.description.trim() || `${newItem.name} prepared fresh with signature spices.`,
      image_url: newItem.image_url,
      is_bestseller: newItem.is_bestseller,
      available: true,
      station: "kitchen",
    };

    onUpdateMenu([...menu, itemToAdd]);
    setShowAddModal(false);
    setNewItem({
      name: "",
      category: menu[0]?.category || "Non-Veg Biryani",
      price: "",
      veg: false,
      description: "",
      image_url: "/menu_images/062_chicken_65.webp",
      is_bestseller: false,
    });
  };

  // Open AI Studio for a specific dish
  const openAiStudio = (item) => {
    setAiStudioItem(item);
    setAiPrompt(
      `A mouth-watering high-resolution commercial culinary photograph of authentic ${item.name}, served hot in traditional restaurant tableware, garnished with fresh coriander and crispy fried onions, natural dramatic lighting, 45-degree angle shot.`
    );
    setGeneratedPreviewUrl(item.image_url);
  };

  // Simulate AI image generation / cycling to realistic photographic variants
  const handleGenerateAiImage = () => {
    setIsGenerating(true);

    // List of curated high-quality culinary image assets
    const samplePool = [
      "/menu_images/062_chicken_65.webp",
      "/menu_images/107_mutton_biryani.webp",
      "/menu_images/031_prawns_fried_rice.webp",
      "/menu_images/014_mushroom_fried_rice.webp",
      "/menu_images/018_paneer_fried_rice.webp",
      "/menu_images/041_chilli_paneer.webp",
      "/menu_images/082_butter_chicken.webp",
      "/menu_images/091_paneer_butter_masala.webp",
      "/menu_images/133_masala_dosa.webp",
      "/menu_images/070_chicken_majestic.webp",
      "/menu_images/085_kaju_chicken.webp",
      "/menu_images/042_paneer_65.webp",
    ];

    setTimeout(() => {
      const randomImg = samplePool[Math.floor(Math.random() * samplePool.length)];
      setGeneratedPreviewUrl(randomImg);
      setIsGenerating(false);
    }, 1200);
  };

  // Apply generated AI image to dish
  const handleApplyAiImage = () => {
    if (!aiStudioItem || !generatedPreviewUrl) return;
    const updated = menu.map((item) =>
      item.id === aiStudioItem.id ? { ...item, image_url: generatedPreviewUrl } : item
    );
    onUpdateMenu(updated);
    setAiStudioItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
            Menu Management & AI Food Studio
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Manage pricing, dish availability, and generate custom AI food photography for your dishes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-primary/20 transition"
          >
            <Plus size={16} /> Add New Dish
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/70 border border-slate-800 p-3.5 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-primary"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat} ({cat === "All" ? menu.length : menu.filter((i) => i.category === cat).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Items Table / Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMenu.map((item) => (
          <div
            key={item.id}
            className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition space-y-3"
          >
            <div className="flex gap-3">
              {/* Dish Photo with AI generate trigger button */}
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 group">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80";
                  }}
                />
                <button
                  onClick={() => openAiStudio(item)}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[10px] text-amber-300 font-bold transition backdrop-blur-xs"
                  title="Generate with AI"
                >
                  <Sparkles size={16} />
                  <span>AI Gen</span>
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      item.veg ? "bg-emerald-400" : "bg-red-400"
                    }`}
                  ></span>
                  <p className="font-bold text-sm text-white truncate">{item.name}</p>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1">
                <span className="text-xs text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  defaultValue={item.price}
                  onBlur={(e) => handlePriceChange(item.id, e.target.value)}
                  className="w-14 bg-transparent text-xs font-bold text-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAiStudio(item)}
                  className="flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-bold px-2.5 py-1 rounded-lg transition"
                >
                  <Wand2 size={12} /> AI Photo
                </button>

                <button
                  onClick={() => handleToggleAvailable(item.id)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition ${
                    item.available
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {item.available ? "In Stock" : "Sold Out"}
                </button>

                <button
                  onClick={() => handleDeleteItem(item.id, item.name)}
                  className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI FOOD PHOTOGRAPHY STUDIO MODAL */}
      {aiStudioItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-primary flex items-center justify-center text-white">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    AI Food Photo Studio
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold">{aiStudioItem.name}</p>
                </div>
              </div>
              <button
                onClick={() => setAiStudioItem(null)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Preview Box */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Generated AI Dish Preview
                </label>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                  {isGenerating ? (
                    <div className="text-center p-4">
                      <RefreshCw size={32} className="animate-spin text-amber-400 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-200">Generating with Vertex AI...</p>
                      <p className="text-[11px] text-slate-500 mt-1">Applying culinary lighting & textures</p>
                    </div>
                  ) : (
                    <img
                      src={generatedPreviewUrl}
                      alt="AI generated preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <span className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur text-[10px] text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30">
                    600x600 WebP Optimized
                  </span>
                </div>
              </div>

              {/* AI Controls */}
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Plating & Atmosphere Preset
                    </label>
                    <select
                      value={aiStyle}
                      onChange={(e) => {
                        setAiStyle(e.target.value);
                        setAiPrompt(
                          `A mouth-watering high-resolution commercial culinary photograph of authentic ${aiStudioItem.name}, style ${e.target.value}, served hot in traditional restaurant tableware, natural dramatic lighting, 45-degree angle shot.`
                        );
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                    >
                      <option value="Authentic Clay Pot Plating">Authentic Clay Pot Plating</option>
                      <option value="Sizzling Hot Smoke & Garnished Herbs">Sizzling Hot Smoke & Garnished Herbs</option>
                      <option value="Royal Andhra Bamboo Platter">Royal Andhra Bamboo Platter</option>
                      <option value="Warm Sunlit Wooden Rustic Table">Warm Sunlit Wooden Rustic Table</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Detailed AI Prompt
                    </label>
                    <textarea
                      rows={4}
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleGenerateAiImage}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:brightness-105 text-slate-950 font-black text-xs py-2.5 rounded-xl shadow-lg transition flex items-center justify-center gap-1.5"
                  >
                    <Sparkles size={14} /> {isGenerating ? "Rendering Photo..." : "Generate New AI Image"}
                  </button>

                  <button
                    onClick={handleApplyAiImage}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-xs py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 size={14} /> Save & Apply to Live Menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW DISH MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="font-display font-bold text-base text-white">Add New Menu Dish</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bamboo Chicken Fry"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    {categories.filter((c) => c !== "All").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    required
                    placeholder="280"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Special Lambasinghi spices, fresh herbs..."
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newItem.veg}
                    onChange={(e) => setNewItem({ ...newItem, veg: e.target.checked })}
                    className="rounded text-primary focus:ring-0"
                  />
                  <span className="text-slate-300 font-medium">Pure Veg</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newItem.is_bestseller}
                    onChange={(e) => setNewItem({ ...newItem, is_bestseller: e.target.checked })}
                    className="rounded text-primary focus:ring-0"
                  />
                  <span className="text-amber-400 font-medium">Bestseller</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white font-bold px-5 py-2 rounded-xl shadow-md transition"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
