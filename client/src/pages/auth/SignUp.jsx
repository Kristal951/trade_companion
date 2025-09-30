import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaLock, FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Radio, RadioGroup, Spinner, Stack, useToast } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import useAuthStore from "../../contexts/AuthStore";
import { IoMdArrowRoundBack } from "react-icons/io";
import Logo from "../../assets/All_PNG/Logo.png";

const SignUp = () => {
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState(null);
  const [age, setAge] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const selectedPlan = query.get("plan");
  const paymentMethod = query.get("payment");

  const { signUp, loading, signInUserWithGoogle } = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();

  const checkAge = (date) => {
    setDob(date);
    const today = new Date();
    let calculatedAge = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge);

    if (calculatedAge < 18) {
      toast({
        title: "Age Restriction",
        description: "You must be at least 18 years old to sign up.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const result = await signInUserWithGoogle(credential);

      if (result.success) {
        toast({
          title: "Login Successful",
          description: "You have successfully logged in with Google.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        if (!result.user?.emailVerified) {
          navigate("/auth/verify-email", {
            state: { email: result.user.email },
          });
        } else {
          navigate("/home");
        }
      } else {
        toast({
          title: "Login Failed",
          description: result.message || "Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Google Login Failed",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const validateEmailFormat = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return false;
    }
    return true;
  };

  const moveToStepTwo = () => {
    if (!validateEmailFormat()) return;
    setStep(2);
  };

  const moveToStepThree = () => {
    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    setStep(3);
  };

  const handleSubmit = async () => {
    if (!name || !email || !password || !age) {
      toast({
        title: "Missing Fields",
        description: "Please complete all steps before submitting.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const payload = { name, email, password, age };
    const result = await signUp(payload);

    if (!result.success) {
      toast({
        title: "Error",
        description: result.message || "Sign up failed.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    toast({
      title: "Account created.",
      description: "Please verify your email to continue.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });

    navigate("/auth/verify-email", {
      state: { email, selectedPlan, paymentMethod },
    });
  };

  const StepIndicator = ({ step }) => (
    <div className="flex w-full justify-center items-center gap-2 mb-6">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`flex-1 h-[0.3rem] rounded-md transition-colors duration-300 ${
            step === s
              ? "bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
              : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full h-screen flex relative flex-col items-center justify-center font-body p-6">
      <div className="flex justify-between w-full h-max absolute top-4">
        <div className="flex p-2 items-center">
          {step > 1 && (
            <button
              className="px-2 py-2 flex gap-2 flex-row items-center bg-gray-100 font-body rounded-md ml-6"
              onClick={() => setStep(step - 1)}
            >
              <IoMdArrowRoundBack />
              Back
            </button>
          )}
        </div>

        <img
          src={Logo}
          alt="logo"
          className="w-[100px] h-[100px] object-contain right-2"
        />
      </div>

      <h1 className="tracking-tight bg-gradient-to-r font-heading from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent text-3xl font-bold mb-6">
        Create an account
      </h1>

      <div className="w-full max-w-md">
        <div className="mb-8">
          <StepIndicator step={step} />
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="relative">
              <IoPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 pl-10 w-full outline-0 rounded-md bg-gray-100 focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 pl-10 w-full outline-0 rounded-md bg-gray-100 focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div className="flex w-full justify-center relative">
              <button
                onClick={moveToStepTwo}
                className={`w-[80%] mt-6 py-2 rounded-md text-white ${
                  !name || !email
                    ? "opacity-50 cursor-not-allowed bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
                    : "bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 hover:opacity-90"
                }`}
                disabled={!name || !email}
              >
                {loading ? <Spinner size="sm" /> : "Next"}
              </button>
            </div>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex gap-4 items-center justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  toast({
                    title: "Google Login Failed",
                    description: "Please try again.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                  });
                }}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="relative w-full">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                aria-label="Password"
                className="p-3 pl-10 pr-10 w-full rounded-md bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 border-0"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-500 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="relative w-full">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Password"
                aria-label="Password"
                className="p-3 pl-10 pr-10 w-full rounded-md bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 border-0"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-500 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <div className="flex w-full justify-center relative">
              <button
                onClick={moveToStepThree}
                className={`w-[80%] mt-6 py-2 rounded-md text-white ${
                  !password || !confirmPassword
                    ? "opacity-50 cursor-not-allowed bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
                    : "bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 hover:opacity-90"
                }`}
                disabled={!password || !confirmPassword}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center">
            <div className="relative">
              <FaRegCalendarAlt className="absolute left-3 top-1/2 z-40 -translate-y-1/2 text-gray-400" />
              <DatePicker
                selected={dob}
                onChange={(date) => checkAge(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Date of Birth"
                className="p-3 pl-10 w-full rounded-md outline-0 bg-gray-100 focus:ring-2 focus:ring-teal-400"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
              />
            </div>

            {/* User Type
            <div>
              <p className="text-left font-medium mb-2">Select User Type</p>
              <RadioGroup onChange={setUserType} value={userType}>
                <Stack direction="row" spacing={6} justify="center">
                  <Radio value="basic">Basic</Radio>
                  <Radio value="premium">Premium</Radio>
                </Stack>
              </RadioGroup>
            </div> */}

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className={`w-[80%] mt-6 py-2 rounded-md text-white ${
                  !dob || loading || age < 18
                    ? "opacity-50 cursor-not-allowed bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
                    : "bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 hover:opacity-90"
                }`}
                disabled={loading || !dob || age < 18}
              >
                {loading ? <Spinner size="sm" /> : "Finish"}
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="tracking-tight font-semibold text-base mt-6">
        Already have an account?
        <Link
          to="/auth/login"
          className="underline cursor-pointer bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
        >
          {" "}
          Log in here
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
