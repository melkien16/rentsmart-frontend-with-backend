import asyncHandler from "../middleware/asyncHandler.js";
import Report from "../models/reportModle.js";
import User from "../models/userModel.js";
import Item from "../models/itemModel.js";
import Booking from "../models/bookingModel.js";

// @desc    Create a new report
// @route   POST /api/reports
// @access  Private
const createReport = asyncHandler(async (req, res) => {
  const { reportedUser, item, booking, reason, details } = req.body;
  const reporterId = req.user._id;

  // Validate reported user, item, or booking existence
  if (!reason) {
    res.status(400);
    throw new Error("Reason for report is required");
  }

  // Check if the item exists if it’s provided
  if (item) {
    const existingItem = await Item.findById(item);
    if (!existingItem) {
      res.status(404);
      throw new Error("Item not found");
    }
  }

  // Check if the user exists if it’s provided
  if (reportedUser) {
    const existingUser = await User.findById(reportedUser);
    if (!existingUser) {
      res.status(404);
      throw new Error("User not found");
    }
  }

  // Check if the booking exists if it’s provided
  if (booking) {
    const existingBooking = await Booking.findById(booking);
    if (!existingBooking) {
      res.status(404);
      throw new Error("Booking not found");
    }
  }

  const report = await Report.create({
    reporter: reporterId,
    reportedUser,
    item,
    booking,
    reason,
    details,
  });

  res.status(201).json(report);
});

// @desc    Get all reports (Admin only)
// @route   GET /api/reports
// @access  Admin
const getAllReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({})
    .populate("reporter", "name email")
    .populate("reportedUser", "name email")
    .populate("item")
    .populate("booking");

  res.json(reports);
});

// @desc    Get a specific user's reports
// @route   GET /api/reports/user/:userId
// @access  Private
const getUserReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({ reporter: req.params.userId })
    .populate("reporter", "name email")
    .populate("reportedUser", "name email")
    .populate("item")
    .populate("booking");

  if (!reports) {
    res.status(404);
    throw new Error("No reports found for this user");
  }

  res.json(reports);
});

// @desc    Get a specific report by ID
// @route   GET /api/reports/:id
// @access  Private
const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id)
    .populate("reporter", "name email")
    .populate("reportedUser", "name email")
    .populate("item")
    .populate("booking");

  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  res.json(report);
});

// @desc    Update report status (Admin only)
// @route   PUT /api/reports/:id/status
// @access  Admin
const updateReportStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  // Only allow valid statuses
  if (!["pending", "reviewed", "resolved", "dismissed"].includes(status)) {
    res.status(400);
    throw new Error("Invalid status");
  }

  report.status = status;
  await report.save();

  res.json({ message: `Report status updated to ${status}`, report });
});

// @desc    Delete a report (Admin only)
// @route   DELETE /api/reports/:id
// @access  Admin
const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  await report.remove();
  res.json({ message: "Report deleted successfully" });
});

export {
  createReport,
  getAllReports,
  getUserReports,
  getReportById,
  updateReportStatus,
  deleteReport,
};
