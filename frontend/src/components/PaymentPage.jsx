import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Wallet, AlertCircle, CreditCard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import { useBalance } from "../context/BalanceContext";
import { toast } from "react-hot-toast";
import TransactionModal from "../components/TransactionModal";
import WithdrawalSuccess from "../components/WithdrawalSuccess";
import { debitWallet } from "../Fetchers/walletFetcher";
import { sendMessage } from "../Fetchers/BookingFetcher";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { createBooking, updateBookingStatus } = useBooking();
  const { balance, fetchBalance } = useBalance();
  const [loading, setLoading] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [transactionError, setTransactionError] = useState("");
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);

  // Get booking details from location state
  const pendingBooking = location.state?.pendingBooking;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    if (!pendingBooking) {
      navigate("/dashboard?tab=rentals");
      return;
    }

    // Fetch user's balance
    fetchBalance();
  }, [isAuthenticated, pendingBooking, navigate, fetchBalance]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTransactionError("");

    try {
      if (!pendingBooking) {
        throw new Error("No booking information found");
      }

      // Calculate total amount
      const totalAmount = calculateTotalAmount(pendingBooking);

      // Check if user has sufficient balance
      if (balance < totalAmount) {
        throw new Error(
          "Insufficient balance. Please add funds to your account."
        );
      }

      // Get user ID from auth context
      const user = JSON.parse(localStorage.getItem("smartRentUser"));
      if (!user?._id) {
        throw new Error("User not authenticated");
      }

      // Deduct amount from wallet
      const paymentSuccess = await debitWallet(totalAmount, user._id);
      if (!paymentSuccess) {
        throw new Error("Payment failed. Please try again.");
      }

      // Only create booking after successful payment
      const newBooking = await createBooking({
        ...pendingBooking,
        totalAmount,
        status: "confirmed",
      });

      // Send message to owner after successful booking creation
      if (pendingBooking.item?.ownerId) {
        const message = `New booking confirmed from ${new Date(
          newBooking.startDate
        ).toLocaleDateString()} to ${new Date(
          newBooking.endDate
        ).toLocaleDateString()}`;
        await sendMessage(pendingBooking.item.ownerId, message);
      }

      // Store payment amount and show success modal
      setPaymentAmount(totalAmount);
      setShowPaymentSuccess(true);

      // Refresh balance after payment
      await fetchBalance();

      toast.success("Payment and booking confirmed!");

      // Remove the automatic navigation timeout
      // Let user close the modal manually
    } catch (error) {
      setTransactionError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalAmount = (booking) => {
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    // We need the item price from the booking data
    if (!booking.item?.price) {
      throw new Error("Item price not found");
    }

    const basePrice = booking.item.price * days;
    const serviceFee = basePrice * 0.1; // 10% service fee
    return basePrice + serviceFee;
  };

  const handleDeposit = async (amount) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setTransactionError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const success = await addFunds(numericAmount);
      if (!success) {
        throw new Error("Failed to deposit funds");
      }
      await fetchBalance();
      setShowDepositModal(false);
      setTransactionError("");
      toast.success("Funds added successfully!");
    } catch (err) {
      setTransactionError(err.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  if (!pendingBooking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="mt-2 text-xl font-semibold text-white">
            No Booking Found
          </h2>
          <p className="mt-2 text-gray-400">
            Please select a booking to proceed with payment.
          </p>
          <button
            onClick={() => navigate("/dashboard?tab=rentals")}
            className="mt-4 px-5 py-2 bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 rounded-xl hover:bg-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300"
          >
            View Rentals
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-white">
              Complete Your Payment
            </h1>
            <p className="mt-2 text-gray-400">Pay using your account balance</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 shadow-xl">
            {/* Booking Summary */}
            <div className="mb-6">
              <h2 className="mb-4 text-lg font-semibold text-white">
                Booking Summary
              </h2>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">Item</span>
                  <span className="font-medium">
                    {pendingBooking.itemTitle || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="font-medium">
                    {new Date(pendingBooking.startDate).toLocaleDateString()} -{" "}
                    {new Date(pendingBooking.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Amount</span>
                  <span className="font-semibold text-emerald-400">
                    ${calculateTotalAmount(pendingBooking).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Balance Information */}
            <div className="mb-6 rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5 text-emerald-400" />
                  <span className="font-medium text-white">
                    Available Balance
                  </span>
                </div>
                <span className="text-lg font-semibold text-white">
                  ${balance.toFixed(2)}
                </span>
              </div>
              {balance < calculateTotalAmount(pendingBooking) && (
                <div className="mt-2 flex items-center text-sm text-red-400">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  <span>
                    Insufficient balance. Please add funds to your account.
                  </span>
                </div>
              )}
            </div>

            {transactionError && (
              <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                {transactionError}
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={
                loading || balance < calculateTotalAmount(pendingBooking)
              }
              className="mt-6 flex w-full items-center justify-center space-x-2 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 px-4 py-2 hover:bg-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Wallet className="h-5 w-5" />
                  <span>
                    Pay ${calculateTotalAmount(pendingBooking).toFixed(2)}
                  </span>
                </>
              )}
            </button>

            <div className="mt-4 text-center text-sm text-gray-400">
              <p>Need to add funds to your account?</p>
              <button
                onClick={() => setShowDepositModal(true)}
                className="mt-1 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Add Funds
              </button>
            </div>
          </div>
        </div>
      </div>

      <TransactionModal
        showModal={showDepositModal}
        setShowModal={setShowDepositModal}
        transactionType="deposit"
        handleTransaction={handleDeposit}
        loading={loading}
        error={transactionError}
      />

      {showPaymentSuccess && (
        <WithdrawalSuccess
          amount={paymentAmount}
          message="Payment Successful!"
          description="Your booking has been confirmed and payment has been processed."
          onClose={() => {
            setShowPaymentSuccess(false);
            navigate("/dashboard?tab=rentals");
          }}
        />
      )}
    </div>
  );
};

export default PaymentPage;
