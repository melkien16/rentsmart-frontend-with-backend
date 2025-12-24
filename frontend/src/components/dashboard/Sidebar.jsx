import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  Package,
  Plus,
  DollarSign,
  Wallet,
  Shield,
  Crown,
  Heart,
  Star,
  AlertTriangle,
  Settings,
  Users,
  Calendar,
  BarChart3,
  FileText,
  HelpCircle,
} from "lucide-react";

export const Sidebar = ({ activeSection, onSectionChange }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const userMenuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "rentals", label: "My Rentals", icon: Package },
    { id: "listings", label: "My Listings", icon: Package },
    { id: "rental-requests", label: "Rental Requests", icon: Calendar },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "collateral", label: "Collateral", icon: Shield },
    { id: "subscription", label: "Subscription", icon: Crown },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "support", label: "Report Problem", icon: AlertTriangle },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  const adminMenuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Manage Users", icon: Users },
    { id: "bookings", label: "Manage Bookings", icon: Calendar },
    { id: "items", label: "Manage Items", icon: Package },
    { id: "payments", label: "Payments", icon: DollarSign },
    { id: "subscriptions", label: "Subscriptions", icon: Crown },
    { id: "collateral-approvals", label: "Collateral Approvals", icon: Shield },
    { id: "reports", label: "Reports & Disputes", icon: FileText },
    { id: "analytics", label: "Analytics & Insights", icon: BarChart3 },
    { id: "support", label: "Messages & Support", icon: HelpCircle },
    { id: "settings", label: "Platform Settings", icon: Settings },
  ];

  const menuItems = userInfo?.isAdmin ? adminMenuItems : userMenuItems;

  return (
    <div className="h-full bg-black/90 backdrop-blur-md border-r border-white/10 transition-all duration-300 z-40 flex flex-col">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center justify-between bg-white/5 rounded-xl border border-white/10">
          <Link to={"/"} className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 md:h-14 md:w-14 rounded-lg flex items-center justify-center">
              <img src="/withBack.svg" alt="" />
            </div>
            <span className="text-white font-bold text-lg sm:text-base">
              RentSmart
            </span>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 sm:py-3 rounded-xl transition-all duration-200 text-sm sm:text-base ${
              activeSection === item.id
                ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/30"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="font-medium truncate">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Info */}
      {userInfo && (
        <div className="p-2 sm:p-4 border-t border-white/10 flex-shrink-0">
          <div className="bg-white/5 rounded-xl p-2 sm:p-3 border border-white/10">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img
                src={
                  userInfo.avatar ||
                  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                }
                alt={userInfo.name}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate text-xs sm:text-sm">
                  {userInfo.name}
                </p>
                <p className="text-gray-400 text-xs capitalize truncate">
                  {userInfo.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
