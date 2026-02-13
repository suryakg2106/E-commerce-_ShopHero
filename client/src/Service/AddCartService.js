import Api from "./Api.js";
import toast from "react-hot-toast";


// 🔥 Guest Cart
export const addToLocalCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const index = cart.findIndex(item => item._id === product._id);

  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

// 🔥 Main Add To Cart Function
export const handleAddToCart = async (product, quantity = 1) => {
  try {

    // Try logged-in API first
    await Api.post("/add", {
      productId: product._id,
      quantity
    });

    if (quantity > 0) {
      toast.success("Added to Cart");
    }

  } catch (error) {

    // 🔥 If unauthorized → use guest cart
    if (error.response?.status === 401) {

      addToLocalCart(product);

      if (quantity > 0) {
        toast.success("Added as Guest");
      }

      return;
    }

    toast.error("Something went wrong");
    console.error(error.response?.data || error.message);
  }
};


// Add to cart 
export const fetchCart = async () => {
  const res = await Api.get("/get");
  return res.data;
};

//mera cart
export const mergeGuestCart = async () => {
  try {
    const guestCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (guestCart.length === 0) return;

    for (const item of guestCart) {
      await Api.post("/add", {
        productId: item._id,
        quantity: item.quantity
      });
    }

    // Clear guest cart after merge
    localStorage.removeItem("cart");

    toast.success("Cart synced successfully");

  } catch (error) {
    console.error("Cart merge error:", error);
  }
};




