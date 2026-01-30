import React, { useEffect, useState } from "react";
import { myProduct } from "../Service/Productservice";
import ProductCard from "../Component/ProductCard";

const MyProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const res = await myProduct();
        if (res?.success) {
          setProducts(res.products);
        }
      } catch (error) {
        console.error("MY PRODUCT ERROR 👉", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading your products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* 🔹 Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          My Products
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Products created by you
        </p>
      </div>

      {/* 🔹 Empty State */}
      {products.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          You haven’t added any products yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              showAddCart={false}   // 🔥 hide Add Cart
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProduct;
