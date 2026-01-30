import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext); 

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    await login({ email, password });
  } catch (err) {
    const backendMsg =
      err.response?.data?.msg ||
      err.response?.data?.message ||
      err.message ||
      "Login failed";
      console.log("backend",backendMsg)

    setError(backendMsg);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Section - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 items-center justify-center px-12">
        <div className="text-white max-w-lg">
          <h1 className="text-5xl font-bold mb-4">ShopHero</h1>
          <p className="text-xl mb-8">
            Your one-stop online store for everything you need.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛒</span>
              <p>Wide range of products</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚚</span>
              <p>Fast & reliable delivery</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">💳</span>
              <p>Secure payments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Login to your account
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Welcome back! Please login to continue
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-semibold">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
