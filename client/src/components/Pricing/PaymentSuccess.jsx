// pages/PaymentSuccess.js
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying payment...");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/stripe/verify-payment",
          { sessionId }
        );

        if (res.data.success) {
          setStatus("✅ Payment successful! Your subscription is active.");
          setPaymentStatus("success");
        } else {
          setStatus(
            "⚠️ Payment could not be verified. Please contact support."
          );
          setPaymentStatus("failed");
        }
      } catch (err) {
        console.error(err);
        setStatus("❌ Error verifying payment.");
        setPaymentStatus("error");
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="relative p-10 rounded-2xl shadow-xl bg-white/70 backdrop-blur-xl border border-white/30 max-w-md w-full text-center animate-fadeIn">
        <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Payment Status
        </h1>

        {/* Lottie Animations */}
        <div className="flex justify-center mb-4">
          {paymentStatus === "pending" && (
            <DotLottieReact
              src="https://lottie.host/9a4656ed-b1f7-4f7c-9c3e-ec4d94dabdd1/ruFSDoD12M.lottie"
              loop
              autoplay
              style={{ width: "200px", height: "200px" }}
            />
          )}
          {paymentStatus === "success" && (
            <DotLottieReact
              src="https://lottie.host/47c0e477-f89e-48bd-a047-67f03431c020/SFYpU1tYwX.lottie"
              autoplay
              style={{ width: "200px", height: "200px" }}
            />
          )}
          {(paymentStatus === "failed" || paymentStatus === "error") && (
            <DotLottieReact
              src="https://lottie.host/33e4184e-bf4e-4d1d-94e0-cfe1e20f065a/BFC4RnvmMX.lottie"
              autoplay
              style={{ width: "200px", height: "200px" }}
            />
          )}
        </div>

        {/* Status message */}
        <p className="text-lg font-medium text-gray-700 mb-6">{status}</p>

        {/* Action Buttons */}
        {paymentStatus === "success" && (
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 shadow-lg hover:scale-[1.02] transition-all"
          >
            Go to Dashboard
          </button>
        )}

        {(paymentStatus === "failed" || paymentStatus === "error") && (
          <button
            onClick={() => navigate("/pricing")}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-400 via-rose-500 to-pink-500 shadow-lg hover:scale-[1.02] transition-all"
          >
            Try Again
          </button>
        )}

        {paymentStatus === "pending" && (
          <p className="mt-4 text-sm text-gray-500 animate-pulse">
            Please wait while we confirm your payment...
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
