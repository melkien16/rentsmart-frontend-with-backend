import React, { useState } from "react";
import {
  StatCard,
} from "../ui";
import {
  DollarSign,
  CheckCircle,
  Clock,
  Download
} from "lucide-react";
import ChartCard from "./ChartCard";

import {paymentData} from "../mockAdminData"

const PaymentsCommissions = () => {
  const [transactions, setTransactions] = useState(paymentData.transactions);
  const [filter, setFilter] = useState("all");

  const filteredTransactions = transactions.filter(
    (t) => filter === "all" || t.status === filter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-400/20 text-green-400";
      case "pending":
        return "bg-yellow-400/20 text-yellow-400";
      case "failed":
        return "bg-red-400/20 text-red-400";
      default:
        return "bg-gray-400/20 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Payments & Commissions
          </h2>
          <p className="text-gray-400">
            Manage platform payments and commission tracking
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-emerald-400"
          >
            <option value="all">All Transactions</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <button className="px-4 py-2 bg-emerald-400 text-black rounded-lg hover:bg-emerald-500 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={paymentData.totalRevenue}
          change={15.2}
          icon={DollarSign}
          color="emerald"
        />
        <StatCard
          title="Total Commissions"
          value={paymentData.totalCommissions}
          change={12.8}
          icon={DollarSign}
          color="blue"
        />
        <StatCard
          title="Pending Payouts"
          value={paymentData.pendingPayouts}
          change={-5.3}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Completed Payouts"
          value={paymentData.completedPayouts}
          change={8.7}
          icon={CheckCircle}
          color="green"
        />
      </div>

      {/* Commission Chart */}
      <ChartCard title="Monthly Commission Trend">
        <div className="h-64 flex items-end justify-between space-x-2">
          {paymentData.monthlyCommissions.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-blue-400 to-blue-600 rounded-t"
                style={{
                  height: `${
                    (value / Math.max(...paymentData.monthlyCommissions)) * 200
                  }px`,
                }}
              />
              <span className="text-xs text-gray-400 mt-2">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index]}
              </span>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Transactions Table */}
      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Commission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-white/5">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-emerald-400/20 rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {transaction.user}
                        </div>
                        <div className="text-sm text-gray-400">
                          {transaction.type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${transaction.commission}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {transaction.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsCommissions