import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    discountPrice: {
      type: Number
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Mobile",
        "Laptop",
        "Electronics",
        "Clothes",
        "Shoes",
        "Accessories"
      ]
    },

    brand: {
      type: String
    },

    stock: {
      type: Number,
      required: true,
      default: 0
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    images: [
      {
        url: {
          type: String,
          required: true
        }
      }
    ],

    ratings: {
      type: Number,
      default: 0
    },

    numOfReviews: {
      type: Number,
      default: 0
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        name: String,
        rating: Number,
        comment: String
      }
    ],

    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);




export default mongoose.model("Product", productSchema);
