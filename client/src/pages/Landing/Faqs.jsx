import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How can I verify my Trade Companion account?",
      a: "An email verification is all that is needed to get you started on Trade Companion.",
    },
    {
      q: "What is Trade Companion?",
      a: "Trade Companion is an AI-powered forex signal generating system. It sends signal notifications directly to users while recommending the lot size to use for each signal based on the user’s capital and risk.",
    },
    {
      q: "Is Trade Companion beginner friendly?",
      a: "Yes. Trade Companion provides easy-to-follow BUY/SELL signals with entry price, stop loss, and take profit levels. Additionally, you can choose from professional mentors who match your trading style and goals.",
    },
    {
      q: "Why is Trade Companion different?",
      a: "Trade Companion simplifies trading by handling the analysis for you. You still place trades yourself, but the platform guides you with signals, risk-adjusted lot sizes, and mentorship support to help you succeed.",
    },
    {
      q: "What more does Trade Companion offer?",
      a: "In addition to signals, Trade Companion provides access to professional forex mentors, risk management recommendations, performance tracking, and learning resources to improve your trading skills.",
    },
    {
      q: "How often will I receive signals?",
      a: "Signal frequency depends on market conditions and your chosen mentor. On average, users receive multiple signals per week, but quality is always prioritized over quantity.",
    },
    {
      q: "Can I use Trade Companion on mobile?",
      a: "Yes. Trade Companion works seamlessly across devices, including mobile, so you can access signals and updates on the go.",
    },
    {
      q: "Does Trade Companion guarantee profits?",
      a: "No trading platform can guarantee profits. Trade Companion increases your chances of success by providing reliable signals, risk-adjusted recommendations, and mentorship—but trading always carries risk.",
    },
    {
      q: "Can I choose my own mentor?",
      a: "Absolutely. Trade Companion allows you to browse and select mentors based on their trading style, ratings, preferred pairs, and pricing.",
    },
    {
      q: "Is my data safe with Trade Companion?",
      a: "Yes. We prioritize your privacy and use industry-standard encryption to ensure your personal data and trading information remain secure.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Header */}
      <div className="flex flex-col items-center mb-12 text-center">
        <h1 className="font-heading font-bold text-5xl tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        <p className="text-xl mt-4 font-body">
          Quick answers to questions that may bother you.
        </p>
      </div>

      {/* FAQ Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl shadow-sm p-4 bg-white"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left font-semibold text-lg"
            >
              {faq.q}
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-600 font-body">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
