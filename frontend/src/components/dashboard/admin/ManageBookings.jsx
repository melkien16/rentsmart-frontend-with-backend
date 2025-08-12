import React, { useState } from "react";

import {
  ResponsiveGrid,
  StatCard,
  FilterBar,
  DataTable,
  Modal,
} from "../ui";
import {
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  Check,
  X
} from "lucide-react";

import { mockBookings } from "../mockAdminData";

const ManageBookings = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});

  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(
    (b) => b.status === "confirmed"
  ).length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const completedBookings = bookings.filter(
    (b) => b.status === "completed"
  ).length;
  const cancelledBookings = bookings.filter(
    (b) => b.status === "cancelled"
  ).length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.item.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const handleEditBooking = (booking) => {
    setEditData(booking);
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    setBookings(
      bookings.map((booking) =>
        booking.id === editData.id ? { ...editData } : booking
      )
    );
    setShowModal(false);
    setSelectedBooking(null);
  };

  const handleDeleteBooking = (bookingId) => {
    setBookings(bookings.filter((booking) => booking.id !== bookingId));
    setShowModal(false);
    setSelectedBooking(null);
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <ResponsiveGrid cols={{ sm: 2, md: 3, lg: 5 }} gap={6}>
        <StatCard
          title="Total Bookings"
          value={totalBookings}
          subtitle="All"
          icon={Calendar}
          color="emerald"
        />
        <StatCard
          title="Active"
          value={activeBookings}
          subtitle="Confirmed"
          icon={Check}
          color="blue"
        />
        <StatCard
          title="Pending"
          value={pendingBookings}
          subtitle="Pending"
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Completed"
          value={completedBookings}
          subtitle="Completed"
          icon={CheckCircle}
          color="indigo"
        />
        <StatCard
          title="Cancelled"
          value={cancelledBookings}
          subtitle="Cancelled"
          icon={X}
          color="red"
        />
      </ResponsiveGrid>

      {/* Revenue Card */}
      <div className="bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-2xl border border-emerald-400/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-400 text-sm font-medium">
              Total Revenue
            </p>
            <p className="text-3xl font-bold text-white">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-emerald-400 text-sm flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              From all bookings
            </p>
          </div>
          <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={[
          {
            key: "status",
            value: statusFilter,
            options: [
              { value: "all", label: "All Status" },
              { value: "confirmed", label: "Confirmed" },
              { value: "pending", label: "Pending" },
              { value: "completed", label: "Completed" },
              { value: "cancelled", label: "Cancelled" },
            ],
          },
        ]}
        onFilterChange={(key, value) => {
          if (key === "status") setStatusFilter(value);
        }}
      />

      {/* Bookings Table */}
      <DataTable
        data={filteredBookings}
        columns={[
          { key: "user", label: "User" },
          { key: "item", label: "Item" },
          { key: "startDate", label: "Start Date" },
          { key: "endDate", label: "End Date" },
          { key: "amount", label: "Amount", render: (value) => `$${value}` },
          {
            key: "status",
            label: "Status",
            render: (value) => (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  value === "confirmed"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : value === "pending"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : value === "completed"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {value}
              </span>
            ),
          },
        ]}
        onEdit={handleEditBooking}
        onDelete={handleDeleteBooking}
        actions={["edit", "delete"]}
      />

      {/* Edit Booking Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Edit Booking"
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                User
              </label>
              <input
                type="text"
                value={editData.user || ""}
                onChange={(e) =>
                  setEditData({ ...editData, user: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Item
              </label>
              <input
                type="text"
                value={editData.item || ""}
                onChange={(e) =>
                  setEditData({ ...editData, item: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={editData.startDate || ""}
                onChange={(e) =>
                  setEditData({ ...editData, startDate: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={editData.endDate || ""}
                onChange={(e) =>
                  setEditData({ ...editData, endDate: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Amount
              </label>
              <input
                type="number"
                value={editData.amount || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    amount: parseFloat(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Status
              </label>
              <select
                value={editData.status || "pending"}
                onChange={(e) =>
                  setEditData({ ...editData, status: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageBookings