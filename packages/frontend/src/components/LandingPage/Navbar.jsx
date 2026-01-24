import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpenIcon } from "@heroicons/react/24/outline";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Explore Skills", href: "#explore" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = isScrolled
    ? "bg-white shadow-md border-b border-gray-100"
    : "bg-white/60 backdrop-blur-md border-b border-gray-100/70";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${navbarClasses}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LEFT: Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400 to-teal-600">
              <BookOpenIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-br from-blue-400 to-teal-600 text-transparent bg-clip-text">
              SkillSync
            </span>
          </Link>

          {/* CENTER: Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-800 hover:text-gray-900 transition"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* RIGHT: Auth Buttons */}
          <div className="flex items-center space-x-3">
            
            {/* Login */}
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold rounded-xl
                         bg-blue-50 text-blue-700
                         transition hover:bg-blue-100"
            >
              Login
            </Link>

            {/* Sign Up */}
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-semibold text-white rounded-xl
                         bg-gradient-to-r from-cyan-400 to-teal-500
                         hover:from-cyan-500 hover:to-teal-600
                         transition shadow-md shadow-cyan-500/30"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
