import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, showAddCart = true }) => {
  const images = product.images?.length
    ? product.images
    : [{ url: "https://via.placeholder.com/150" }];

  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  // 🔹 Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  const prevImage = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrent((current + 1) % images.length);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="cursor-pointer bg-gray-300 rounded-xl border border-gray-500
      shadow-sm hover:shadow-lg transition duration-300 overflow-hidden group"
    >
      {/* 🔹 Image Carousel */}
      <div className="relative bg-stone-200 h-44 flex items-center justify-center">
        <img
          src={images[current].url}
          alt={product.name}
          className="h-36 object-contain transition duration-500"
        />

        {/* 🔹 Left Arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();   // 🔥 IMPORTANT
              prevImage();
            }}
            className="absolute left-2 bg-black/40 text-white w-7 h-7
            rounded-full flex items-center justify-center hover:bg-black/60"
          >
            ‹
          </button>
        )}

        {/* 🔹 Right Arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();   // 🔥 IMPORTANT
              nextImage();
            }}
            className="absolute right-2 bg-black/40 text-white w-7 h-7
            rounded-full flex items-center justify-center hover:bg-black/60"
          >
            ›
          </button>
        )}

        {/* 🔹 Rating Badge */}
        <span className="absolute top-2 left-2 bg-red-500 text-white
        text-[11px] px-2.5 py-0.5 rounded-full shadow">
          ⭐ {product.ratings} ({product.numOfReviews})
        </span>
      </div>

      {/* 🔹 Content */}
      <div className="p-4 space-y-1.5">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-red-600">
          {product.brand}
        </h4>

        <h3 className="text-base font-semibold text-gray-800 truncate">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500">
          {product.category}
        </p>

        {/* 🔹 Price */}
        <div className="flex items-center gap-2 mt-2">
          {product.discountPrice ? (
            <>
              <span className="text-lg font-bold text-green-600">
                ₹{product.discountPrice}
              </span>
              <span className="text-xs line-through text-gray-400">
                ₹{product.price}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-green-600">
              ₹{product.price}
            </span>
          )}
        </div>

        {/* 🔹 Add Cart Button */}
        {showAddCart && (
          <button
            onClick={(e) => {
              e.stopPropagation();   // 🔥 IMPORTANT
              // add to cart logic here
            }}
            className="w-full mt-3 bg-red-500 text-white py-2
            text-sm rounded-lg font-medium hover:bg-red-600 transition"
          >
            Add Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
