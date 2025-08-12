import asyncHandler from "../middleware/asyncHandler.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

// @desc    Send a new message
// @route   POST /api/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { receiver, message } = req.body;
  const sender = req.user._id;

  if (!receiver || !message) {
    res.status(400);
    throw new Error("Receiver and message are required");
  }

  const newMessage = new Message({
    sender,
    receiver,
    message,
  });

  await newMessage.save();
  res.status(201).json(newMessage);
});

// @desc    Get All recieved messages of a user
// @route   GET /api/messages
// @access  Private

const getAllMessages = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const messages = await Message.find({ receiver: userId })
    .populate("sender", "name email")
    .populate("receiver", "name email")
    .sort({ createdAt: -1 });

  res.json(messages);
});

// @desc    Get messages between two users
// @route   GET /api/messages/:userId
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const loggedInUserId = req.user._id;

  if (!userId || userId === loggedInUserId.toString()) {
    res.status(400);
    throw new Error("Invalid recipient");
  }

  const messages = await Message.find({
    $or: [
      { sender: loggedInUserId, receiver: userId },
      { sender: userId, receiver: loggedInUserId },
    ],
  })
    .populate("sender", "name email")
    .populate("receiver", "name email")
    .sort({ createdAt: 1 });

  res.json(messages);
});

// @desc    Mark a message as read
// @route   PUT /api/messages/:id/read
// @access  Private
const markMessageAsRead = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error("Message not found");
  }

  // Check if the logged-in user is the receiver
  if (message.receiver.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You can only mark messages you received as read");
  }

  message.isRead = true;
  await message.save();

  res.json({ message: "Message marked as read", message });
});

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error("Message not found");
  }

  // Check if the logged-in user is either the sender or receiver
  if (
    message.sender.toString() !== req.user._id.toString() &&
    message.receiver.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("You are not authorized to delete this message");
  }

  await message.remove();

  res.json({ message: "Message deleted" });
});

export {
  sendMessage,
  getMessages,
  getAllMessages,
  markMessageAsRead,
  deleteMessage,
};
