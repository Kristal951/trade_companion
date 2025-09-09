import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "./index.css";
import illustration1 from "../../assets/illustrations/illustration_1.png";
import illustration2 from "../../assets/illustrations/illustration_2.png";
import illustration3 from "../../assets/illustrations/illustration_3.png";
import illustration4 from "../../assets/illustrations/illustration_4.png";
import illustration5 from "../../assets/illustrations/illustration_5.png";
import placeholder from "../../assets/All_PNG/Placeholder.png";

const features = [
  {
    title: "Signal Generation 🚀",
    desc: "Get AI-powered trading signals that guide your entry and exit points with confidence.",
    img: placeholder,
  },
  {
    title: "Lot Size Recommendations 🎯",
    desc: "Receive custom lot size guidance to help you manage risk and trade smartly.",
    img: placeholder,
  },
  {
    title: "Shared Success 🤝",
    desc: "Our profits align with yours. When you make money, we make money.",
    img: placeholder,
  },
];

const Features = () => {
  return (
    <div className="w-full flex-col min-h-screen flex  items-center bg-gray-50 px-6 py-16">
      <div className="max-w-6xl w-full h-[400px] grid grid-cols-1 md:grid-cols-2 gap-12 justify-center items-center">
        <div className="flex w-full h-max items-center justify-center">
          <img
            src={illustration1}
            alt="Illustration"
            className="w-[80%] max-w-md mr-4"
          />
        </div>
        <div className="flex gap-4 flex-col text-left items-start justify-center h-full">
          <h1 className="font-bold text-left text-5xl font-heading tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Signal Generation
          </h1>
          <p className="text-gray-700 text-lg text-left font-body">
            Get Signals from both our verified professionals and also from our
            own crafted and well fed Signal generator model.
          </p>
        </div>
      </div>

      <div className="max-w-6xl w-full h-[400px] grid grid-cols-1 md:grid-cols-2 gap-12 justify-center items-center mt-12">
        <div className="flex gap-4 flex-col items-end justify-center h-full md:order-1 order-2">
          <h1 className="font-bold text-5xl text-right font-heading tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Learn how to use signals from professionals
          </h1>
          <p className="text-gray-700 text-right text-lg font-body">
            We don't just give you signals, we teach you how to use and
            understand them.
          </p>
        </div>
        <div className="flex w-full h-max items-center justify-center md:order-2 order-1">
          <img
            src={illustration2}
            alt="Illustration"
            className="w-[90%] max-w-md mr-4"
          />
        </div>
      </div>

      <div className="max-w-6xl w-full h-[400px] grid grid-cols-1 md:grid-cols-2 gap-12 justify-center items-center">
        <div className="flex w-full h-max items-center justify-center">
          <img
            src={illustration3}
            alt="Illustration"
            className="w-[80%] max-w-md mr-4"
          />
        </div>
        <div className="flex gap-4 flex-col text-left items-start justify-center h-full">
          <h1 className="font-bold text-5xl w-[500px] font-heading tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Accurate Signals and Lot Sizes
          </h1>
          <p className="text-gray-700 text-lg text-left font-body">
            Our signals and lot sizes are accurate. They are tested and trusted
            by over 300+ people.
          </p>
        </div>
      </div>

      <div className="max-w-6xl w-full h-[400px] grid grid-cols-1 md:grid-cols-2 gap-12 justify-center items-center mt-12">
        <div className="flex gap-4 flex-col items-end justify-center h-full md:order-1 order-2">
          <h1 className="font-bold text-5xl text-right font-heading tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            You Earn - We Earn
          </h1>
          <p className="text-gray-700 text-right text-lg font-body">
            We have your profit in mind, we earn as you earn. You making money
            from our signals are our top priority.
          </p>
        </div>
        <div className="flex w-full h-max items-center justify-center md:order-2 order-1">
          <img
            src={illustration4}
            alt="Illustration"
            className="w-[90%] max-w-md mr-4"
          />
        </div>
      </div>

      <div className="max-w-6xl w-full h-[400px] grid grid-cols-1 md:grid-cols-2 gap-12 justify-center items-center">
        <div className="flex w-full h-max items-center justify-center">
          <img
            src={illustration5}
            alt="Illustration"
            className="w-[80%] max-w-md mr-4"
          />
        </div>
        <div className="flex gap-4 flex-col text-left items-start justify-center h-full">
          <h1 className="font-bold text-5xl w-[500px] font-heading tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Identify Risky Trades
          </h1>
          <p className="text-gray-700 text-lg text-left font-body">
            We help you identify risky and loss-full trades with ease and no stress.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
