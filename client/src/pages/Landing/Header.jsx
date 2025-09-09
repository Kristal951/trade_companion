import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../assets/All_PNG/Logo.png";

const Header = ({ currentPage, scrollToSection }) => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const loc = location.hash.split("#");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // scrolling down
        setHidden(true);
      } else {
        // scrolling up
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // ✅ remove lastScrollY from deps to avoid reattaching
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 
        ${hidden ? "-translate-y-full" : "translate-y-0"}
        bg-transparent`}
    >
      <div className="max-w-7xl mx-auto px-0 py-0 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={Logo}
            alt="logo"
            className="w-[100px] h-[100px] object-contain"
          />
        </div>

        {/* Nav Links */}
        {/* Nav Links */}
        <nav className="hidden md:flex space-x-8">
          {["home", "about", "features", "pricing"].map((item) => (
            <button
              key={item}
              className={`capitalize cursor-pointer text-lg font-semibold tracking-wide relative transition-colors group
        ${
          currentPage === item
            ? "text-cyan-400"
            : "text-white hover:text-cyan-300"
        }`}
              onClick={() => scrollToSection(item)}
            >
              {item}
              {/* underline effect */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-cyan-400 transition-all duration-300 
          ${currentPage === item ? "w-full" : "w-0 group-hover:w-full"}`}
              />
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <button
            className="relative overflow-hidden px-6 py-2 rounded-full 
              bg-gradient-to-r from-cyan-400 to-indigo-500 text-white 
              font-semibold shadow-lg transition-all duration-300 
              hover:shadow-cyan-500/40 hover:scale-105"
          >
            <span className="relative z-10">Get Started</span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button className="text-white hover:text-cyan-400 transition">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
