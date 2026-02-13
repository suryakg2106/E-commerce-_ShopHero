import Cart from "../Models/CartSchema.js";
import ProductSchema from "../Models/ProductModel.js";


// Add Cart
export const addCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;
    let { quantity = 0 } = req.body;

    quantity = Number(quantity); // 🔥 Fix here

    const product = await ProductSchema.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: []
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {

      cart.items[itemIndex].quantity += quantity;

      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }

    } else {

      if (quantity > 0) {
        cart.items.push({
          productId,
          quantity,
          priceAtTime: product.price
        });
      }

    }

    await cart.save();

    res.status(200).json({
      message: "Cart updated",
      cart
    });

  } catch (error) {
    console.log("ADD CART ERROR 👉", error);
    res.status(500).json({ message: error.message });
  }
};


//Get Cart 
export const GetCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId })
      .populate("items.productId"); // very important

    if (!cart) {
      return res.status(200).json({
        message: "Cart is empty",
        cart: { items: [] }
      });
    }

    res.status(200).json({
      cart
    });

  } catch (error) {
    console.log("GET CART ERROR 👉", error);
    res.status(500).json({ message: error.message });
  }
};

