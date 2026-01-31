import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext.jsx";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(""); // 🔥
  const navigate = useNavigate();    


    const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

   // navigate(`/?search=${search}`);
      navigate(`/search?query=${search}`);
    setSearch("");
  };

  if (loading) return null;

  return (
    <nav className="bg-gray-300 shadow-md px-8 py-3 flex items-center justify-between sticky top-0 z-50">
      
      {/* Left - Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-red-500 text-white p-2 rounded">
          🛍️
        </div>
        <h1 className="text-xl font-bold">
          Shop<span className="text-red-500">Hero</span>
        </h1>
      </Link>

      {/* Center - Menu */}
      <ul className="hidden md:flex gap-8 font-medium">
        <li><Link className="hover:border-b-2 border-red-500" to="/">Home</Link></li>
        <li><Link to="/shop-page">Shop</Link></li>
        <li><Link to="/deals">Deals</Link></li>
        <li><Link to="/new">New Arrivals</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Right */}
      <div className="flex items-center gap-6 relative">

         <form onSubmit={handleSearch} className="hidden md:block">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-1 rounded-full outline-none"
          />
        </form>
        {/* Cart */}
        <FaShoppingCart className="text-xl cursor-pointer" />

        {/* Auth Section */}
        {!user ? (
          <Link
            to="/login"
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Login
          </Link>
        ) : (
          <div className="relative">
            {/* Profile Icon */}
            <FaUserCircle
              className="text-2xl cursor-pointer"
              onClick={() => setOpen(!open)}
            />

            {/* Dropdown */}
            {open && (
             <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md text-black">

  <Link
    to="/my-profile" 
    className="block px-4 py-2 hover:bg-gray-100"
    onClick={() => setOpen(false)}
  >
    My Profile
  </Link>

  <Link
    to="/dashboard"
    className="block px-4 py-2 hover:bg-gray-100"
    onClick={() => setOpen(false)}
  >
    My Dashboard
  </Link>

  <button
    onClick={() => {
      logout();
      setOpen(false);
    }}
    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
  >
    Logout
  </button>

</div>

            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;