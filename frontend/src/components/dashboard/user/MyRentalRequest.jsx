import { useState } from "react";
import {
  Package,
  Check,
  List,
  Grid,
  Download,
  X,
  Calendar,
  Mail,
} from "lucide-react";
import { format } from "date-fns"; //{format(new Date(booking.startDate), "MMM d, yyyy")}
import { toast } from "react-toastify";

import RentalDetailsModal from "../../ui/RentalDetailModal";
import Loader from "../../ui/Loader";

import {
  useGetBookingForOwnerQuery,
  useUpdateBookingStatusMutation,
  useCancelBookingMutation,
} from "../../../slices/bookingsApiSlice";

const MyRentalRequests = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [selectedRental, setSelectedRental] = useState(null);
  const [acceptanceCodes, setAcceptanceCodes] = useState({});
  const [viewMode, setViewMode] = useState("grid");

  const { data: bookings, isLoading, error } = useGetBookingForOwnerQuery();
  const [updateBookingStatus] = useUpdateBookingStatusMutation();
  const [cancelBooking] = useCancelBookingMutation();
  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>Error loading rental requests: {error.message}</p>
      </div>
    );
  }
  //from bookings data, accourding to status, filter the rentals
  const completedRentals = bookings.filter(
    (booking) => booking.status === "completed"
  );
  const activeRentals = bookings.filter(
    (booking) => booking.status === "active" || booking.status === "in_use"
  );
  const pendingRentals = bookings.filter(
    (booking) => booking.status === "pending"
  );
  const confirmedRentals = bookings.filter(
    (booking) => booking.status === "confirmed"
  );
  const cancelledRentals = bookings.filter(
    (booking) => booking.status === "cancelled"
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      case "pending":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      case "confirmed":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      case "completed":
        return "bg-purple-400/20 text-purple-400 border-purple-400/30";
      case "cancelled":
        return "bg-red-400/20 text-red-400 border-red-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      case "pending":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    }
  };

  const currentRentals = (() => {
    switch (activeTab) {
      case "active":
        return activeRentals;
      case "pending":
        return pendingRentals;
      case "confirmed":
        return confirmedRentals;
      case "cancelled":
        return cancelledRentals;
      case "completed":
        return completedRentals;
      default:
        return [];
    }
  })();

  const handleConfirm = async (e, id) => {
    e.stopPropagation();
    try {
      await updateBookingStatus({id, status: "confirmed", code: "00000000"}).unwrap();

      toast.success("Rental request confirmed successfully.");
      setSelectedRental(null);
    } catch (error) {
      console.log("Confirm error:", error);
      const message =
        error?.data?.message ||
        "Failed to confirm rental request. Please try again.";
      toast.error(message);
    }
  };

  // ✅ Reject booking
  const handleReject = async (e, id) => {
    e.stopPropagation();
    try {
      await cancelBooking(id).unwrap();

      toast.success("Rental request rejected successfully.");
      setSelectedRental(null);
    } catch (error) {
      const message =
        error?.data?.message ||
        "Failed to reject rental request. Please try again.";
      toast.error(message);
    }
  };

  const handleSend = async (e, id, code) => {
    e.stopPropagation();

    if (!code) {
      toast.error("Please enter acceptance code.");
      return;
    }

    try {
      await updateBookingStatus({ id, status: "in_use", code }).unwrap();

      toast.success("Item sent successfully.");
      setSelectedRental(null);
      setAcceptanceCodes((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      const message =
        error?.data?.message || "Failed to send item. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-emerald-400/10 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-400" />
              Rental Requests
            </h2>
            <p className="text-gray-300 mt-2">
              Manage your rental requests, view details, and track statuses.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="hidden md:flex bg-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-blue-400 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-blue-400 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            <button className="px-6 py-2 bg-blue-400 text-black rounded-xl hover:bg-blue-500 transition-all duration-200 flex items-center gap-2 font-semibold">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="border-b border-white/10">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {[
              {
                id: "active",
                label: "Active",
                count: activeRentals.length,
              },
              {
                id: "pending",
                label: "Pending",
                count: pendingRentals.length,
              },
              {
                id: "confirmed",
                label: "Confirmed",
                count: confirmedRentals.length,
              },
              {
                id: "cancelled",
                label: "Cancelled",
                count: cancelledRentals.length,
              },
              {
                id: "completed",
                label: "Completed",
                count: completedRentals.length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-400 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activeTab === tab.id
                      ? "bg-blue-400/20 text-blue-400"
                      : "bg-gray-400/20 text-gray-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentRentals.map((rental) => (
                <div
                  key={rental?._id}
                  className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-blue-400/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedRental(rental)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          {rental?.item.title}
                        </h3>
                        <span className="text-gray-400 text-sm">
                          {rental?.item.category}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                        rental?.status
                      )}`}
                    >
                      {rental?.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Renter</span>
                      <span className="text-white text-sm">
                        {rental?.user.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Total Price</span>
                      <span className="text-white font-semibold">
                        ${rental?.totalPrice}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Duration</span>
                      <span className="text-blue-400">
                        {format(new Date(rental.startDate), "MMM d, yyyy")} -{" "}
                        {format(new Date(rental.endDate), "MMM d, yyyy")}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPaymentStatusColor(
                          rental.paymentStatus
                        )}`}
                      >
                        {rental.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Buttons based on currentTab */}
                  <div className="mt-4 flex flex-col gap-2">
                    {activeTab === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => handleConfirm(e, rental?._id)}
                          className="px-3 py-2 btn-primary bg-[#00FF99]/20 border border-[#00FF99]/40 text-[#00FF99] hover:bg-[#00FF99]/30 hover:border-[#00FF99]/50 rounded-lg transition-colors text-sm font-medium w-full"
                        >
                          <Check className="w-4 h-4 inline" />
                          Confirm
                        </button>
                        <button
                          onClick={(e) => handleReject(e, rental?._id)}
                          className="px-4 py-2 bg-[#FF0000]/20 border border-[#FF0000]/40 text-[#FF0000] rounded-lg hover:bg-[#FF0000]/30 hover:border-[#FF0000]/50 transition-colors font-semibold w-full"
                        >
                          <X className="w-4 h-4 inline" />
                          Reject
                        </button>
                      </div>
                    )}

                    {activeTab === "confirmed" && (
                      <>
                        <input
                          type="text"
                          placeholder="Acceptance Code"
                          value={acceptanceCodes[rental._id] || ""}
                          onChange={(e) =>
                            setAcceptanceCodes((prev) => ({
                              ...prev,
                              [rental._id]: e.target.value,
                            }))
                          }
                          className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm w-full"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={(e) =>
                              handleSend(
                                e,
                                rental?._id,
                                acceptanceCodes[rental?._id] || ""
                              )
                            }
                            className="px-3 py-2 btn-primary bg-[#00FF99]/20 border border-[#00FF99]/40 text-[#00FF99] hover:bg-[#00FF99]/30 hover:border-[#00FF99]/50 rounded-lg transition-colors text-sm font-medium w-full flex items-center justify-center gap-1"
                          >
                            <Mail className="w-4 h-4 inline" /> Send Item
                          </button>

                          <button
                            onClick={(e) =>
                              handleReject(e, rental?._id, rental?.status)
                            }
                            className="px-4 py-2 bg-[#FF0000]/20 border border-[#FF0000]/40 text-[#FF0000] rounded-lg hover:bg-[#FF0000]/30 hover:border-[#FF0000]/50 transition-colors font-semibold w-full flex items-center justify-center gap-1"
                          >
                            <X className="w-4 h-4 inline" />
                            Cancel
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {currentRentals.map((rental) => (
                <div
                  key={rental._id}
                  className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-blue-400/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedRental(rental)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-400/20 rounded-xl flex items-center justify-center">
                        <Package className="w-8 h-8 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">
                          {rental?.item.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {rental?.item.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-gray-400 text-sm">
                            Renter: {rental?.user.name}
                          </span>
                          <span className="text-gray-400 text-sm">
                            Location: {rental?.user.address}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold text-lg">
                        ${rental.totalPrice}
                      </div>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          rental.status
                        )}`}
                      >
                        {rental.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedRental && (
        <RentalDetailsModal
          getStatusColor={getStatusColor}
          selectedRental={selectedRental}
          setSelectedRental={setSelectedRental}
          currentTab={activeTab}
          onHandleConfirm={handleConfirm}
          onHandleReject={handleReject}
          onHandleSend={handleSend}
        />
      )}
    </div>
  );
};

export default MyRentalRequests;
