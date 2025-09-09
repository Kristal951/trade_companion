import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../contexts/AuthStore";
import { Spinner, useToast } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, loginUser, signInUserWithGoogle } = useAuthStore();
  const toast = useToast();
  const navigate = useNavigate();

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
        navigate("/");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      const response = await loginUser({ email, password });

      if (!response.success) {
        toast({
          title: "Error",
          description: response.message || "Log in failed.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }

      toast({
        title: "Login Successful",
        description: "We've successfully logged you into your account.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.log(response);

      if (!response.userEmailVerfied) {
        navigate("/verify-email", { state: { email } });
      } else {
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <div className="w-full h-[60%] flex flex-col items-center justify-center">
      <h1 className=" bg-gradient-to-tr bg-clip-text text-transparent from-indigo-800 to-cyan-400 text-3xl font-bold mb-6">
        Log into your account
      </h1>

      <div className="flex w-[60%] items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative w-full">
            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="p-3 pl-10 w-full rounded-md bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 border-0"
              required
            />
          </div>

          <div className="relative w-full">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-3 pl-10 w-full rounded-md bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 border-0"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-tr cursor-pointer from-indigo-400 to-cyan-400 text-white py-3 rounded-md hover: transition-colors"
            disabled={!email || !password || loading}
          >
            {loading ? <Spinner size="sm" color="white" /> : <p className="text-base font-bold text-ehite">Login</p>}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
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

      <p className="text-cyan-400 font-semibold text-base">
        Don't have an account?{" "}
        <Link to="/signup" className="underline cursor-pointer">
          Sign Up here
        </Link>
      </p>
    </div>
  );
};

export default Login;
