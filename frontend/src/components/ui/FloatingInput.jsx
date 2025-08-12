import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const FloatingInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  icon: Icon,
  required,
}) => {
  const isActive = value !== ""; // check if there's text

  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors peer-focus:text-emerald-400" />
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="peer w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300"
      />
      <label
        htmlFor={id}
        className={`absolute left-10 px-1 bg-gray-900 text-gray-400 transition-all duration-200 
        ${
          isActive
            ? "top-0 text-xs text-emerald-400"
            : "top-1/2 -translate-y-1/2"
        } 
        peer-focus:top-0 peer-focus:text-xs peer-focus:text-emerald-400`}
        style={{ pointerEvents: "none" }}
      >
        {label} {required && "*"}
      </label>
    </div>
  );
};

const FloatingPasswordInput = ({
  id,
  label,
  value,
  onChange,
  icon: Icon,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isActive = value !== "";

  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      )}

      <input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        required={required}
        className="peer w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300"
      />

      <label
        htmlFor={id}
        className={`absolute left-10 px-1 bg-gray-900 text-gray-400 transition-all duration-200
        ${
          isActive
            ? "top-0 text-xs text-emerald-400"
            : "top-1/2 -translate-y-1/2"
        }
        peer-focus:top-0 peer-focus:text-xs peer-focus:text-emerald-400`}
        style={{ pointerEvents: "none" }}
      >
        {label} {required && "*"}
      </label>

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-400"
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export { FloatingInput, FloatingPasswordInput };
