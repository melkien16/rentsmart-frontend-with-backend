import React, { useState } from "react";
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Shield,
  Award,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Package,
  DollarSign,
  TrendingUp,
  User,
  Heart,
  Flag,
  Share2,
  Camera,
  Wrench,
  Laptop,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

const OwnerProfileDetailOwner = ({ owner, onBack, onContact }) => {
  const [activeTab, setActiveTab] = useState("listings");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewFilter, setReviewFilter] = useState("all");

  // Mock data for owner's listings
  const ownerListings = [
    {
      id: 1,
      title: "Sony Alpha 7R IV Professional Camera",
      category: "Camera",
      price: 85,
      rating: 4.9,
      reviews: 23,
      image:
        "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=300",
      status: "available",
      totalRentals: 45,
    },
    {
      id: 2,
      title: "Canon EOS R5 Mirrorless",
      category: "Camera",
      price: 95,
      rating: 4.8,
      reviews: 18,
      image:
        "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=300",
      status: "rented",
      totalRentals: 32,
    },
    {
      id: 3,
      title: "DJI Mavic Air 2 Drone",
      category: "Drone",
      price: 120,
      rating: 4.9,
      reviews: 31,
      image:
        "https://images.pexels.com/photos/724921/pexels-photo-724921.jpeg?auto=compress&cs=tinysrgb&w=300",
      status: "available",
      totalRentals: 67,
    },
    {
      id: 4,
      title: "MacBook Pro M3 16-inch",
      category: "Electronics",
      price: 75,
      rating: 4.7,
      reviews: 12,
      image:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300",
      status: "available",
      totalRentals: 28,
    },
  ];

 owner = {
    id: 1,
    name: "Sarah Johnson",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
    verified: true,
    rating: 4.9,
    reviews_count: 150,
    response_rate: 95,
    response_time: "within 1 hour",
    joined_date: "2020-05-15",
    location: "New York, NY",
    phone: "+1 234 567 8900",
    email: "johndoe@gmail.com"
  };

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      renterName: "Mike Rodriguez",
      renterAvatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
      date: "2024-01-20",
      itemRented: "Sony Alpha 7R IV",
      comment:
        "Excellent equipment and Sarah was very professional. The camera was in perfect condition and exactly as described. Quick response and smooth transaction!",
      helpful: 12,
    },
    {
      id: 2,
      renterName: "Emily Chen",
      renterAvatar:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
      date: "2024-01-18",
      itemRented: "DJI Mavic Air 2",
      comment:
        "Amazing drone and Sarah provided great instructions. Everything worked perfectly for my project. Highly recommend!",
      helpful: 8,
    },
    {
      id: 3,
      renterName: "David Park",
      renterAvatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4,
      date: "2024-01-15",
      itemRented: "Canon EOS R5",
      comment:
        "Good quality camera, though pickup was slightly delayed. Overall satisfied with the rental experience.",
      helpful: 5,
    },
    {
      id: 4,
      renterName: "Lisa Wang",
      renterAvatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
      date: "2024-01-12",
      itemRented: "MacBook Pro M3",
      comment:
        "Perfect for my video editing project. Sarah was very accommodating and the laptop performed flawlessly.",
      helpful: 15,
    },
    {
      id: 5,
      renterName: "James Wilson",
      renterAvatar:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
      date: "2024-01-10",
      itemRented: "Sony Alpha 7R IV",
      comment:
        "Outstanding service! The camera exceeded my expectations and Sarah provided excellent customer service throughout.",
      helpful: 9,
    },
  ];

  const stats = [
    { label: "Total Listings", value: ownerListings.length, icon: Package },
    { label: "Completed Rentals", value: "172", icon: CheckCircle },
    { label: "Response Rate", value: `${owner?.response_rate || 90}%`, icon: Clock },
    {
      label: "Member Since",
      value: new Date(owner?.joined_date)?.getFullYear(),
      icon: Calendar,
    },
  ];

  const filteredReviews =
    reviewFilter === "all"
      ? reviews
      : reviews.filter((review) => review.rating === parseInt(reviewFilter));

  const displayedReviews = showAllReviews
    ? filteredReviews
    : filteredReviews.slice(0, 3);

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 sm:p-6">
      <div className="max-w-[90%] mt-[70px] mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-emerald-400 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Owner Profile */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={owner.avatar}
                  alt={owner.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-emerald-400/30"
                />
                {owner.verified && (
                  <CheckCircle className="absolute -bottom-1 -right-1 w-8 h-8 text-emerald-400 bg-black rounded-full p-1" />
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {owner.name}
              </h2>
              <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-4">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-white font-bold text-lg">
                  {owner.rating}
                </span>
                <span className="text-gray-400">
                  ({owner.reviews_count} reviews)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-emerald-400 font-bold text-lg">
                    {owner.response_rate}%
                  </div>
                  <div className="text-gray-400 text-sm">Response Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-emerald-400 font-bold text-lg">
                    {owner.response_time}
                  </div>
                  <div className="text-gray-400 text-sm">Response Time</div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={onContact}
                >
                  <MessageSquare className="w-4 h-4" />
                  Contact Owner
                </Button>
                <div className="flex space-x-2">
                  <Button variant="secondary" className="flex-1">
                    <Heart className="w-4 h-4" />
                    Save
                  </Button>
                  <Button variant="secondary" className="flex-1">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>
            </Card>

            {/* Trust & Safety */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Trust & Safety
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300 text-sm">
                    Identity Verified
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300 text-sm">
                    Background Checked
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300 text-sm">
                    Superhost Status
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300 text-sm">
                    Member since {new Date(owner.joined_date).getFullYear()}
                  </span>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <stat.icon className="w-5 h-5 text-emerald-400" />
                      <span className="text-gray-300 text-sm">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-white font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Report Button */}
            <Button
              variant="ghost"
              className="w-full text-red-400 hover:text-red-300"
            >
              <Flag className="w-4 h-4" />
              Report User
            </Button>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <Card className="p-1">
              <div className="flex bg-white/5 rounded-xl p-1">
                {[
                  {
                    id: "listings",
                    label: "Listings",
                    count: ownerListings.length,
                  },
                  { id: "reviews", label: "Reviews", count: reviews.length },
                  { id: "about", label: "About", count: null },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/30"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.label}
                    {tab.count && (
                      <span className="ml-2 px-2 py-1 bg-white/10 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </Card>

            {/* Tab Content */}
            {activeTab === "listings" && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">
                    Available Listings
                  </h3>
                  <span className="text-gray-400 text-sm">
                    {ownerListings.length} items
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ownerListings.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="relative mb-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              item.status === "available"
                                ? "bg-emerald-400/20 text-emerald-400"
                                : "bg-red-400/20 text-red-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <h4 className="text-white font-medium mb-1 group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-2">
                        {item.category}
                      </p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-emerald-400 font-bold">
                          ${item.price}/day
                        </span>
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-white text-sm">
                            {item.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs">
                        {item.totalRentals} total rentals
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Rating Overview */}
                <Card className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">
                        {owner.rating}
                      </div>
                      <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(owner.rating) ? "fill-current" : ""
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-400">
                        {owner.reviews_count} reviews
                      </p>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div
                          key={rating}
                          className="flex items-center space-x-3"
                        >
                          <span className="text-gray-400 text-sm w-8">
                            {rating}★
                          </span>
                          <div className="flex-1 bg-white/10 rounded-full h-2">
                            <div
                              className="bg-emerald-400 h-2 rounded-full"
                              style={{
                                width: `${
                                  (ratingDistribution[rating] /
                                    reviews.length) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                          <span className="text-gray-400 text-sm w-8">
                            {ratingDistribution[rating]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Review Filters */}
                <Card className="p-4">
                  <div className="flex items-center space-x-4">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <div className="flex flex-wrap gap-2">
                      {["all", "5", "4", "3", "2", "1"].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setReviewFilter(filter)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                            reviewFilter === filter
                              ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/30"
                              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {filter === "all" ? "All Reviews" : `${filter} Stars`}
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Reviews List */}
                <Card className="p-6">
                  <div className="space-y-6">
                    {displayedReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-start space-x-4">
                          <img
                            src={review.renterAvatar}
                            alt={review.renterName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="text-white font-medium">
                                  {review.renterName}
                                </h4>
                                <p className="text-gray-400 text-sm">
                                  Rented: {review.itemRented}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center space-x-1 text-yellow-400 mb-1">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="w-4 h-4 fill-current"
                                    />
                                  ))}
                                </div>
                                <p className="text-gray-400 text-sm">
                                  {new Date(review.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-300 mb-3 leading-relaxed">
                              {review.comment}
                            </p>
                            <div className="flex items-center space-x-4 text-sm">
                              <button className="text-gray-400 hover:text-emerald-400 transition-colors">
                                Helpful ({review.helpful})
                              </button>
                              <button className="text-gray-400 hover:text-red-400 transition-colors">
                                Report
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredReviews.length > 3 && (
                    <div className="text-center mt-6">
                      <Button
                        variant="secondary"
                        onClick={() => setShowAllReviews(!showAllReviews)}
                      >
                        {showAllReviews ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            Show All {filteredReviews.length} Reviews
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </Card>
              </div>
            )}

            {activeTab === "about" && (
              <Card className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  About {owner.name}
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Bio</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Professional photographer and equipment enthusiast with
                      over 8 years of experience in the industry. I specialize
                      in portrait and landscape photography, and I'm passionate
                      about sharing high-quality gear with fellow creators. All
                      my equipment is professionally maintained and regularly
                      serviced to ensure optimal performance for your projects.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Photography Equipment",
                        "Video Gear",
                        "Drones",
                        "Lighting",
                        "Audio Equipment",
                      ].map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 bg-emerald-400/20 text-emerald-400 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">
                      Languages
                    </h4>
                    <div className="flex space-x-4">
                      <span className="text-gray-300">English (Native)</span>
                      <span className="text-gray-300">
                        Spanish (Conversational)
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">
                      Location
                    </h4>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                      <span>San Francisco Bay Area, CA</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">
                      Rental Policies
                    </h4>
                    <div className="space-y-2 text-gray-300">
                      <p>• Equipment must be returned in the same condition</p>
                      <p>• Late returns incur additional daily charges</p>
                      <p>• Damage deposit required for high-value items</p>
                      <p>• Free delivery within 10 miles of San Francisco</p>
                      <p>• 24/7 support during rental period</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfileDetailOwner;
