import React, { useEffect } from "react";
import useAuthStore from "../contexts/AuthStore";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const { user, isAuthenticated } = useAuthStore();
  console.log(user, isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate("/signup", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);
  return (
    <div className="w-full h-screen bg-white">
      <Outlet />
    </div>
  );
};

export default RootLayout;
