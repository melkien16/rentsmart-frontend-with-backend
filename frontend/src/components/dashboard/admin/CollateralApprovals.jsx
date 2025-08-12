import React, { useState } from "react";
import {
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Download,
  Package,
  Shield,
  FileText,
  CreditCard,
  Check,
  FileImage,
  File,
  List,
  X
} from "lucide-react";

import { collateralData} from "../mockAdminData";

const CollateralApprovals = () => {
  const [approvals, setApprovals] = useState(collateralData.approvals);
  const [filter, setFilter] = useState("all");
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const filteredApprovals = approvals.filter(
    (a) => filter === "all" || a.status === filter
  );

  const handleStatusChange = (approvalId, newStatus) => {
    setApprovals(
      approvals.map((a) =>
        a.id === approvalId ? { ...a, status: newStatus } : a
      )
    );
  };

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

  const getCollateralIcon = (type) => {
    switch (type) {
      case "Equipment":
        return Package;
      case "Document":
        return FileText;
      case "Financial":
        return CreditCard;
      default:
        return Package;
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-emerald-400/10 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              Collateral Approvals
            </h2>
            <p className="text-gray-300 mt-2">
              Review and approve user collateral submissions with advanced
              verification
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
                <BarChart3 className="w-5 h-5" />
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
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400"
            >
              <option value="all">All Types</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <button className="px-6 py-2 bg-blue-400 text-black rounded-xl hover:bg-blue-500 transition-all duration-200 flex items-center gap-2 font-semibold">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl border border-yellow-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">
                Pending Approvals
              </p>
              <p className="text-3xl font-bold text-white">
                {collateralData.pendingApprovals}
              </p>
              <p className="text-yellow-400 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {collateralData.avgProcessingTime} avg
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl border border-green-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">
                Approved Today
              </p>
              <p className="text-3xl font-bold text-white">
                {collateralData.approvedToday}
              </p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                {collateralData.approvalRate}% rate
              </p>
            </div>
            <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-2xl border border-red-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-400 text-sm font-medium">Rejected Today</p>
              <p className="text-3xl font-bold text-white">
                {collateralData.rejectedToday}
              </p>
              <p className="text-red-400 text-sm flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                Quality control
              </p>
            </div>
            <div className="w-12 h-12 bg-red-400/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl border border-blue-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Total Value</p>
              <p className="text-3xl font-bold text-white">
                ${collateralData.totalValue.toLocaleString()}
              </p>
              <p className="text-blue-400 text-sm flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Protected assets
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Collateral Grid/List View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApprovals.map((approval) => {
            const CollateralIcon = getCollateralIcon(approval.collateralType);
            return (
              <div
                key={approval.id}
                className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-blue-400/30 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedApproval(approval)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
                      <CollateralIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">
                        {approval.item}
                      </h3>
                      <span className="text-gray-400 text-sm">
                        {approval.user}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                      approval.status
                    )}`}
                  >
                    {approval.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Type</span>
                    <span className="text-blue-400 text-sm">
                      {approval.collateralType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Value</span>
                    <span className="text-white font-semibold">
                      ${approval.value}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Risk</span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRiskColor(
                        approval.riskScore
                      )}`}
                    >
                      {approval.riskScore}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Documents</span>
                    <span className="text-blue-400">
                      {approval.documents.length}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {approval.images.slice(0, 2).map((image, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300"
                      >
                        {image}
                      </span>
                    ))}
                    {approval.images.length > 2 && (
                      <span className="px-2 py-1 bg-blue-400/20 rounded-lg text-xs text-blue-400">
                        +{approval.images.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(approval.id, "approved");
                    }}
                    className="flex-1 px-3 py-2 bg-green-400 text-black rounded-lg hover:bg-green-500 transition-colors text-sm font-medium"
                  >
                    Approve
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(approval.id, "rejected");
                    }}
                    className="flex-1 px-3 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors text-sm font-medium"
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Risk
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredApprovals.map((approval) => {
                  const CollateralIcon = getCollateralIcon(
                    approval.collateralType
                  );
                  return (
                    <tr
                      key={approval.id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center">
                            <CollateralIcon className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {approval.item}
                            </div>
                            <div className="text-sm text-gray-400">
                              {approval.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {approval.user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-400/20 text-gray-400 border border-gray-400/30">
                          {approval.collateralType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-semibold">
                        ${approval.value}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRiskColor(
                            approval.riskScore
                          )}`}
                        >
                          {approval.riskScore}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                            approval.status
                          )}`}
                        >
                          {approval.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {approval.submittedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleStatusChange(approval.id, "approved")
                            }
                            className="p-1 text-green-400 hover:text-green-300 transition-colors"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(approval.id, "rejected")
                            }
                            className="p-1 text-red-400 hover:text-red-300 transition-colors"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSelectedApproval(approval)}
                            className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Collateral Detail Modal */}
      {selectedApproval && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Collateral Review - {selectedApproval.item}
                </h3>
                <button
                  onClick={() => setSelectedApproval(null)}
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
                    <label className="text-gray-400 text-sm">User</label>
                    <p className="text-white font-medium">
                      {selectedApproval.user}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Item</label>
                    <p className="text-white font-medium">
                      {selectedApproval.item}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Description</label>
                    <p className="text-gray-300">
                      {selectedApproval.description}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Value</label>
                    <p className="text-white font-semibold">
                      ${selectedApproval.value}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Type</label>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-400/20 text-gray-400 border border-gray-400/30">
                      {selectedApproval.collateralType}
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Risk Score</label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRiskColor(
                        selectedApproval.riskScore
                      )}`}
                    >
                      {selectedApproval.riskScore}
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Status</label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                        selectedApproval.status
                      )}`}
                    >
                      {selectedApproval.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Submitted</label>
                    <p className="text-gray-300">
                      {selectedApproval.submittedDate}
                    </p>
                  </div>
                </div>
              </div>

              {selectedApproval.images.length > 0 && (
                <div>
                  <label className="text-gray-400 text-sm">Images</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedApproval.images.map((image, idx) => (
                      <div
                        key={idx}
                        className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center"
                      >
                        <FileImage className="w-8 h-8 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedApproval.documents.length > 0 && (
                <div>
                  <label className="text-gray-400 text-sm">Documents</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedApproval.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 bg-white/10 rounded-lg text-sm text-gray-300 flex items-center gap-2"
                      >
                        <File className="w-4 h-4" />
                        {doc}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedApproval.rejectionReason && (
                <div>
                  <label className="text-gray-400 text-sm">
                    Rejection Reason
                  </label>
                  <p className="text-red-400 mt-1">
                    {selectedApproval.rejectionReason}
                  </p>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    handleStatusChange(selectedApproval.id, "approved");
                    setSelectedApproval(null);
                  }}
                  className="flex-1 px-4 py-2 bg-green-400 text-black rounded-lg hover:bg-green-500 transition-colors font-semibold"
                >
                  Approve Collateral
                </button>
                <button
                  onClick={() => {
                    handleStatusChange(selectedApproval.id, "rejected");
                    setSelectedApproval(null);
                  }}
                  className="flex-1 px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors font-semibold"
                >
                  Reject Collateral
                </button>
                <button
                  onClick={() => setSelectedApproval(null)}
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

export default CollateralApprovals