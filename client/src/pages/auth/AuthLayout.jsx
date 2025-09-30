import React, { useEffect, useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const AuthLayout = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState([""]);
  const [subtext, setSubtext] = useState([""]);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showThirdLine, setShowThirdLine] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("signup")) {
      setPageTitle(["Welcome to Trade Companion"]);
      setSubtext(["Create an account to begin your trading journey with us."]);
    } else if (location.pathname.includes("login")) {
      setPageTitle(["Welcome Back"]);
      setSubtext(["Log into your account to continue your trading journey."]);
    } else {
      setPageTitle(["Welcome to Trade Companion"]);
    }
  }, [location.pathname]);

  const variants = {
    animate: {
      opacity: [0.6, 1, 0.6],
      scale: [0.9, 1, 0.9],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const borderVariants = {
    animate: {
      width: ["0%", "20%", "0%"],
      height: ["0%", "30%", "0%"],
      transition: {
        duration: 4,
        delay: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    const delay = setTimeout(() => setShowSecondLine(true), 1500);
    return () => clearTimeout(delay);
  }, [pageTitle]);

  useEffect(() => {
    const delay = setTimeout(() => setShowThirdLine(true), 2000);
    return () => clearTimeout(delay);
  }, [pageTitle]);
  if (location.pathname === "/auth" || location.pathname === "/auth/") {
    return <Navigate to="/auth/signup" replace />;
  }

  return (
    <div className="w-full h-screen flex flex-row relative overflow-hidden">
      {/* Left Section */}
      <div className="w-[40%] h-full relative bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]" />
          <div className="absolute top-40 -right-32 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px]" />
        </div>

        {/* <motion.div
          variants={variants}
          animate="animate"
          className="w-[300px] h-[300px] bg-transparent absolute top-[-10rem] right-[-4rem]"
        />

        <motion.div
          variants={variants}
          animate="animate"
          className="w-[300px] h-[300px] bg-transparent bg-opacity-50 rounded-full absolute bottom-[-8rem] left-[-8rem]"
        /> */}

        <div className="flex flex-col items-center justify-center relative text-white text-center px-6">
          <div className="flex flex-col items-center justify-center mb-4">
            <h1 className="text-3xl font-bold">
              <Typewriter
                words={["Hello There,"]}
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
            {showSecondLine && (
              <h1 className="text-3xl font-bold">
                <Typewriter words={pageTitle} typeSpeed={70} delaySpeed={500} />
              </h1>
            )}
          </div>

          {showThirdLine && (
            <p className="text-xl max-w-xs">
              <Typewriter words={subtext} typeSpeed={70} delaySpeed={500} />
            </p>
          )}
        </div>
      </div>
      <div className="flex w-[60%] h-full items-center justify-center bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
