import React, { useState } from "react";
import {
  StatCard,
} from "../ui";
import {
  BarChart3,
  Users,
  DollarSign,
  Calendar,
  Download,
  MapPin,
} from "lucide-react";

import { analyticsData } from "../mockAdminData";
import ChartCard from "./ChartCard";

const AnalyticsInsights = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Analytics & Insights
          </h2>
          <p className="text-gray-400">
            Monitor platform performance and user behavior
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-emerald-400"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
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
          value={analyticsData.revenue.current}
          change={analyticsData.revenue.change}
          icon={DollarSign}
          color="emerald"
        />
        <StatCard
          title="Total Bookings"
          value={analyticsData.bookings.current}
          change={analyticsData.bookings.change}
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Active Users"
          value={analyticsData.users.current}
          change={analyticsData.users.change}
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Active Items"
          value={analyticsData.items.current}
          change={analyticsData.items.change}
          icon={BarChart3}
          color="yellow"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <ChartCard title="Revenue Trend">
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.monthlyRevenue.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-emerald-400 to-emerald-600 rounded-t"
                  style={{
                    height: `${
                      (value / Math.max(...analyticsData.monthlyRevenue)) * 200
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

        {/* Top Categories */}
        <ChartCard title="Top Categories by Revenue">
          <div className="space-y-4">
            {analyticsData.topCategories.map((category, index) => (
              <div
                key={category.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-white font-medium">
                    {category.name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">
                    ${category.revenue.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {category.bookings} bookings
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Locations */}
        <ChartCard title="Top Performing Locations">
          <div className="space-y-4">
            {analyticsData.topLocations.map((location, index) => (
              <div
                key={location.city}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-400/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {location.city}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {location.users} users
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">
                    ${location.revenue.toLocaleString()}
                  </div>
                  <div className="text-emerald-400 text-sm">Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* User Growth */}
        <ChartCard title="User Growth">
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.userGrowth.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-400 to-blue-600 rounded-t"
                  style={{
                    height: `${
                      (value / Math.max(...analyticsData.userGrowth)) * 200
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
      </div>
    </div>
  );
};

export default AnalyticsInsights