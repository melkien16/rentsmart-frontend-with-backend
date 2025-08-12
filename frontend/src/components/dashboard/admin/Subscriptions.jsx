import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  Download,
  Crown,
  Edit,
  Trash2,
  List,
  X,
} from "lucide-react";

import { subscriptionData } from "../mockAdminData";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState(
    subscriptionData.subscriptions
  );
  const [filter, setFilter] = useState("all");
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const filteredSubscriptions = subscriptions.filter(
    (s) => filter === "all" || s.status === filter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      case "cancelled":
        return "bg-red-400/20 text-red-400 border-red-400/30";
      case "expired":
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case "Premium":
        return "bg-purple-400/20 text-purple-400 border-purple-400/30";
      case "Enterprise":
        return "bg-blue-400/20 text-blue-400 border-blue-400/30";
      case "Basic":
        return "bg-emerald-400/20 text-emerald-400 border-emerald-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-emerald-400/10 via-blue-400/10 to-purple-400/10 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Crown className="w-8 h-8 text-yellow-400" />
              Subscriptions
            </h2>
            <p className="text-gray-300 mt-2">
              Manage user subscriptions and premium features with advanced
              analytics
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
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="all">All Plans</option>
              <option value="active">Active</option>
              <option value="cancelled">Cancelled</option>
              <option value="expired">Expired</option>
            </select>
            <button className="px-6 py-2 bg-emerald-400 text-black rounded-xl hover:bg-emerald-500 transition-all duration-200 flex items-center gap-2 font-semibold">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-2xl border border-emerald-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-400 text-sm font-medium">
                Total Subscribers
              </p>
              <p className="text-3xl font-bold text-white">
                {subscriptionData.totalSubscribers}
              </p>
              <p className="text-emerald-400 text-sm flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />+
                {subscriptionData.monthlyGrowth}%
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl border border-green-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">
                Active Subscriptions
              </p>
              <p className="text-3xl font-bold text-white">
                {subscriptionData.activeSubscriptions}
              </p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                {(
                  (subscriptionData.activeSubscriptions /
                    subscriptionData.totalSubscribers) *
                  100
                ).toFixed(1)}
                % active
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
                Premium Users
              </p>
              <p className="text-3xl font-bold text-white">
                {subscriptionData.premiumUsers}
              </p>
              <p className="text-purple-400 text-sm flex items-center gap-1">
                <Crown className="w-4 h-4" />$
                {subscriptionData.avgRevenuePerUser} ARPU
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl border border-blue-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">
                Monthly Revenue
              </p>
              <p className="text-3xl font-bold text-white">
                ${subscriptionData.revenue.toLocaleString()}
              </p>
              <p className="text-blue-400 text-sm flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                +18.2% this month
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Subscriptions Grid/List View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-emerald-400/30 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedSubscription(subscription)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      {subscription.user}
                    </h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPlanColor(
                        subscription.plan
                      )}`}
                    >
                      {subscription.plan}
                    </span>
                  </div>
                </div>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                    subscription.status
                  )}`}
                >
                  {subscription.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Amount</span>
                  <span className="text-white font-semibold">
                    ${subscription.amount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Payment</span>
                  <span className="text-emerald-400 text-sm">
                    {subscription.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Auto Renew</span>
                  <span
                    className={`text-sm ${
                      subscription.autoRenew ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {subscription.autoRenew ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Features</span>
                  <span className="text-emerald-400">
                    {subscription.features.length}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {subscription.features.slice(0, 2).map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300"
                    >
                      {feature}
                    </span>
                  ))}
                  {subscription.features.length > 2 && (
                    <span className="px-2 py-1 bg-emerald-400/20 rounded-lg text-xs text-emerald-400">
                      +{subscription.features.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Auto Renew
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredSubscriptions.map((subscription) => (
                  <tr
                    key={subscription.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-emerald-400/20 rounded-full flex items-center justify-center">
                          <Crown className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {subscription.user}
                          </div>
                          <div className="text-sm text-gray-400">
                            {subscription.startDate} - {subscription.endDate}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPlanColor(
                          subscription.plan
                        )}`}
                      >
                        {subscription.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-semibold">
                      ${subscription.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          subscription.status
                        )}`}
                      >
                        {subscription.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {subscription.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          subscription.autoRenew
                            ? "bg-green-400/20 text-green-400 border border-green-400/30"
                            : "bg-red-400/20 text-red-400 border border-red-400/30"
                        }`}
                      >
                        {subscription.autoRenew ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-emerald-400 hover:text-emerald-300 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-400 hover:text-red-300 transition-colors">
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
      )}

      {/* Subscription Detail Modal */}
      {selectedSubscription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Crown className="w-5 h-5 text-emerald-400" />
                  {selectedSubscription.plan} Subscription
                </h3>
                <button
                  onClick={() => setSelectedSubscription(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm">User</label>
                  <p className="text-white font-medium">
                    {selectedSubscription.user}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Plan</label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPlanColor(
                      selectedSubscription.plan
                    )}`}
                  >
                    {selectedSubscription.plan}
                  </span>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Amount</label>
                  <p className="text-white font-semibold">
                    ${selectedSubscription.amount}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Status</label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                      selectedSubscription.status
                    )}`}
                  >
                    {selectedSubscription.status}
                  </span>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">
                    Payment Method
                  </label>
                  <p className="text-white">
                    {selectedSubscription.paymentMethod}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Auto Renew</label>
                  <span
                    className={`text-sm ${
                      selectedSubscription.autoRenew
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {selectedSubscription.autoRenew ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Features</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedSubscription.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-emerald-400/20 rounded-lg text-sm text-emerald-400 border border-emerald-400/30"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-emerald-400 text-black rounded-lg hover:bg-emerald-500 transition-colors font-semibold">
                  Edit Subscription
                </button>
                <button className="flex-1 px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors font-semibold">
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
