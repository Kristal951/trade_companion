import React, { useEffect, useState } from "react";
import useAuthStore from "../contexts/AuthStore";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import TopBar from "../components/Dashboard/TopBar";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const RootLayout = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate("/auth/signup", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-white to-cyan-100 overflow-hidden flex">
      <div className="flex items-center">
        <Sidebar isCollapsed={isCollapsed} />

        <div
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="hover:bg-cyan-300 w-6 h-6 flex items-center justify-center rounded-r-md cursor-pointer bg-cyan-100 transition-all duration-300"
        >
          {isCollapsed ? (
            <IoMdArrowDropright className="text-4xl text-cyan-500" />
          ) : (
            <IoMdArrowDropleft className="text-4xl text-cyan-500" />
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
