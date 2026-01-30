
import bkimage from "../assets/Image/backgroundimg.jpeg"
import CategoryFilterSection from "./CategorFilterSection";
//import  modelGirl from "../assets/Image/model.jpg";

const HeroSection = () => {
  return (
    <>
      {/* HERO */}
   <section
  className="w-full bg-cover bg-center"
  style={{
    backgroundImage: `linear-gradient(
      to right,
      rgba(0,0,0,0.35),
      rgba(0,0,0,0.1)
    ), url(${bkimage})`,
  }}
>
        <div className="max-w-7xl  mx-auto px-6 py-20 grid md:grid-cols-2 items-center">
          
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold">
              Big <br />
              <span className="text-yellow-400">Summer Sale</span>
            </h1>

            <p className="mt-4 text-xl">
              Up to <span className="font-bold">50% OFF</span>
            </p>

            <button className="mt-6 bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold shadow-lg">
              Shop Now
            </button>
          </div>

          {/* Right Image */}
          <div className="hidden md:flex justify-end">
            <img
              src={""}
              alt="img"
              className="w-[420px]"
            />
          </div>
        </div>
      </section>

      {/* INFO BAR */}
      <section className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div>
            <p className="text-2xl">🚚</p>
            <h4 className="font-semibold">Free Shipping</h4>
            <p className="text-sm text-gray-500">On orders over ₹1000</p>
          </div>

          <div>
            <p className="text-2xl">🎧</p>
            <h4 className="font-semibold">24/7 Support</h4>
            <p className="text-sm text-gray-500">Customer service</p>
          </div>

          <div>
            <p className="text-2xl">📦</p>
            <h4 className="font-semibold">Easy Returns</h4>
            <p className="text-sm text-gray-500">Hassle-free returns</p>
          </div>

          <div>
            <p className="text-2xl">🔒</p>
            <h4 className="font-semibold">Secure Payment</h4>
            <p className="text-sm text-gray-500">Safe checkout</p>
          </div>

        </div>
      </section>
    </>
  );
};

export default HeroSection;