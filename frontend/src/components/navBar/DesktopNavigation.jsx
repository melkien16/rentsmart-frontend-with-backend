import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/Button";
import NotificationModal from "../ui/NotificationModal";
import navItems from "./navItems";
import formatTimeAgo from "../../helper/formatTimeAgo";
import Notification from "./Notifications";
import MobileDropDown from "./MobileDropDown";

const DesktopNavigation = ({
  userInfo,
  handleProfile,
  handleLogout,
  handleDashboardClick,
  handleMessage,
  notifications,
  unreadCount,
  isNotificationsOpen,
  setIsNotificationsOpen,
  selectedNotification,
  setSelectedNotification,
  handleOpenNotification,
  isUserMenuOpen,
  setIsUserMenuOpen,
  notificationsRef,
  userMenuRef,
}) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.link}
          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium rounded-xl hover:bg-white/10"
        >
          <item.icon className="w-4 h-4" />
          <span>{item.name}</span>
        </Link>
      ))}

      {/* Notifications */}
      {userInfo && (
        <Notification
          notifications={notifications}
          unreadCount={unreadCount}
          isNotificationsOpen={isNotificationsOpen}
          setIsNotificationsOpen={setIsNotificationsOpen}
          handleOpenNotification={handleOpenNotification}
          notificationsRef={notificationsRef}
          formatTimeAgo={formatTimeAgo}
        />
      )}
      {selectedNotification && (
        <NotificationModal
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
        />
      )}

      {/* Authentication Section */}
      {!userInfo ? (
        <div className="flex items-center space-x-3">
          <Link to={"/signin"}>
            <Button variant="primary" size="sm">
              Sign In
            </Button>
          </Link>
        </div>
      ) : (
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            <div className="relative">
              <img
                src={
                  userInfo.avatar ||
                  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                }
                alt={userInfo.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400/30"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black"></div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isUserMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Enhanced User Dropdown Menu */}
          {isUserMenuOpen && (
            <MobileDropDown
              userInfo={userInfo}
              handleProfile={handleProfile}
              handleLogout={handleLogout}
              handleDashboardClick={handleDashboardClick}
              handleMessage={handleMessage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DesktopNavigation;
