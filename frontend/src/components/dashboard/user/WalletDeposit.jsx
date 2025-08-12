import { useState } from "react";
import {
  DollarSign,
  Plus,
  Check,
  X,
  AlertTriangle,
  Clock,
  CreditCard,
  Upload,
  Download,
  Wallet as Wallet,
} from "lucide-react";

import { mockWalletData } from "../mockUserData"

const WalletDeposit = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);

  const getTransactionTypeColor = (type) => {
    switch (type) {
      case "earning":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      case "withdrawal":
        return "bg-red-400/20 text-red-400 border-red-400/30";
      case "deposit":
        return "bg-blue-400/20 text-blue-400 border-blue-400/30";
      case "fee":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "earning":
        return DollarSign;
      case "withdrawal":
        return Download;
      case "deposit":
        return Upload;
      case "fee":
        return AlertTriangle;
      default:
        return DollarSign;
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-emerald-400/10 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Wallet className="w-8 h-8 text-blue-400" />
              Wallet & Deposits
            </h2>
            <p className="text-gray-300 mt-2">
              Manage your funds, deposits, and payment methods
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="px-6 py-2 bg-blue-400 text-black rounded-xl hover:bg-blue-500 transition-all duration-200 flex items-center gap-2 font-semibold"
            >
              <Download className="w-4 h-4" />
              Withdraw
            </button>
            <button
              onClick={() => setShowAddPaymentMethod(true)}
              className="px-6 py-2 bg-emerald-400 text-black rounded-xl hover:bg-emerald-500 transition-all duration-200 flex items-center gap-2 font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add Payment Method
            </button>
          </div>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl border border-blue-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Total Balance</p>
              <p className="text-3xl font-bold text-white">
                ${mockWalletData.balance.toLocaleString()}
              </p>
              <p className="text-blue-400 text-sm flex items-center gap-1">
                <Wallet className="w-4 h-4" />
                All funds
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl border border-green-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">
                Available Balance
              </p>
              <p className="text-3xl font-bold text-white">
                ${mockWalletData.availableBalance.toLocaleString()}
              </p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <Check className="w-4 h-4" />
                Ready to withdraw
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
              <p className="text-yellow-400 text-sm font-medium">
                Pending Balance
              </p>
              <p className="text-3xl font-bold text-white">
                ${mockWalletData.pendingBalance.toLocaleString()}
              </p>
              <p className="text-yellow-400 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Processing
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Financial Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Deposits</span>
              <span className="text-green-400 font-semibold">
                ${mockWalletData.totalDeposits.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Withdrawals</span>
              <span className="text-red-400 font-semibold">
                -${mockWalletData.totalWithdrawals.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Security Deposits</span>
              <span className="text-blue-400 font-semibold">
                ${mockWalletData.securityDeposits.toLocaleString()}
              </span>
            </div>
            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">Net Balance</span>
                <span className="text-white font-bold text-lg">
                  ${mockWalletData.balance.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Payment Methods</h3>
          <div className="space-y-3">
            {mockWalletData.paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{method.name}</p>
                    <p className="text-gray-400 text-sm">{method.account}</p>
                  </div>
                </div>
                {method.isDefault && (
                  <span className="px-2 py-1 bg-green-400/20 text-green-400 text-xs rounded-full">
                    Default
                  </span>
                )}
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
            {mockWalletData.recentTransactions.map((transaction) => {
              const TransactionIcon = getTransactionIcon(transaction.type);
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-400/20 rounded-xl flex items-center justify-center">
                      <TransactionIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {transaction.description}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.type === "withdrawal" ||
                        transaction.type === "fee"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {transaction.type === "withdrawal" ||
                      transaction.type === "fee"
                        ? "-"
                        : "+"}
                      ${Math.abs(transaction.amount)}
                    </p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getTransactionTypeColor(
                        transaction.type
                      )}`}
                    >
                      {transaction.type}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-md w-full">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Withdraw Funds</h3>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="text-gray-400 text-sm">
                  Available Balance
                </label>
                <p className="text-white font-semibold text-lg">
                  ${mockWalletData.availableBalance.toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">
                  Withdrawal Amount
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm">Payment Method</label>
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors">
                  <option value="">Select payment method</option>
                  {mockWalletData.paymentMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.name} - {method.account}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-blue-400 text-black rounded-lg hover:bg-blue-500 transition-colors font-semibold">
                  Withdraw
                </button>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {showAddPaymentMethod && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-md w-full">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Add Payment Method
                </h3>
                <button
                  onClick={() => setShowAddPaymentMethod(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="text-gray-400 text-sm">Payment Type</label>
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 transition-colors">
                  <option value="">Select type</option>
                  <option value="bank">Bank Account</option>
                  <option value="card">Credit/Debit Card</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Account Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  placeholder="Enter account name"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm">Account Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  placeholder="Enter account number"
                />
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-emerald-400 text-black rounded-lg hover:bg-emerald-500 transition-colors font-semibold">
                  Add Method
                </button>
                <button
                  onClick={() => setShowAddPaymentMethod(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <label className="text-gray-400 text-sm">Description</label>
                <p className="text-white font-medium">
                  {selectedTransaction.description}
                </p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Amount</label>
                <p
                  className={`font-semibold text-lg ${
                    selectedTransaction.type === "withdrawal" ||
                    selectedTransaction.type === "fee"
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  {selectedTransaction.type === "withdrawal" ||
                  selectedTransaction.type === "fee"
                    ? "-"
                    : "+"}
                  ${Math.abs(selectedTransaction.amount)}
                </p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Type</label>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getTransactionTypeColor(
                    selectedTransaction.type
                  )}`}
                >
                  {selectedTransaction.type}
                </span>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Date</label>
                <p className="text-white">{selectedTransaction.date}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Status</label>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full border bg-green-400/20 text-green-400 border-green-400/30">
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

export default WalletDeposit;