import React, { useState } from "react";
import {
  ResponsiveLayout,
} from "./ui";
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
import Messages from "./user/Messages";
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
      messages: "Messages",
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
      case "messages":
        return <Messages />;
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

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
  //     <Sidebar
  //       isCollapsed={false}
  //       onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
  //       activeSection={activeSection}
  //       onSectionChange={handleSectionChange}
  //     />

  //     <div className="transition-all duration-300 ml-0 lg:ml-64">
  //       <DashboardHeader
  //         onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
  //         title={getSectionTitle(activeSection)}
  //       />

  //       <main className="p-4 sm:p-6">{renderContent()}</main>
  //     </div>

  //     {/* Mobile Overlay */}
  //     {sidebarCollapsed && (
  //       <div
  //         className="fixed inset-0 bg-black/50 z-30 lg:hidden"
  //         onClick={() => setSidebarCollapsed(true)}
  //       />
  //     )}

  //     {/* Mobile Sidebar */}
  //     <div
  //       className={`fixed left-0 top-0 h-full bg-black/95 backdrop-blur-md border-r border-white/10 transition-transform duration-300 z-40 lg:hidden ${
  //         sidebarCollapsed ? "translate-x-0" : "-translate-x-full"
  //       } w-64`}
  //     >
  //       <Sidebar
  //         isCollapsed={false}
  //         onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
  //         activeSection={activeSection}
  //         onSectionChange={(section) => {
  //           setActiveSection(section);
  //           setSidebarCollapsed(false); // Auto-close on mobile
  //         }}
  //       />
  //     </div>
  //   </div>
  // );
};
