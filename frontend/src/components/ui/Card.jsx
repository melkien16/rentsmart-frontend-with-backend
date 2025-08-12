import React from "react";

export const Card = ({ children, className = "", hover = true, ...props }) => {
  return (
    <div
      className={`
      bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 
      shadow-xl shadow-black/20
      ${
        hover
          ? "hover:bg-white/5 hover:border-white/10 hover:scale-100 hover:shadow-emerald-400/10 transition-all duration-300"
          : ""
      }
      ${className}
    `}
      {...props}
    >
      {children}
    </div>
  );
};
