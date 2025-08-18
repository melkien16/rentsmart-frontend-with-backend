import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CreditCard,
  Shield,
  CheckCircle,
  Wallet,
  Star,
} from "lucide-react";
import { toast } from "react-toastify";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import PaySuccessModal from "../ui/paySuccessModal";

import { useCreateBookingMutation } from "../../slices/bookingsApiSlice";
import { useLazyGetWalletByUserIdQuery } from "../../slices/walletsApiSlice";
import { useGetOwnerReviewSummaryQuery } from "../../slices/reviewsApiSlice";
import { setWalletInfo } from "../../slices/walletSlice";
import { clearBooking } from "../../slices/bookingSlice";

export const BookingSummary = ({ owner }) => {
  //totalReviews, averageRating
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { booking } = useSelector((state) => state.booking);
  const { userWalletInfo } = useSelector((state) => state.wallet);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createBooking, { isLoading, error }] = useCreateBookingMutation();
  const [getWalletByUserId] = useLazyGetWalletByUserIdQuery();
  const { data: ownerReviewSummary } = useGetOwnerReviewSummaryQuery(
    booking?.ownerId
  );

  const calculateDays = () => {
    if (!booking?.startDate || !booking?.endDate) return 0;
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const days = calculateDays();
  const subtotal = days * booking?.price;
  const serviceFee = booking?.serviceFee;
  const punishment = Math.round(booking?.price + Number(booking?.price * 0.5));
  const total = subtotal + serviceFee;

  const handlePayment = async () => {
    try {
      const bookingData = {
        itemId: booking.itemId,
        startDate: booking.startDate,
        endDate: booking.endDate,
      };
      const res = await createBooking(bookingData).unwrap();

      // ✅ Lazy fetch wallet after booking
      const walletData = await getWalletByUserId(userInfo._id).unwrap();
      if (walletData) dispatch(setWalletInfo(walletData));
      toast.success(res?.data?.massage || "Booking created successfully!");
      setIsSuccessModalOpen(true);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create booking");
      console.error("Booking error:", error);
    }
  };

  return (
    <section className="pt-[90px] md:pt-40 pb-8 px-4 bg-gradient-to-br from-gray-800 via-black to-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Booking Summary</h2>

        <Card className="p-0 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Product Info */}
              <div className="flex space-x-4">
                <img
                  src={booking?.image || "/placeholder.png"}
                  alt={booking?.itemName || "Product Image"}
                  className="w-20 h-20 rounded-xl object-cover border border-white/20"
                />
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {booking?.itemName || "Product"}
                  </h3>
                  <p className="text-emerald-400 font-medium mb-2">
                    {booking?.category || "Category"}
                  </p>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-white">
                      {booking?.rating || "4.9"}
                    </span>
                    <span className="text-gray-400">
                      ({booking?.reviews || 900} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Dates */}
              <div className="bg-white/5 rounded-xl p-4 space-y-3">
                <h4 className="text-white font-bold flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                  <span>Rental Period</span>
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Start Date</p>
                    <p className="text-white font-medium">
                      {format(new Date(booking.startDate), "MMM d, yyyy")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">End Date</p>
                    <p className="text-white font-medium">
                      {format(new Date(booking.startDate), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-2 border-t border-white/10">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-medium">
                    {days} days total
                  </span>
                </div>
              </div>

              {/* Owner Info */}
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-bold flex items-center space-x-2 mb-3">
                  <User className="w-5 h-5 text-emerald-400" />
                  <span>Owner Information</span>
                </h4>
                <div className="flex items-center space-x-3">
                  <img
                    src={booking?.avatar || "/placeholder-avatar.png"}
                    alt={owner?.name || "Owner Avatar"}
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400/30"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-white font-medium">
                        {booking?.ownerName || "Owner Name"}
                      </p>
                      {booking?.verified && (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-white text-sm">
                        {ownerReviewSummary?.averageRating || "0"}
                      </span>
                      <span className="text-gray-400 text-sm">
                        ({ownerReviewSummary?.totalReviews || "0"} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>{booking?.location || "Addis Ababa"}</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Price Breakdown */}
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-bold mb-4">Price Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">
                      ${booking?.price} × {days} days
                    </span>
                    <span className="text-white">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Service fee</span>
                    <span className="text-white">${serviceFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">
                      Late return fee (per day)
                    </span>
                    <span className="text-white">${punishment}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between">
                    <span className="text-white font-bold text-lg">Total</span>
                    <span className="text-emerald-400 font-bold text-lg">
                      ${total || 1000}
                    </span>
                  </div>
                </div>
              </div>

              {/* Wallet Balance */}
              <div className="bg-gradient-to-r from-emerald-400/10 to-emerald-500/10 border border-emerald-400/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Wallet className="w-5 h-5 text-emerald-400" />
                    <span className="text-white font-bold">Wallet Balance</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-lg">
                    ${userWalletInfo?.balance?.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Available after payment</span>
                  <span
                    className={`font-bold ${
                      userWalletInfo?.balance?.toFixed(2) >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    ${userWalletInfo?.balance?.toFixed(2) - total}
                  </span>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handlePayment}
                disabled={userWalletInfo?.balance?.toFixed(2) < 0 || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    {userWalletInfo?.balance?.toFixed(2) >= 0
                      ? `Pay $${total}`
                      : "Insufficient Balance"}
                  </>
                )}
              </Button>
              {/* Success Modal */}
              {isSuccessModalOpen && (
                <PaySuccessModal
                  amount={total}
                  message="Booking Successful!"
                  description="has been successfully booked."
                  //add navigation to booking details
                  onClose={() => {
                    setIsSuccessModalOpen(false);
                    dispatch(clearBooking());
                    navigate("/items");
                  }}
                />
              )}

              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Shield className="w-4 h-4" />
                <span>Your payment is protected by RentSmart guarantee</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default BookingSummary;
