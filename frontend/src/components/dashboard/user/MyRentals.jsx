import { mockRentals } from "../mockUserData";
import { useState } from "react";
import {
  Package,
  TrendingUp,
  Clock,
  Check,
  List,
  Grid,
  Download,
  X,
  Star,
  DollarSign,
  } from "lucide-react";

const MyRentals = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [selectedRental, setSelectedRental] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      case "pending":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      case "completed":
        return "bg-blue-400/20 text-blue-400 border-blue-400/30";
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

  const getDepositStatusColor = (status) => {
    switch (status) {
      case "held":
        return "bg-blue-400/20 text-blue-400 border-blue-400/30";
      case "returned":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      case "pending":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    }
  };

  const currentRentals = mockRentals[activeTab] || [];

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-emerald-400/10 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-400" />
              My Rentals
            </h2>
            <p className="text-gray-300 mt-2">
              Manage your active, pending, and completed rentals
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl border border-green-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">
                Active Rentals
              </p>
              <p className="text-3xl font-bold text-white">
                {mockRentals.active.length}
              </p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Currently renting
              </p>
            </div>
            <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl border border-yellow-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">
                Pending Rentals
              </p>
              <p className="text-3xl font-bold text-white">
                {mockRentals.pending.length}
              </p>
              <p className="text-yellow-400 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Awaiting approval
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl border border-blue-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-white">
                {mockRentals.completed.length}
              </p>
              <p className="text-blue-400 text-sm flex items-center gap-1">
                <Check className="w-4 h-4" />
                Past rentals
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
              <Check className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl border border-purple-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">
                Total Earnings
              </p>
              <p className="text-3xl font-bold text-white">$685</p>
              <p className="text-purple-400 text-sm flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                This month
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-400" />
            </div>
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
                count: mockRentals.active.length,
              },
              {
                id: "pending",
                label: "Pending",
                count: mockRentals.pending.length,
              },
              {
                id: "completed",
                label: "Completed",
                count: mockRentals.completed.length,
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
                  key={rental.id}
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
                          {rental.item.title}
                        </h3>
                        <span className="text-gray-400 text-sm">
                          {rental.item.category}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                        rental.status
                      )}`}
                    >
                      {rental.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Renter</span>
                      <span className="text-white text-sm">
                        {rental.renter.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Total Price</span>
                      <span className="text-white font-semibold">
                        ${rental.totalPrice}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Deposit</span>
                      <span className="text-emerald-400 text-sm">
                        ${rental.deposit}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Duration</span>
                      <span className="text-blue-400">
                        {rental.startDate} - {rental.endDate}
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
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getDepositStatusColor(
                          rental.depositStatus
                        )}`}
                      >
                        {rental.depositStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRental(rental);
                      }}
                      className="flex-1 px-3 py-2 bg-blue-400 text-black rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
                    >
                      View Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle contact renter
                      }}
                      className="flex-1 px-3 py-2 bg-emerald-400 text-black rounded-lg hover:bg-emerald-500 transition-colors text-sm font-medium"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {currentRentals.map((rental) => (
                <div
                  key={rental.id}
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
                          {rental.item.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {rental.item.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-gray-400 text-sm">
                            Renter: {rental.renter.name}
                          </span>
                          <span className="text-gray-400 text-sm">
                            Location: {rental.location}
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

      {/* Rental Detail Modal */}
      {selectedRental && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-400" />
                  Rental Details - {selectedRental.item.title}
                </h3>
                <button
                  onClick={() => setSelectedRental(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Item</label>
                    <p className="text-white font-medium">
                      {selectedRental.item.title}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {selectedRental.item.description}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Renter</label>
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedRental.renter.avatar}
                        alt={selectedRental.renter.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-white font-medium">
                          {selectedRental.renter.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {selectedRental.renter.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Location</label>
                    <p className="text-white">{selectedRental.location}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">
                      Rental Period
                    </label>
                    <p className="text-white">
                      {selectedRental.startDate} - {selectedRental.endDate}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Total Price</label>
                    <p className="text-white font-semibold text-lg">
                      ${selectedRental.totalPrice}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Deposit</label>
                    <p className="text-emerald-400 font-semibold">
                      ${selectedRental.deposit}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Status</label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                        selectedRental.status
                      )}`}
                    >
                      {selectedRental.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm">Pickup Time</label>
                  <p className="text-white">{selectedRental.pickupTime}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Return Time</label>
                  <p className="text-white">{selectedRental.returnTime}</p>
                </div>
              </div>

              {selectedRental.rating && (
                <div>
                  <label className="text-gray-400 text-sm">Review</label>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < selectedRental.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="text-white ml-2">
                      {selectedRental.rating}/5
                    </span>
                  </div>
                  <p className="text-gray-300">{selectedRental.review}</p>
                </div>
              )}

              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-blue-400 text-black rounded-lg hover:bg-blue-500 transition-colors font-semibold">
                  Contact Renter
                </button>
                <button className="flex-1 px-4 py-2 bg-emerald-400 text-black rounded-lg hover:bg-emerald-500 transition-colors font-semibold">
                  View Item Details
                </button>
                <button
                  onClick={() => setSelectedRental(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRentals;