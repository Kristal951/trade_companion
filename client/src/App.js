import React from "react";
import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AuthLayout from "./pages/auth/AuthLayout";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import RootLayout from "./pages/RootLayout";
import VerifyEmailCode from "./pages/auth/VerifyEmailCode";
import Layout from "./pages/Landing/Layout";
import PaymentSuccess from "./components/Pricing/PaymentSuccess";
import PaymentCancelled from "./components/Pricing/PaymentCancelled";

import Dashboard from "./pages/Dashboard";
import ContactUs from "./pages/ContactUs";
import Settings from "./pages/Settings";
import LScalculator from "./pages/LScalculator";
import Tutorials from "./pages/Tutorials";
import Mentors from "./pages/Mentors";
import AIcompanion from "./pages/AIcompanion";

const App = () => {
  const location = useLocation();
  return (
    <div className="w-full h-screen no-scrollbar">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancelled" element={<PaymentCancelled />} />
        <Route path="/auth/verify-email" element={<VerifyEmailCode />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/ai-companion" element={<AIcompanion />} />
          <Route path="/ls-calculator" element={<LScalculator />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
