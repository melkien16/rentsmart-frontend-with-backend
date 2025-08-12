import React from "react";
import { DivideIcon as LucideIcon } from "lucide-react";

export const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  color = "emerald",
  trend = "neutral",
}) => {
  const colorClasses = {
    emerald: "bg-emerald-400/20 text-emerald-400 border-emerald-400/30",
    blue: "bg-blue-400/20 text-blue-400 border-blue-400/30",
    purple: "bg-purple-400/20 text-purple-400 border-purple-400/30",
    orange: "bg-orange-400/20 text-orange-400 border-orange-400/30",
    red: "bg-red-400/20 text-red-400 border-red-400/30",
    yellow: "bg-yellow-400/20 text-yellow-400 border-yellow-400/30",
  };

  const trendColors = {
    up: "text-emerald-400",
    down: "text-red-400",
    neutral: "text-gray-400",
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
            {value}
          </p>
          {change && (
            <p className={`text-sm font-medium ${trendColors[trend]}`}>
              {change}
            </p>
          )}
        </div>
        <div
          className={`w-14 h-14 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${colorClasses[color]}`}
        >
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
};
