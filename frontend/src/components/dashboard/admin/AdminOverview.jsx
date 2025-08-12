import React from "react";
import {
  Users,
  Package,
  Activity,
  Shield,
  Star,
  MessageSquare,
  CreditCard,
  ArrowUpRight,
  Eye,
  Settings,
} from "lucide-react";
import { Card } from "../../ui/Card";
import { Chart } from "../../ui/Chart";
import { StatCard } from "../../ui/StatCard";
import { ActivityFeed } from "../../ui/ActivityFeed";
import { kpiStats, criticalMetrics, platformGrowthData, revenueBreakdownData, userGrowthData, performanceMetrics, recentAdminActivities, pendingActions } from "./dummyData";

export const AdminOverview = () => {

  return (
    <div className="space-y-8">
      {/* Enhanced KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Critical Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {criticalMetrics.map((metric, index) => (
          <StatCard key={index} {...metric} />
        ))}
      </div>

      {/* Advanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Multi-Metric Platform Growth */}
        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white">
                Platform Growth Analytics
              </h3>
              <p className="text-gray-400 text-sm">
                Users, Rentals & Revenue Trends
              </p>
            </div>
            <div className="flex items-center space-x-2 text-emerald-400">
              <ArrowUpRight className="w-5 h-5" />
              <span className="text-lg font-bold">+28.3%</span>
            </div>
          </div>
          <Chart
            data={platformGrowthData}
            type="area"
            dataKey="revenue"
            xAxisKey="name"
            color="#00FF99"
            height={250}
            gradient={true}
          />
          <div className="grid grid-cols-3 gap-2 lg:gap-4 mt-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <p className="text-emerald-400 font-bold text-sm lg:text-lg">
                12.8K
              </p>
              <p className="text-gray-400 text-xs">Total Users</p>
            </div>
            <div className="text-center">
              <p className="text-blue-400 font-bold text-sm lg:text-lg">2.4K</p>
              <p className="text-gray-400 text-xs">Monthly Rentals</p>
            </div>
            <div className="text-center">
              <p className="text-purple-400 font-bold text-sm lg:text-lg">
                $47.9K
              </p>
              <p className="text-gray-400 text-xs">Revenue</p>
            </div>
          </div>
        </Card>

        {/* Enhanced Revenue Breakdown */}
        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white">
                Revenue by Category
              </h3>
              <p className="text-gray-400 text-sm">Performance breakdown</p>
            </div>
            <div className="text-emerald-400 text-xs lg:text-sm font-medium">
              Total: $47,892
            </div>
          </div>
          <Chart
            data={revenueBreakdownData}
            type="pie"
            dataKey="revenue"
            height={220}
          />
          <div className="mt-4 space-y-2">
            {revenueBreakdownData.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-xs lg:text-sm"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-300">{item.name}</span>
                </div>
                <span className="text-emerald-400 font-medium">
                  ${item.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* User Analytics & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* User Growth Trends */}
        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white">
                User Engagement Trends
              </h3>
              <p className="text-gray-400 text-sm">
                Active vs New vs Returning Users
              </p>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <Activity className="w-4 h-4" />
              <span className="text-sm font-medium">Weekly View</span>
            </div>
          </div>
          <Chart
            data={userGrowthData}
            type="bar"
            dataKey="active"
            xAxisKey="name"
            color="#3B82F6"
            height={220}
          />
        </Card>

        {/* Performance Quality Metrics */}
        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white">
                Quality Performance
              </h3>
              <p className="text-gray-400 text-sm">
                Satisfaction & Completion Rates
              </p>
            </div>
            <div className="flex items-center space-x-2 text-purple-400">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Quarterly</span>
            </div>
          </div>
          <Chart
            data={performanceMetrics}
            type="line"
            dataKey="satisfaction"
            xAxisKey="name"
            color="#8B5CF6"
            height={220}
          />
        </Card>
      </div>

      {/* Activity Feed & Pending Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Enhanced Activity Feed */}
        <Card className="p-4 lg:p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white">
                Real-Time Activity
              </h3>
              <p className="text-gray-400 text-sm">
                Live platform events and transactions
              </p>
            </div>
            <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center space-x-1 transition-colors">
              <Eye className="w-4 h-4" />
              <span>View All</span>
            </button>
          </div>
          <ActivityFeed activities={recentAdminActivities} maxItems={5} />
        </Card>

        {/* Enhanced Pending Actions */}
        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white">
                Action Center
              </h3>
              <p className="text-gray-400 text-sm">Items requiring attention</p>
            </div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-3">
            {pendingActions.map((action) => (
              <div
                key={action.id}
                className="p-3 lg:p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group border border-white/10 hover:border-emerald-400/30"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        action.priority === "high"
                          ? "bg-red-400/20 text-red-400 border border-red-400/30"
                          : action.priority === "medium"
                          ? "bg-orange-400/20 text-orange-400 border border-orange-400/30"
                          : "bg-blue-400/20 text-blue-400 border border-blue-400/30"
                      }`}
                    >
                      <action.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium group-hover:text-emerald-400 transition-colors text-xs lg:text-sm">
                        {action.title}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-bold ${
                        action.priority === "high"
                          ? "bg-red-400/20 text-red-400"
                          : action.priority === "medium"
                          ? "bg-orange-400/20 text-orange-400"
                          : "bg-blue-400/20 text-blue-400"
                      }`}
                    >
                      {action.count}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span
                    className={`text-xs font-medium capitalize ${
                      action.priority === "high"
                        ? "text-red-400"
                        : action.priority === "medium"
                        ? "text-orange-400"
                        : "text-blue-400"
                    }`}
                  >
                    {action.priority} priority
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* System Health Dashboard */}
      <Card className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-white">
              System Health & Quick Actions
            </h3>
            <p className="text-gray-400 text-sm">
              Platform status and administrative tools
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 text-sm font-medium">
                All Systems Operational
              </span>
            </div>
            <div className="text-gray-400 text-sm">99.9% Uptime</div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {[
            {
              icon: Users,
              label: "Manage Users",
              color: "emerald",
              count: "12.8K",
              metric: "users",
            },
            {
              icon: Package,
              label: "Review Items",
              color: "blue",
              count: "1.2K",
              metric: "items",
            },
            {
              icon: MessageSquare,
              label: "Support Tickets",
              color: "purple",
              count: "23",
              metric: "tickets",
            },
            {
              icon: CreditCard,
              label: "Process Payments",
              color: "orange",
              count: "$47K",
              metric: "revenue",
            },
            {
              icon: Shield,
              label: "Security Center",
              color: "red",
              count: "8",
              metric: "alerts",
            },
            {
              icon: Settings,
              label: "System Config",
              color: "yellow",
              count: "5",
              metric: "pending",
            },
          ].map((item, index) => (
            <button
              key={index}
              className={`p-4 bg-${item.color}-400/10 border border-${item.color}-400/20 rounded-xl hover:bg-${item.color}-400/20 hover:border-${item.color}-400/40 transition-all duration-300 group hover:scale-105`}
            >
              <item.icon
                className={`w-6 h-6 lg:w-8 lg:h-8 text-${item.color}-400 mb-2 lg:mb-3 group-hover:scale-110 transition-transform mx-auto`}
              />
              <p className="text-white font-medium text-xs lg:text-sm mb-1">
                {item.label}
              </p>
              <p className={`text-${item.color}-400 text-xs font-bold`}>
                {item.count}
              </p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};
