import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Package,
  TrendingUp,
  List,
  Grid,
  X,
  Star,
  Calendar,
  Eye,
  Plus,
} from "lucide-react";

import Rating from "../../../helper/Ratings"

import { useGetProductsByUserIdQuery } from "../../../slices/productsApiSlice";

const mockListings = [
  {
    id: "listing1",
    title: "Professional Camera",
    category: "Electronics",
    description: "High-quality professional camera for events and photography",
    price: 50,
    qauntity: 1,
    priceUnit: "day",
    images: ["/images/camera.jpg", "/images/camera2.jpg"],
    status: "active",
    views: 245,
    inquiries: 12,
    bookings: 8,
    rating: 4.8,
    reviews: 15,
    location: "New York, NY",
    availability: "Now",
    createdAt: "2024-01-15",
    tags: ["Professional", "Events", "Photography"],
  },
];

const MyListings = () => {
  const [selectedListing, setSelectedListing] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: listings = [] } = useGetProductsByUserIdQuery(userInfo._id);

  console.log("data", listings)

  const filteredListings = listings?.filter(
    (listing) => filter === "all" || listing.status === filter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      case "inactive":
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-emerald-400/10 via-blue-400/10 to-purple-400/10 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Package className="w-8 h-8 text-emerald-400" />
              My Listings
            </h2>
            <p className="text-gray-300 mt-2">
              Manage your rental listings and track their performance
            </p>
          </div>
          <div className="flex gap-3">
            <div className="hidden md:flex bg-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-emerald-400 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-emerald-400 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/70 border border-white/80 text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="all">All Listings</option>
              <option value="Available">Active</option>
              <option value="Available Soon">Inactive</option>
              <option value="Rented">Inactive</option>
            </select>
            <button
              className="px-6 py-2 bg-emerald-400 text-black rounded-xl hover:bg-emerald-500 transition-all duration-200 flex items-center gap-2 font-semibold"
              // instead of opening a modal, just navigate to a /listings/new page with a redirect
              onClick={() => navigate("/list-item")}
            >
              <Plus className="w-4 h-4" />
              Add Listing
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-2xl border border-emerald-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-400 text-sm font-medium">
                Total Listings
              </p>
              <p className="text-3xl font-bold text-white">
                {listings.length}
              </p>
              <p className="text-emerald-400 text-sm flex items-center gap-1">
                <Package className="w-4 h-4" />
                Your items
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl border border-green-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">
                Active Listings
              </p>
              <p className="text-3xl font-bold text-white">
                {listings.filter((l) => l.status === "Available").length}
              </p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Available for rent
              </p>
            </div>
            <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl border border-blue-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Total Views</p>
              <p className="text-3xl font-bold text-white">
                {listings.reduce((sum, l) => sum + l.views, 0)}
              </p>
              <p className="text-blue-400 text-sm flex items-center gap-1">
                <Eye className="w-4 h-4" />
                This month
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl border border-purple-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">
                Total Bookings
              </p>
              <p className="text-3xl font-bold text-white">
                {listings.reduce((sum, l) => sum + l.bookings, 0)}
              </p>
              <p className="text-purple-400 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Successful rentals
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Listings Grid/List View */}
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <div
                  key={listing._id}
                  className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-emerald-400/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedListing(listing)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          {listing.title}
                        </h3>
                        <span className="text-gray-400 text-sm">
                          {listing.category}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                        listing.status
                      )}`}
                    >
                      {listing.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Price</span>
                      <span className="text-white font-semibold">
                        ${listing.price}/{listing.priceUnit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Views</span>
                      <span className="text-blue-400 text-sm">
                        {listing.views}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Bookings</span>
                      <span className="text-emerald-400 text-sm">
                        {listing.bookings}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Rating</span>
                      <div className="flex items-center gap-1">
                        <Rating value={listing.rating} showValue={false} />
                        <span className="text-gray-400">
                          ({listing.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {listing.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {listing.tags.length > 2 && (
                        <span className="px-2 py-1 bg-emerald-400/20 rounded-lg text-xs text-emerald-400">
                          +{listing.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedListing(listing);
                      }}
                      className="flex-1 px-3 py-2 bg-emerald-400 text-black rounded-lg hover:bg-emerald-500 transition-colors text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle toggle status
                      }}
                      className="flex-1 px-3 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
                    >
                      {listing.status === "Available" ? "Rented" : "Available"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredListings.map((listing) => (
                <div
                  key={listing._id}
                  className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-emerald-400/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedListing(listing)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-emerald-400/20 rounded-xl flex items-center justify-center">
                        <Package className="w-8 h-8 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">
                          {listing.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {listing.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-gray-400 text-sm">
                            Category: {listing.category}
                          </span>
                          <span className="text-gray-400 text-sm">
                            Location: {listing.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold text-lg">
                        ${listing.price}/{listing.priceUnit}
                      </div>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          listing.status
                        )}`}
                      >
                        {listing.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Listing Detail Modal */}
      {selectedListing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-400" />
                  Listing Details - {selectedListing.title}
                </h3>
                <button
                  onClick={() => setSelectedListing(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Title</label>
                    <p className="text-white font-medium">
                      {selectedListing.title}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Category</label>
                    <p className="text-white">{selectedListing.category}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Description</label>
                    <p className="text-gray-300">
                      {selectedListing.description}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Location</label>
                    <p className="text-white">{selectedListing.location}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Price</label>
                    <p className="text-white font-semibold text-lg">
                      ${selectedListing.price}/{selectedListing.priceUnit}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Status</label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                        selectedListing.status
                      )}`}
                    >
                      {selectedListing.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Created</label>
                    <p className="text-gray-300">{selectedListing.createdAt}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Total Views</p>
                    <p className="text-white font-bold text-2xl">
                      {selectedListing.views}
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Expected Value Price</p>
                    <p className="text-white font-bold text-2xl">
                      {selectedListing.value}
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Bookings</p>
                    <p className="text-white font-bold text-2xl">
                      {selectedListing.bookings}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm">
                  Rating & Reviews
                </label>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < selectedListing.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="text-white ml-2">
                    {selectedListing.rating}/5
                  </span>
                  <span className="text-gray-400">
                    ({selectedListing.reviews} reviews)
                  </span>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Tags</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedListing.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-emerald-400/20 rounded-lg text-sm text-emerald-400 border border-emerald-400/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-emerald-400 text-black rounded-lg hover:bg-emerald-500 transition-colors font-semibold">
                  Edit Listing
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors font-semibold">
                  View Analytics
                </button>
                <button
                  onClick={() => setSelectedListing(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
