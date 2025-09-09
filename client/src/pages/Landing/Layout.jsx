import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Home from "./Index";
import About from "./About";
import Features from "./Features";
import Pricing from "./Pricing";

const Layout = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    features: useRef(null),
    pricing: useRef(null),
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.6, // 60% of section in view = active
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentPage(entry.target.id);
        }
      });
    }, observerOptions);

    // observe each section
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    window.location.hash = id;
  };

  return (
    <div className="w-full min-h-screen">
      <Header currentPage={currentPage} scrollToSection={scrollToSection} />

      <section id="home" ref={sectionRefs.home} className="min-h-screen flex">
        <Home />
      </section>
      <section id="about" ref={sectionRefs.about} className="min-h-screen">
        <About />
      </section>
      <section
        id="features"
        ref={sectionRefs.features}
        className="min-h-screen"
      >
        <Features />
      </section>
      <section id="pricing" ref={sectionRefs.pricing} className="min-h-screen">
        <Pricing />
      </section>
    </div>
  );
};

export default Layout;
