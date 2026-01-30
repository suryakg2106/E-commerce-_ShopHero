import React from "react";

const categories = [
  { name: "Mobile", img: "📱", color: "from-blue-400 to-blue-600" },
  { name: "Laptop", img: "💻", color: "from-purple-400 to-purple-600" },
  { name: "Electronics", img: "🔌", color: "from-indigo-400 to-indigo-600" },
  { name: "Clothes", img: "👕", color: "from-pink-400 to-pink-600" },
  { name: "Shoes", img: "👟", color: "from-orange-400 to-orange-600" },
  { name: "Accessories", img: "⌚", color: "from-green-400 to-green-600" },
];

const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony"];

const CategoryFilterSection = ({ setCategory, setBrand, setSort }) => {
  return (
    <section className="bg-gradient-to-b from-gray-300 to-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setCategory(cat.name)}
              className="group relative rounded-2xl p-5 bg-white shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br ${cat.color}`}
              />

              <div className="relative z-10 text-center text-gray-800 group-hover:text-white">
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition">
                  {cat.img}
                </div>
                <p className="font-semibold">{cat.name}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Filters Box */}
        <div className="backdrop-blur-md bg-white/80 border border-gray-200 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center justify-between">

          {/* Brand */}
          <select
            onChange={(e) => setBrand(e.target.value)}
            className="w-full md:w-1/3 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
          >
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {/* Price Sort */}
          <select
            onChange={(e) => setSort(e.target.value)}
            className="w-full md:w-1/3 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>

          {/* Reset */}
          <button
            onClick={() => {
              setCategory("");
              setBrand("");
              setSort("");
            }}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl shadow-md transition"
          >
            Reset Filters
          </button>

        </div>
      </div>
    </section>
  );
};

export default CategoryFilterSection;
