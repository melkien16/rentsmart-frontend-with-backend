import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { AdminOverview } from "./admin/AdminOverview";
import {
  ResponsiveLayout,
} from "./ui";

import ManageUsers from "./admin/ManageUsers"
import ManageBookings from "./admin/ManageBookings"
import ManageItems from "./admin/ManageItems"
import AnalyticsInsights from "./admin/AnalyticsInsights"
import MessagesSupport from "./admin/MessagesSupport"
import PaymentsCommissions from "./admin/PaymentsCommissions"
import Subscriptions from "./admin/Subscriptions"
import CollateralApprovals from "./admin/CollateralApprovals"
import ReportsDisputes from "./admin/ReportsDisputes"
import PlatformSettings from "./admin/PlatformSettings"

export const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const handleSectionChange = (section) => {
    setActiveSection(section);
    // Auto-hide sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setSidebarCollapsed(false);
    }
  };

  const getSectionTitle = (section) => {
    const titles = {
      overview: "Admin Dashboard",
      users: "Manage Users",
      bookings: "Manage Bookings",
      items: "Manage Items",
      payments: "Payments & Commissions",
      subscriptions: "Subscriptions",
      "collateral-approvals": "Collateral Approvals",
      reports: "Reports & Disputes",
      analytics: "Analytics & Insights",
      support: "Messages & Support",
      settings: "Platform Settings",
    };
    return titles[section] || "Admin Dashboard";
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <AdminOverview />;
      case "users":
        return <ManageUsers />;
      case "bookings":
        return <ManageBookings />;
      case "items":
        return <ManageItems />;
      case "analytics":
        return <AnalyticsInsights />;
      case "support":
        return <MessagesSupport />;
      case "payments":
        return <PaymentsCommissions />;
      case "subscriptions":
        return <Subscriptions />;
      case "collateral-approvals":
        return <CollateralApprovals />;
      case "reports":
        return <ReportsDisputes />;
      case "settings":
        return <PlatformSettings />;
      default:
        return (
          <div className="text-center py-8 sm:py-12">
            <h3 className="text-lg sm:text-xl text-white mb-2">
              {getSectionTitle(activeSection)}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              This admin section is under development...
            </p>
          </div>
        );
    }
  };

  const sidebar = (
    <Sidebar
      isCollapsed={false}
      onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
    />
  );

  const header = (
    <DashboardHeader
      onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      title={getSectionTitle(activeSection)}
    />
  );

  return (
    <ResponsiveLayout
      sidebar={sidebar}
      header={header}
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
    >
      {renderContent()}
    </ResponsiveLayout>
  );
};
