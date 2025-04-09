import { Link } from "react-router-dom";
import { Car, Heart, Menu, X, Bell } from "lucide-react";
import { useState } from "react";

const Navbar = ({ wishlistCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {" "}
      <div className="bg-blue-600 text-white py-1 px-4 text-center text-xs md:text-sm font-medium">
        <span>Spring Sale! Get 10% off on all premium cars</span>
      </div>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transform group-hover:rotate-6  transition-all duration-300">
            <Car className="text-white" size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              GoCar
            </span>
            <span className="text-xs text-gray-500 -mt-1">Premium Rides</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 relative group "
          >
            Home
          </Link>
          <Link
            to="/cars"
            className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 relative group"
          >
            Browse
          </Link>
          <Link
            to="/wishlist"
            className="relative text-gray-700 hover:text-blue-600 font-medium transition-all duration-300"
          >
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              Wishlist
            </div>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center   ">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {" "}
          <div className="relative cursor-pointer">
            <Bell className="w-5 h-5 text-gray-700 hover:text-blue-600 transition" />
            <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-blue-500 animate-[pulse_0.5s_ease-in-out_infinite]" />
            <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-blue-400 animate-[pulse_0.5s_ease-in-out_infinite]" />
          </div>
          <button className="px-4 py-2  text-black text-sm font-semibold ">
            Login
          </button>
          <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow transition duration-300">
            Sign Up
          </button>
          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md border-t mt-2 md:hidden z-40 flex flex-col py-4 px-6 space-y-4 transition-all duration-300">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/cars"
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Browse
            </Link>
            <Link
              to="/wishlist"
              className="text-gray-700 hover:text-blue-600 font-medium flex justify-between items-center"
              onClick={() => setMenuOpen(false)}
            >
              Wishlist
              {wishlistCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
