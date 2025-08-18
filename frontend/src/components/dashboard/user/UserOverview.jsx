import React from "react";
import {
  CreditCard,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  MessageSquare,
  Camera,
  Wrench,
  Laptop,
  DollarSign,
  Package,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Card } from "../../ui/Card";
import { Chart } from "../../ui/Chart";
import { StatCard } from "../../ui/StatCard";
import { ActivityFeed } from "../../ui/ActivityFeed";
import { useSelector } from "react-redux";
import { earningsData, categoryData, recentActivities } from "./dummyData";
import { useGetBookingForOwnerQuery } from "../../../slices/bookingsApiSlice";

export const UserOverview = () => {
  const { userWalletInfo } = useSelector((state) => state.wallet); // ✅ updated field name
  const { data: bookings = [], isLoading } = useGetBookingForOwnerQuery();
  // Format currency
  const formatCurrency = (amount) =>
    amount?.toLocaleString("en-US", { style: "currency", currency: "USD" });

  // Wallet balance
  const walletBalance = userWalletInfo?.balance || 0;

  // Active rentals (pending, confirmed, in_use)
  const activeRentals = bookings.filter((b) =>
    ["pending", "confirmed", "in_use"].includes(b.status)
  ).length;

  // Monthly earnings (completed this month)
  const now = new Date();
  const monthlyEarnings = bookings
    .filter((b) => {
      if (b.status !== "completed") return false;
      const completedDate = new Date(b.updatedAt || b.createdAt);
      return (
        completedDate.getMonth() === now.getMonth() &&
        completedDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  // Pending requests
  const pendingRequests = bookings.filter((b) => b.status === "pending").length;

  const quickStats = [
    {
      title: "Wallet Balance",
      value: formatCurrency(walletBalance),
      change: "",
      icon: DollarSign,
      color: "emerald",
      trend: "up",
    },
    {
      title: "Active Rentals",
      value: activeRentals.toString(),
      change: "",
      icon: Package,
      color: "blue",
      trend: activeRentals > 0 ? "up" : "neutral",
    },
    {
      title: "Monthly Earnings",
      value: formatCurrency(monthlyEarnings),
      change: "",
      icon: TrendingUp,
      color: "purple",
      trend: monthlyEarnings > 0 ? "up" : "neutral",
    },
    {
      title: "Pending Requests",
      value: pendingRequests.toString(),
      change: "",
      icon: Clock,
      color: "orange",
      trend: pendingRequests > 0 ? "neutral" : "down",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Earnings Chart */}
        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg lg:text-xl font-bold text-white">
              Monthly Earnings
            </h3>
            <div className="flex items-center space-x-2 text-emerald-400">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm font-medium">+23.1%</span>
            </div>
          </div>
          <Chart
            data={earningsData}
            type="area"
            dataKey="value"
            xAxisKey="name"
            color="#00FF99"
            height={200}
          />
        </Card>

        {/* Category Distribution */}
        <Card className="p-4 lg:p-6">
          <h3 className="text-lg lg:text-xl font-bold text-white mb-6">
            Rental Categories
          </h3>
          <Chart data={categoryData} type="pie" dataKey="value" height={200} />
        </Card>

        {/* Recent Activity */}
        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg lg:text-xl font-bold text-white">
              Recent Activity
            </h3>
            <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>View All</span>
            </button>
          </div>
          <ActivityFeed activities={recentActivities} maxItems={4} />
        </Card>
      </div>

      {/* Quick Actions & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Quick Actions */}
        <Card className="p-4 lg:p-6">
          <h3 className="text-lg lg:text-xl font-bold text-white mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <button className="p-4 bg-emerald-400/10 border border-emerald-400/20 rounded-xl hover:bg-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 group">
              <Plus className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-400 mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-white font-medium text-sm lg:text-base">
                Add Item
              </p>
              <p className="text-gray-400 text-xs lg:text-sm">
                List new equipment
              </p>
            </button>
            <button className="p-4 bg-blue-400/10 border border-blue-400/20 rounded-xl hover:bg-blue-400/20 hover:border-blue-400/40 transition-all duration-300 group">
              <CreditCard className="w-6 h-6 lg:w-8 lg:h-8 text-blue-400 mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-white font-medium text-sm lg:text-base">
                Withdraw
              </p>
              <p className="text-gray-400 text-xs lg:text-sm">
                Transfer earnings
              </p>
            </button>
            <button className="p-4 bg-purple-400/10 border border-purple-400/20 rounded-xl hover:bg-purple-400/20 hover:border-purple-400/40 transition-all duration-300 group">
              <ShoppingBag className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400 mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-white font-medium text-sm lg:text-base">
                Browse
              </p>
              <p className="text-gray-400 text-xs lg:text-sm">Find equipment</p>
            </button>
            <button className="p-4 bg-orange-400/10 border border-orange-400/20 rounded-xl hover:bg-orange-400/20 hover:border-orange-400/40 transition-all duration-300 group">
              <MessageSquare className="w-6 h-6 lg:w-8 lg:h-8 text-orange-400 mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-white font-medium text-sm lg:text-base">
                Messages
              </p>
              <p className="text-gray-400 text-xs lg:text-sm">
                Chat with renters
              </p>
            </button>
          </div>
        </Card>

        {/* Top Performing Items */}
        <Card className="p-4 lg:p-6">
          <h3 className="text-lg lg:text-xl font-bold text-white mb-6">
            Top Performing Items
          </h3>
          <div className="space-y-4">
            {[
              {
                name: "Sony Alpha 7R IV",
                category: "Camera",
                earnings: "$1,240",
                icon: Camera,
                trend: "up",
              },
              {
                name: "DeWalt Power Drill",
                category: "Tools",
                earnings: "$890",
                icon: Wrench,
                trend: "up",
              },
              {
                name: "MacBook Pro M3",
                category: "Electronics",
                earnings: "$650",
                icon: Laptop,
                trend: "down",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-400/20 rounded-xl flex items-center justify-center">
                    <item.icon className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm lg:text-base">
                      {item.name}
                    </p>
                    <p className="text-gray-400 text-xs lg:text-sm">
                      {item.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-bold text-sm lg:text-base">
                    {item.earnings}
                  </p>
                  <div className="flex items-center space-x-1">
                    {item.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-400" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
