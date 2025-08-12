import { useState } from "react";
import { mockEarningsData } from "../mockUserData";
import {
  Package,
  DollarSign,
  Calendar,
  X,
  Clock,
  Download,
  BarChart3,
  TrendingUp,
} from "lucide-react";

const Earnings = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      case "pending":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-green-400/10 via-emerald-400/10 to-blue-400/10 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-400" />
              Earnings Dashboard
            </h2>
            <p className="text-gray-300 mt-2">
              Track your rental income and financial performance
            </p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-green-400"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button className="px-6 py-2 bg-green-400 text-black rounded-xl hover:bg-green-500 transition-all duration-200 flex items-center gap-2 font-semibold">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl border border-green-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">
                Total Earnings
              </p>
              <p className="text-3xl font-bold text-white">
                ${mockEarningsData.totalEarnings.toLocaleString()}
              </p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />+
                {mockEarningsData.monthlyGrowth}% this month
              </p>
            </div>
            <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl border border-blue-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">This Month</p>
              <p className="text-3xl font-bold text-white">
                ${mockEarningsData.thisMonth.toLocaleString()}
              </p>
              <p className="text-blue-400 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {mockEarningsData.totalRentals} rentals
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl border border-purple-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">
                Pending Payouts
              </p>
              <p className="text-3xl font-bold text-white">
                ${mockEarningsData.pendingPayouts.toLocaleString()}
              </p>
              <p className="text-purple-400 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Available for withdrawal
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-2xl border border-emerald-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-400 text-sm font-medium">
                Avg. Per Rental
              </p>
              <p className="text-3xl font-bold text-white">
                ${mockEarningsData.averagePerRental.toLocaleString()}
              </p>
              <p className="text-emerald-400 text-sm flex items-center gap-1">
                <BarChart3 className="w-4 h-4" />
                Per rental
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Earnings Chart */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Monthly Earnings
          </h3>
          <div className="space-y-4">
            {mockEarningsData.monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">{data.month}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full"
                      style={{ width: `${(data.earnings / 1000) * 100}%` }}
                    />
                  </div>
                  <span className="text-white font-semibold">
                    ${data.earnings}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Earning Items */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Top Earning Items
          </h3>
          <div className="space-y-4">
            {mockEarningsData.topEarningItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-gray-400 text-sm">
                      {item.rentals} rentals
                    </p>
                  </div>
                </div>
                <span className="text-green-400 font-semibold">
                  ${item.earnings}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockEarningsData.recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => setSelectedTransaction(transaction)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-400/20 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{transaction.item}</p>
                    <p className="text-gray-400 text-sm">
                      Rented by {transaction.renter}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-semibold">
                    ${transaction.amount}
                  </p>
                  <p className="text-gray-400 text-sm">{transaction.date}</p>
                </div>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                    transaction.status
                  )}`}
                >
                  {transaction.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-md w-full">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Transaction Details
                </h3>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Item</label>
                <p className="text-white font-medium">
                  {selectedTransaction.item}
                </p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Renter</label>
                <p className="text-white">{selectedTransaction.renter}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Amount</label>
                <p className="text-green-400 font-semibold text-lg">
                  ${selectedTransaction.amount}
                </p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Date</label>
                <p className="text-white">{selectedTransaction.date}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Status</label>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                    selectedTransaction.status
                  )}`}
                >
                  {selectedTransaction.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Earnings;