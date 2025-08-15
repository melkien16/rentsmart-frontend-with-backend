import React from "react";
import { CheckCircle, X } from "lucide-react";

const PaySuccessModal = ({
  amount,
  message = "Withdrawal Successful!",
  description = "has been withdrawn from your account.",
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/5 border border-emerald-400/20 rounded-2xl p-6 w-full max-w-md shadow-xl animate-fadeIn">
        <div className="text-center">
          <div className="w-20 h-20 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{message}</h3>
          <p className="text-gray-400 mb-6">
            <span className="text-emerald-400 font-semibold">
              ${amount?.toFixed(2) || "0.00"}{" "}
            </span>{" "}
            {description}
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-400/10 border border-emerald-400/30 rounded-xl text-emerald-400 font-medium flex items-center justify-center gap-2 mx-auto hover:bg-emerald-400/20 hover:border-emerald-400/50 transition-all duration-300"
          >
            <X className="h-5 w-5" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaySuccessModal;
