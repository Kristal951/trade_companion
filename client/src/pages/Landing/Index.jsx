import React from "react";
import IMG from "../../assets/All_PNG/AI.png";
import Header from "./Header";
import { Typewriter } from "react-simple-typewriter";

const Home = ({ currentPage, scrollToSection }) => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header currentPage={currentPage} scrollToSection={scrollToSection}/>

      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]" />
        <div className="absolute top-40 -right-32 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1 className="text-4xl font-heading w-[400px] text-center md:w-[900px] md:text-7xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          <Typewriter
            words={["Illuminate Your Trading Journey"]}
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>

        <p className="mt-6 text-lg font-body md:text-xl text-gray-300 max-w-2xl">
          Your AI-powered partner for smarter, faster, and more confident
          trading decisions.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex gap-4 flex-wrap justify-center">
          <button className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform">
            Get Started
          </button>

          <button className="px-8 py-3 rounded-xl font-semibold text-gray-200 border border-gray-600/50 backdrop-blur-sm hover:bg-white/5 hover:border-gray-400 transition">
            Learn More
          </button>
        </div>

        {/* Floating Image */}
        {/* <div className="mt-16 relative">
          <img
            src={IMG}
            alt="AI Trading"
            className="w-[320px] md:w-[480px] drop-shadow-2xl"
          />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-3xl -z-10" />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
