import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAllProducts } from "../Service/Productservice";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      const res = await getAllProducts({ search: query });
      if (res?.Success) {
        setProducts(res.Products);
      }
      setLoading(false);
    };

    if (query) fetchSearch();
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Searching products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-6">

        {/* 🔍 Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Search results for{" "}
          <span className="text-red-500">"{query}"</span>
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500 mt-10 text-center">
            No products found 😕
          </p>
        ) : (
          <div className="space-y-6">
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="group flex gap-6 bg-gray-300 border rounded-2xl p-5
                hover:shadow-xl transition cursor-pointer"
              >
                {/* 🖼 Image */}
                <div className="w-36 h-36 bg-gray-50 rounded-xl flex items-center justify-center shadow-inner">
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="h-28 object-contain group-hover:scale-105 transition"
                  />
                </div>

                {/* ℹ️ Info */}
                <div className="flex-1 flex flex-col justify-between">

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {product.category} • {product.brand}
                    </p>

                    {/* 💰 Price */}
                    <div className="mt-3 flex items-center gap-3">
                      {product.discountPrice ? (
                        <>
                          <span className="text-xl font-bold text-green-600">
                            ₹{product.discountPrice}
                          </span>
                          <span className="line-through text-gray-400 text-sm">
                            ₹{product.price}
                          </span>
                          <span className="text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full">
                            SALE
                          </span>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-green-600">
                          ₹{product.price}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 🔘 Actions */}
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Add to cart", product._id);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white
                      px-6 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product._id}`);
                      }}
                      className="border border-red-500 text-red-500
                      hover:bg-red-50 px-6 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
