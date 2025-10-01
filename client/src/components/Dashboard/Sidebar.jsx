import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import dashboardLinks from "../../data/dashboardLinks";
import { IoMdArrowDropdown } from "react-icons/io";
import useAuthStore from "../../contexts/AuthStore";
import Logo from "../../assets/All_PNG/Logo.png";
import { MdOutlineLogout } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = ({ isCollapsed }) => {
  const { user, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className={`h-screen flex flex-col justify-between shadow-md bg-transparent transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div
        className={`flex items-center mt-4 ${
          isCollapsed ? "justify-center" : "justify-start"
        }`}
      >
        {" "}
        <img
          src={Logo}
          alt="Logo"
          className={`h-[70px] ${isCollapsed ? "w-[70px]" : "w-[60px]"}`}
        />{" "}
        <h1
          className={`text-xl font-bold tracking-tight bg-gradient-to-r font-heading from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          {" "}
          Trade Companion{" "}
        </h1>{" "}
      </div>

      <nav
        className={`flex flex-col gap-2 px-2 h-[60%] ${
          isCollapsed ? "items-center justify-start" : "items-start mt-4"
        }`}
      >
        {dashboardLinks.map(({ label, ActiveIcon, InActiveIcon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 font-body rounded-md px-3 py-2 transition-all duration-200 ${
                isActive
                  ? "text-cyan-500 font-semibold"
                  : "text-gray-600 hover:text-cyan-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <ActiveIcon size={24} />
                ) : (
                  <InActiveIcon size={22} />
                )}
                {!isCollapsed && <span className="text-[15px]">{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-2 mb-6 flex flex-col">
        {isCollapsed && (
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="w-full hover:bg-cyan-200 p-1 rounded-md flex items-center mb-4 justify-center"
          >
            <BsThreeDots className="text-2xl " />
          </button>
        )}
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="flex items-center gap-2 w-full text-left border border-cyan-300 rounded-3xl p-3 hover:bg-cyan-200 active:bg-cyan-300 relative"
          aria-expanded={showMenu}
          aria-haspopup="menu"
        >
          <img
            src={user?.image || "https://via.placeholder.com/40"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col overflow-hidden">
            <p className="truncate ">{user?.name || "User"}</p>
            <span title={user.email} className="text-sm font-medium truncate">
              {user?.email}
            </span>
          </div>
          <IoMdArrowDropdown
            size={20}
            className={`ml-auto transition-transform ${
              showMenu ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {showMenu && (
          <div
            className={`absolute rounded-md ${
              isCollapsed ? "bottom-10" : "bottom-16"
            } left-4 w-48 bg-cyan-100 shadow-lg rounded-md border-cyan-300 backdrop-blur-md`}
          >
            <button className="w-full flex items-center justify-start px-4 py-2 gap-2 hover:bg-cyan-200">
              <IoSettingsOutline className="text-2xl" />
              Settings
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center justify-start px-4 py-2 gap-2 hover:bg-cyan-200"
            >
              <MdOutlineLogout className="text-2xl text-red-500" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
