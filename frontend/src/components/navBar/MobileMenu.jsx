import React from "react";
import { Link } from "react-router-dom";
import { User, LogOut, LayoutDashboard, MessageSquare } from "lucide-react";
import { Button } from "../ui/Button";

import navItems from "./navItems";

const MobileMenu = ({
  setIsMobileMenuOpen,
  userInfo,
  handleProfile,
  handleLogout,
  handleDashboardClick,
  handleMessage,
}) => {
  return (
    <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {navItems.map((item) => (
          <Link key={item.name} to={item.link}>
            <button
              key={item.name}
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 w-full px-3 py-2 text-gray-300 hover:text-emerald-400 transition-colors rounded-lg hover:bg-white/10"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </button>
          </Link>
        ))}

        {/* Mobile Authentication */}
        {!userInfo ? (
          <div className="px-3 pt-4 space-y-2">
            <Link to="/signin">
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <div className="border-t border-white/10 pt-4 mt-4">
            <div className="flex items-center space-x-3 px-3 py-2">
              <img
                src={
                  userInfo.avatar ||
                  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                }
                alt={userInfo.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-white font-medium">{userInfo.name}</p>
                <p className="text-gray-400 text-sm capitalize">
                  {userInfo.isAdmin ? "Admin" : "User"}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                handleDashboardClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-gray-300 hover:text-emerald-400 transition-colors flex items-center space-x-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => {
                handleProfile();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => {
                handleMessage();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message</span>
            </button>

            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-gray-300 hover:text-red-400 transition-colors flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
