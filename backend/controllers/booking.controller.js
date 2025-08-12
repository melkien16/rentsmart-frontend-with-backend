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

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const { itemId, startDate, endDate } = req.body;
  const userId = req.user._id;

  const item = await Item.findById(itemId);
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  const user = await User.findById(userId);
  const wallet = await Wallet.findOne({ user: userId });

  if (!wallet) {
    res.status(400);
    throw new Error("User wallet not found");
  }

  const price = calculateTotalPrice(item, startDate, endDate);
  const serviceFeeRate = user.isPremium ? premiumServiceFee : ServiceFee;
  const serviceFee = price * serviceFeeRate;
  const totalPrice = price + serviceFee;

  if (wallet.balance < totalPrice) {
    res.status(400);
    throw new Error("Insufficient wallet balance");
  }

  // Generate acceptance and return codes
  const acceptanceCode = generateCode();
  const returnCode = generateCode();

  // Deduct totalPrice from wallet balance here if you want immediate deduction
  wallet.balance -= totalPrice;
  await wallet.save();

  const booking = await Booking.create({
    user: userId,
    item: item._id,
    startDate,
    endDate,
    price,
    serviceFee,
    totalPrice,
    paymentStatus: "paid",
    status: "pending",
    acceptanceCode,
    returnCode,
  });

  await Notification.create({
    user: userId,
    type: "booking_acceptance_code",
    message: `Your acceptance code for booking #${booking._id} is ${acceptanceCode}`,
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
// @route   GET /api/bookings/user/:userId
// @access  Private
const getBookingsByUser = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.params.userId }).populate(
    "item"
  );
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
    .populate("user", "name email")
    .populate("item");
  res.status(200).json(bookings);
});

// @desc    Cancel booking if still pending
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  if (booking.status !== "pending") {
    res.status(400);
    throw new Error("Only pending bookings can be canceled");
  }

  booking.paymentStatus = "refunded";
  await booking.save();

  res.json({ message: "Booking cancelled and refunded", booking });
});

// @desc    Update booking status (confirmed or completed)
// @route   PUT /api/bookings/:id/status
// @access  Admin or Owner
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status, code } = req.body;
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  const allowedStatuses = ["confirmed", "in_use", "returned", "completed"];
  if (!allowedStatuses.includes(status)) {
    res.status(400);
    throw new Error("Invalid status");
  }

  if (status === "in_use") {
    if (!code) {
      res.status(400);
      throw new Error("Acceptance code is required");
    }
    if (booking.acceptanceCode !== code) {
      res.status(400);
      throw new Error("Invalid acceptance code");
    }
    if (booking.acceptanceCodeEnteredAt) {
      res.status(400);
      throw new Error("Acceptance code already verified");
    }
    booking.status = "in_use";
    booking.acceptanceCodeEnteredAt = new Date();
  } else if (status === "returned") {
    if (!code) {
      res.status(400);
      throw new Error("Return code is required");
    }
    if (booking.returnCode !== code) {
      res.status(400);
      throw new Error("Invalid return code");
    }
    if (booking.returnCodeEnteredAt) {
      res.status(400);
      throw new Error("Return code already verified");
    }

    const now = new Date();
    booking.returnCodeEnteredAt = now;
    booking.status = "returned";

    // Penalty logic for late return
    if (now > booking.endDate) {
      const lateDays = Math.ceil(
        (now - booking.endDate) / (1000 * 60 * 60 * 24)
      );
      const penaltyPerDay = 10; // example fixed penalty per day in your currency

      const totalPenalty = lateDays * penaltyPerDay;

      // Deduct penalty from user wallet or collateral - example:
      const wallet = await Wallet.findOne({ user: booking.user });
      if (!wallet) {
        res.status(400);
        throw new Error("User wallet not found for penalty deduction");
      }

      if (wallet.balance < totalPenalty) {
        // Handle insufficient balance - e.g., set debt or notify user
        // For simplicity, just throw error here
        res.status(400);
        throw new Error("Insufficient balance to cover late return penalty");
      }

      wallet.balance -= totalPenalty;
      await wallet.save();

      // Optional: record penalty details in booking or a separate penalty collection
      booking.lateReturnPenalty = totalPenalty;
      booking.lateReturnDays = lateDays;
    }
  } else {
    booking.status = status;
  }

  await booking.save();

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
