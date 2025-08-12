import express from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  getBookingsByUser,
  getBookingsForOwner,
  cancelBooking,
  updateBookingStatus,
} from "../controllers/booking.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Bookings by user
router.route("/user/:userId").get(protect, getBookingsByUser);

// Bookings for owner
router.route("/owner").get(protect, getBookingsForOwner);

// Cancel booking - should come before :id
router.route("/:id/cancel").put(protect, cancelBooking);

// Update status
router.route("/:id/status").put(protect, updateBookingStatus);

// Single booking
router.route("/:id").get(protect, getBookingById);

// All bookings - Admin only
router.route("/").get(protect, admin, getBookings).post(protect, createBooking);

export default router;
