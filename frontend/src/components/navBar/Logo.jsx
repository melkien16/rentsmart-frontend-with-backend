import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center cursor-pointer group">
      <div className="relative">
        <div className="rounded-full flex items-center justify-center shadow-lg group-hover:shadow-emerald-400/25 transition-all duration-300">
          <img src="/withBack.svg" alt="" className="w-20 h-20" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
      </div>
    </Link>
  );
};

export default Logo;
