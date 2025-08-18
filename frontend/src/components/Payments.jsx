import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Wallet, AlertCircle, CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';
import { PaySuccessModal } from './ui/paySuccessModal';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [transactionError, setTransactionError] = useState('');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);

  // Get booking details from location state
  const pendingBooking = location.state?.pendingBooking;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    if (!pendingBooking) {
      navigate('/dashboard?tab=rentals');
      return;
    }

    // Fetch user's balance
    fetchBalance();
  }, [isAuthenticated, pendingBooking, navigate, fetchBalance]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTransactionError('');

    try {
      if (!pendingBooking) {
        throw new Error('No booking information found');
      }

      // Calculate total amount
      const totalAmount = calculateTotalAmount(pendingBooking);

      // Check if user has sufficient balance
      if (balance < totalAmount) {
        throw new Error('Insufficient balance. Please add funds to your account.');
      }

      // Get user ID from auth context
      const user = JSON.parse(localStorage.getItem('smartRentUser'));
      if (!user?._id) {
        throw new Error('User not authenticated');
      }

      // Deduct amount from wallet
      const paymentSuccess = await debitWallet(totalAmount, user._id);
      if (!paymentSuccess) {
        throw new Error('Payment failed. Please try again.');
      }

      // Only create booking after successful payment
      const newBooking = await createBooking({
        ...pendingBooking,
        totalAmount,
        status: 'confirmed'
      });

      // Send message to owner after successful booking creation
      if (pendingBooking.item?.ownerId) {
        const message = `New booking confirmed from ${new Date(newBooking.startDate).toLocaleDateString()} to ${new Date(newBooking.endDate).toLocaleDateString()}`;
        await sendMessage(pendingBooking.item.ownerId, message);
      }

      // Store payment amount and show success modal
      setPaymentAmount(totalAmount);
      setShowPaymentSuccess(true);

      // Refresh balance after payment
      await fetchBalance();

      toast.success('Payment and booking confirmed!');

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
      throw new Error('Item price not found');
    }

    const basePrice = booking.item.price * days;
    const serviceFee = basePrice * 0.1; // 10% service fee
    return basePrice + serviceFee;
  };

  const handleDeposit = async (amount) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setTransactionError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const success = await addFunds(numericAmount);
      if (!success) {
        throw new Error('Failed to deposit funds');
      }
      await fetchBalance();
      setShowDepositModal(false);
      setTransactionError('');
      toast.success('Funds added successfully!');
    } catch (err) {
      setTransactionError(err.message || 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  if (!pendingBooking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">No Booking Found</h2>
          <p className="mt-2 text-gray-600">Please select a booking to proceed with payment.</p>
          <button
            onClick={() => navigate('/dashboard?tab=rentals')}
            className="mt-4 rounded-lg bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
          >
            View Rentals
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Complete Your Payment</h1>
            <p className="mt-2 text-gray-600">Pay using your account balance</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {/* Booking Summary */}
            <div className="mb-6">
              <h2 className="mb-4 text-lg font-semibold">Booking Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Item</span>
                  <span className="font-medium">{pendingBooking.itemTitle || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">
                    {new Date(pendingBooking.startDate).toLocaleDateString()} - {new Date(pendingBooking.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-medium">${calculateTotalAmount(pendingBooking).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Balance Information */}
            <div className="mb-6 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5 text-primary-500" />
                  <span className="font-medium">Available Balance</span>
                </div>
                <span className="text-lg font-semibold">${balance.toFixed(2)}</span>
              </div>
              {balance < calculateTotalAmount(pendingBooking) && (
                <div className="mt-2 flex items-center text-sm text-red-600">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  <span>Insufficient balance. Please add funds to your account.</span>
                </div>
              )}
            </div>

            {transactionError && (
              <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {transactionError}
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={loading || balance < calculateTotalAmount(pendingBooking)}
              className="mt-6 flex w-full items-center justify-center space-x-2 rounded-lg bg-primary-500 px-4 py-2 text-white hover:bg-primary-600 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Wallet className="h-5 w-5" />
                  <span>Pay ${calculateTotalAmount(pendingBooking).toFixed(2)}</span>
                </>
              )}
            </button>

            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Need to add funds to your account?</p>
              <button
                onClick={() => setShowDepositModal(true)}
                className="mt-1 text-primary-500 hover:text-primary-600"
              >
                Add Funds
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPaymentSuccess && (
        <PaySuccessModal
          amount={paymentAmount}
          message="Payment Successful!"
          description="Your booking has been confirmed and payment has been processed."
          onClose={() => {
            setShowPaymentSuccess(false);
            navigate('/dashboard?tab=rentals');
          }}
        />
      )}
    </div>
  );
};

export default PaymentPage; 