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
  const { itemId, startDate, endDate } = req.body;
  const userId = req.user._id;

  const item = await Item.findById(itemId);
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  const user = await User.findById(userId);
  const userWallet = await Wallet.findOne({ user: userId });
  const adminWallet = await Wallet.findOne({ user: adminId });

  if (!userWallet) {
    res.status(400);
    throw new Error("User wallet not found");
  }

  const price = calculateTotalPrice(item, startDate, endDate);
  const serviceFeeRate = user.isPremium ? premiumServiceFee : ServiceFee;
  const serviceFee = price * serviceFeeRate;
  const totalPrice = price + serviceFee;

  if (userWallet.balance < totalPrice) {
    res.status(400);
    throw new Error("Insufficient wallet balance");
  }

  // Generate acceptance and return codes
  const acceptanceCode = generateCode();
  const returnCode = generateCode();

  // Deduct totalPrice from wallet balance here if you want immediate deduction
  userWallet.balance -= totalPrice;
  userWallet.transactions.push({
    type: "debit",
    amount: totalPrice,
    description: `Booking for item ${item.name} from ${startDate} to ${endDate}`,
  });
  adminWallet.balance += serviceFee;
  adminWallet.transactions.push({
    type: "credit",
    amount: serviceFee,
    description: `Service fee for booking of item ${item.name} by user ${user.name}`,
  });
  await adminWallet.save();
  await userWallet.save();

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
  const booking = await Booking.findById(req.params.id).populate("user item");
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  if (booking.status !== "pending") {
    res.status(400);
    throw new Error("Only pending bookings can be canceled");
  }

  // Find user's wallet
  const userWallet = await Wallet.findOne({ user: booking.user._id });
  if (!userWallet) {
    res.status(400);
    throw new Error("User wallet not found");
  }

  // Find admin wallet (replace ADMIN_ID with actual admin ObjectId)
  const adminWallet = await Wallet.findOne({ user: process.env.ADMIN_ID });
  if (!adminWallet) {
    res.status(400);
    throw new Error("Admin wallet not found");
  }

  const refundAmount = booking.totalPrice;

  // Check if admin has enough balance to refund
  if (adminWallet.balance < refundAmount) {
    res.status(400);
    throw new Error("Admin wallet has insufficient funds to refund");
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
  await Notification.create({
    user: booking.user._id,
    type: "booking_cancelled",
    message: `Your booking #${booking._id} has been cancelled and ${refundAmount} birr has been refunded to your wallet.`,
    data: {
      bookingId: booking._id,
      refundAmount,
    },
  });

  res.json({
    message: `Booking cancelled. ${refundAmount} refunded to user from admin wallet.`,
  });
});

