import React from "react";
import { DivideIcon as LucideIcon } from "lucide-react";

export const ActivityFeed = ({ activities, maxItems = 5 }) => {
  const getStatusColor = (type) => {
    switch (type) {
      case "success":
        return "bg-emerald-400/20 text-emerald-400 border-emerald-400/30";
      case "warning":
        return "bg-orange-400/20 text-orange-400 border-orange-400/30";
      case "error":
        return "bg-red-400/20 text-red-400 border-red-400/30";
      default:
        return "bg-blue-400/20 text-blue-400 border-blue-400/30";
    }
  };

  const getStatusDot = (type) => {
    switch (type) {
      case "success":
        return "bg-emerald-400";
      case "warning":
        return "bg-orange-400";
      case "error":
        return "bg-red-400";
      default:
        return "bg-blue-400";
    }
  };

  return (
    <div className="space-y-4">
      {activities.slice(0, maxItems).map((activity, index) => (
        <div
          key={activity.id}
          className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
        >
          <div
            className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${getStatusColor(
              activity.type
            )}`}
          >
            <activity.icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                {activity.title}
              </p>
              {activity.amount && (
                <span className="text-emerald-400 font-bold text-sm">
                  {activity.amount}
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm mt-1">{activity.description}</p>
            <div className="flex items-center mt-2">
              <div
                className={`w-2 h-2 rounded-full ${getStatusDot(
                  activity.type
                )} mr-2`}
              ></div>
              <span className="text-gray-500 text-xs">{activity.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
