import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Shop<span className="text-red-500">Hero</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Your one-stop destination for electronics, fashion & lifestyle
            products at the best prices.
          </p>

          <div className="flex gap-4 mt-4">
            <FaFacebookF className="hover:text-red-500 cursor-pointer" />
            <FaInstagram className="hover:text-red-500 cursor-pointer" />
            <FaLinkedinIn className="hover:text-red-500 cursor-pointer" />
            <FaGithub className="hover:text-red-500 cursor-pointer" />
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-500 cursor-pointer">Mobiles</li>
            <li className="hover:text-red-500 cursor-pointer">Laptops</li>
            <li className="hover:text-red-500 cursor-pointer">Electronics</li>
            <li className="hover:text-red-500 cursor-pointer">Fashion</li>
            <li className="hover:text-red-500 cursor-pointer">Accessories</li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Customer Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-500 cursor-pointer">My Account</li>
            <li className="hover:text-red-500 cursor-pointer">Orders</li>
            <li className="hover:text-red-500 cursor-pointer">Wishlist</li>
            <li className="hover:text-red-500 cursor-pointer">Returns</li>
            <li className="hover:text-red-500 cursor-pointer">Help Center</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Newsletter
          </h3>
          <p className="text-sm mb-3">
            Subscribe to get updates on offers & new arrivals.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-l-lg outline-none text-black bg-white"
            />
            <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-r-lg text-white font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} ShopHero. All rights reserved. <br />
        Built with ❤️ by <span className="text-red-500">Surya Kanta Ghosh</span>
      </div>

    </footer>
  );
};

export default Footer;
