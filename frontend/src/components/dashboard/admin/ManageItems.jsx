import React, { useState } from "react";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Package,
  Shield,
  Trash2,
  Check,
  Database,
  X
} from "lucide-react";

import { mockItems} from "../mockAdminData";

const ManageItems = () => {
  const [items, setItems] = useState(mockItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [inventoryFilter, setInventoryFilter] = useState("all");
  const [qualityFilter, setQualityFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [viewMode, setViewMode] = useState("items"); // items, inventory, quality, verification

  const totalItems = items.length;
  const activeItems = items.filter((i) => i.status === "active").length;
  const pendingItems = items.filter((i) => i.status === "pending").length;
  const suspendedItems = items.filter((i) => i.status === "suspended").length;
  const topCategories = Array.from(new Set(items.map((i) => i.category)));

  // Enhanced statistics for expanded responsibilities
  const inventoryStats = {
    totalInventory: totalItems,
    lowStock: items.filter((i) => i.inventoryCount < 5).length,
    outOfStock: items.filter((i) => i.inventoryCount === 0).length,
    highDemand: items.filter((i) => i.rentalCount > 20).length,
  };

  const qualityStats = {
    verified: items.filter((i) => i.qualityVerified).length,
    pendingVerification: items.filter(
      (i) => !i.qualityVerified && i.status === "active"
    ).length,
    flagged: items.filter((i) => i.qualityFlagged).length,
    recalled: items.filter((i) => i.status === "recalled").length,
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    const matchesInventory =
      inventoryFilter === "all" ||
      (inventoryFilter === "in-stock" && (item.inventoryCount || 0) >= 5) ||
      (inventoryFilter === "low-stock" &&
        (item.inventoryCount || 0) < 5 &&
        (item.inventoryCount || 0) > 0) ||
      (inventoryFilter === "out-of-stock" && (item.inventoryCount || 0) === 0);
    const matchesQuality =
      qualityFilter === "all" ||
      (qualityFilter === "verified" && item.qualityVerified) ||
      (qualityFilter === "pending" &&
        !item.qualityVerified &&
        !item.qualityFlagged) ||
      (qualityFilter === "flagged" && item.qualityFlagged);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory &&
      matchesInventory &&
      matchesQuality
    );
  });

  const handleStatusChange = (itemId, newStatus) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleEditItem = (item) => {
    setEditData(item);
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    setItems(
      items.map((item) => (item.id === editData.id ? { ...editData } : item))
    );
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleQualityVerification = (itemId, verified) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, qualityVerified: verified } : item
      )
    );
  };

  const handleInventoryUpdate = (itemId, count) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, inventoryCount: count } : item
      )
    );
  };

  const renderViewModeContent = () => {
    switch (viewMode) {
      case "inventory":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl border border-blue-400/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 text-sm font-medium">
                      Total Inventory
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {inventoryStats.totalInventory}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl border border-yellow-400/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-400 text-sm font-medium">
                      Low Stock
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {inventoryStats.lowStock}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-2xl border border-red-400/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-400 text-sm font-medium">
                      Out of Stock
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {inventoryStats.outOfStock}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-400/20 rounded-xl flex items-center justify-center">
                    <X className="w-6 h-6 text-red-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-2xl border border-emerald-400/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-400 text-sm font-medium">
                      High Demand
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {inventoryStats.highDemand}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Inventory Management
              </h3>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-white font-semibold">
                          {item.name}
                        </h4>
                        <p className="text-gray-400 text-sm">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-300">
                        Stock: {item.inventoryCount || 0}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={item.inventoryCount || 0}
                        onChange={(e) =>
                          handleInventoryUpdate(
                            item.id,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-20 px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-center"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "quality":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-2xl border border-emerald-400/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-400 text-sm font-medium">
                      Quality Verified
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {qualityStats.verified}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl border border-yellow-400/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-400 text-sm font-medium">
                      Pending Verification
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {qualityStats.pendingVerification}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-2xl border border-orange-400/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-400 text-sm font-medium">
                      Quality Flagged
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {qualityStats.flagged}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-400/20 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-2xl border border-red-400/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-400 text-sm font-medium">
                      Recalled Items
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {qualityStats.recalled}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-400/20 rounded-xl flex items-center justify-center">
                    <X className="w-6 h-6 text-red-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Quality Control
              </h3>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-white font-semibold">
                          {item.name}
                        </h4>
                        <p className="text-gray-400 text-sm">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.qualityVerified
                            ? "bg-emerald-400/20 text-emerald-400"
                            : "bg-yellow-400/20 text-yellow-400"
                        }`}
                      >
                        {item.qualityVerified ? "Verified" : "Pending"}
                      </span>
                      <button
                        onClick={() =>
                          handleQualityVerification(
                            item.id,
                            !item.qualityVerified
                          )
                        }
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          item.qualityVerified
                            ? "bg-red-400/20 text-red-400 hover:bg-red-400/30"
                            : "bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30"
                        }`}
                      >
                        {item.qualityVerified ? "Unverify" : "Verify"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "verification":
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Item Verification & Compliance
              </h3>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="space-y-2">
                          <h4 className="text-white font-semibold">
                            {item.name}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {item.category}
                          </p>
                          <p className="text-gray-400 text-sm">
                            Owner: {item.owner}
                          </p>
                          <div className="flex gap-2">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                item.qualityVerified
                                  ? "bg-emerald-400/20 text-emerald-400"
                                  : "bg-yellow-400/20 text-yellow-400"
                              }`}
                            >
                              Quality:{" "}
                              {item.qualityVerified ? "Verified" : "Pending"}
                            </span>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                item.status === "active"
                                  ? "bg-emerald-400/20 text-emerald-400"
                                  : item.status === "pending"
                                  ? "bg-yellow-400/20 text-yellow-400"
                                  : "bg-red-400/20 text-red-400"
                              }`}
                            >
                              Status: {item.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-white/10 rounded-lg transition-colors"
                          title="Review Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleQualityVerification(
                              item.id,
                              !item.qualityVerified
                            )
                          }
                          className={`p-2 rounded-lg transition-colors ${
                            item.qualityVerified
                              ? "text-red-400 hover:text-red-300 hover:bg-red-400/10"
                              : "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10"
                          }`}
                          title={
                            item.qualityVerified
                              ? "Unverify Quality"
                              : "Verify Quality"
                          }
                        >
                          {item.qualityVerified ? (
                            <X className="w-4 h-4" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-2xl border border-emerald-400/30 p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-400 text-sm font-medium">
                      Total Items
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {totalItems}
                    </p>
                    <p className="text-emerald-400 text-sm flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      Listed
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl border border-blue-400/30 p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 text-sm font-medium">Active</p>
                    <p className="text-3xl font-bold text-white">
                      {activeItems}
                    </p>
                    <p className="text-blue-400 text-sm flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Active
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
                    <Check className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl border border-yellow-400/30 p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-400 text-sm font-medium">
                      Pending
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {pendingItems}
                    </p>
                    <p className="text-yellow-400 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Pending
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-2xl border border-red-400/30 p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-400 text-sm font-medium">
                      Suspended
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {suspendedItems}
                    </p>
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <X className="w-4 h-4" />
                      Suspended
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-400/20 rounded-xl flex items-center justify-center">
                    <X className="w-6 h-6 text-red-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="all">All Categories</option>
                  {topCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <select
                  value={inventoryFilter}
                  onChange={(e) => setInventoryFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="all">All Inventory</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
                <select
                  value={qualityFilter}
                  onChange={(e) => setQualityFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="all">All Quality</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="flagged">Flagged</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setCategoryFilter("all");
                    setInventoryFilter("all");
                    setQualityFilter("all");
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors text-sm"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => {
                    const exportData = filteredItems.map((item) => ({
                      ID: item.id,
                      Name: item.name,
                      Owner: item.owner,
                      Category: item.category,
                      Price: item.price,
                      Inventory: item.inventoryCount || 0,
                      Quality: item.qualityVerified
                        ? "Verified"
                        : item.qualityFlagged
                        ? "Flagged"
                        : "Pending",
                      Rentals: item.rentalCount || 0,
                      Status: item.status,
                      Location: item.location,
                    }));
                    const csv = [
                      Object.keys(exportData[0]).join(","),
                      ...exportData.map((row) => Object.values(row).join(",")),
                    ].join("\n");
                    const blob = new Blob([csv], { type: "text/csv" });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "items-export.csv";
                    a.click();
                    window.URL.revokeObjectURL(url);
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors text-sm"
                >
                  Export CSV
                </button>
              </div>
            </div>

            {/* Results Summary */}
            <div className="bg-white/5 rounded-xl border border-white/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      {filteredItems.length}
                    </p>
                    <p className="text-gray-400 text-sm">Items Found</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-emerald-400">
                      $
                      {filteredItems
                        .reduce((sum, item) => sum + (item.price || 0), 0)
                        .toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-xs">Total Value</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-blue-400">
                      {filteredItems.reduce(
                        (sum, item) => sum + (item.inventoryCount || 0),
                        0
                      )}
                    </p>
                    <p className="text-gray-400 text-xs">Total Inventory</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-purple-400">
                      {
                        filteredItems.filter((item) => item.qualityVerified)
                          .length
                      }
                    </p>
                    <p className="text-gray-400 text-xs">Quality Verified</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>
                    Showing {filteredItems.length} of {items.length} items
                  </span>
                  {Object.values({
                    statusFilter,
                    categoryFilter,
                    inventoryFilter,
                    qualityFilter,
                  }).some((f) => f !== "all") && (
                    <span className="text-emerald-400">• Filters Applied</span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-white/5 rounded-xl border border-white/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-white">
                    Quick Actions
                  </h3>
                  <button
                    onClick={() => {
                      const lowStockItems = items.filter(
                        (item) => (item.inventoryCount || 0) < 5
                      );
                      if (lowStockItems.length > 0) {
                        alert(
                          `Found ${
                            lowStockItems.length
                          } items with low stock. Consider restocking: ${lowStockItems
                            .map((item) => item.name)
                            .join(", ")}`
                        );
                      } else {
                        alert("All items have sufficient stock!");
                      }
                    }}
                    className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                  >
                    Check Low Stock
                  </button>
                  <button
                    onClick={() => {
                      const unverifiedItems = items.filter(
                        (item) => !item.qualityVerified
                      );
                      if (unverifiedItems.length > 0) {
                        alert(
                          `Found ${unverifiedItems.length} items pending quality verification.`
                        );
                      } else {
                        alert("All items are quality verified!");
                      }
                    }}
                    className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    Check Quality Status
                  </button>
                  <button
                    onClick={() => {
                      const highDemandItems = items.filter(
                        (item) => (item.rentalCount || 0) > 20
                      );
                      if (highDemandItems.length > 0) {
                        alert(
                          `Found ${
                            highDemandItems.length
                          } high-demand items: ${highDemandItems
                            .map((item) => item.name)
                            .join(", ")}`
                        );
                      } else {
                        alert("No high-demand items found.");
                      }
                    }}
                    className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                  >
                    Check High Demand
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    {items.length} Total Items
                  </span>
                  <span className="flex items-center gap-1">
                    <Database className="w-4 h-4" />
                    {items.reduce(
                      (sum, item) => sum + (item.inventoryCount || 0),
                      0
                    )}{" "}
                    Total Inventory
                  </span>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1200px]">
                  <thead className="bg-white/10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Owner
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Inventory
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Quality
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Rentals
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img
                              className="h-10 w-10 rounded-xl object-cover border-2 border-white/10"
                              src={item.image}
                              alt={item.name}
                            />
                            <div>
                              <span className="text-white font-semibold block">
                                {item.name}
                              </span>
                              <span className="text-gray-400 text-xs">
                                ID: {item.id}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img
                              className="h-10 w-10 rounded-full object-cover border-2 border-white/10"
                              src={item.ownerAvatar}
                              alt={item.owner}
                            />
                            <span className="text-white font-semibold">
                              {item.owner}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-400/20 text-purple-400">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-emerald-400 font-bold">
                          ${item.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                (item.inventoryCount || 0) === 0
                                  ? "bg-red-400/20 text-red-400"
                                  : (item.inventoryCount || 0) < 5
                                  ? "bg-yellow-400/20 text-yellow-400"
                                  : "bg-emerald-400/20 text-emerald-400"
                              }`}
                            >
                              {item.inventoryCount || 0}
                            </span>
                            <button
                              onClick={() => {
                                const newCount = prompt(
                                  `Update inventory count for ${item.name}:`,
                                  item.inventoryCount || 0
                                );
                                if (newCount !== null && !isNaN(newCount)) {
                                  handleInventoryUpdate(
                                    item.id,
                                    parseInt(newCount)
                                  );
                                }
                              }}
                              className="p-1 text-blue-400 hover:text-blue-300 hover:bg-white/10 rounded transition-colors"
                              title="Update Inventory"
                            >
                              <Database className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                item.qualityVerified
                                  ? "bg-emerald-400/20 text-emerald-400"
                                  : item.qualityFlagged
                                  ? "bg-red-400/20 text-red-400"
                                  : "bg-yellow-400/20 text-yellow-400"
                              }`}
                            >
                              {item.qualityVerified
                                ? "Verified"
                                : item.qualityFlagged
                                ? "Flagged"
                                : "Pending"}
                            </span>
                            <button
                              onClick={() =>
                                handleQualityVerification(
                                  item.id,
                                  !item.qualityVerified
                                )
                              }
                              className={`p-1 rounded transition-colors ${
                                item.qualityVerified
                                  ? "text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                  : "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10"
                              }`}
                              title={
                                item.qualityVerified
                                  ? "Unverify Quality"
                                  : "Verify Quality"
                              }
                            >
                              {item.qualityVerified ? (
                                <X className="w-3 h-3" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                (item.rentalCount || 0) > 20
                                  ? "bg-emerald-400/20 text-emerald-400"
                                  : (item.rentalCount || 0) > 10
                                  ? "bg-blue-400/20 text-blue-400"
                                  : "bg-gray-400/20 text-gray-400"
                              }`}
                            >
                              {item.rentalCount || 0}
                            </span>
                            <span className="text-gray-400 text-xs">
                              {item.rentalCount > 20
                                ? "High"
                                : item.rentalCount > 10
                                ? "Medium"
                                : "Low"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={item.status}
                            onChange={(e) =>
                              handleStatusChange(item.id, e.target.value)
                            }
                            className={`bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm ${
                              item.status === "active"
                                ? "border-emerald-400/50"
                                : item.status === "pending"
                                ? "border-yellow-400/50"
                                : "border-red-400/50"
                            }`}
                          >
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="suspended">Suspended</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                          {item.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                          {new Date().toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-white/10 rounded transition-colors"
                              onClick={() => handleEditItem(item)}
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-white/10 rounded transition-colors"
                              onClick={() =>
                                handleQualityVerification(
                                  item.id,
                                  !item.qualityVerified
                                )
                              }
                              title={
                                item.qualityVerified
                                  ? "Unverify Quality"
                                  : "Verify Quality"
                              }
                            >
                              {item.qualityVerified ? (
                                <X className="w-4 h-4" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded transition-colors"
                              onClick={() => handleDeleteItem(item.id)}
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* View Mode Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setViewMode("items")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            viewMode === "items"
              ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/30"
              : "text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Package className="w-4 h-4 inline mr-2" />
          Item Management
        </button>
        <button
          onClick={() => setViewMode("inventory")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            viewMode === "inventory"
              ? "bg-blue-400/20 text-blue-400 border border-blue-400/30"
              : "text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Database className="w-4 h-4 inline mr-2" />
          Inventory Control
        </button>
        <button
          onClick={() => setViewMode("quality")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            viewMode === "quality"
              ? "bg-purple-400/20 text-purple-400 border border-purple-400/30"
              : "text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Shield className="w-4 h-4 inline mr-2" />
          Quality Control
        </button>
        <button
          onClick={() => setViewMode("verification")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            viewMode === "verification"
              ? "bg-orange-400/20 text-orange-400 border border-orange-400/30"
              : "text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <CheckCircle className="w-4 h-4 inline mr-2" />
          Verification & Compliance
        </button>
      </div>

      {/* Content based on view mode */}
      {renderViewModeContent()}

      {/* Item Detail/Edit Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-lg w-full">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-400" />
                Item Details
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={editData.image}
                  alt={editData.name}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-white/10"
                />
                <div>
                  <h4 className="text-white font-semibold">{editData.name}</h4>
                  <p className="text-gray-400 text-sm">{editData.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={editData.ownerAvatar}
                  alt={editData.owner}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
                />
                <div>
                  <h4 className="text-white font-semibold">{editData.owner}</h4>
                  <p className="text-gray-400 text-sm">{editData.location}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm">Status</label>
                  <select
                    value={editData.status}
                    onChange={(e) =>
                      setEditData({ ...editData, status: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Price</label>
                  <input
                    type="number"
                    value={editData.price}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Description</label>
                <textarea
                  rows={2}
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-4 py-2 bg-blue-400 text-black rounded-lg hover:bg-blue-500 transition-colors font-semibold"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => handleDeleteItem(editData.id)}
                  className="flex-1 px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors font-semibold"
                >
                  Delete Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageItems