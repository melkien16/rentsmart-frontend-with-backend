import React from "react";

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "emerald",
  className = "",
}) => {
  const colorClasses = {
    emerald:
      "from-emerald-400/20 to-emerald-600/20 border-emerald-400/30 text-emerald-400 bg-emerald-400/20",
    blue: "from-blue-400/20 to-blue-600/20 border-blue-400/30 text-blue-400 bg-blue-400/20",
    purple:
      "from-purple-400/20 to-purple-600/20 border-purple-400/30 text-purple-400 bg-purple-400/20",
    red: "from-red-400/20 to-red-600/20 border-red-400/30 text-red-400 bg-red-400/20",
    yellow:
      "from-yellow-400/20 to-yellow-600/20 border-yellow-400/30 text-yellow-400 bg-yellow-400/20",
    orange:
      "from-orange-400/20 to-orange-600/20 border-orange-400/30 text-orange-400 bg-orange-400/20",
    indigo:
      "from-indigo-400/20 to-indigo-600/20 border-indigo-400/30 text-indigo-400 bg-indigo-400/20",
    pink: "from-pink-400/20 to-pink-600/20 border-pink-400/30 text-pink-400 bg-pink-400/20",
  };

  const selectedColor = colorClasses[color] || colorClasses.emerald;

  return (
    <div
      className={`bg-gradient-to-br ${selectedColor} rounded-2xl border p-4 sm:p-6 hover:scale-105 transition-all duration-300 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium mb-1`}>{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {value}
          </p>
          {subtitle && (
            <p className={`text-sm flex items-center gap-1`}>
              <Icon className="w-4 h-4" />
              {subtitle}
            </p>
          )}
        </div>
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ml-3`}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>
    </div>
  );
};
