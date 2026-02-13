import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../Service/Productservice.js";
import { handleAddToCart } from "../Service/AddCartService.js";
import { fetchCart } from "../Service/AddCartService.js";
import  AuthContext  from "../Context/AuthContext.jsx";
import { useContext } from "react";





const ProductCard = ({ product, showAddCart = true, showThredot = false }) => {
  const images = product.images?.length
    ? product.images
    : [{ url: "https://via.placeholder.com/150" }];

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [qty, setQty] = useState(0);
  const { user } = useContext(AuthContext);


  useEffect(() => {
  const loadCart = async () => {
    try {
      const data = await fetchCart();
      

      if (data.cart.items
) {

        const item = data.cart.items.find(
          item => item.productId?._id === product._id
        );
     

        if (item) {
          setQty(item.quantity);
        } else {
          setQty(0);
        }
      }

    } catch (error) {
      console.log("Cart load error", error);
    }
  };

  loadCart();
}, [product._id]);

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

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure?")) return;

  try {
    await deleteProduct(id);
    alert("Product deleted");
    navigate("/dashboardL/");
  } catch (err) {
    alert("Delete failed",err);
  }
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

        {/* 🔹 THREE DOT (ONLY WHEN showThredot = true) */}
        {showThredot && (
          <div ref={menuRef} className="absolute top-2 right-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((prev) => !prev);
              }}
              className="bg-black/40 text-white w-7 h-7 rounded-full
              flex items-center justify-center"
            >
              ⋮
            </button>

            {menuOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 mt-2 w-28
                bg-white rounded-md shadow-lg border text-sm"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/edit/${product._id}`);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100"
                >
                  ✏️ Edit
                </button>

                <button
  onClick={(e) => {
    e.stopPropagation();
    setMenuOpen(false);
    handleDelete(product._id);
  }}
>
                  🗑 Delete
                </button>
              </div>
            )}
          </div>
        )}

        {/* 🔹 Left Arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
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
              e.stopPropagation();
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

        <p className="text-xs text-gray-500">{product.category}</p>

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

        {showAddCart && (
  <div className="mt-4 flex items-center justify-between">

    {/* 🔴 Before Adding */}
    {qty === 0 && (
      <>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQty(1);
            handleAddToCart(product, 1);
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition"
        >
          Add Cart
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!user) {
  navigate("/login");
} else {
  navigate("/cart");
}
          }}
          className="text-red-500 border border-red-500 px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-red-50 transition"
        >
          Go to Cart
        </button>
      </>
    )}

    {/* 🟢 After Adding */}
    {qty > 0 && (
      <>
        {/* Quantity Selector */}
        <div className="flex items-center border border-red-500 rounded-md overflow-hidden">

          <button
            onClick={(e) => {
              e.stopPropagation();
             if (qty > 1) {
  setQty(prev => prev - 1);
  handleAddToCart(product, -1);
} else {
  setQty(0); // hide quantity UI
  handleAddToCart(product, -1); // remove from DB
}
            }}
            className="px-3 py-1 text-red-600 font-bold hover:bg-red-50 transition"
            disabled={qty === 0}
          >
            −
          </button>

          <span className="px-4 text-sm font-semibold">
            {qty}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQty(prev => prev + 1);
              handleAddToCart(product, 1);
            }}
            className="px-3 py-1 text-red-600 font-bold hover:bg-red-50 transition"
          >
            +
          </button>

        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/cart");
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition"
        >
          Go to Cart →
        </button>
      </>
    )}

  </div>
)}

      </div>
    </div>
  );
};

export default ProductCard;
