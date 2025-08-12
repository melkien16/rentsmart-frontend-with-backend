import React from "react";
import { Star, Clock, MapPin } from "lucide-react";
import { Card } from "./ui/Card";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "./ui/Loader";

export const FeaturedRentals = () => {
  const navigate = useNavigate();
  let { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">Error loading products</div>;
  if (!products || products.length === 0) {
    return <div className="text-gray-500">No featured rentals available</div>;
  }

  // fetch only 4 products for featured rentals
  if (products && products.length > 4) {
    products = products.slice(0, 4);
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-900">
      <div className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Featured <span className="text-emerald-400">Rentals</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-2 sm:px-4">
            Discover the most popular tools and equipment available for rent
            right now
          </p>
        </div>

        {/* Featured Items Grid - Mobile optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6">
          {products?.map((item) => (
            <Card
              key={item._id}
              className="group cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => navigate(`/items/${item._id}`)}
            >
              {/* Image */}
              <div className="relative mb-3 sm:mb-4 overflow-hidden rounded-xl">
                <img
                  src={
                    item.images && item.images[0]
                      ? item.images[0]
                      : "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={item.name}
                  className="w-full h-32 sm:h-40 lg:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.available
                        ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/30"
                        : "bg-red-400/20 text-red-400 border border-red-400/30"
                    }`}
                  >
                    {item.available ? "Available" : "Rented"}
                  </span>
                </div>
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                  <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <span className="text-emerald-400 font-bold text-xs sm:text-sm">
                      ${item.price}/{item.priceUnit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2 sm:space-y-3">
                <div>
                  <span className="text-emerald-400 text-xs sm:text-sm font-medium">
                    {item.category}
                  </span>
                  <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg line-clamp-2 leading-tight">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                    <span className="text-white">{item.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm truncate max-w-20 sm:max-w-none">
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="flex items-center space-x-1 text-gray-400 text-xs sm:text-sm">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      Next day delivery
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 sm:mt-12">
          <button
            className="px-6 sm:px-8 py-3 bg-white/5 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all duration-300 font-medium text-sm sm:text-base w-full sm:w-auto"
            onClick={() => navigate("/items")}
          >
            View All Rentals
          </button>
        </div>
      </div>
    </section>
  );
};
