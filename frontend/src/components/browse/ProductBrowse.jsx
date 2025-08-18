import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../ui/Loader";
import { useGetCategoryQuery } from "../../slices/categoriesApiSlice";

import {
  Search,
  Filter,
  Grid,
  List,
  MapPin,
  Star,
  Clock,
  ArrowRight,
  X,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Navbar } from "../Navbar";

export const ProductBrowse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get initial values from URL query parameters
  const initialCategory = queryParams.get("category") || "";
  const initialSearch = queryParams.get("search") || "";

  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filters, setFilters] = useState({
    categories: initialCategory ? [initialCategory] : [],
    priceRange: [0, 1000],
    status: [],
    location: "",
    rating: 0,
    sortBy: "newest",
  });

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoryQuery();
  const { data: productsObject, isLoading: productsLoading } =
    useGetProductsQuery();

  if (categoriesLoading || productsLoading) return <Loader />;

  if (!categoriesData || categoriesData.length === 0) {
    return (
      <div className="text-center text-gray-500">No categories available</div>
    );
  }
  if (
    !productsObject ||
    !productsObject.items ||
    productsObject.items.length === 0
  ) {
    return (
      <div className="text-center text-gray-500">No products available</div>
    );
  }
  const products = productsObject.items;

  const mockProducts = products || [];
  const categories = categoriesData.map((cat) => cat.name);
  const statusOptions = ["available", "Available Soon", "Rented"];

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleStatusChange = (status) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status],
    }));
  };

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category?.name || product.category);

    const matchesPrice =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];

    const matchesRating = product.rating >= filters.rating;

    const matchesAvailability =
      filters.status.length === 0 ||
      filters.status
        .map((s) => s.toLowerCase())
        .includes(product.availability.toLowerCase());

    const matchesLocation =
      !filters.location ||
      product.location.toLowerCase().includes(filters.location.toLowerCase());

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesRating &&
      matchesAvailability &&
      matchesLocation
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popular":
        // Replace with your actual popularity field or fallback
        return (b.reviews || 0) - (a.reviews || 0);
      case "newest":
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navbar */}
      <Navbar />

      <div className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Browse <span className="text-emerald-400">Equipment</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Discover professional tools and equipment for rent
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 mb-8">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for equipment, tools, cameras..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300"
              />
            </div>
          </div>

          {/* View Controls */}
          <div className="flex items-center justify-between sm:justify-start space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                showFilters
                  ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/30"
                  : "bg-white/5 text-gray-400 border border-white/20 hover:bg-white/10"
              }`}
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>

            <div className="flex bg-white/5 border border-white/20 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-emerald-400/20 text-emerald-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-emerald-400/20 text-emerald-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-full lg:w-80 lg:flex-shrink-0">
              {/* Mobile Filter Overlay */}
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setShowFilters(false)}
              />
              <Card className="fixed inset-x-4 top-4 bottom-4 z-50 lg:inset-auto lg:z-auto p-4 lg:p-6 lg:sticky lg:top-8 overflow-y-auto">
                {/* Mobile Close Button */}
                <button
                  onClick={() => setShowFilters(false)}
                  className="absolute top-4 right-4 lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-xl font-bold text-white mb-6">Filters</h3>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">Categories</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="w-4 h-4 bg-white/5 border border-white/20 rounded focus:ring-emerald-400 focus:ring-2 text-emerald-400"
                        />
                        <span className="text-gray-300 group-hover:text-white transition-colors text-sm">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">
                    Price Range (per day)
                  </h4>
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <input
                        type="number"
                        value={filters.priceRange[0]}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [
                              parseInt(e.target.value) || 0,
                              prev.priceRange[1],
                            ],
                          }))
                        }
                        className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-400"
                        placeholder="Min"
                      />
                      <span className="text-gray-400 text-center">to</span>
                      <input
                        type="number"
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [
                              prev.priceRange[0],
                              parseInt(e.target.value) || 1000,
                            ],
                          }))
                        }
                        className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-400"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">Availability</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {statusOptions.map((status) => (
                      <label
                        key={status}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={filters.status.includes(status)}
                          onChange={() => handleStatusChange(status)}
                          className="w-4 h-4 bg-white/5 border border-white/20 rounded focus:ring-emerald-400 focus:ring-2 text-emerald-400"
                        />
                        <span className="text-gray-300 group-hover:text-white transition-colors capitalize text-sm">
                          {status}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">
                    Minimum Rating
                  </h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() =>
                            setFilters((prev) => ({ ...prev, rating }))
                          }
                          className="w-4 h-4 bg-white/5 border border-white/20 focus:ring-emerald-400 focus:ring-2 text-emerald-400"
                        />
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                          <span className="text-gray-300 text-sm ml-2">
                            & up
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h4 className="text-white font-medium mb-3">Sort By</h4>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortBy: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:bg-gray-800 focus:text-white"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </Card>
            </div>
          )}

          {/* Products Grid/List */}
          {/* sortedProducts*/}
          {sortedProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 px-6 py-20 text-center">
              <svg
                className="w-24 h-24 mb-6 text-gray-400 animate-pulse"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5M14.25 9.75l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="mb-4 text-4xl font-extrabold text-gray-200">
                No Products Found
              </h2>
              <p className="max-w-md text-lg text-gray-400">
                Sorry, we couldn’t find any products matching your criteria.
                Please try adjusting your filters or search terms.
              </p>
            </div>
          )}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-300">
                Showing {sortedProducts.length} of {mockProducts.length} items
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
                {sortedProducts.map((product) => (
                  <Card
                    key={product._id}
                    className="group cursor-pointer"
                    onClick={() => {
                      navigate(`/items/${product._id}`);
                      setShowFilters(false);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        navigate(`/items/${product._id}`);
                        setShowFilters(false);
                      }
                    }}
                  >
                    <div className="relative mb-4 overflow-hidden rounded-xl">
                      <img
                        src={
                          product.images && product.images[0]
                            ? product.images[0]
                            : "https://via.placeholder.com/400x300?text=No+Image"
                        }
                        alt={product.title}
                        className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            product.availability === "Now"
                              ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/30"
                              : product.availability === "Rented"
                              ? "bg-red-400/20 text-red-400 border border-red-400/30"
                              : "bg-orange-400/20 text-orange-400 border border-orange-400/30"
                          }`}
                        >
                          {product.availability}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                          <span className="text-emerald-400 font-bold text-xs sm:text-sm">
                            ${product.price}/{product.priceUnit}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-emerald-400 text-sm font-medium">
                          {product.category}
                        </span>
                        <h3 className="text-white font-bold text-base group-hover:text-emerald-400 transition-colors line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2 mt-1">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-white">{product.rating}</span>
                          <span className="text-gray-400 hidden sm:inline">
                            ({product.reviews})
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs truncate max-w-20 sm:max-w-none">
                            {product.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <div className="flex items-center space-x-1 text-gray-400 text-sm">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs">Available now</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <Card
                    key={product._id}
                    className="group cursor-pointer"
                    onClick={() => {
                      navigate(`/items/${product._id}`);
                      setShowFilters(false);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        navigate(`/items/${product._id}`);
                        setShowFilters(false);
                      }
                    }}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className="relative w-full sm:w-40 h-48 sm:h-32 flex-shrink-0 overflow-hidden rounded-xl">
                        <img
                          src={
                            product.images && product.images[0]
                              ? product.images[0]
                              : "https://via.placeholder.com/400x300?text=No+Image"
                          }
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-2 left-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              product.availability === "Now"
                                ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/30"
                                : product.availability === "Rented"
                                ? "bg-red-400/20 text-red-400 border border-red-400/30"
                                : "bg-orange-400/20 text-orange-400 border border-orange-400/30"
                            }`}
                          >
                            {product.availability}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-emerald-400 text-sm font-medium">
                              {product.category}
                            </span>
                            <div className="text-emerald-400 font-bold text-lg">
                              ${product.price}/{product.priceUnit}
                            </div>
                          </div>
                          <h3 className="text-white font-bold text-lg group-hover:text-emerald-400 transition-colors mb-2">
                            {product.title}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                          <div className="flex items-center space-x-2 sm:space-x-4">
                            <div className="flex items-center space-x-1 text-yellow-400">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-white">
                                {product.rating}
                              </span>
                              <span className="text-gray-400">
                                ({product.reviews})
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-400">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm truncate">
                                {product.location}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
