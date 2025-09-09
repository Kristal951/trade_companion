import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AuthLayout from "./pages/auth/AuthLayout";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import VerifyEmailCode from "./pages/auth/VerifyEmailCode";
import Layout from "./pages/Landing/Layout";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div className="w-full h-screen no-scrollbar">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />} />
          <Route path="/auth/verify-email" element={<VerifyEmailCode />} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="/app" element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </div>
    </AnimatePresence>
  );
};

export default App;