// @desc    Update booking status (confirmed or completed)
// @route   PUT /api/bookings/:id/status
// @access  Admin or Owner
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status, code } = req.body;
  const booking = await Booking.findById(req.params.id);

  //finding owner of the item in the booking
  const item = await Item.findById(booking.item);
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }
  const ownerId = item.owner.toString();

  // finding the owner and admin wallets
  const ownerWallet = await Wallet.findOne({ user: ownerId });
  const adminWallet = await Wallet.findOne({ user: adminId });

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

    // Calculate late days (if any)
    let delayedDays = 0;
    if (now > booking.endDate) {
      delayedDays = Math.ceil((now - booking.endDate) / (1000 * 60 * 60 * 24));
    }

    if (delayedDays > 0) {
      booking.delayedDays = delayedDays;

      // Penalty = item price * 1.5 * delayedDays
      const penaltyAmount = booking.price * 1.5 * delayedDays;
      booking.penaltyAmount = penaltyAmount;
      //calculate the penalty amout for the Owner by 1.25
      const penaltyAmountForOwner = booking.price * 1.25 * delayedDays;

      // Deduct penalty from wallet or set debt
      const userWallet = await Wallet.findOne({ user: booking.user });
      if (!userWallet) {
        res.status(400);
        throw new Error("User wallet not found for penalty deduction");
      }

      if (userWallet.balance >= penaltyAmount) {
        userWallet.balance -= penaltyAmount;
        userWallet.transactions.push({
          type: "debit",
          amount: penaltyAmount,
          description: `Late return penalty for booking ${booking._id}`,
        });
        await userWallet.save();

        //pay this penalty to the admin wallet
        adminWallet.balance += penaltyAmount;
        adminWallet.transactions.push({
          type: "credit",
          amount: penaltyAmount,
          description: `Late return penalty received for booking ${booking._id}`,
        });
        await adminWallet.save();

        ownerWallet.balance += penaltyAmountForOwner;
        ownerWallet.transactions.push({
          type: "credit",
          amount: penaltyAmountForOwner,
          description: `Late return penalty received for booking ${booking._id} (Owner)`,
        });
        await ownerWallet.save();

        // deduct the owner penalty from the admin wallet
        adminWallet.balance -= penaltyAmountForOwner;
        adminWallet.transactions.push({
          type: "debit",
          amount: penaltyAmountForOwner,
          description: `Late return penalty paid to owner for booking ${booking._id}`,
        });
        await adminWallet.save();

        await Notification.create({
          user: booking.user,
          type: "penalty_deduction",
          message: `Late return penalty of ${penaltyAmount} birr deducted from your wallet.`,
          data: {
            bookingId: booking._id,
            penaltyAmount,
          },
        });
      } else {
        // If insufficient balance, pay the available balance and make it negative his balance for the remaining penalty
        const availableBalance = userWallet.balance;
        userWallet.balance = -1 * (penaltyAmount - availableBalance);
        userWallet.transactions.push({
          type: "debit",
          amount: availableBalance,
          description: `Partial late return penalty for booking ${booking._id}`,
        });
        await userWallet.save();

        adminWallet.balance += availableBalance;
        adminWallet.transactions.push({
          type: "credit",
          amount: availableBalance,
          description: `Partial late return penalty received for booking ${booking._id}`,
        });
        await adminWallet.save();

        // the owner gets the full penalty amout for him
        ownerWallet.balance += penaltyAmountForOwner;
        ownerWallet.transactions.push({
          type: "credit",
          amount: penaltyAmountForOwner,
          description: `Partial late return penalty received for booking ${booking._id} (Owner)`,
        });
        await ownerWallet.save();

        // deduct the owner penalty from the admin wallet
        adminWallet.balance -= penaltyAmountForOwner;
        adminWallet.transactions.push({
          type: "debit",
          amount: penaltyAmountForOwner,
          description: `Partial late return penalty paid to owner for booking ${booking._id}`,
        });
        await adminWallet.save();

        const remaining = penaltyAmount - availableBalance;
        await Notification.create({
          user: booking.user,
          type: "penalty_debt",
          message: `Late return penalty of ${penaltyAmount} birr partially paid. Remaining debt: ${remaining} birr. Pay the remaining amount unless your collateral locked.`,
          data: {
            bookingId: booking._id,
            penaltyAmount: remaining,
          },
        });
      }
    } else {
      booking.delayedDays = 0;
      booking.penaltyAmount = 0;
      resPenaltyMessage = "Returned on time. No penalty applied.";
    }
  } else {
    booking.status = status;
  }

  await booking.save();

  res.json({
    message: `Booking status updated to ${status}`,
    penaltyMessage: resPenaltyMessage,
    booking,
  });
});

//@desc    Get bookings details by booking id that includes renter, owner, and item details
// @route   GET /api/bookings/details/:id
// @access  Private
const getBookingDetails = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("user", "name email")
    .populate("item")
    .populate({
      path: "item",
      populate: { path: "owner", select: "name email" },
    });
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }
  res.json({
    booking,
    renter: booking.user,
    owner: booking.item.owner,
    item: booking.item,
  });
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
