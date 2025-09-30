import React, { useState, useRef, useEffect } from "react";
import EmailVerificationImage from "../../assets/All_PNG/Verify_Email.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner, useToast } from "@chakra-ui/react";
import useAuthStore from "../../contexts/AuthStore";

const VerifyEmailCode = () => {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const toast = useToast();
  const { verifyEmailCode, loading, handleCheckout, error } = useAuthStore();
  const location = useLocation();
  const email = location.state?.email;
  const selectedPlan = location.state?.selectedPlan || null;
  const paymentMethod = location.state?.paymentMethod || null;
  if(selectedPlan && paymentMethod){
    console.log(selectedPlan, paymentMethod);
  }

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (!email) {
      navigate("/auth/signup");
      toast({
        title: "Error",
        description: "No email provided for verfication.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [email, navigate, toast]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCode = codes.join("");

    if (finalCode.length !== 6) {
      toast({
        title: "Incomplete Code",
        description: "Please enter all 6 digits of the verification code.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const result = await verifyEmailCode(finalCode);

    if (!result.success) {
      toast({
        title: "Verification Failed",
        description: result.message || "Invalid code, please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    toast({
      title: "Email Verified",
      description: "You can now log in to your account.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });

    if(selectedPlan && paymentMethod === "stripe"){
      await handleCheckout({selectedPlan, paymentMethod, navigate});
      return
    }

    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex items-center justify-center flex-col p-6">
        {/* <div className="flex w-16 h-16 items-center justify-center mb-4">
          <img src={EmailVerificationImage} alt="" className="w-full h-full" />
        </div> */}
        <h1 className="bg-gradient-to-r from-purple-400 via-pink-400 font-heading to-cyan-400 bg-clip-text text-transparent text-4xl w-[500px] font-bold mb-4 text-center">
          Enter Verification Code
        </h1>
        <p className="text-base font-semibold mb-4 text-center">
          {`Enter the 6-digit code we sent to your email: ${email}`}
        </p>
       
        <div className="flex justify-center gap-2 my-8">
          {codes.map((code, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={code}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-14 h-14 border-cyan-400 text-center text-xl border rounded focus:outline-none focus-border-[10px] focus:border-cyan-500 transition-all ${error && "border-red-500 focus:border-red-500"}`}
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-400 via-pink-400 font-body to-cyan-400 text-white py-2 rounded hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          disabled={!codes.every((code) => code) || loading}
        >
          {loading ? <Spinner size="sm" color="white" /> : "Verify Email"}
        </button>
      </form>
    </div>
  );
};

export default VerifyEmailCode;
