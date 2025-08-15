import React, { useState } from "react";
import {
  ShieldCheck,
  ShieldX,
  Calendar,
  Camera,
  Plus,
  Star,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar";
import SettingsPanel from "./settingsPanel";
import ReviewsPanel from "./ReviewsPanel";
import MyRentalsPanel from "./MyRentalsPanel";
import MyListingsPanel from "./MyListingsPanel";

const ProfilePage = ({ onAddListing }) => {
  // Mock user data
  const user = {
    name: "John Doe",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
    memberSince: "2021-01-01",
    emailVerified: true,
    phoneVerified: false,
    idVerified: true,
    isPremium: true,
    location: "New York, USA",
    rating: 4.8,
    listings: [
      {
        title: "Camera for Rent",
        description: "High-quality DSLR camera available for rent.",
        price: 50,
        image: "https://via.placeholder.com/200",
      },
      {
        title: "Tripod",
        description: "Sturdy tripod for stable shots.",
        price: 15,
        image: "https://via.placeholder.com/200",
      },
    ],
    reviews: [
      { reviewer: "Alice", comment: "Great experience!", rating: 5 },
      { reviewer: "Bob", comment: "Very professional!", rating: 4 },
    ],
    rentals: [
      { item: "Drone", date: "2023-10-15", status: "Returned" },
      { item: "Camera", date: "2023-08-02", status: "Ongoing" },
    ],
    settings: {
      email: "john@example.com",
      phone: "+123456789",
      notifications: true,
    },
  };

  const tabs = ["My Listings", "Reviews", "My Rentals", "Settings"];
  const [activeTab, setActiveTab] = useState("My Listings");

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-montserrat">
      <Navbar />
      <div className="min-h-screen max-w-[90%] mx-auto pt-16">
        {/* Profile Header */}
        <div className="mb-8 mt-6 bg-white/10 overflow-hidden rounded-lg shadow-sm">
          <div className="h-32 bg-gradient-to-r from-[#00FF99]/20 via-[#00FF99]/10 to-transparent sm:h-48"></div>

          <div className="relative px-4 pb-5 pt-16 sm:px-6 sm:pb-6 sm:pt-24">
            <div className="absolute left-4 top-0 -translate-y-1/2 sm:left-6">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-24 w-24 rounded-full border-4 border-[#00FF99] object-cover sm:h-32 sm:w-32"
                />
                <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0ac077] text-white opacity-75 hover:opacity-100 sm:h-10 sm:w-10">
                  <Camera size={16} />
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between sm:flex-row sm:items-end">
              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">{user.name}</h1>
                {user.isPremium && (
                  <div className="mt-2 inline-flex items-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 px-3 py-1 text-sm font-medium">
                    <Star size={14} className="mr-1" fill="currentColor" />
                    Premium Member
                  </div>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {user.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    Member since {user.memberSince}
                  </div>
                  <div className="flex items-center">
                    <Star
                      size={16}
                      className="mr-1 text-yellow-400"
                      fill="currentColor"
                    />
                    {user.rating} rating
                  </div>
                </div>
              </div>

              <Link to="/list-item" className="mt-4 sm:mt-0">
                <button className="btn-primary bg-[#00FF99]/20 border border-[#00FF99]/40 text-[#00FF99] hover:bg-[#00FF99]/30 hover:border-[#00FF99]/50 flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300">
                  <Plus size={16} />
                  Add New Listing
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className="mt-8 flex flex-wrap gap-4 bg-white/10 py-8 border border-white/20 rounded-lg px-6">
          {user.emailVerified ? (
            <span className="badge-verified">
              <ShieldCheck size={18} /> Email Verified
            </span>
          ) : (
            <span className="badge-notverified">
              <ShieldX size={18} /> Email Not Verified
            </span>
          )}
          {user.phoneVerified ? (
            <span className="badge-verified">
              <ShieldCheck size={18} /> Phone Verified
            </span>
          ) : (
            <span className="badge-notverified">
              <ShieldX size={18} /> Phone Not Verified
            </span>
          )}
          {user.idVerified ? (
            <span className="badge-verified">
              <ShieldCheck size={18} /> ID Verified
            </span>
          ) : (
            <span className="badge-notverified">
              <ShieldX size={18} /> ID Not Verified
            </span>
          )}
        </div>

        {/* Tabs */}
        <div className="mt-10 bg-white/10 rounded-t-lg shadow-sm p-6">
          <div className="flex border-b border-white/10 space-x-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-2 text-sm font-medium tracking-wide ${
                  activeTab === tab
                    ? "text-[#00FF99] border-b-2 border-[#00FF99]"
                    : "text-gray-400 hover:text-[#00FF99]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-10 bg-white/5">
          {activeTab === "My Listings" && (
            <MyListingsPanel listings={user.listings} />
          )}

          {activeTab === "Reviews" && <ReviewsPanel />}

          {activeTab === "My Rentals" && <MyRentalsPanel />}

          {activeTab === "Settings" && <SettingsPanel />}
        </div>
      </div>

      {/* Styles for badges */}
      <style jsx>{`
        .badge-verified {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 255, 153, 0.2);
          border: 1px solid rgba(0, 255, 153, 0.4);
          color: #00ff99;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
        }
        .badge-notverified {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #ef4444;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
