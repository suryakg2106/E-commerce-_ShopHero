import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductDetils,
  updateProduct,
} from "../Service/Productservice";
import SellerCommponents from "../Component/SellerCommponents";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    brand: "",
    stock: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProductDetils(id);
      

      const product = res?.product;


      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          discountPrice: product.discountPrice || "",
          category: product.category,
          brand: product.brand,
          stock: product.stock,
          images: [],
        });

        setOldImages(product.images || []);
      }
    };
    fetchProduct();
  }, [id]);

  // 🔹 Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Image handler
  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
    setPreviewImages(files.map((f) => URL.createObjectURL(f)));
  };

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images") productData.append(key, value);
    });

    formData.images.forEach((img) => {
      productData.append("images", img);
    });

    const res = await updateProduct(id, productData);
    console.log(res)

    if (res?.success) {
      alert("Product Updated Successfully ✅");
      navigate("/my-products");
    }

    setLoading(false);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-300 to-gray-200 py-10 px-4">
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Update Product
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Edit product details
        </p>
      </div>

      <SellerCommponents />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-10 space-y-8"
      >
        {/* Product Name */}
        <div>
          <label className="label">Product Name</label>
          <input
            type="text"
            name="name"
            className="input"
            value={formData.name}
            placeholder="Samsung Galaxy S24"
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            name="description"
            rows="4"
            className="input resize-none"
            value={formData.description}
            placeholder="Write product description..."
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">Price</label>
            <input
              type="number"
              name="price"
              className="input"
              value={formData.price}
              placeholder="₹ 50000"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">Discount Price</label>
            <input
              type="number"
              name="discountPrice"
              className="input"
              value={formData.discountPrice}
              placeholder="Optional"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Category & Brand */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">Category</label>
            <select
              name="category"
              className="input bg-white"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option>Mobile</option>
              <option>Laptop</option>
              <option>Electronics</option>
              <option>Clothes</option>
              <option>Shoes</option>
              <option>Accessories</option>
            </select>
          </div>

          <div>
            <label className="label">Brand</label>
            <input
              type="text"
              name="brand"
              className="input"
              value={formData.brand}
              placeholder="Samsung"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Stock */}
        <div>
          <label className="label">Stock</label>
          <input
            type="number"
            name="stock"
            className="input"
            value={formData.stock}
            placeholder="Available stock"
            onChange={handleChange}
            required
          />
        </div>

        {/* Old Images */}
        {oldImages.length > 0 && (
          <div>
            <label className="label">Existing Images</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {oldImages.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt="old"
                  className="w-full h-32 object-cover rounded-xl border"
                />
              ))}
            </div>
          </div>
        )}

        {/* Upload New Images */}
        <div>
          <label className="label">Upload New Images</label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
            <span className="text-gray-500 text-sm">
              Click to upload
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </label>

          {/* Preview New Images */}
          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {previewImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="preview"
                  className="w-full h-32 object-cover rounded-xl border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold text-lg
          hover:bg-red-600 hover:scale-[1.01] transition-all disabled:opacity-60"
        >
          {loading ? "Updating Product..." : "Update Product"}
        </button>
      </form>
    </div>
  </div>
);

};

export default UpdateProduct;
