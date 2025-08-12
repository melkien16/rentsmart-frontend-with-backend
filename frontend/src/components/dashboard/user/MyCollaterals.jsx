import { mockCollaterals } from "../mockUserData";
import { useState } from "react";
import {
  Package,
  Shield,
  DollarSign,
  Plus,
  Check,
  X,
  Clock,
  CreditCard,
  FileText,
  Image,
  List,
  Grid,
} from "lucide-react";

const MyCollaterals = () => {
  const [selectedCollateral, setSelectedCollateral] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState("grid")

  const filteredCollaterals = mockCollaterals.filter(
    (collateral) => filter === "all" || collateral.status === filter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      case "pending":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      case "rejected":
        return "bg-red-400/20 text-red-400 border-red-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Equipment":
        return Package;
      case "Document":
        return FileText;
      case "Financial":
        return CreditCard;
      default:
        return Shield;
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "low":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      case "medium":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      case "high":
        return "bg-red-400/20 text-red-400 border-red-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-emerald-400/10 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Shield className="w-8 h-8 text-purple-400" />
              My Collaterals
            </h2>
            <p className="text-gray-300 mt-2">
              Manage your security deposits and collateral items
            </p>
          </div>
          <div className="flex gap-3">
            <div className="hidden md:flex bg-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-purple-400 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-purple-400 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-400"
            >
              <option value="all">All Collaterals</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 bg-purple-400 text-black rounded-xl hover:bg-purple-500 transition-all duration-200 flex items-center gap-2 font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add Collateral
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl border border-purple-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">
                Total Collaterals
              </p>
              <p className="text-3xl font-bold text-white">
                {mockCollaterals.length}
              </p>
              <p className="text-purple-400 text-sm flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Your deposits
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl border border-green-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Approved</p>
              <p className="text-3xl font-bold text-white">
                {mockCollaterals.filter((c) => c.status === "approved").length}
              </p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <Check className="w-4 h-4" />
                Verified items
              </p>
            </div>
            <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
              <Check className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl border border-yellow-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-white">
                {mockCollaterals.filter((c) => c.status === "pending").length}
              </p>
              <p className="text-yellow-400 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Under review
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
              <p className="text-blue-400 text-sm font-medium">Total Value</p>
              <p className="text-3xl font-bold text-white">
                $
                {mockCollaterals
                  .reduce((sum, c) => sum + c.value, 0)
                  .toLocaleString()}
              </p>
              <p className="text-blue-400 text-sm flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                Collateral worth
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Collaterals Grid/List View */}
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCollaterals.map((collateral) => {
                const TypeIcon = getTypeIcon(collateral.type);
                return (
                  <div
                    key={collateral.id}
                    className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-purple-400/30 transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedCollateral(collateral)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center">
                          <TypeIcon className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">
                            {collateral.title}
                          </h3>
                          <span className="text-gray-400 text-sm">
                            {collateral.type}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          collateral.status
                        )}`}
                      >
                        {collateral.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Value</span>
                        <span className="text-white font-semibold">
                          ${collateral.value.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Category</span>
                        <span className="text-blue-400 text-sm">
                          {collateral.category}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">
                          Risk Score
                        </span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRiskColor(
                            collateral.riskScore
                          )}`}
                        >
                          {collateral.riskScore}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Submitted</span>
                        <span className="text-purple-400">
                          {collateral.submittedDate}
                        </span>
                      </div>
                      {collateral.approvedDate && (
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="text-gray-400">Approved</span>
                          <span className="text-green-400">
                            {collateral.approvedDate}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCollateral(collateral);
                        }}
                        className="flex-1 px-3 py-2 bg-purple-400 text-black rounded-lg hover:bg-purple-500 transition-colors text-sm font-medium"
                      >
                        View Details
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit collateral
                        }}
                        className="flex-1 px-3 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCollaterals.map((collateral) => {
                const TypeIcon = getTypeIcon(collateral.type);
                return (
                  <div
                    key={collateral.id}
                    className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-purple-400/30 transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedCollateral(collateral)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-purple-400/20 rounded-xl flex items-center justify-center">
                          <TypeIcon className="w-8 h-8 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg">
                            {collateral.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {collateral.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-gray-400 text-sm">
                              Type: {collateral.type}
                            </span>
                            <span className="text-gray-400 text-sm">
                              Category: {collateral.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold text-lg">
                          ${collateral.value.toLocaleString()}
                        </div>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                            collateral.status
                          )}`}
                        >
                          {collateral.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Collateral Detail Modal */}
      {selectedCollateral && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  Collateral Details - {selectedCollateral.title}
                </h3>
                <button
                  onClick={() => setSelectedCollateral(null)}
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
                    <label className="text-gray-400 text-sm">Title</label>
                    <p className="text-white font-medium">
                      {selectedCollateral.title}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Type</label>
                    <p className="text-white">{selectedCollateral.type}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Description</label>
                    <p className="text-gray-300">
                      {selectedCollateral.description}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Category</label>
                    <p className="text-white">{selectedCollateral.category}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Value</label>
                    <p className="text-white font-semibold text-lg">
                      ${selectedCollateral.value.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Status</label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                        selectedCollateral.status
                      )}`}
                    >
                      {selectedCollateral.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Risk Score</label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRiskColor(
                        selectedCollateral.riskScore
                      )}`}
                    >
                      {selectedCollateral.riskScore}
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">
                      Verification Status
                    </label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${
                        selectedCollateral.verificationStatus === "verified"
                          ? "bg-green-400/20 text-green-400 border-green-400/30"
                          : "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
                      }`}
                    >
                      {selectedCollateral.verificationStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm">
                    Submitted Date
                  </label>
                  <p className="text-white">
                    {selectedCollateral.submittedDate}
                  </p>
                </div>
                {selectedCollateral.approvedDate && (
                  <div>
                    <label className="text-gray-400 text-sm">
                      Approved Date
                    </label>
                    <p className="text-green-400">
                      {selectedCollateral.approvedDate}
                    </p>
                  </div>
                )}
              </div>

              {selectedCollateral.images.length > 0 && (
                <div>
                  <label className="text-gray-400 text-sm">Images</label>
                  <div className="flex gap-2 mt-2">
                    {selectedCollateral.images.map((image, idx) => (
                      <div
                        key={idx}
                        className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center"
                      >
                        <Image className="w-6 h-6 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedCollateral.documents.length > 0 && (
                <div>
                  <label className="text-gray-400 text-sm">Documents</label>
                  <div className="flex gap-2 mt-2">
                    {selectedCollateral.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg"
                      >
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-white text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-purple-400 text-black rounded-lg hover:bg-purple-500 transition-colors font-semibold">
                  Edit Collateral
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors font-semibold">
                  Download Documents
                </button>
                <button
                  onClick={() => setSelectedCollateral(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Collateral Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-2xl w-full">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-purple-400" />
                  Add New Collateral
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm">Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
                    placeholder="Enter collateral title"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Type</label>
                  <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400">
                    <option value="">Select type</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Document">Document</option>
                    <option value="Financial">Financial</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Description</label>
                <textarea
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
                  rows="3"
                  placeholder="Describe your collateral"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm">Value</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
                    placeholder="Enter value"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Category</label>
                  <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400">
                    <option value="">Select category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Identity">Identity</option>
                    <option value="Financial">Financial</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-purple-400 text-black rounded-lg hover:bg-purple-500 transition-colors font-semibold">
                  Add Collateral
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCollaterals;
