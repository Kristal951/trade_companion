import React from "react";
import { motion } from "framer-motion"; // Import motion
import { TrendingUp, Target, Users, ShieldCheck } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: (
        <TrendingUp className="w-8 h-8 text-indigo-500 group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "Signal Generation",
      desc: "AI-powered signals to help you enter and exit trades with confidence.",
    },
    {
      icon: (
        <Target className="w-8 h-8 text-cyan-500 group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "Lot Size Guidance",
      desc: "Tailored lot size recommendations to help you manage risk effectively.",
    },
    {
      icon: (
        <Users className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "Shared Success",
      desc: "We grow when you grow. Your profits are our priority.",
    },
    {
      icon: (
        <ShieldCheck className="w-8 h-8 text-pink-500 group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "Risk Management",
      desc: "We offer Tools to minimize loss while maximizing your potential returns.",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white px-6 py-20">
      <h2 className="text-4xl font-heading md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
        Your Personal Forex Companion
      </h2>
      <p className="text-lg font-body text-gray-600 max-w-2xl text-center mb-12">
        Trade Companion equips you with the right tools — from legitmate and
        profitable signals by professionals, to precise lot size guidance —
        ensuring smarter, safer, and more confident trading.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4 w-full max-w-6xl">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            className="flex group bg-gray-100 h-[300px] border border-gray-200 rounded-2xl shadow-md cursor-pointer"
            whileHover={{ y: -12, scale: 1.05 }} 
            transition={{ duration: 0.3 }} 
          >
            <div className="w-full rounded-2xl p-4 h-full ">
              <div className="mb-4 p-3 w-max rounded-xl bg-white shadow group-hover:shadow-md transition">
                {feature.icon}
              </div>
              <h3 className="font-semibold font-heading text-xl my-2 text-gray-800 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 font-body group-hover:text-gray-500 text-base font-semibold transition-colors duration-300">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
