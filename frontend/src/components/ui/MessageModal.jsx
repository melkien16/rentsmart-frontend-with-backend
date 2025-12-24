import React from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

const MessageModal = ({
  type = "info", // "success" | "error" | "info"
  title = "Notification",
  message = "This is a message.",
  description = "",
  onClose,
}) => {
  // Icon & color mapping
  const config = {
    success: {
      icon: <CheckCircle className="h-12 w-12 text-emerald-400" />,
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/30",
      text: "text-emerald-400",
    },
    error: {
      icon: <XCircle className="h-12 w-12 text-red-400" />,
      bg: "bg-red-400/10",
      border: "border-red-400/30",
      text: "text-red-400",
    },
    info: {
      icon: <Info className="h-12 w-12 text-blue-400" />,
      bg: "bg-blue-400/10",
      border: "border-blue-400/30",
      text: "text-blue-400",
    },
  };

  const { icon, bg, border, text } = config[type] || config.info;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white/5 ${border} border rounded-2xl p-6 w-full max-w-md shadow-xl animate-fadeIn`}
      >
        <div className="text-center">
          {/* Icon */}
          <div
            className={`w-20 h-20 ${bg} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            {icon}
          </div>

          {/* Title & Message */}
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 mb-6">
            <span className={`${text} font-semibold`}>{message}</span>
            {description && ` ${description}`}
          </p>

          {/* Close Button */}
          <button
            onClick={onClose}
            className={`px-5 py-2.5 ${bg} ${border} rounded-xl ${text} font-medium flex items-center justify-center gap-2 mx-auto hover:bg-opacity-30 hover:border-opacity-50 transition-all duration-300`}
          >
            <X className="h-5 w-5" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
