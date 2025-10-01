import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../contexts/AuthStore";
import { Spinner, useToast } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import Logo from "../../assets/All_PNG/Logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
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

        if (!result?.userEmailVerified) {
          navigate("/auth/verify-email", { state: { email: result.user.email } });
        } else {
          navigate("/dashboard");
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

      if (!response.userEmailVerified) {
        navigate("/auth/verify-email", { state: { email } });
      } else {
        navigate("/dashboard");
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
    <div className="w-full h-screen flex relative flex-col items-center justify-center font-body p-6">
      <div className="flex justify-end items-center absolute w-full h-max top-4">
        <img
          src={Logo}
          alt="logo"
          className="w-[100px] h-[100px] object-contain"
        />
      </div>
      <div className="w-full h-[60%] relative flex flex-col items-center justify-center">
        <h1 className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent text-3xl font-bold mb-6">
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
                aria-label="Email Address"
                className="p-3 pl-10 w-full rounded-md bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 border-0"
                required
              />
            </div>

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
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* //Todo: Forgot password */}
            {/* <div className="w-full text-right">
            <Link
              to="/auth/forgot-password"
              className="text-sm text-teal-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div> */}

            {/* Submit */}
            <div className="flex w-full h-max items-center justify-center">
              <button
                type="submit"
                className={`w-[80%] mt-6 py-2 rounded text-white font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 ${
                  !email || !password || loading
                    ? "opacity-50 cursor-not-allowed "
                    : "hover:opacity-90"
                }`}
                disabled={!email || !password || loading}
              >
                {loading ? <Spinner size="sm" color="white" /> : "Login"}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Login */}
            <div className="flex gap-4 items-center justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                disabled={loading}  
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
          </form>
        </div>

        {/* Signup link */}
        <p className="tracking-tight font-semibold text-base">
          Don't have an account?
          <Link
            to="/auth/signup"
            className="underline cursor-pointer bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
          >
            {" "}
            Sign Up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
