import React from "react";
import { Bell, TrendingUp } from "lucide-react";


const Notifications = ({
  notifications,
  unreadCount,
  isNotificationsOpen,
  setIsNotificationsOpen,
  handleOpenNotification,
  notificationsRef,
  formatTimeAgo,
}) => {
  return (
    <div className="relative" ref={notificationsRef}>
      <button
        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        className="relative p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
      >
        <Bell className="w-6 h-6 text-gray-300 hover:text-emerald-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {isNotificationsOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white font-semibold">Notifications</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() => handleOpenNotification(notification)}
                className={`p-4 rounded-lg border border-white/10 cursor-pointer transition ${
                  notification.isRead ? "bg-gray-700" : "bg-gray-900"
                }   hover:border-white/20`}
              >
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-emerald-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      {notification.message}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {formatTimeAgo(notification.createdAt)}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
