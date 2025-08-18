import { useState } from "react";
import { X } from "lucide-react";

const NotificationModal = ({ notification, onClose }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-end z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border border-white/10 w-full max-w-lg shadow-xl mt-20 mr-0 relative">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <h3 className="text-xl font-semibold text-white">
            {notification.type}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3">
          <p className="text-gray-300">{notification.message}</p>
          {notification.data && (
            <div className="bg-gray-800 rounded-lg p-4 border border-white/5">
              <p className="text-sm text-gray-400">
                Booking ID:{" "}
                <span className="text-white">
                  {notification.data.bookingId}
                </span>
              </p>
              {"penaltyAmount" in notification.data && (
                <p className="text-sm text-gray-400">
                  Remaining Penalty:{" "}
                  <span className="text-red-400 font-medium">
                    {notification.data.penaltyAmount} birr
                  </span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg text-white font-medium transition"
          >
            Close
          </button>
        </div>

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-2xl">
            <div className="w-8 h-8 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
