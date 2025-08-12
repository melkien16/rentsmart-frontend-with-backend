import React, { useState } from "react";
import {
  BarChart3,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Download,
  Package,
  FileText,
  CreditCard,
  UserX,
  Check,
  FileImage,
  List,
  X
} from "lucide-react";

import { reportsData } from "../mockAdminData";

const ReportsDisputes = () => {
  const [reports, setReports] = useState(reportsData.reports);
  const [filter, setFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const filteredReports = reports.filter(
    (r) => filter === "all" || r.status === filter
  );

  const handleStatusChange = (reportId, newStatus) => {
    setReports(
      reports.map((r) => (r.id === reportId ? { ...r, status: newStatus } : r))
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-red-400/20 text-red-400 border-red-400/30";
      case "in-progress":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      case "resolved":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-400/20 text-red-400 border-red-400/30";
      case "medium":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      case "low":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Item Quality":
        return Package;
      case "Service":
        return MessageSquare;
      case "Item Damage":
        return AlertTriangle;
      case "Payment":
        return CreditCard;
      case "Conduct":
        return UserX;
      default:
        return AlertTriangle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-red-400/10 via-orange-400/10 to-yellow-400/10 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              Reports & Disputes
            </h2>
            <p className="text-gray-300 mt-2">
              Handle user reports and dispute resolution with advanced tracking
            </p>
          </div>
          <div className="flex gap-3">
            <div className="hidden md:flex bg-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-red-400 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <BarChart3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-red-400 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-red-400"
            >
              <option value="all">All Reports</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <button className="px-6 py-2 bg-red-400 text-black rounded-xl hover:bg-red-500 transition-all duration-200 flex items-center gap-2 font-semibold">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl border border-blue-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Total Reports</p>
              <p className="text-3xl font-bold text-white">
                {reportsData.totalReports}
              </p>
              <p className="text-blue-400 text-sm flex items-center gap-1">
                <FileText className="w-4 h-4" />
                This month
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-2xl border border-red-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-400 text-sm font-medium">Open Disputes</p>
              <p className="text-3xl font-bold text-white">
                {reportsData.openDisputes}
              </p>
              <p className="text-red-400 text-sm flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                Need attention
              </p>
            </div>
            <div className="w-12 h-12 bg-red-400/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl border border-green-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">
                Resolved Today
              </p>
              <p className="text-3xl font-bold text-white">
                {reportsData.resolvedToday}
              </p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                {reportsData.satisfactionRate}% satisfaction
              </p>
            </div>
            <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl border border-purple-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">
                Avg Resolution
              </p>
              <p className="text-3xl font-bold text-white">
                {reportsData.averageResolutionTime}
              </p>
              <p className="text-purple-400 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Target: 2 days
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Reports Grid/List View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => {
            const CategoryIcon = getCategoryIcon(report.category);
            return (
              <div
                key={report.id}
                className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-red-400/30 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedReport(report)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-400/20 rounded-xl flex items-center justify-center">
                      <CategoryIcon className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">#{report.id}</h3>
                      <span className="text-gray-400 text-sm">
                        {report.category}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Reporter</span>
                    <span className="text-white text-sm">
                      {report.reporter}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Reported</span>
                    <span className="text-white text-sm">
                      {report.reportedUser}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Priority</span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(
                        report.priority
                      )}`}
                    >
                      {report.priority}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {report.description}
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(report.id, "resolved");
                    }}
                    className="flex-1 px-3 py-2 bg-green-400 text-black rounded-lg hover:bg-green-500 transition-colors text-sm font-medium"
                  >
                    Resolve
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedReport(report);
                    }}
                    className="flex-1 px-3 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
                  >
                    View Details
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
                    Report
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Reporter
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Reported User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredReports.map((report) => {
                  const CategoryIcon = getCategoryIcon(report.category);
                  return (
                    <tr
                      key={report.id}
                      className="hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => setSelectedReport(report)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-red-400/20 rounded-full flex items-center justify-center">
                            <CategoryIcon className="w-5 h-5 text-red-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              #{report.id}
                            </div>
                            <div className="text-sm text-gray-400">
                              {report.reason}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-400/20 text-gray-400 border border-gray-400/30">
                          {report.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {report.reporter}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {report.reportedUser}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(
                            report.priority
                          )}`}
                        >
                          {report.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                            report.status
                          )}`}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {report.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(report.id, "resolved");
                            }}
                            className="p-1 text-green-400 hover:text-green-300 transition-colors"
                            title="Resolve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedReport(report);
                            }}
                            className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(report.id, "in-progress");
                            }}
                            className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                            title="Mark In Progress"
                          >
                            <Clock className="w-4 h-4" />
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

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  Report #{selectedReport.id}
                </h3>
                <button
                  onClick={() => setSelectedReport(null)}
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
                    <label className="text-gray-400 text-sm">Reporter</label>
                    <p className="text-white font-medium">
                      {selectedReport.reporter}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">
                      Reported User
                    </label>
                    <p className="text-white font-medium">
                      {selectedReport.reportedUser}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Category</label>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-400/20 text-gray-400 border border-gray-400/30">
                      {selectedReport.category}
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Reason</label>
                    <p className="text-white">{selectedReport.reason}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Priority</label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(
                        selectedReport.priority
                      )}`}
                    >
                      {selectedReport.priority}
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Status</label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                        selectedReport.status
                      )}`}
                    >
                      {selectedReport.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Date</label>
                    <p className="text-gray-300">{selectedReport.date}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Assigned To</label>
                    <p className="text-emerald-400">
                      {selectedReport.assignedTo}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Description</label>
                <p className="text-gray-300 mt-1">
                  {selectedReport.description}
                </p>
              </div>

              {selectedReport.evidence.length > 0 && (
                <div>
                  <label className="text-gray-400 text-sm">Evidence</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedReport.evidence.map((evidence, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 bg-white/10 rounded-lg text-sm text-gray-300 flex items-center gap-2"
                      >
                        <FileImage className="w-4 h-4" />
                        {evidence}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedReport.resolution && (
                <div>
                  <label className="text-gray-400 text-sm">Resolution</label>
                  <p className="text-green-400 mt-1">
                    {selectedReport.resolution}
                  </p>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    handleStatusChange(selectedReport.id, "resolved");
                    setSelectedReport(null);
                  }}
                  className="flex-1 px-4 py-2 bg-green-400 text-black rounded-lg hover:bg-green-500 transition-colors font-semibold"
                >
                  Resolve Report
                </button>
                <button
                  onClick={() => {
                    handleStatusChange(selectedReport.id, "in-progress");
                    setSelectedReport(null);
                  }}
                  className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors font-semibold"
                >
                  Mark In Progress
                </button>
                <button
                  onClick={() => setSelectedReport(null)}
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

export default ReportsDisputes