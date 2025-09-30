import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RenderPlans from "../../components/Pricing/RenderPlans";
import { monthlyPlans, yearlyPlans } from "../../Utils";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showModal]);

  const handlePaymentChoice = (method) => {
    setShowModal(false);
    navigate(
      `/auth/signup?plan=${encodeURIComponent(
        selectedPlan
      )}&payment=${encodeURIComponent(method)}`
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col relative items-center p-6 justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="flex bg-black absolute top-0 bottom-0 left-0 right-0 opacity-5 pointer-events-none"></div>

      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <h1 className="font-heading font-extrabold tracking-tight bg-gradient-to-r mt-2 from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent text-5xl md:text-6xl">
          Choose Your Plan
        </h1>
        <p className="text-gray-600 font-body mt-4 text-lg max-w-2xl">
          Flexible pricing to suit your trading journey. Upgrade anytime.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setBillingCycle("monthly")}
          className={`px-6 py-2 rounded-l-full font-semibold transition-all ${
            billingCycle === "monthly"
              ? "bg-purple-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle("yearly")}
          className={`px-6 py-2 rounded-r-full font-semibold transition-all ${
            billingCycle === "yearly"
              ? "bg-purple-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Yearly
        </button>
      </div>

      {billingCycle === "monthly" ? (
        <RenderPlans
          plans={monthlyPlans}
          billingCycle={billingCycle}
          setSelectedPlan={setSelectedPlan}
          selectedPlan={selectedPlan}
        />
      ) : (
        <RenderPlans
          plans={yearlyPlans}
          billingCycle={billingCycle}
          setSelectedPlan={setSelectedPlan}
          selectedPlan={selectedPlan}
        />
      )}

      <button
        onClick={() => setShowModal(true)}
        disabled={!selectedPlan}
        className={`mt-14 px-12 py-4 rounded-full font-semibold text-lg shadow-xl transition-all ${
          selectedPlan
            ? "bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-white hover:opacity-90 hover:scale-105"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Subscribe Now
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center z-10">
            <h2 className="text-2xl font-bold mb-6 tracking-tight text-transparent bg-gradient-to-r bg-clip-text from-purple-400 via-pink-400 to-cyan-400">
              Choose Your Payment Method
            </h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handlePaymentChoice("stripe")}
                className="px-6 py-3 bg-purple-500 text-white rounded-full font-semibold shadow hover:bg-purple-600 transition"
              >
                Pay with Card (Stripe)
              </button>
              <button
                onClick={() => handlePaymentChoice("bank_transfer")}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full font-semibold shadow hover:bg-gray-300 transition"
              >
                Bank Transfer
              </button>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
