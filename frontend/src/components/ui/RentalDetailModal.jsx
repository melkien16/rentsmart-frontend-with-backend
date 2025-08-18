import { X, Package, Star, ShieldCheck, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const RentalDetailsModal = ({
  selectedRental,
  setSelectedRental,
  currentTab,
  getStatusColor,
  onHandleSend,
  onHandleReject,
  onHandleConfirm,
}) => {
  const [acceptanceCode, setAcceptanceCode] = useState("");
  const navigate = useNavigate();

  if (!selectedRental) return null;

  const renderActions = () => {
    switch (currentTab) {
      case "pending":
        return (
          <div className="flex flex-row gap-3 w-full">
            <button className="flex-1 px-4 py-2 btn-primary bg-[#00FF99]/20 border border-[#00FF99]/40 text-[#00FF99] hover:bg-[#00FF99]/30 hover:border-[#00FF99]/50 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
              onClick={(e) => {
                console.log("Confirming booking...");
                onHandleConfirm(e, selectedRental._id);
              }}
            >
              <Package className="w-4 h-4 inline" />
              Confirm
            </button>
            <button
              onClick={(e) => {
                console.log("Rejecting booking...");
                onHandleReject(e, selectedRental._id);
              }}
              className="flex-1 px-4 py-2 bg-[#FF0000]/20 border border-[#FF0000]/40 text-[#FF0000] rounded-lg hover:bg-[#FF0000]/30 hover:border-[#FF0000]/50 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4 inline" />
              Cancel
            </button>
          </div>
        );
      case "confirmed":
        return (
          <div className="w-full flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={acceptanceCode}
              onChange={(e) => setAcceptanceCode(e.target.value)}
              placeholder="Enter acceptance code"
              className="flex-1 px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            <button className="px-4 py-2 btn-primary bg-[#00FF99]/20 border border-[#00FF99]/40 text-[#00FF99] hover:bg-[#00FF99]/30 hover:border-[#00FF99]/50 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
              onClick={(e) => {
                onHandleSend(e, selectedRental._id, acceptanceCode);
              }}
            >
              <Mail className="w-4 h-4 inline" />
              Send Item
            </button>
            <button 
              onClick={(e) => {
                onHandleReject(e, selectedRental._id);
              }}
             className="px-4 py-2 bg-[#FF0000]/20 border border-[#FF0000]/40 text-[#FF0000] rounded-lg hover:bg-[#FF0000]/30 hover:border-[#FF0000]/50 transition-colors font-semibold flex items-center justify-center gap-2">
              <X className="w-4 h-4 inline" />
              Cancel
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border border-white/10 shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-400" />
            Rental Details - {selectedRental.item.title}
          </h3>
          <button
            onClick={() => setSelectedRental(null)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
          {/* Item & Renter Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Item */}
            <div className="space-y-4">
              <h4 className="text-gray-300 uppercase text-sm tracking-wide">
                Item Information
              </h4>
              <p className="text-white font-medium">
                {selectedRental.item.title}
              </p>
              <p className="text-gray-400 text-sm">
                {selectedRental.item.description}
              </p>
              <img
                src={selectedRental?.item?.images[0]}
                alt={selectedRental?.item?.title}
                className="w-full h-48 object-cover rounded-lg border border-white/10"
              />
            </div>

            {/* Renter */}
            <div className="space-y-4">
              <h4 className="text-gray-300 uppercase text-sm tracking-wide">
                Renter Information
              </h4>
              <div className="flex items-center gap-4">
                <img
                  src={selectedRental.user.avatar}
                  alt={selectedRental.user.name}
                  className="w-16 h-16 rounded-full border-2 border-blue-400/30"
                />
                <div>
                  <p className="text-white font-semibold">
                    {selectedRental.user.name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {selectedRental.user.email}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Joined{" "}
                    {format(
                      new Date(selectedRental.user.createdAt),
                      "MMM dd, yyyy"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-blue-400" />{" "}
                {selectedRental.user.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-blue-400" />{" "}
                {selectedRental.user.phone}
              </div>
              <div>
                <span className="text-gray-400 text-sm">Location</span>
                <p className="text-white">{selectedRental.user.address}</p>
              </div>
              {/* {add a badge if renter isPremium is true} */}
              {!selectedRental.user.isPremium && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-yellow-400" />
                    Premium
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-sm">
                  Verified Renter
                </span>
              </div>
              {/* {add a small and thin button view profile, and onClick to navigate /owner-profile/user id and redirect to /} */}
              <button
                className="mt-2 px-3 py-1 text-xs border border-blue-400 text-blue-400 rounded-full hover:bg-blue-400/10 transition-colors"
                onClick={() =>
                  navigate(`/owner-profile/${selectedRental.user._id}`)
                }
              >
                View Profile
              </button>
            </div>
          </div>

          {/* Rental Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <span className="text-gray-400 text-sm">Rental Period</span>
              <p className="text-white">
                {format(new Date(selectedRental.startDate), "MMM dd", "yyyy")} →{" "}
                {format(new Date(selectedRental.endDate), "MMM dd", "yyyy")}
              </p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Total Price</span>
              <p className="text-white font-semibold text-lg">
                ${selectedRental.totalPrice}
              </p>
            </div>
          </div>

          {/* Status */}
          <div>
            <span className="text-gray-400 text-sm">Status</span>
            <span
              className={`ml-2 inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                selectedRental.status
              )}`}
            >
              {selectedRental.status}
            </span>
          </div>

          {/* Reviews */}
          {selectedRental?.item?.rating && (
            <div>
              <div className="flex items-center gap-2 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < selectedRental?.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                ))}
                <span className="text-white ml-2">
                  {selectedRental?.item.rating}/5
                </span>
              </div>
              <p className="text-gray-300 mt-2">
                reviews({selectedRental?.item?.reviews})
              </p>
            </div>
          )}

          {/* Action Buttons (dynamic per currentTab) */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
            {renderActions()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalDetailsModal;
