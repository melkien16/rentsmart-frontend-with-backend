import React from "react";
import { Bell, Search, LogOut, Menu } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/usersApiSlice";

export const DashboardHeader = ({ onToggleSidebar, title }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApi] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      navigate("/");
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <header className="bg-black/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4 md:pr-12">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-1 sm:p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg sm:text-2xl font-bold text-white truncate">
            {title}
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications */}
          <button className="relative p-1 sm:p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img
              src={
                userInfo?.avatar ||
                "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
              }
              alt={userInfo?.name}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
            />
            {/* <span className="hidden sm:block text-white font-medium text-sm lg:text-base truncate max-w-24 lg:max-w-none">
              {userInfo?.name}
            </span> */}
            <button
              onClick={logoutHandler}
              className="p-1 sm:p-2 rounded-lg hover:bg-red-500/20 transition-colors text-gray-400 hover:text-red-400"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
