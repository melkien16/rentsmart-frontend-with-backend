import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Shield,
  MessageSquare,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  Award,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { toast } from "react-toastify";
import { useGetProductByIdQuery } from "../../slices/productsApiSlice";
import Loader from "../ui/Loader";

import { useGetUserPublicByIdQuery } from "../../slices/usersApiSlice";
import { useGetOwnerReviewSummaryQuery } from "../../slices/reviewsApiSlice";

import { setBooking } from "../../slices/bookingSlice";

export const ProductDetail = ({ onBack }) => {
  // ----- STATE & REFS -----
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDates, setSelectedDates] = useState({ start: "", end: "" });
  const [isFavorited, setIsFavorited] = useState(false);

  const sliderRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ----- REDUX & API HOOKS -----
  const { userInfo } = useSelector((state) => state.auth);

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  // Conditional queries for owner data
  const { data: ownerPublicData } = useGetUserPublicByIdQuery(
    product?.owner?._id,
    {
      skip: !product?.owner?._id,
    }
  );
  const { data: ownerReviewSummary } = useGetOwnerReviewSummaryQuery(
    product?.owner?._id,
    {
      skip: !product?.owner?._id,
    }
  );

  // ----- DERIVED DATA -----
  const owner = {
    id: ownerPublicData?._id || product?.owner,
    name: ownerPublicData?.name || "Unknown Owner",
    email: ownerPublicData?.email || "No email provided",
    avatar: ownerPublicData?.avatar || "https://via.placeholder.com/150",
    rating: ownerReviewSummary?.averageRating || 0,
    reviews: ownerReviewSummary?.totalReviews || 0,
    joined_date: ownerPublicData?.createdAt,
    verified: ownerPublicData?.verification?.isVerified || false,
    bio: ownerPublicData?.bio || "No bio available",
    phone: ownerPublicData?.phone || "No phone provided",
    address: ownerPublicData?.address || "No address provided",
    isPremium: ownerPublicData?.isPremium || false,
  };

  // ----- IMAGE NAVIGATION -----
  const nextImage = () => {
    if (!product?.images) return;
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!product?.images) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentImageIndex]);

  // Touch swipe navigation
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let startX = 0;
    let endX = 0;

    const onTouchStart = (e) => (startX = e.touches[0].clientX);
    const onTouchMove = (e) => (endX = e.touches[0].clientX);
    const onTouchEnd = () => {
      if (startX - endX > 50) nextImage();
      if (endX - startX > 50) prevImage();
    };

    slider.addEventListener("touchstart", onTouchStart);
    slider.addEventListener("touchmove", onTouchMove);
    slider.addEventListener("touchend", onTouchEnd);

    return () => {
      slider.removeEventListener("touchstart", onTouchStart);
      slider.removeEventListener("touchmove", onTouchMove);
      slider.removeEventListener("touchend", onTouchEnd);
    };
  }, [currentImageIndex]);

  // date price calculation
  const calculateDays = () => {
    if (!selectedDates.start || !selectedDates.end) return 0;
    const start = new Date(selectedDates.start);
    const end = new Date(selectedDates.end);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const totalPrice = product ? calculateDays() * product.price : 0;
  const serviceFeeRate = userInfo?.isPremium ? 0.05 : 0.1;

  const serviceFee = Math.round(totalPrice * serviceFeeRate);

  if (isLoading) return <Loader />;
  if (error)
    return <div className="text-red-500">Error loading product details.</div>;
  if (!product) return <div className="text-red-500">Product not found.</div>;

  const handleBookNow = async () => {
    navigate("/booking-summary");
    if (!userInfo) {
      navigate(`/signin?redirect=/items/${id}`);
      return;
    }

    if (!selectedDates.start || !selectedDates.end) {
      toast.error("Please select start and end dates.");
      return;
    }

    const bookingData = {
      itemId: product._id,
      itemName: product.title,
      price: product.price,
      serviceFee: serviceFee,
      startDate: selectedDates.start,
      image: product?.images[0],
      endDate: selectedDates.end,
      category: product.category,
      ownerName: owner.name,
      rating: product.rating,
      reviews: product.reviews,
      avatar: owner.avatar,
      verified: owner.verified,
      location: product.location,
    };

    dispatch(setBooking(bookingData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-emerald-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Browse</span>
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Images, Info, Owner (3/4) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="p-0 overflow-hidden">
              <div
                className="relative"
                ref={sliderRef}
                aria-label="Product image gallery"
                tabIndex={0}
              >
                <div
                  className="aspect-video bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer"
                  // onClick={() => setLightboxOpen(true)}
                  aria-label="Open image in full screen"
                  tabIndex={0}
                >
                  <img
                    src={
                      product.images && product.images[0]
                        ? product?.images?.[currentImageIndex]
                        : "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={product.title}
                    className="w-full h-full object-cover max-h-[400px]"
                  />
                  {/* Image Navigation */}
                  {product?.images?.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  {/* Image Indicators */}
                  {product?.images?.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? "bg-emerald-400 w-6"
                              : "bg-white/50 hover:bg-white/80"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                        isFavorited
                          ? "bg-red-400/20 text-red-400 border border-red-400/30"
                          : "bg-black/60 text-white hover:bg-black/80"
                      }`}
                      aria-label={isFavorited ? "Unfavorite" : "Favorite"}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorited ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button
                      className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300"
                      aria-label="Share"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {/* Thumbnail Strip */}
                {product?.images?.length > 1 && (
                  <div className="flex space-x-2 mt-4 px-4 pb-4 overflow-x-auto">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === currentImageIndex
                            ? "border-emerald-400"
                            : "border-white/20 hover:border-white/40"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Product Information */}
            <Card className="p-6">
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-400 font-medium capitalize">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="text-white font-bold">
                        {product.rating}
                      </span>
                      <span className="text-gray-400">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    {product.title}
                  </h1>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{product.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Available: {product.availability}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                    Description
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                      Features & Specifications
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1 ml-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Rules */}
                {product.rules && product.rules.length > 0 && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                      Rental Rules
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1 ml-2">
                      {product.rules.map((rule, idx) => (
                        <li key={idx}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>

            {/* Owner Information */}
            <Card className="p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                Owner Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={owner?.avatar}
                    alt={owner.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-emerald-400/30"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-white font-bold text-sm sm:text-base">
                        {owner.name}
                      </h4>
                      {owner.verified && (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-400 mb-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-white">{owner.rating}</span>
                      <span className="text-gray-400 text-sm">
                        ({owner.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Member since{" "}
                      {owner.joined_date
                        ? new Date(owner.joined_date).getFullYear()
                        : "-"}
                    </p>
                  </div>
                </div>
                {owner.email && (
                  <div className="text-gray-300 text-sm italic">
                    {owner.email}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-emerald-400 font-bold text-base sm:text-lg">
                      {owner.phone}
                    </div>
                    <div className="text-gray-400 text-sm">Phone Number</div>
                  </div>
                  <div className="text-center">
                    <div className="text-emerald-400 font-bold text-base sm:text-lg">
                      {owner.address}
                    </div>
                    <div className="text-gray-400 text-sm">Address</div>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => navigate(`/owner-profile/${owner.id}`)}
                >
                  <MessageSquare className="w-4 h-4" />
                  View Owner Profile
                </Button>
              </div>
            </Card>
          </div>

          {/* Right: Order Form (1/4) */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="p-6 sticky top-28 z-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Book This Item
                  </h3>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-bold text-emerald-400">
                      ${product.price}
                    </div>
                    <div className="text-gray-400 text-sm">
                      per {product.priceUnit}
                    </div>
                  </div>
                </div>
                {/* Date Selection */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={selectedDates.start}
                      onChange={(e) =>
                        setSelectedDates((prev) => ({
                          ...prev,
                          start: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={selectedDates.end}
                      onChange={(e) =>
                        setSelectedDates((prev) => ({
                          ...prev,
                          end: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                      min={
                        selectedDates.start ||
                        new Date().toISOString().split("T")[0]
                      }
                    />
                  </div>
                </div>
                {/* Price Breakdown */}
                {calculateDays() > 0 && (
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-gray-300 text-sm sm:text-base">
                      <span>
                        ${product.price} × {calculateDays()} {product.priceUnit}
                      </span>
                      <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-gray-300 text-sm sm:text-base">
                      <span>Service fee</span>
                      <span>${Math.round(totalPrice * 0.1)}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-base sm:text-lg pt-2 border-t border-white/10">
                      <span>Total</span>
                      <span>${totalPrice + Math.round(totalPrice * 0.1)}</span>
                    </div>
                  </div>
                )}
                <Button
                  variant="primary"
                  className="w-full"
                  disabled={
                    !selectedDates.start ||
                    !selectedDates.end ||
                    product.availability !== "Available"
                  }
                  onClick={handleBookNow}
                >
                  {product.availability === "Available"
                    ? "Book Now"
                    : "Currently Unavailable"}
                </Button>

                <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Protected by RentSmart guarantee</span>
                </div>
              </div>
            </Card>

            {/* Safety & Trust */}
            <Card className="p-6 z-0">
              <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                Safety & Trust
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300 text-sm sm:text-base">
                    Verified owner identity
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300 text-sm sm:text-base">
                    Equipment quality guaranteed
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300 text-sm sm:text-base">
                    24/7 customer support
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
