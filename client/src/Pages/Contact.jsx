import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-100">

      {/* 🔹 Hero Section */}
      {/* 🔹 Hero Section */}
<div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-orange-400 text-white">

  {/* Decorative Shapes */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
  <div className="absolute top-10 -right-20 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

  <div className="relative max-w-7xl mx-auto px-6 py-28 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

    {/* Left Content */}
    <div>
      <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm mb-4">
        💬 Support & Help Center
      </span>

      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
        Let’s Talk, <br />
        <span className="text-black/80">We’re Here to Help</span>
      </h1>

      <p className="mt-5 text-lg text-white/90 max-w-lg">
        Have questions about products, orders, or partnerships?
        Our team at <b>ShopHero</b> is always ready to assist you.
      </p>

      <div className="mt-8 flex gap-4">
        <button className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition">
          Contact Support
        </button>

        <button className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-red-500 transition">
          View FAQ
        </button>
      </div>
    </div>

    {/* Right Card */}
    <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl text-center">
      <h3 className="text-2xl font-bold mb-2">
        📞 Quick Contact
      </h3>

      <p className="text-white/90 text-sm mb-6">
        Reach us instantly for urgent support
      </p>

      <div className="space-y-4 text-left">
        <p>📧 <b>Email:</b> support@shophero.com</p>
        <p>📱 <b>Phone:</b> +91 98765 43210</p>
        <p>📍 <b>Location:</b> West Bengal, India</p>
      </div>
    </div>

  </div>
</div>


      {/* 🔹 Contact Info */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
          <FaPhoneAlt className="text-3xl text-red-500 mx-auto mb-4" />
          <h3 className="font-semibold text-lg">Phone</h3>
          <p className="text-gray-600 mt-2">+91 98765 43210</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
          <FaEnvelope className="text-3xl text-red-500 mx-auto mb-4" />
          <h3 className="font-semibold text-lg">Email</h3>
          <p className="text-gray-600 mt-2">support@shophero.com</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
          <FaMapMarkerAlt className="text-3xl text-red-500 mx-auto mb-4" />
          <h3 className="font-semibold text-lg">Location</h3>
          <p className="text-gray-600 mt-2">
            West Bengal, India
          </p>
        </div>

      </div>

      {/* 🔹 Contact Form + Map */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">
            Send us a message
          </h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
            />

            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <iframe
            title="Google Map"
            className="w-full h-full min-h-[350px]"
            src="https://maps.google.com/maps?q=West%20Bengal&t=&z=6&ie=UTF8&iwloc=&output=embed"
          />
        </div>

      </div>
    </div>
  );
};

export default Contact;
