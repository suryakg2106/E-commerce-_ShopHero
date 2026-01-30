import React, { useEffect, useState } from "react";
import CategoryFilterSection from "../Component/CategorFilterSection";
import ProductCard from "../Component/ProductCard";
import { getAllProducts } from "../Service/Productservice";
import ProductBanner from "../Component/BannerProduct";
import { useSearchParams } from "react-router-dom";


const Productpage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
const search = searchParams.get("search") || "";


  console.log("product",products)

 useEffect(() => {
  fetchProducts();
}, [category, brand, sort, search]);

  const fetchProducts = async () => {
    setLoading(true);
    const filters = { category, brand, sort, search }; 

    const data = await getAllProducts(filters);

    if (data?.Success) {
      setProducts(data.Products);
    }
    setLoading(false);
  };

  return (
    <>
      {/* 🔥 Filter Section */}
      <CategoryFilterSection
        setCategory={setCategory}
        setBrand={setBrand}
        setSort={setSort}
      />
       <ProductBanner/>

      {/* 🔥 Product Listing */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        {loading ? (
          <p className="text-center text-lg text-gray-500">
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No products found 😕
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Productpage;
