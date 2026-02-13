import React, { useEffect, useState } from "react";
import { fetchCart, handleAddToCart } from "../Service/AddCartService";
import { useNavigate } from "react-router-dom";

const GoCartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const updateQuantity = async (product, quantityChange) => {
    await handleAddToCart(product, quantityChange);
    const data = await fetchCart();
    setCart(data?.cart?.items || []);
  };

  useEffect(() => {
    const loadCart = async () => {
      const data = await fetchCart();
      setCart(data?.cart?.items || []);
    };
    loadCart();
  }, []);

  // 🔥 Calculate Summary
  const summary = cart.reduce(
    (acc, item) => {
      const originalPrice = item.productId?.price || item.priceAtTime;
      const finalPrice =
        item.productId?.discountPrice || item.priceAtTime;

      acc.subtotal += originalPrice * item.quantity;
      acc.total += finalPrice * item.quantity;
      acc.saved += (originalPrice - finalPrice) * item.quantity;

      return acc;
    },
    { subtotal: 0, total: 0, saved: 0 }
  );

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          🛒 Shopping Cart
        </h2>

        {cart.length === 0 ? (
          <div className="bg-white p-10 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-4">
              Your cart is empty
            </h3>
            <button
              onClick={() => navigate("/")}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">

            {/* 🛍️ Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {cart.map((item, index) => {
                const originalPrice = item.productId?.price;
                const discountPrice = item.productId?.discountPrice;
                const finalPrice =
                  discountPrice || item.priceAtTime;

                return (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-lg shadow flex items-center justify-between"
                  >
                    <div className="flex items-center gap-6 hover:cursor-pointer hover:bg-gray-100 transition rounded-lg p-2">

                      <img
                        onClick={() =>
                          navigate(`/product/${item.productId?._id}`)
                        }
                        src={`http://localhost:4000${item.productId?.images?.[0]?.url}`}
                        alt=""
                        className="w-24 h-24 object-contain rounded"
                      />

                      <div>
                        <h3
                          onClick={() =>
                            navigate(`/product/${item.productId?._id}`)
                          }
                          className="font-semibold text-lg"
                        >
                          {item.productId?.name}
                        </h3>

                        {/* 🔥 Price Section */}
                        <div className="flex items-center gap-2 mt-1">
                          {discountPrice ? (
                            <>
                              <span className="text-red-600 font-semibold">
                                ₹{discountPrice}
                              </span>
                              <span className="text-sm line-through text-gray-400">
                                ₹{originalPrice}
                              </span>
                            </>
                          ) : (
                            <span className="text-gray-700 font-semibold">
                              ₹{item.priceAtTime}
                            </span>
                          )}
                        </div>

                        {/* Quantity */}
                        <div className="mt-3 flex items-center border border-red-500 rounded-md w-fit">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, -1)
                            }
                            className="px-3 py-1 text-red-600 font-bold hover:bg-red-50"
                          >
                            −
                          </button>

                          <span className="px-4">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(item.productId, 1)
                            }
                            className="px-3 py-1 text-red-600 font-bold hover:bg-red-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-lg font-semibold text-gray-700">
                      ₹{item.quantity * finalPrice}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 💰 Order Summary */}
            <div className="bg-white p-6 rounded-xl shadow-lg h-fit border">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                Order Summary
              </h3>

              <div className="flex justify-between mb-3 text-gray-600">
                <span>Subtotal</span>
                <span>₹{summary.subtotal}</span>
              </div>

              {summary.saved > 0 && (
                <div className="flex justify-between mb-3 text-green-600 font-medium">
                  <span>You Saved</span>
                  <span>- ₹{summary.saved}</span>
                </div>
              )}

              <div className="flex justify-between mb-3">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>₹{summary.total}</span>
              </div>

              {summary.saved > 0 && (
                <p className="mt-4 text-sm text-green-600 font-semibold">
                  🎉 You are saving ₹{summary.saved} on this order!
                </p>
              )}

              <button className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition">
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default GoCartPage;
