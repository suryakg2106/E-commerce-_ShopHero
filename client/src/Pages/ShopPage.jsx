import React, { useEffect, useState } from "react";
import { getAllProducts } from "../Service/Productservice";
import { useNavigate } from "react-router-dom";
import OfferStrip from "../Component/ShopeHeroBanner";


const categories = [
  "Shoes",
  "Mobile",
  "Laptop",
  "Clothes",
  "Accessories",
  "Electronics",
];

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    price: "",
    rating: "",
    sort: "",
  });
  const navigate = useNavigate();


  // 🔹 Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    const res = await getAllProducts(filters);
    if (res?.Success) {
      setProducts(res.Products);
    } else {
      setProducts([]);
    }
    setLoading(false);
  };

  // 🔹 Call API when filters change
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <div className="bg-gray-100 px-8 py-10">
      <OfferStrip/>
      <div className="flex gap-8">

        {/* Sidebar */}
        <aside className="w-[260px] bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>

          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => setFilters({ ...filters, category: cat })}
                className={`px-3 py-2 rounded-lg cursor-pointer ${
                  filters.category === cat
                    ? "bg-red-100 text-red-500 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>

          {/* Deals */}
          <div className="mt-8 bg-gradient-to-br from-red-500 to-red-400 text-white p-5 rounded-2xl text-center">
            <h2 className="text-2xl font-bold">Up to 50% OFF</h2>
            <p className="text-sm mt-1">Deals & Offers</p>
            <button className="mt-3 bg-white text-red-500 px-4 py-2 rounded-lg text-sm font-semibold">
              View Offers
            </button>
          </div>
        </aside>

        {/* Right Content */}
        <section className="flex-1">

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <select
              className="px-4 py-2 rounded-lg border"
              onChange={(e) =>
                setFilters({ ...filters, price: e.target.value })
              }
            >
              <option value="">Price</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>

            <select
              className="px-4 py-2 rounded-lg border"
              onChange={(e) =>
                setFilters({ ...filters, rating: e.target.value })
              }
            >
              <option value="">Rating</option>
              <option value="4">4★ & above</option>
              <option value="3">3★ & above</option>
            </select>

            <select
              className="px-4 py-2 rounded-lg border"
              onChange={(e) =>
                setFilters({ ...filters, sort: e.target.value })
              }
            >
              <option value="">Sort by</option>
              <option value="newest">Newest</option>
              <option value="popular">Popularity</option>
            </select>
          </div>

          {/* Products */}
          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">No products found</p>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {products.map((item) => (
                
                <div
                  key={item._id}
                  className="bg-white rounded-2xl p-4 shadow hover:-translate-y-1 transition"
                 onClick={() => navigate(`/product/${item._id}`)}>
                  <img
  src={item.images?.[0]?.url || "https://via.placeholder.com/300"}
  alt={item.name}
  className="rounded-xl mb-3 h-40 w-full object-contain"
/>
                 <p className="text-xs text-gray-400">{item.category}</p>

<h4 className="text-sm font-semibold mt-1 line-clamp-2">
  {item.name}
</h4>

<span className="text-green-600 font-bold text-lg">
  ₹{item.discountPrice || item.price}
</span>

{item.discountPrice && (
  <span className="text-gray-400 line-through ml-2 text-sm">
    ₹{item.price}
  </span>
)}

                  <button className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl text-sm font-medium">
                    Add Cart
                  </button>
                </div>
              ))}
            </div>
          )}

        </section>
      </div>
      
    </div>
  );
};

export default ShopPage;
