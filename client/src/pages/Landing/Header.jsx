import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../assets/All_PNG/Logo.png";

const Header = ({ currentPage, scrollToSection }) => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setHidden(true);
          } else {
            setHidden(false);
          }

          setScrolled(currentScrollY > 50);
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${hidden ? "-translate-y-full" : "translate-y-0"}
        ${scrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white"}
        h-[64px]
      `}
    >
      <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={Logo}
            alt="logo"
            className="w-[50px] h-[50px] object-contain"
          />
        </div>

        {/* Nav */}
        <nav className="hidden md:flex space-x-6">
          {["home", "about", "features", "faqs", "pricing"].map((item) => {
            const isActive = currentPage === item;
            return (
              <button
                key={item}
                className={`capitalize cursor-pointer text-base font-medium tracking-wide relative transition-colors group px-3 py-1 rounded-md
                  ${
                    isActive
                      ? scrolled
                        ? "bg-cyan-400 text-white"
                        : "text-cyan-400"
                      : scrolled
                      ? "text-black hover:text-cyan-500"
                      : "text-white hover:text-cyan-300"
                  }`}
                onClick={() => scrollToSection(item)}
              >
                {item}
                {!scrolled && (
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-cyan-400 transition-all duration-300 
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* CTA button (hidden when scrolled) */}
        <div className="hidden md:flex">
          {scrolled && (
            <button
              className="relative overflow-hidden px-5 py-1.5 rounded-full 
                bg-gradient-to-r from-cyan-400 to-indigo-500 text-white 
                font-medium shadow-md transition-all duration-300 
                hover:shadow-cyan-500/40 hover:scale-105 text-sm"
            >
              <span className="relative z-10">Get Started</span>
            </button>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <button
            className={`transition ${
              scrolled
                ? "text-black hover:text-cyan-500"
                : "text-white hover:text-cyan-400"
            }`}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
