import React, { useState } from "react";
import { createProduct } from "../Service/Productservice";
import SellerCommponents from "../Component/SellerCommponents";

const CreateProduct = () => {
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
  const [loading, setLoading] = useState(false);

  // handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle images
  const handleImage = (e) => {
    const files = Array.from(e.target.files);

    setFormData({ ...formData, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      alert("Please upload at least one product image");
      return;
    }

    setLoading(true);

    const productData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images") productData.append(key, value);
    });

    formData.images.forEach((img) => {
      productData.append("images", img);
    });

    const res = await createProduct(productData);

    if (res?.Success) {
      alert("Product Created Successfully ✅");
      setFormData({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        category: "",
        brand: "",
        stock: "",
        images: [],
      });
      setPreviewImages([]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 to-gray-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Create New Product
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Add a new product to your store
          </p>
        </div>
        <SellerCommponents/>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-10 space-y-8"
        >
          {/* Name */}
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
                type="text"
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

          {/* Images */}
          <div>
            <label className="label">Product Images</label>

            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
              <span className="text-gray-500 text-sm">
                Click to upload 
              </span>
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </label>

            {/* Preview */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {previewImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative group border rounded-xl overflow-hidden"
                  >
                    <img
                      src={img}
                      alt="preview"
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImages(previewImages.filter((_, i) => i !== index));
                        setFormData({
                          ...formData,
                          images: formData.images.filter((_, i) => i !== index),
                        });
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
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
            {loading ? "Creating Product..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
