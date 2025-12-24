import React, { useState } from "react";
import { ResponsiveLayout } from "./ui";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { UserOverview } from "./user/UserOverview";
import MyRentals from "./user/MyRentals";
import MyListings from "./user/MyListings";
import MyCollaterals from "./user/MyCollaterals";
import AddNewItem from "./user/AddNewItem";
import Earnings from "./user/Earnings";
import WalletDeposit from "./user/WalletDeposit";
import PremiumSubscription from "./user/PremiumSubscription";
import Favorites from "./user/Favorites";
import Reviews from "./user/Reviews";
import Support from "./user/Support";
import AccountSettings from "./user/AccountSettings";
import MyRentalRequests from "./user/MyRentalRequest";

export const UserDashboard = () => {
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
      overview: "Dashboard Overview",
      rentals: "My Rentals",
      listings: "My Listings",
      "add-item": "Add New Item",
      earnings: "Earnings",
      wallet: "Wallet & Deposit",
      collateral: "Collateral",
      subscription: "Premium Subscription",
      favorites: "Favorites",
      reviews: "Reviews",
      support: "Report a Problem",
      settings: "Account Settings",
    };
    return titles[section] || "Dashboard";
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <UserOverview />;
      case "rentals":
        return <MyRentals />;
      case "listings":
        return <MyListings />;
      case "rental-requests":
        return <MyRentalRequests />;
      case "collateral":
        return <MyCollaterals />;
      case "add-item":
        return <AddNewItem />;
      case "earnings":
        return <Earnings />;
      case "wallet":
        return <WalletDeposit />;
      case "subscription":
        return <PremiumSubscription />;
      case "favorites":
        return <Favorites />;
      case "reviews":
        return <Reviews />;
      case "support":
        return <Support />;
      case "settings":
        return <AccountSettings />;
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-xl text-white mb-2">
              {getSectionTitle(activeSection)}
            </h3>
            <p className="text-gray-400">
              This section is under development...
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
