import asyncHandler from "../middleware/asyncHandler.js";
import Booking from "../models/bookingModel.js";
import Item from "../models/itemModel.js";
import Wallet from "../models/walletModel.js";
import User from "../models/userModel.js";
import Notification from "../models/notificationModel.js";
import calculateTotalPrice from "../utils/calculateTotalPrice.js";
import {
  premiumServiceFee,
  serviceFee as ServiceFee,
} from "../utils/Constants.js";
import { generateCode } from "../utils/generateCode.js";

const adminId = "689aa5de797dfb5254ac4d16";

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const { itemId, quantity = 1, startDate, endDate } = req.body;
  const userId = req.user._id;

  // Fetch item
  const item = await Item.findById(itemId);
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  //Check if requested quantity is available
  if (quantity > item.availableQuantity) {
    res.status(400);
    throw new Error(
      `Only ${item.availableQuantity} items are available for booking`
    );
  }

  const user = await User.findById(userId);
  const userWallet = await Wallet.findOne({ user: userId });
  const adminWallet = await Wallet.findOne({ user: adminId });

  if (!userWallet) {
    res.status(400);
    throw new Error("User wallet not found");
  }

  // Calculate total price based on quantity
  const unitPrice = calculateTotalPrice(item, startDate, endDate);
  const totalPriceBeforeFee = unitPrice * quantity;

  const serviceFeeRate = user.isPremium ? premiumServiceFee : ServiceFee;
  const serviceFee = totalPriceBeforeFee * serviceFeeRate;
  const totalPrice = totalPriceBeforeFee + serviceFee;

  if (userWallet.balance < totalPrice) {
    res.status(400);
    throw new Error("Insufficient wallet balance");
  }

  // Generate acceptance and return codes
  const acceptanceCode = generateCode();
  const returnCode = generateCode();

  // Deduct totalPrice from user wallet
  userWallet.balance -= totalPrice;
  userWallet.transactions.push({
    type: "debit",
    amount: totalPrice,
    description: `Booking ${quantity} x ${item.name} from ${startDate} to ${endDate}`,
  });

  // Add Total fee to admin wallet
  adminWallet.balance += serviceFee;
  adminWallet.transactions.push({
    type: "credit",
    amount: serviceFee,
    description: `Total fee for booking of item ${item.name} by user ${user.name}`,
  });

  await adminWallet.save();
  await userWallet.save();

  // Create booking
  const booking = await Booking.create({
    user: userId,
    item: item._id,
    quantity,
    startDate,
    endDate,
    price: totalPriceBeforeFee,
    serviceFee,
    totalPrice,
    paymentStatus: "paid",
    status: "pending",
    acceptanceCode,
    returnCode,
  });

  item.availableQuantity -= quantity;
  item.bookings += quantity;
  item.status = item.availableQuantity <= 0 ? "Rented" : "Available";
  await item.save();

  // Send notification
  await Notification.create({
    user: userId,
    type: "booking_acceptance_code",
    message: `Your acceptance code for booking: ${booking._id} is ${acceptanceCode}`,
    data: {
      bookingId: booking._id,
      acceptanceCode,
    },
  });

  res.status(201).json({
    booking,
    message: "Booking created successfully!",
  });
});

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Admin
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({})
    .populate("user", "name email")
    .populate("item");
  res.json(bookings);
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("user", "name email")
    .populate("item");

  if (booking) {
    res.json(booking);
  } else {
    res.status(404);
    throw new Error("Booking not found");
  }
});

// @desc    Get bookings by user
// @route   GET /api/bookings/user
// @access  Private
const getBookingsByUser = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("item")
    .populate({
      path: "item",
      populate: { path: "owner", select: "name email phone address avatar" },
    });
  res.json(bookings);
});

// @desc    Get bookings for items owned by the logged-in owner
// @route   GET /api/bookings/owner
// @access  Private (Owner)
const getBookingsForOwner = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;

  // Step 1: Find all items owned by the user
  const ownedItems = await Item.find({ owner: ownerId }).select("_id");

  const itemIds = ownedItems.map((item) => item._id);

  // Step 2: Find bookings for these items
  const bookings = await Booking.find({ item: { $in: itemIds } })
    .populate("user", "name email phone address avatar isPremium createdAt")
    .populate("item");
  res.status(200).json(bookings);
});

// @desc    Cancel booking if still pending
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("user item");
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  if (booking.status === "in_use") {
    res.status(400);
    throw new Error("Booking cannot be cancelled at this stage");
  }

  const { quantity, item } = booking;

  // Find user's wallet
  const userWallet = await Wallet.findOne({ user: booking.user._id });
  if (!userWallet) {
    res.status(400);
    throw new Error("User wallet not found");
  }

  // Find admin wallet
  const adminWallet = await Wallet.findOne({ user: adminId });
  if (!adminWallet) {
    res.status(400);
    throw new Error("Admin wallet not found");
  }

  const refundAmount = booking.totalPrice * 0.1; // 10% refund for cancellation

  // Check if admin has enough balance to refund
  if (adminWallet.balance < refundAmount) {
    res.status(400);
    throw new Error("Refund is processing...");
  }

  // Deduct from admin wallet
  adminWallet.balance -= refundAmount;
  adminWallet.transactions.push({
    type: "debit",
    amount: refundAmount,
    description: `Refund for booking ${booking._id} cancelled by user ${booking.user.name}`,
  });
  await adminWallet.save();

  // Credit to user wallet
  userWallet.balance += refundAmount;
  userWallet.transactions.push({
    type: "credit",
    amount: refundAmount,
    description: `Refund for booking ${booking._id} cancelled by admin`,
  });
  await userWallet.save();

  // Update booking
  booking.paymentStatus = "refunded";
  booking.status = "cancelled";
  await booking.save();

  // Restore item availability based on quantity
  item.availableQuantity += quantity;
  item.bookings -= quantity;
  item.status = item.availableQuantity > 0 ? "Available" : "Rented";
  await item.save();

  // Send notification
  await Notification.create({
    user: booking.user._id,
    type: "booking_cancelled",
    message: `Your booking #${booking._id} has been cancelled. ${refundAmount} birr has been refunded to your wallet.`,
    data: {
      bookingId: booking._id,
      refundAmount,
    },
  });

  res.json({
    message: `Booking cancelled. ${refundAmount} refunded to user from admin wallet.`,
  });
});

