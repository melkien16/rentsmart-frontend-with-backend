import asyncHandler from "../middleware/asyncHandler.js";
import Notification from "../models/notificationModel.js";

// @desc    Get notifications for logged-in user
// @route   GET /api/notifications
// @access  Private
const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50); // limit or paginate as needed

  res.json(notifications);
});

// @desc    Mark a notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification || notification.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error("Notification not found");
  }

  notification.isRead = true;
  await notification.save();

  res.json({ message: "Notification marked as read" });
});

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
// @access  Private
const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification || notification.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error("Notification not found");
  }

  await notification.remove();
  res.json({ message: "Notification deleted" });
});

export {
  getNotifications,
  markNotificationRead,
  deleteNotification,
};