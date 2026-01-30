import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../Context/AuthContext";
import {
  FaBoxOpen,
  FaPlusCircle,
  FaShoppingCart,
  FaRupeeSign,
} from "react-icons/fa";

const Dashboard = () => {
 const { user, loading } = useContext(AuthContext);
 console.log("DASHBOARD USER 👉", user);
 const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">

      {/* Top User Card */}
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Welcome,{" "}
            <span className="text-red-500">{user?.name}</span>
          </h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        <span className="bg-red-500 text-white px-5 py-2 rounded-full text-sm font-medium shadow">
          Seller Dashboard
        </span>
      </div>

      {/* Stats Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Earnings */}
        <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r from-green-400 to-green-600 hover:scale-105 transition">
          <div className="absolute -top-6 -right-6 text-[120px] opacity-20">
            ₹
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/30 p-3 rounded-xl">
              <FaRupeeSign className="text-2xl" />
            </div>
            <div>
              <p className="text-sm opacity-90">Total Earnings</p>
              <h3 className="text-3xl font-bold">₹45,000</h3>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 hover:scale-105 transition">
          <div className="absolute -top-6 -right-6 text-[100px] opacity-20">
            📦
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/30 p-3 rounded-xl">
              <FaBoxOpen className="text-2xl" />
            </div>
            <div>
              <p className="text-sm opacity-90">Total Products</p>
              <h3 className="text-3xl font-bold">28</h3>
            </div>
          </div>
        </div>

        {/* Sold */}
        <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r from-red-400 to-red-600 hover:scale-105 transition">
          <div className="absolute -top-6 -right-6 text-[100px] opacity-20">
            🛒
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/30 p-3 rounded-xl">
              <FaShoppingCart className="text-2xl" />
            </div>
            <div>
              <p className="text-sm opacity-90">Products Sold</p>
              <h3 className="text-3xl font-bold">134</h3>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <button  onClick={() => navigate("/addproduct")} className="group p-6 rounded-xl border hover:border-red-500 hover:shadow-lg transition text-left">
            <FaPlusCircle className="text-3xl text-red-500 mb-3 group-hover:scale-110 transition" />
            <h4 className="font-semibold">Add New Product</h4>
            <p className="text-sm text-gray-500">
              Create and publish a new product
            </p>
          </button>

          <button onClick={()=> navigate("/my-products")} className="group p-6 rounded-xl border hover:border-blue-500 hover:shadow-lg transition text-left">
            <FaBoxOpen className="text-3xl text-blue-500 mb-3 group-hover:scale-110 transition" />
            <h4 className="font-semibold">My Listings</h4>
            <p className="text-sm text-gray-500">
              Manage your listed products
            </p>
          </button>

          <button className="group p-6 rounded-xl border hover:border-green-500 hover:shadow-lg transition text-left">
            <FaShoppingCart className="text-3xl text-green-500 mb-3 group-hover:scale-110 transition" />
            <h4 className="font-semibold">View Orders</h4>
            <p className="text-sm text-gray-500">
              Track customer orders
            </p>
          </button>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
