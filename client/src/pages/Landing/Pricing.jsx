import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("plus");
  const [billingCycle, setBillingCycle] = useState("monthly"); // toggle between monthly/yearly

  const pricingPlans = [
    {
      id: "basic",
      label: "Basic",
      monthly: "$29.9",
      yearly: "$275.99",
      desc: "Perfect for individuals exploring tools and strategies short-term.",
      features: [
        "Signal generation",
        "Lot size recommendation",
        "Tutorial videos",
        "Selection of only 1 currency pair",
      ],
    },
    {
      id: "plus",
      label: "Plus",
      monthly: "$34.99",
      yearly: "$371.99",
      desc: "Perfect for committed traders seeking consistent market analysis.",
      features: [
        "Signal generation",
        "Lot size recommendation",
        "Tutorial videos",
        "Selection of only 3 currency pairs",
      ],
      recommended: true,
    },
    {
      id: "premium",
      label: "Premium",
      monthly: "$53.99",
      yearly: "$599.99",
      desc: "Includes exclusive courses and monthly webinars for ambitious professionals.",
      features: [
        "Signal generation",
        "Lot size recommendation",
        "Tutorial videos",
        "Selection of 5 currency pairs",
        "1 FX beginner's course",
        "3 working FX strategy videos",
      ],
    },
  ];

  const handleSelect = (planId) => setSelectedPlan(planId);

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-4 justify-center bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <h1 className="font-heading font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent text-5xl md:text-6xl">
          Choose Your Plan
        </h1>
        <p className="text-gray-600 font-body mt-4 text-lg max-w-2xl">
          Flexible pricing to suit your trading journey. Upgrade anytime.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center gap-4 mt-8 bg-gray-200 rounded-full p-2">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              billingCycle === "monthly"
                ? "bg-gradient-to-r t from-purple-400 via-pink-400 to-cyan-400  text-white shadow-md"
                : "text-gray-600"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              billingCycle === "yearly"
                ? "bg-gradient-to-r t from-purple-400 via-pink-400 to-cyan-400  text-white shadow-md"
                : "text-gray-600"
            }`}
          >
            Yearly{" "}
            <span className="ml-1 text-green-600 font-semibold">-20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => handleSelect(plan.id)}
            className={`relative flex flex-col items-center p-8 rounded-3xl cursor-pointer 
              backdrop-blur-xl border transition-all duration-300 
              hover:scale-105 hover:shadow-2xl
              ${
                plan.recommended
                  ? "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-purple-400 ring-2 ring-purple-300"
                  : "bg-white/70 border-gray-200"
              }
              ${
                selectedPlan === plan.id
                  ? "ring-4 ring-purple-500 shadow-lg"
                  : ""
              }
            `}
          >
            {/* Recommended Badge */}
            {plan.recommended && (
              <span className="absolute -top-3 right-6 text-sm font-semibold bg-gradient-to-r  from-purple-400 via-pink-400 to-cyan-400 text-white px-4 py-1 rounded-full shadow-lg">
                Recommended
              </span>
            )}

            {/* Title */}
            <h2 className="text-3xl font-bold font-heading tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              {plan.label}
            </h2>
            <p className="text-gray-600 text-center mt-3 font-body">
              {plan.desc}
            </p>

            {/* Pricing */}
            <div className="mt-6 text-center">
              <p className="text-4xl font-extrabold text-gray-900">
                {billingCycle === "monthly" ? plan.monthly : plan.yearly}
                <span className="text-sm font-medium text-gray-500 ml-1">
                  / {billingCycle === "monthly" ? "month" : "year"}
                </span>
              </p>
              {billingCycle === "yearly" && (
                <p className="text-sm text-green-600 mt-1">Save 20%</p>
              )}
            </div>

            <div className="my-6 w-full h-[1px] bg-gray-200" />

            {/* Features */}
            <ul className="space-y-3 text-gray-700 w-full">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="text-green-500 mt-1" size={20} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <button
        onClick={() => alert(`You selected the ${selectedPlan} plan!`)}
        className="mt-14 px-12 py-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold text-lg shadow-xl hover:opacity-90 hover:scale-105 transition-all"
      >
        Continue to Checkout
      </button>
    </div>
  );
};

export default Pricing;
