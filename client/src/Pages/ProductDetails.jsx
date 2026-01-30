import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProductDetils,
  getAllProducts,
} from "../Service/Productservice";
import ProductCard from "../Component/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // 🔹 Fetch current product
        const res = await getProductDetils(id);
        const currentProduct = res.product;
        setProduct(currentProduct);

        // 🔹 Fetch related products by category
        const related = await getAllProducts({
          category: currentProduct.category,
        });

        if (related?.Success) {
          const filtered = related.Products.filter(
            (p) => p._id !== currentProduct._id
          );
          setRelatedProducts(filtered.slice(0, 4));
        }
      } catch (error) {
        console.log("PRODUCT DETAILS ERROR 👉", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  const discountPercent = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  return (
    <>
      {/* ================= PRODUCT DETAILS ================= */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-14">

        {/* 🔹 LEFT: Image Section */}
        <div>
          <div className="bg-white border rounded-2xl p-6 flex items-center justify-center shadow-sm">
            <img
              src={product.images[currentImg]?.url}
              alt={product.name}
              className="h-96 object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt="thumb"
                onClick={() => setCurrentImg(index)}
                className={`h-20 w-20 object-contain border rounded-lg cursor-pointer bg-white
                ${
                  currentImg === index
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 🔹 RIGHT: Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 leading-snug">
            {product.name}
          </h1>

          {/* Brand & Category */}
          <div className="mt-2 text-sm text-gray-500 flex gap-4">
            <span>
              Brand: <span className="font-medium">{product.brand}</span>
            </span>
            <span>
              Category:{" "}
              <span className="font-medium">{product.category}</span>
            </span>
          </div>

          {/* Ratings */}
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="text-yellow-500">⭐⭐⭐⭐☆</span>
            <span className="text-gray-600">
              ({product.numOfReviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-center gap-4">
            {product.discountPrice ? (
              <>
                <span className="text-3xl font-bold text-green-600">
                  ₹{product.discountPrice}
                </span>
                <span className="text-lg line-through text-gray-400">
                  ₹{product.price}
                </span>
                <span className="text-sm font-semibold text-red-500">
                  {discountPercent}% OFF
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-green-600">
                ₹{product.price}
              </span>
            )}
          </div>

          {/* Stock */}
          <p className="mt-3 text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">
                ✔ In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-500 font-medium">
                ✖ Out of Stock
              </span>
            )}
          </p>

          {/* Delivery Info */}
          <div className="mt-6 bg-gray-50 border rounded-xl p-4 space-y-2 text-sm text-gray-600">
            <p>🚚 Free delivery within 3–5 business days</p>
            <p>🔁 7 days easy return policy</p>
            <p>🔒 100% secure payments</p>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Product Description
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-10 flex gap-4">
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold transition">
              Add to Cart
            </button>

            <button className="border border-red-500 text-red-500 hover:bg-red-50 px-8 py-3 rounded-xl font-semibold transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Other Products You May Like
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
