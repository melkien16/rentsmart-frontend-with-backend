import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Item",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    serviceFee: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "refunded"],
      default: "paid",
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "in_use",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
    delayedDays: {
      type: Number,
      default: 0,
    },
    penaltyAmount: {
      type: Number,
      default: 0,
    },
    // New fields for OTP codes and verification timestamps
    acceptanceCode: {
      type: String, // store as 8-digit string
    },
    acceptanceCodeEnteredAt: {
      type: Date,
      default: null,
    },
    returnCode: {
      type: String, // store as 8-digit string
    },
    returnCodeEnteredAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
