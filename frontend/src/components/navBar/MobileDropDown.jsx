import React from "react";
import { User, LogOut, LayoutDashboard, MessageSquare } from "lucide-react";

const MobileDropDown = ({
  userInfo,
  handleProfile,
  handleLogout,
  handleDashboardClick,
  handleMessage,
}) => {
  return (
    <div className="absolute right-0 mt-2 w-72 bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <img
            src={
              userInfo.avatar ||
              "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
            }
            alt={userInfo.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400/30"
          />
          <div>
            <p className="text-white font-semibold">{userInfo.name}</p>
            <p className="text-gray-400 text-sm">{userInfo.email}</p>
            <span className="inline-block mt-1 px-2 py-1 bg-emerald-400/20 text-emerald-400 text-xs rounded-full capitalize">
              {userInfo.isAdmin ? "Admin" : "User"}
            </span>
          </div>
        </div>
      </div>
      <div className="py-2">
        <button
          onClick={handleDashboardClick}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={handleProfile}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-green-400 hover:bg-green-400/10 transition-all duration-200"
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>

        <button
          onClick={handleMessage}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-green-400 hover:bg-green-400/10 transition-all duration-200"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Message</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default MobileDropDown;
