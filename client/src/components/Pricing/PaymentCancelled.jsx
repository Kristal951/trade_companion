// pages/PaymentCancelled.js
import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 rounded-xl shadow-lg bg-white max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your checkout was canceled. Don’t worry, you haven’t been charged.
        </p>
        <button
          onClick={() => navigate("/pricing")}
          className="px-6 py-3 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentCancelled;
