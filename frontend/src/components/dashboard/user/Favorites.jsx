import { useState } from "react";
import {
  Package,
  Star,
  X,
  Heart,
  Tag,
  List,
  Grid,
  Activity,
} from "lucide-react";
import {mockFavoritesData} from "../mockUserData.js"

const Favorites = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredFavorites =
    selectedCategory === "all"
      ? mockFavoritesData.favorites
      : mockFavoritesData.favorites.filter(
          (item) =>
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "electronics":
        return "bg-blue-400/20 text-blue-400 border-blue-400/30";
      case "sports":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      case "tools":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      case "vehicles":
        return "bg-purple-400/20 text-purple-400 border-purple-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-pink-400/10 via-red-400/10 to-orange-400/10 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Heart className="w-8 h-8 text-pink-400" />
              My Favorites
            </h2>
            <p className="text-gray-300 mt-2">
              Save and organize your favorite rental items
            </p>
          </div>
          <div className="flex gap-3">
            <div className="hidden md:flex bg-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-pink-400 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-pink-400 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-pink-400"
            >
              <option value="all">All Categories</option>
              {mockFavoritesData.categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-pink-400/20 to-pink-600/20 rounded-2xl border border-pink-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-400 text-sm font-medium">
                Total Favorites
              </p>
              <p className="text-3xl font-bold text-white">
                {mockFavoritesData.totalFavorites}
              </p>
              <p className="text-pink-400 text-sm flex items-center gap-1">
                <Heart className="w-4 h-4" />
                Saved items
              </p>
            </div>
            <div className="w-12 h-12 bg-pink-400/20 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-pink-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl border border-blue-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Electronics</p>
              <p className="text-3xl font-bold text-white">
                {mockFavoritesData.categories.find(
                  (c) => c.name === "Electronics"
                )?.count || 0}
              </p>
              <p className="text-blue-400 text-sm flex items-center gap-1">
                <Package className="w-4 h-4" />
                Tech items
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl border border-green-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Sports</p>
              <p className="text-3xl font-bold text-white">
                {mockFavoritesData.categories.find((c) => c.name === "Sports")
                  ?.count || 0}
              </p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <Activity className="w-4 h-4" />
                Outdoor gear
              </p>
            </div>
            <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl border border-purple-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Other</p>
              <p className="text-3xl font-bold text-white">
                {mockFavoritesData.categories
                  .filter((c) => !["Electronics", "Sports"].includes(c.name))
                  .reduce((sum, c) => sum + c.count, 0)}
              </p>
              <p className="text-purple-400 text-sm flex items-center gap-1">
                <Tag className="w-4 h-4" />
                Tools & Vehicles
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center">
              <Tag className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Favorites Grid/List View */}
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFavorites.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-pink-400/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                    <span
                      className={`absolute top-2 left-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-white font-semibold text-lg">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-pink-400 font-semibold">
                        ${item.price}/{item.priceUnit}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-sm">
                          {item.rating}
                        </span>
                        <span className="text-gray-400 text-sm">
                          ({item.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Owner</span>
                      <span className="text-white">{item.owner}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Location</span>
                      <span className="text-blue-400">{item.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Added</span>
                      <span className="text-gray-300 text-sm">
                        {item.addedDate}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${
                          item.availability === "Now"
                            ? "bg-green-400/20 text-green-400 border-green-400/30"
                            : "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
                        }`}
                      >
                        {item.availability}
                      </span>
                      <button className="px-4 py-2 bg-pink-400 text-black rounded-lg hover:bg-pink-500 transition-colors text-sm font-medium">
                        Rent Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFavorites.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-pink-400/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Owner: {item.owner} • Location: {item.location}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-pink-400 font-semibold">
                          ${item.price}/{item.priceUnit}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">
                            {item.rating}
                          </span>
                        </div>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(
                            item.category
                          )}`}
                        >
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${
                          item.availability === "Now"
                            ? "bg-green-400/20 text-green-400 border-green-400/30"
                            : "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
                        }`}
                      >
                        {item.availability}
                      </span>
                      <button className="mt-2 px-4 py-2 bg-pink-400 text-black rounded-lg hover:bg-pink-500 transition-colors text-sm font-medium">
                        Rent Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-400" />
                  {selectedItem.title}
                </h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Title</label>
                    <p className="text-white font-medium text-lg">
                      {selectedItem.title}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Category</label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(
                        selectedItem.category
                      )}`}
                    >
                      {selectedItem.category}
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Price</label>
                    <p className="text-pink-400 font-semibold text-lg">
                      ${selectedItem.price}/{selectedItem.priceUnit}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Rating</label>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < selectedItem.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                      <span className="text-white ml-2">
                        {selectedItem.rating}/5
                      </span>
                      <span className="text-gray-400">
                        ({selectedItem.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Owner</label>
                    <p className="text-white">{selectedItem.owner}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Location</label>
                    <p className="text-blue-400">{selectedItem.location}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">
                      Availability
                    </label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${
                        selectedItem.availability === "Now"
                          ? "bg-green-400/20 text-green-400 border-green-400/30"
                          : "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
                      }`}
                    >
                      {selectedItem.availability}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-pink-400 text-black rounded-lg hover:bg-pink-500 transition-colors font-semibold">
                  Rent Now
                </button>
                <button className="flex-1 px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors font-semibold">
                  Remove from Favorites
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
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

export default Favorites