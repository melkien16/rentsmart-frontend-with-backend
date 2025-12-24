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
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import {
  useGetUserPublicByIdQuery,
  useGetUserProfileQuery,
} from "../../slices/usersApiSlice";
import { useGetOwnerReviewSummaryQuery } from "../../slices/reviewsApiSlice";

import { Navbar } from "../navBar/Navbar";
import SettingsPanel from "./settingsPanel";
import ReviewsPanel from "./ReviewsPanel";
import MyRentalsPanel from "./MyRentalsPanel";
import MyListingsPanel from "./MyListingsPanel";
import Loader from "../ui/Loader";

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data, error, isLoading } = useGetUserProfileQuery();
  const {
    data: reviewData,
    error: reviewErrore,
    isLoading: reviewLoading,
  } = useGetOwnerReviewSummaryQuery(userInfo._id);

  const tabs = ["My Listings", "Reviews", "My Rentals", "Settings"];
  const [activeTab, setActiveTab] = useState("My Listings");
  const profileData = data;

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-montserrat">
      <Navbar />
      <div className="min-h-screen max-w-[90%] mx-auto pt-16">
        {/* Profile Header */}
        {(isLoading || reviewLoading) && <Loader />}
        {error && <div className="text-red-500">Error loading profile.</div>}

        <div className="mb-8 mt-6 bg-white/10 overflow-hidden rounded-lg shadow-sm">
          <div className="h-32 bg-gradient-to-r from-[#00FF99]/20 via-[#00FF99]/10 to-transparent sm:h-48"></div>

          <div className="relative px-4 pb-5 pt-16 sm:px-6 sm:pb-6 sm:pt-24">
            <div className="absolute left-4 top-0 -translate-y-1/2 sm:left-6">
              <div className="relative">
                <img
                  src={profileData?.avatar}
                  alt={profileData?.name}
                  className="h-24 w-24 rounded-full border-4 border-[#00FF99] object-cover sm:h-32 sm:w-32"
                />
                <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0ac077] text-white opacity-75 hover:opacity-100 sm:h-10 sm:w-10">
                  <Camera size={16} />
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between sm:flex-row sm:items-end">
              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">
                  {profileData?.name}
                </h1>
                {profileData?.isPremium && (
                  <div className="mt-2 inline-flex items-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 px-3 py-1 text-sm font-medium">
                    <Star size={14} className="mr-1" fill="currentColor" />
                    Premium Member
                  </div>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {profileData?.address}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    Member since{" "}
                    {dayjs(profileData?.createdAt).format("YY-MM-DD")}
                  </div>
                  <div className="flex items-center">
                    <Star
                      size={16}
                      className="mr-1 text-yellow-400"
                      fill="currentColor"
                    />
                    {reviewData?.averageRating} rating
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
          {profileData?.verification?.isEmailVerified ? (
            <span className="flex items-center gap-2 bg-emerald-400/20 border border-emerald-400/40 text-emerald-400 px-4 py-2 rounded-full">
              <ShieldCheck size={18} /> Email Verified
            </span>
          ) : (
            <Link
              to={"/verify"}
              className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-500 px-4 py-2 rounded-full"
            >
              <ShieldX size={18} /> Email Not Verified
            </Link>
          )}
          {profileData?.verification?.isPhoneVerified ? (
            <span className="flex items-center gap-2 bg-emerald-400/20 border border-emerald-400/40 text-emerald-400 px-4 py-2 rounded-full">
              <ShieldCheck size={18} /> Phone Verified
            </span>
          ) : (
            <Link
              to={"/verify"}
              className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-500 px-4 py-2 rounded-full"
            >
              <ShieldX size={18} /> Phone Not Verified
            </Link>
          )}
          {profileData?.verification?.isIdVerified ? (
            <span className="flex items-center gap-2 bg-emerald-400/20 border border-emerald-400/40 text-emerald-400 px-4 py-2 rounded-full">
              <ShieldCheck size={18} /> ID Verified
            </span>
          ) : (
            <Link
              to={"/verify"}
              className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-500 px-4 py-2 rounded-full"
            >
              <ShieldX size={18} /> ID Not Verified
            </Link>
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
          {activeTab === "My Listings" && <MyListingsPanel />}

          {activeTab === "Reviews" && <ReviewsPanel />}

          {activeTab === "My Rentals" && <MyRentalsPanel />}

          {activeTab === "Settings" && <SettingsPanel />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
