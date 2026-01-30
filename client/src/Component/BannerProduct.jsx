const ProductBanner = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-6">
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl h-28 flex items-center justify-between px-8 shadow-md">
        
        {/* Left Text */}
        <div className="text-white">
          <h2 className="text-xl font-bold">
            New Season Sale 🔥
          </h2>
          <p className="text-sm opacity-90">
            Up to 30% off on selected products
          </p>
        </div>

        {/* Right Button */}
        <button className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ProductBanner;
