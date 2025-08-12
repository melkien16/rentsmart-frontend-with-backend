import React from "react";
import { DivideIcon as LucideIcon } from "lucide-react";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  onClick,
  disabled 
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";

  const variants = {
    primary:
      "bg-gradient-to-r from-emerald-400 to-emerald-500 text-black hover:from-emerald-300 hover:to-emerald-400 shadow-lg hover:shadow-emerald-400/25 focus:ring-emerald-400",
    secondary:
      "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-white/10 focus:ring-white/20",
    ghost:
      "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10 focus:ring-emerald-400/20",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-3",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};