// @desc    Update booking status (confirmed, in_use, or completed)
// @route   PUT /api/bookings/:id/status
// @access  Admin or Owner
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status, code } = req.body;

  const booking = await Booking.findById(req.params.id).populate("item user");
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  const item = booking.item;
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  const ownerId = item.owner.toString();
  const ownerWallet = await Wallet.findOne({ user: ownerId });
  const adminWallet = await Wallet.findOne({ user: adminId });

  if (!ownerWallet || !adminWallet) {
    res.status(400);
    throw new Error("Owner or admin wallet not found");
  }

  const allowedStatuses = ["confirmed", "in_use", "completed"];
  if (!allowedStatuses.includes(status)) {
    res.status(400);
    throw new Error("Invalid status");
  }

  // ----------------- Handle in_use -----------------
  if (status === "in_use") {
    if (!code || code !== booking.acceptanceCode) {
      res.status(400);
      throw new Error("Invalid or missing acceptance code");
    }
    booking.status = "in_use";
    booking.acceptanceCodeEnteredAt = new Date();
  }
  // ----------------- Handle confirmed -----------------
  else if (status === "confirmed") {
    booking.status = "confirmed";
  }
  // ----------------- Handle completed -----------------
  else if (status === "completed") {
    if (!code || code !== booking.returnCode) {
      res.status(400);
      throw new Error("Invalid or missing return code");
    }
    if (booking.returnCodeEnteredAt) {
      res.status(400);
      throw new Error("Return code already verified");
    }

    booking.returnCodeEnteredAt = new Date();
    booking.status = "completed";

    const now = new Date();
    let delayedDays = 0;

    if (now > booking.endDate) {
      delayedDays = Math.ceil((now - booking.endDate) / (1000 * 60 * 60 * 24));
    }

    booking.delayedDays = delayedDays;

    if (delayedDays > 0) {
      const penaltyAmount = booking.price * 1.5 * delayedDays;
      const penaltyAmountForOwner = booking.price * 1.25 * delayedDays;

      booking.penaltyAmount = penaltyAmount;

      const userWallet = await Wallet.findOne({ user: booking.user._id });
      if (!userWallet)
        throw new Error("User wallet not found for penalty deduction");

      // Full or partial penalty deduction
      const availableBalance = userWallet.balance;
      const deduction = Math.min(availableBalance, penaltyAmount);

      userWallet.balance -= deduction;
      userWallet.transactions.push({
        type: "debit",
        amount: deduction,
        description: `Late return penalty for booking ${booking._id}`,
      });
      await userWallet.save();

      adminWallet.balance += deduction;
      adminWallet.transactions.push({
        type: "credit",
        amount: deduction,
        description: `Late return penalty received for booking ${booking._id}`,
      });

      // Pay owner
      ownerWallet.balance += penaltyAmountForOwner;
      ownerWallet.transactions.push({
        type: "credit",
        amount: penaltyAmountForOwner,
        description: `Late return penalty for booking ${booking._id} (Owner)`,
      });

      // Deduct from admin wallet
      adminWallet.balance -= penaltyAmountForOwner;
      adminWallet.transactions.push({
        type: "debit",
        amount: penaltyAmountForOwner,
        description: `Paid penalty to owner for booking ${booking._id}`,
      });

      await adminWallet.save();
      await ownerWallet.save();

      // Send notification about penalty
      await Notification.create({
        user: booking.user._id,
        type: deduction < penaltyAmount ? "penalty_debt" : "penalty_deduction",
        message:
          deduction < penaltyAmount
            ? `Partial late return penalty applied. Remaining: ${
                penaltyAmount - deduction
              } birr`
            : `Late return penalty of ${penaltyAmount} birr deducted from your wallet.`,
        data: {
          bookingId: booking._id,
          penaltyAmount: penaltyAmount - deduction,
        },
      });
    } else {
      booking.penaltyAmount = 0;
    }
  }

  await booking.save();

  await Notification.create({
    user: booking.user._id,
    type: "booking_status_update",
    message: `Your booking #${booking._id} status has been updated to ${status}.`,
    data: {
      bookingId: booking._id,
      status,
    },
  });

  res.json({ message: `Booking status updated to ${status}`, booking });
});

export {
  createBooking,
  getBookings,
  getBookingById,
  getBookingsByUser,
  getBookingsForOwner,
  cancelBooking,
  updateBookingStatus,
};
