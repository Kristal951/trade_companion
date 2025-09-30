import { CheckCircle2 } from "lucide-react";
import React from "react";

const RenderPlans = ({
  plans,
  selectedPlan,
  setSelectedPlan,
  billingCycle,
}) => {
  const handleSelect = (planId) => setSelectedPlan(planId);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl mt-10">
      {plans.map((plan) => (
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
              selectedPlan === plan.id ? "ring-4 ring-purple-500 shadow-lg" : ""
            }
          `}
        >
          {plan.recommended && (
            <span className="absolute -top-3 right-6 text-sm font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-white px-4 py-1 rounded-full shadow-lg">
              Recommended
            </span>
          )}
          <h2 className="text-3xl font-bold font-heading tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            {plan.label}
          </h2>
          <p className="text-gray-600 text-center mt-3 font-body">
            {plan.desc}
          </p>
          <div className="mt-6 text-center">
            <p className="text-4xl font-extrabold text-gray-900">
              {plan.price}
              <span className="text-sm font-medium text-gray-500 ml-1">
                / {billingCycle === "monthly" ? "month" : "year"}
              </span>
            </p>
          </div>
          <div className="my-6 w-full h-[1px] bg-gray-200" />
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
  );
};

export default RenderPlans;
