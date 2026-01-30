import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyProfile = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔴 Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-semibold text-white">
            My Profile
          </h1>
          <p className="text-red-100 mt-1 text-sm">
            View and manage your account details
          </p>
        </div>
      </div>

      {/* 🔹 Profile Card */}
      <div className="max-w-3xl mx-auto px-4 -mt-10 pb-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* Greeting */}
          <div className="mb-8">
            <h2 className="text-xl font-medium text-gray-800">
              Hello, {user?.name} 👋
            </h2>
            <p className="text-sm text-gray-500">
              This is your personal information
            </p>
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-500 border rounded-xl px-4 py-3">
              <p className="text-xs font-bold text-white mb-1">Full Name</p>
              <p className="text-white font-medium">{user?.name}</p>
            </div>

            <div className="bg-gray-50 border rounded-xl px-4 py-3">
              <p className="text-xs font-bold text-black mb-1">Email Address</p>
              <p className="text-black font-medium">{user?.email}</p>
            </div>

            {/* New Field: Role */}
            <div className="bg-gray-50 border rounded-xl px-4 py-3">
              <p className="text-xs text-gray-500 mb-1">Role</p>
              <p className="text-gray-800 font-medium capitalize">
                {user?.role || "User"}
              </p>
            </div>

            {/* New Field: Joined */}
            <div className="bg-green-500 border rounded-xl px-4 py-3">
              <p className="text-xs font-bold text-gray-500 mb-1">Joined On</p>
              <p className="text-gray-800 font-medium">
                {user?.createdAt
                  ? new Date(user.createdAt).toDateString()
                  : "—"}
              </p>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-10 border-t pt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Helpful Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li
                onClick={() => navigate("/help/security")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Account security tips
              </li>
              <li
                onClick={() => navigate("/help/profile")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                How to update your profile
              </li>
              <li
                onClick={() => navigate("/help/support")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Contact support
              </li>
            </ul>
          </div>

          {/* 🔻 Bottom Actions */}
          <div className="mt-10 border-t pt-6 flex flex-col md:flex-row gap-4 justify-end">
            <button
              onClick={() => navigate("/change-password")}
              className="border border-red-500 text-red-500
              hover:bg-red-50 text-sm font-semibold px-6 py-2.5 rounded-xl transition"
            >
              Change Password
            </button>

            <button
              onClick={() => {
      logout();
    }}
              className="bg-red-500 hover:bg-red-600 active:scale-95
              text-white text-sm font-semibold px-6 py-2.5 rounded-xl
              shadow-md transition-all"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;
