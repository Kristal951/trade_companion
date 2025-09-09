import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaLock, FaRegCalendarAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuthStore from "../../contexts/AuthStore";
import { Spinner, useToast } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(null);
  const [age, setAge] = useState(null);
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
    console.log("Calculated Age:", calculatedAge);
    if (calculatedAge < 18) {
      return toast({
        title: "Age Restriction",
        description: "You must be at least 18 years old to sign up.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (age < 18) {
      toast({
        title: "Age Restriction",
        description: "You must be at least 18 years old to sign up.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (!name || !email || !password || !age) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields before submitting.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const result = await signUp({ name, email, password, age });

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
      description:
        "We've created your account for you. Please verify your email to continue.",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });

    navigate("/verify-email", { state: { email } });
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
        navigate("/login");
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

  return (
    <div className="w-full h-[60%] flex flex-col items-center justify-center">
      <h1 className="text-teal-400 text-3xl font-bold mb-6">
        Create an account
      </h1>

      <div className="flex w-[60%] items-center justify-center p-6">
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div className="relative w-full">
            <IoPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 pl-10 w-full rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 border-0"
            />
          </div>

          <div className="relative w-full">
            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 pl-10 w-full rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 border-0"
            />
          </div>

          <div className="relative w-full">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 pl-10 w-full rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 border-0"
            />
          </div>

          <div className="relative w-full cursor-pointer">
            <FaRegCalendarAlt className="absolute left-3 top-1/2 z-40 -translate-y-1/2 text-gray-400 text-lg" />
            <DatePicker
              selected={dob}
              onChange={(date) => checkAge(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Date of Birth"
              className="p-3 pl-10 w-full rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 border-0"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-400 text-white py-3 rounded-md hover:bg-teal-500 transition-colors"
            disabled={loading || !name || !email || !password || !age}
          >
            {loading ? <Spinner /> : "Sign Up"}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex gap-4 items-center justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleGoogleLogin(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </form>
      </div>

      <p className="text-teal-400 font-semibold text-base">
        Already have an account,
        <Link to="/login" className="underline cursor-pointer">
          {" "}
          Log in here
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
